/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package io.ballerina.lib.ibm.db2.parameterprocessor;

import io.ballerina.runtime.api.types.Type;
import io.ballerina.runtime.api.utils.StringUtils;
import io.ballerina.runtime.api.utils.TypeUtils;
import io.ballerina.runtime.api.values.BArray;
import io.ballerina.runtime.api.values.BDecimal;
import io.ballerina.runtime.api.values.BMap;
import io.ballerina.runtime.api.values.BObject;
import io.ballerina.runtime.api.values.BString;
import io.ballerina.runtime.api.values.BXml;
import io.ballerina.stdlib.sql.exception.ConversionError;
import io.ballerina.stdlib.sql.exception.DataError;
import io.ballerina.stdlib.sql.parameterprocessor.DefaultStatementParameterProcessor;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.SQLXML;
import java.sql.Time;
import java.sql.Timestamp;
import java.sql.Types;
import java.time.DateTimeException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Calendar;
import java.util.Set;
import java.util.TimeZone;

/**
 * Sets the parameters of Db2 prepared statements.
 * <p>
 * The differences from the SQL module defaults come from the IBM JCC driver and from Db2 itself:
 * <ul>
 * <li>a null is bound as a typed null, because the driver rejects {@code Types.NULL};</li>
 * <li>Db2 for LUW has no time zone data types, so a {@code time:Civil} with a {@code utcOffset} and a
 * {@code time:Utc} are stored as the UTC wall clock time;</li>
 * <li>{@code NaN} and the infinities cannot be bound (the driver converts every number to a {@code BigDecimal});</li>
 * <li>the driver has no {@code createNClob}, so NCLOB values are bound as CLOBs;</li>
 * <li>the driver cannot bind arrays.</li>
 * </ul>
 *
 * @since 1.0.0
 */
public class Db2StatementParameterProcessor extends DefaultStatementParameterProcessor {

    private static final Db2StatementParameterProcessor INSTANCE = new Db2StatementParameterProcessor();
    private static final String ARRAY_ERROR = "Db2 does not support ARRAY parameters. Pass the elements as " +
            "separate parameters, for example 'WHERE id IN (?, ?, ?)'.";
    private static final String NOT_FINITE_ERROR = "Db2 cannot store the value %s: DOUBLE and REAL have no such " +
            "values, and the driver cannot bind it for a DECFLOAT column. Use the SQL literal DECFLOAT('%s') instead.";
    private static final String TIME_ZONE_ERROR = "Db2 TIME has no time zone. Remove 'utcOffset' from the " +
            "time:TimeOfDay value or convert the value to the wall clock time first.";
    private static final BigDecimal NANOS_PER_SECOND = BigDecimal.valueOf(1_000_000_000L);
    private static final String SQL_MODULE = "sql";
    private static final Set<String> BINARY_OUT_PARAMETERS = Set.of("BinaryOutParameter", "VarBinaryOutParameter",
            "BlobOutParameter");
    private static final BString YEAR = StringUtils.fromString("year");
    private static final BString MONTH = StringUtils.fromString("month");
    private static final BString DAY = StringUtils.fromString("day");
    private static final BString HOUR = StringUtils.fromString("hour");
    private static final BString MINUTE = StringUtils.fromString("minute");
    private static final BString SECOND = StringUtils.fromString("second");
    private static final BString UTC_OFFSET = StringUtils.fromString("utcOffset");
    private static final BString OFFSET_HOURS = StringUtils.fromString("hours");
    private static final BString OFFSET_MINUTES = StringUtils.fromString("minutes");
    private static final BString OFFSET_SECONDS = StringUtils.fromString("seconds");

    private Db2StatementParameterProcessor() {
    }

    public static Db2StatementParameterProcessor getInstance() {
        return INSTANCE;
    }

    @Override
    public int setSQLValueParam(Connection connection, PreparedStatement preparedStatement, int index, Object object,
                                boolean returnType) throws DataError, SQLException {
        if (object == null) {
            // The JCC driver rejects `Types.NULL` ("Unrecognized JDBC type: 0", ERRORCODE=-4228). The server takes
            // the type of a parameter marker from its context, so a typed null is accepted by any nullable column.
            preparedStatement.setNull(index, Types.VARCHAR);
            return Types.VARCHAR;
        }
        checkFinite(object);
        if (returnType && object instanceof BXml) {
            // An INOUT parameter is registered with the type returned here, and the SQL module can only convert
            // the returned value of a character type. The server converts the string to XML.
            preparedStatement.setString(index, object.toString());
            return Types.VARCHAR;
        }
        return super.setSQLValueParam(connection, preparedStatement, index, object, returnType);
    }

