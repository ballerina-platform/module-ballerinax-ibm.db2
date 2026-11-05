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

import io.ballerina.lib.ibm.db2.Constants;
import io.ballerina.lib.ibm.db2.utils.ModuleUtils;
import io.ballerina.runtime.api.creators.TypeCreator;
import io.ballerina.runtime.api.creators.ValueCreator;
import io.ballerina.runtime.api.types.PredefinedTypes;
import io.ballerina.runtime.api.types.Type;
import io.ballerina.runtime.api.types.TypeTags;
import io.ballerina.runtime.api.utils.StringUtils;
import io.ballerina.runtime.api.utils.TypeUtils;
import io.ballerina.runtime.api.utils.XmlUtils;
import io.ballerina.runtime.api.values.BArray;
import io.ballerina.runtime.api.values.BObject;
import io.ballerina.stdlib.sql.exception.DataError;
import io.ballerina.stdlib.sql.parameterprocessor.DefaultResultParameterProcessor;
import io.ballerina.stdlib.sql.utils.PrimitiveTypeColumnDefinition;
import io.ballerina.stdlib.sql.utils.Utils;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.JDBCType;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLXML;
import java.sql.Timestamp;
import java.sql.Types;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.WeakHashMap;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Maps Db2 result values to Ballerina values.
 * <p>
 * The JCC driver reports `DECFLOAT` columns as {@link Types#OTHER}, which the SQL module would otherwise return as a
 * `string` for `anydata` fields and reject for `int` fields. `DECFLOAT` can also hold `Infinity`, `-Infinity`,
 * `NaN` and `sNaN`, which have no Ballerina `decimal` representation. `XML` columns are parsed from their
 * serialized string form.
 *
 * @since 0.1.0
 */
public class Db2ResultParameterProcessor extends DefaultResultParameterProcessor {

    private static final Db2ResultParameterProcessor INSTANCE = new Db2ResultParameterProcessor();
    private static final String DECFLOAT = "DECFLOAT";
    private static final String CUSTOM_RESULT_ITERATOR = "CustomResultIterator";
    private volatile BObject resultIterator;
    // Statements are released when the call result is closed, so the entries disappear with them.
    private final Map<CallableStatement, Map<Integer, String>> xmlOutValues =
            Collections.synchronizedMap(new WeakHashMap<>());

    private Db2ResultParameterProcessor() {
    }

    public static Db2ResultParameterProcessor getInstance() {
        return INSTANCE;
    }

    // Without this, the rows of `query` streams and procedure result sets are read with the default processor.
    @Override
    public BObject getBalStreamResultIterator() {
        BObject iterator = resultIterator;
        if (iterator == null) {
            iterator = ValueCreator.createObjectValue(ModuleUtils.getModule(), CUSTOM_RESULT_ITERATOR);
            resultIterator = iterator;
        }
        return iterator;
    }

    @Override
    public Object processCharResult(ResultSet resultSet, int columnIndex, int sqlType, Type ballerinaType)
            throws DataError, SQLException {
        int typeTag = TypeUtils.getReferredType(ballerinaType).getTag();
        if ((typeTag == TypeTags.ANYDATA_TAG || typeTag == TypeTags.ANY_TAG) && isDecFloat(resultSet, columnIndex,
                sqlType)) {
            // Infinity and NaN cannot be represented as a decimal, so these are returned as strings.
            String value = resultSet.getString(columnIndex);
            if (value == null) {
                return null;
            }
            if (isSpecialDecFloat(value)) {
                return StringUtils.fromString(value);
            }
            return ValueCreator.createDecimalValue(new BigDecimal(value));
        }
        return super.processCharResult(resultSet, columnIndex, sqlType, ballerinaType);
    }

    @Override
    public Object processDecimalResult(ResultSet resultSet, int columnIndex, int sqlType, Type ballerinaType)
            throws DataError, SQLException {
        if (isDecFloat(resultSet, columnIndex, sqlType)) {
            String value = resultSet.getString(columnIndex);
            if (value == null) {
                return null;
            }
            if (isSpecialDecFloat(value)) {
                throw new DataError(String.format("The DECFLOAT value '%s' in column '%s' cannot be converted to " +
                        "a Ballerina decimal. Map the column to a 'float' or 'string' field instead.", value,
                        resultSet.getMetaData().getColumnLabel(columnIndex)));
            }
            return ValueCreator.createDecimalValue(new BigDecimal(value));
        }
        return super.processDecimalResult(resultSet, columnIndex, sqlType, ballerinaType);
    }

    @Override
    public Object processCustomTypeFromResultSet(ResultSet resultSet, int columnIndex,
                                                 PrimitiveTypeColumnDefinition columnDefinition)
            throws DataError, SQLException {
        int sqlType = columnDefinition.getSqlType();
        Type ballerinaType = columnDefinition.getBallerinaType();
        if (sqlType == Types.OTHER && DECFLOAT.equalsIgnoreCase(columnDefinition.getSqlTypeName())
                && TypeUtils.getReferredType(ballerinaType).getTag() == TypeTags.INT_TAG) {
            long value = resultSet.getLong(columnIndex);
            return resultSet.wasNull() ? null : value;
        }
        return super.processCustomTypeFromResultSet(resultSet, columnIndex, columnDefinition);
    }

    // `getBoolean` returns false for a NULL OUT parameter, so the null has to be detected separately.
    @Override
    public Object processBit(CallableStatement statement, int paramIndex) throws SQLException {
        return processBoolean(statement, paramIndex);
    }

    @Override
    public Object processBoolean(CallableStatement statement, int paramIndex) throws SQLException {
        boolean value = statement.getBoolean(paramIndex);
        return statement.wasNull() ? null : value;
    }

    // A Db2 TIMESTAMP has no time zone. The statement processor stores instants (`time:Utc` and `time:Civil` with
    // an offset) as the UTC wall clock time, so the wall clock time is read back as UTC too, keeping nanoseconds.
    @Override
    public Object convertTimeStamp(java.util.Date timestamp, int sqlType, Type type) throws DataError {
        int tag = type.getTag();
        if (timestamp instanceof Timestamp ts && (tag == TypeTags.TUPLE_TAG || tag == TypeTags.INTERSECTION_TAG
                || tag == TypeTags.INT_TAG)) {
            Utils.validatedInvalidFieldAssignment(sqlType, type, "SQL Date/Time");
            Instant instant = ts.toLocalDateTime().toInstant(ZoneOffset.UTC);
            if (tag == TypeTags.INT_TAG) {
                return instant.toEpochMilli();
            }
            BArray utc = ValueCreator.createTupleValue(TypeCreator.createTupleType(
                    List.of(PredefinedTypes.TYPE_INT, PredefinedTypes.TYPE_DECIMAL)));
            utc.add(0, instant.getEpochSecond());
            utc.add(1, ValueCreator.createDecimalValue(BigDecimal.valueOf(instant.getNano(), 9)));
            utc.freezeDirect();
            return utc;
        }
        return super.convertTimeStamp(timestamp, sqlType, type);
    }

    // The driver's SQLXML of an OUT parameter can be read only once, so the document is kept for later reads.
    @Override
    public Object processXML(CallableStatement statement, int paramIndex) throws SQLException {
        Map<Integer, String> documents = xmlOutValues.computeIfAbsent(statement, s -> new ConcurrentHashMap<>());
        String document = documents.get(paramIndex);
        if (document == null) {
            SQLXML value = statement.getSQLXML(paramIndex);
            if (value == null) {
                return null;
            }
            document = value.getString();
            documents.put(paramIndex, document);
        }
        return new XmlOutValue(document);
    }

    // The driver returns a hexadecimal string from `getString` on a binary OUT parameter, so the bytes are read
    // directly instead of through the character path of the SQL module.
    @Override
    public Object processBinary(CallableStatement statement, int paramIndex) throws SQLException {
        return statement.getBytes(paramIndex);
    }

    @Override
    public Object processVarBinary(CallableStatement statement, int paramIndex) throws SQLException {
        return statement.getBytes(paramIndex);
    }

    @Override
    public Object processLongVarBinary(CallableStatement statement, int paramIndex) throws SQLException {
        return statement.getBytes(paramIndex);
    }

    @Override
    public Object convertBinary(Object value, int sqlType, Type ballerinaType) throws DataError {
        if (value instanceof byte[] bytes) {
            return convertByteArray(bytes, sqlType, ballerinaType, JDBCType.valueOf(sqlType).getName());
        }
        return super.convertBinary(value, sqlType, ballerinaType);
    }

    @Override
    public Object convertXml(SQLXML value, int sqlType, Type type) throws DataError, SQLException {
        boolean asString = TypeUtils.getReferredType(type).getTag() == TypeTags.STRING_TAG;
        if (!asString) {
            Utils.validatedInvalidFieldAssignment(sqlType, type, "SQL XML");
        }
        if (value == null) {
            return null;
        }
        // The value is not freed: the driver returns the same object for every read of an OUT parameter.
        String document = value.getString();
        return asString ? StringUtils.fromString(document) : XmlUtils.parse(document);
    }

    private static boolean isDecFloat(ResultSet resultSet, int columnIndex, int sqlType) throws SQLException {
        if (sqlType == Constants.Db2Types.DECFLOAT) {
            return true;
        }
        return sqlType == Types.OTHER && DECFLOAT.equalsIgnoreCase(resultSet.getMetaData()
                .getColumnTypeName(columnIndex));
    }

    private static boolean isSpecialDecFloat(String value) {
        char last = value.charAt(value.length() - 1);
        return last == 'y' || last == 'Y' || last == 'N' || last == 'n';
    }
}