    @Override
    public int getCustomOutParameterType(BObject typedValue) throws DataError, SQLException {
        String sqlType = TypeUtils.getType(typedValue).getName();
        return switch (sqlType) {
            case "BinaryOutParameter" -> Types.BINARY;
            case "VarBinaryOutParameter" -> Types.VARBINARY;
            case "BlobOutParameter" -> Types.BLOB;
            case "XmlOutParameter" -> Types.SQLXML;
            default -> super.getCustomOutParameterType(typedValue);
        };
    }

    @Override
    public void registerOutParameter(CallableStatement statement, int index, BObject typedValue, int sqlType)
            throws SQLException, DataError {
        Type type = TypeUtils.getType(typedValue);
        String name = type.getName();
        if (BINARY_OUT_PARAMETERS.contains(name)) {
            if (SQL_MODULE.equals(type.getPackage().getName())) {
                // The SQL module converts the values of its own OUT parameter classes with its default processor,
                // which expects the string form that other drivers return for binary values.
                throw new DataError(String.format("sql:%s cannot read binary values returned by Db2. Use db2:%s " +
                        "instead.", name, name));
            }
            if (name.equals("BlobOutParameter")) {
                // The SQL module registers a BLOB OUT parameter as LONGVARBINARY, which the driver rejects.
                statement.registerOutParameter(index, Types.BLOB);
                return;
            }
        }
        super.registerOutParameter(statement, index, typedValue, sqlType);
    }

    @Override
    protected void setXml(Connection connection, PreparedStatement preparedStatement, int index, BXml value)
            throws SQLException, DataError {
        // Bind the serialized document. The text value of an element only holds its character data.
        SQLXML sqlxml = connection.createSQLXML();
        sqlxml.setString(value.toString());
        preparedStatement.setSQLXML(index, sqlxml);
    }

    @Override
    protected void setNClob(Connection connection, PreparedStatement preparedStatement, String sqlType, int index,
                            Object value) throws SQLException, DataError {
        // The driver has no `createNClob`. A CLOB value is converted by the server for DBCLOB and NCLOB columns.
        setClob(connection, preparedStatement, "CLOB", index, value);
    }

    @Override
    protected void setTimestamp(PreparedStatement preparedStatement, String sqlType, int index, Object value)
            throws SQLException, DataError {
        if (!setUtcTimestamp(preparedStatement, sqlType, index, value)
                && !setTimestampString(preparedStatement, index, value)) {
            super.setTimestamp(preparedStatement, sqlType, index, value);
        }
    }

    @Override
    protected void setDateTime(PreparedStatement preparedStatement, String sqlType, int index, Object value)
            throws SQLException, DataError {
        if (!setUtcTimestamp(preparedStatement, sqlType, index, value)
                && !setTimestampString(preparedStatement, index, value)) {
            super.setDateTime(preparedStatement, sqlType, index, value);
        }
    }

    @Override
    protected void setTime(PreparedStatement preparedStatement, String sqlType, int index, Object value)
            throws SQLException, DataError {
        if (value instanceof BMap<?, ?> timeOfDay && timeOfDay.containsKey(UTC_OFFSET)) {
            throw new DataError(TIME_ZONE_ERROR);
        }
        if (value instanceof BString text) {
            // The default binds a string with `setString`, which the driver rejects for an INOUT parameter
            // registered as TIME. Both the JDBC (hh:mm:ss) and the Db2 (hh.mm.ss) notations are accepted.
            try {
                preparedStatement.setTime(index, Time.valueOf(text.getValue().replace('.', ':')));
                return;
            } catch (IllegalArgumentException e) {
                // Leave other notations to the server.
            }
        }
        super.setTime(preparedStatement, sqlType, index, value);
    }

    /**
     * Binds a timestamp given as a string as a {@link Timestamp}, so that an INOUT parameter is registered with the
     * TIMESTAMP type. The JDBC (yyyy-mm-dd hh:mm:ss.f), ISO 8601 (yyyy-mm-ddThh:mm:ss.f) and Db2
     * (yyyy-mm-dd-hh.mm.ss.f) notations are accepted; any other string is left to the server.
     */
    private static boolean setTimestampString(PreparedStatement preparedStatement, int index, Object value)
            throws SQLException {
        if (!(value instanceof BString text)) {
            return false;
        }
        String normalized = text.getValue().trim();
        if (normalized.length() > 10 && (normalized.charAt(10) == 'T' || normalized.charAt(10) == '-')) {
            normalized = normalized.substring(0, 10) + ' ' + normalized.substring(11).replace('.', ':');
            int lastColon = normalized.lastIndexOf(':');
            if (lastColon > 16) {
                // The separator before the fraction of a second is a period.
                normalized = normalized.substring(0, lastColon) + '.' + normalized.substring(lastColon + 1);
            }
        }
        try {
            preparedStatement.setTimestamp(index, Timestamp.valueOf(normalized));
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    @Override
    protected void setFloat(PreparedStatement preparedStatement, String sqlType, int index, Object value)
            throws SQLException, DataError {
        checkFinite(value);
        super.setFloat(preparedStatement, sqlType, index, value);
    }

    @Override
    protected void setReal(PreparedStatement preparedStatement, String sqlType, int index, Object value)
            throws SQLException, DataError {
        checkFinite(value);
        super.setReal(preparedStatement, sqlType, index, value);
    }

    @Override
    protected void setDouble(PreparedStatement preparedStatement, String sqlType, int index, Object value)
            throws SQLException, DataError {
        checkFinite(value);
        super.setDouble(preparedStatement, sqlType, index, value);
    }

    @Override
    protected void setNumeric(PreparedStatement preparedStatement, String sqlType, int index, Object value)
            throws SQLException, DataError {
        checkFinite(value);
        super.setNumeric(preparedStatement, sqlType, index, value);
    }

    @Override
    protected void setDecimal(PreparedStatement preparedStatement, String sqlType, int index, Object value)
            throws SQLException, DataError {
        checkFinite(value);
        super.setDecimal(preparedStatement, sqlType, index, value);
    }

    @Override
    protected void setVarcharArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setCharArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setNVarcharArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setBitArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setBooleanArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setIntegerArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setBigIntArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setSmallIntArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setFloatArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setRealArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setDoubleArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setNumericArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setDecimalArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setBinaryArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setVarBinaryArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setDateTimeArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setTimestampArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setDateArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    @Override
    protected void setTimeArray(Connection conn, PreparedStatement preparedStatement, int index, Object value)
            throws DataError {
        throw new DataError(ARRAY_ERROR);
    }

    /**
     * Binds a `time:Utc` or a `time:Civil` with a `utcOffset` as the UTC wall clock time, keeping the full
     * precision of the value. Returns false for every other value, which is left to the default processor.
     */
    private static boolean setUtcTimestamp(PreparedStatement preparedStatement, String sqlType, int index,
                                           Object value) throws SQLException, DataError {
        Instant instant;
        try {
            if (value instanceof BArray utc) {
                BigDecimal fraction = ((BDecimal) utc.get(1)).decimalValue();
                instant = Instant.ofEpochSecond(utc.getInt(0), fraction.multiply(NANOS_PER_SECOND)
                        .setScale(0, RoundingMode.HALF_UP).longValue());
            } else if (value instanceof BMap<?, ?> civil && civil.containsKey(UTC_OFFSET)) {
                BMap<?, ?> offset = (BMap<?, ?>) civil.get(UTC_OFFSET);
                int offsetSeconds = 0;
                if (offset.containsKey(OFFSET_SECONDS)) {
                    offsetSeconds = ((BDecimal) offset.get(OFFSET_SECONDS)).decimalValue()
                            .setScale(0, RoundingMode.HALF_UP).intValue();
                }
                ZoneOffset zoneOffset = ZoneOffset.ofHoursMinutesSeconds(intField(offset, OFFSET_HOURS),
                        intField(offset, OFFSET_MINUTES), offsetSeconds);
                BigDecimal second = civil.containsKey(SECOND) ? ((BDecimal) civil.get(SECOND)).decimalValue()
                        : BigDecimal.ZERO;
                int wholeSeconds = second.setScale(0, RoundingMode.FLOOR).intValue();
                int nanos = second.subtract(BigDecimal.valueOf(wholeSeconds)).multiply(NANOS_PER_SECOND)
                        .setScale(0, RoundingMode.HALF_UP).intValue();
                instant = LocalDateTime.of(intField(civil, YEAR), intField(civil, MONTH), intField(civil, DAY),
                        intField(civil, HOUR), intField(civil, MINUTE), wholeSeconds, nanos).toInstant(zoneOffset);
            } else {
                return false;
            }
        } catch (DateTimeException | ArithmeticException | ClassCastException e) {
            throw new ConversionError("Unsupported value: " + value + " for " + sqlType);
        }
        preparedStatement.setTimestamp(index, Timestamp.from(instant),
                Calendar.getInstance(TimeZone.getTimeZone(ZoneOffset.UTC)));
        return true;
    }

    private static int intField(BMap<?, ?> record, BString field) {
        return Math.toIntExact(((BMap<BString, Object>) record).getIntValue(field));
    }

    private static void checkFinite(Object value) throws DataError {
        if (value instanceof Double d && !Double.isFinite(d)) {
            throw new DataError(String.format(NOT_FINITE_ERROR, d, d));
        }
    }
}
