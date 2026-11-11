import java.sql.*;
import java.time.*;
import java.util.*;

/** Dumps how the JCC driver describes and binds every Db2 column type. */
public class Probe {
    static Connection c;

    public static void main(String[] a) throws Exception {
        Properties p = new Properties();
        p.put("user", "db2inst1"); p.put("password", "Test123#");
        p.put("retrieveMessagesFromServerOnGetMessage", "true");
        c = DriverManager.getConnection("jdbc:db2://127.0.0.1:50000/TESTDB", p);
        c.setAutoCommit(true);
        exec("DELETE FROM SCHEMA.DATA_TYPES WHERE ID >= 800"); exec("DELETE FROM SCHEMA.BATCH_T"); exec("DELETE FROM SCHEMA.EXEC_T");
        System.out.println("driver " + c.getMetaData().getDriverVersion() + " server " + c.getMetaData().getDatabaseProductVersion());

        section("RESULT SET METADATA  (column | Types code | type name | java class | precision/scale)");
        try (Statement s = c.createStatement(); ResultSet rs = s.executeQuery("SELECT * FROM SCHEMA.DATA_TYPES WHERE ID = 1")) {
            ResultSetMetaData m = rs.getMetaData();
            rs.next();
            for (int i = 1; i <= m.getColumnCount(); i++) {
                Object v = null; String err = "";
                try { v = rs.getObject(i); } catch (SQLException e) { err = " getObject!: " + e.getMessage().split("\n")[0]; }
                System.out.printf("%-14s %5d %-18s %-32s %d/%d  -> %s%s%n", m.getColumnName(i), m.getColumnType(i), m.getColumnTypeName(i),
                        m.getColumnClassName(i), m.getPrecision(i), m.getScale(i), show(v), err);
            }
        }

        section("PARAMETER METADATA of INSERT INTO SCHEMA.DATA_TYPES (all columns)");
        String cols = "ID,C_SMALLINT,C_INT,C_BIGINT,C_DECIMAL,C_NUMERIC,C_REAL,C_DOUBLE,C_DECFLOAT16,C_DECFLOAT34,C_CHAR,C_VARCHAR,C_CLOB,C_GRAPHIC,C_VARGRAPHIC,C_DBCLOB,C_BINARY,C_VARBINARY,C_BLOB,C_CHAR_BIT,C_DATE,C_TIME,C_TIMESTAMP,C_TIMESTAMP12,C_BOOLEAN,C_XML";
        String[] colArr = cols.split(",");
        String marks = String.join(",", Collections.nCopies(colArr.length, "?"));
        try (PreparedStatement ps = c.prepareStatement("INSERT INTO SCHEMA.DATA_TYPES (" + cols + ") VALUES (" + marks + ")")) {
            ParameterMetaData pm = ps.getParameterMetaData();
            for (int i = 1; i <= pm.getParameterCount(); i++) {
                System.out.printf("%-14s %5d %-18s %s%n", colArr[i - 1], pm.getParameterType(i), pm.getParameterTypeName(i), pm.getParameterClassName(i));
            }
        }

        section("NULL BINDING: setNull(i, Types.VARCHAR) into every column (what the connector does)");
        tryInsert(colArr, (ps, i) -> ps.setNull(i, Types.VARCHAR), 900);
        section("NULL BINDING: setNull(i, Types.NULL) (sql module default)");
        tryInsert(colArr, (ps, i) -> ps.setNull(i, Types.NULL), 901);
        section("NULL BINDING: setObject(i, null)");
        tryInsert(colArr, (ps, i) -> ps.setObject(i, null), 902);

        section("BINDING EXPERIMENTS (one column each)");
        bind("C_TIMESTAMP", "setObject(OffsetDateTime, TIMESTAMP_WITH_TIMEZONE)", ps -> ps.setObject(2, OffsetDateTime.of(2024, 2, 29, 10, 11, 12, 500_000_000, ZoneOffset.ofHours(5)), Types.TIMESTAMP_WITH_TIMEZONE));
        bind("C_TIMESTAMP", "setObject(OffsetDateTime) no type", ps -> ps.setObject(2, OffsetDateTime.of(2024, 2, 29, 10, 11, 12, 500_000_000, ZoneOffset.ofHours(5))));
        bind("C_TIME", "setObject(OffsetTime, TIME_WITH_TIMEZONE)", ps -> ps.setObject(2, OffsetTime.of(10, 11, 12, 0, ZoneOffset.ofHours(5)), Types.TIME_WITH_TIMEZONE));
        bind("C_TIMESTAMP", "setString(\"2024-02-29 10:11:12.5\") JDBC format", ps -> ps.setString(2, "2024-02-29 10:11:12.5"));
        bind("C_TIMESTAMP", "setString(\"2024-02-29-10.11.12.500000\") Db2 format", ps -> ps.setString(2, "2024-02-29-10.11.12.500000"));
        bind("C_TIMESTAMP", "setString(\"2024-02-29T10:11:12.5\") ISO", ps -> ps.setString(2, "2024-02-29T10:11:12.5"));
        bind("C_TIMESTAMP12", "setTimestamp nanos 123456789", ps -> ps.setTimestamp(2, Timestamp.valueOf("2024-02-29 10:11:12.123456789")));
        bind("C_TIME", "setString(\"10:11:12\")", ps -> ps.setString(2, "10:11:12"));
        bind("C_TIME", "setString(\"10.11.12\")", ps -> ps.setString(2, "10.11.12"));
        bind("C_TIME", "setString(\"10:11:12.5\") fractional", ps -> ps.setString(2, "10:11:12.5"));
        bind("C_TIME", "setTime(Time.valueOf(LocalTime 23:59:59))", ps -> ps.setTime(2, Time.valueOf(LocalTime.of(23, 59, 59))));
        bind("C_DATE", "setString(\"2024-2-9\")", ps -> ps.setString(2, "2024-2-9"));
        bind("C_DATE", "setDate(Date.valueOf(\"2024-2-9\"))", ps -> ps.setDate(2, java.sql.Date.valueOf("2024-2-9")));
        bind("C_BOOLEAN", "setBoolean(true)", ps -> ps.setBoolean(2, true));
        bind("C_BOOLEAN", "setInt(1)", ps -> ps.setInt(2, 1));
        bind("C_BOOLEAN", "setString(\"true\")", ps -> ps.setString(2, "true"));
        bind("C_SMALLINT", "setBoolean(true)", ps -> ps.setBoolean(2, true));
        bind("C_SMALLINT", "setLong(40000) overflow", ps -> ps.setLong(2, 40000));
        bind("C_INT", "setLong(3000000000) overflow", ps -> ps.setLong(2, 3_000_000_000L));
        bind("C_INT", "setBigDecimal(12.7)", ps -> ps.setBigDecimal(2, new java.math.BigDecimal("12.7")));
        bind("C_INT", "setDouble(12.7)", ps -> ps.setDouble(2, 12.7));
        bind("C_INT", "setString(\"42\")", ps -> ps.setString(2, "42"));
        bind("C_DECIMAL", "setBigDecimal(123.456) scale 3 > col scale 2", ps -> ps.setBigDecimal(2, new java.math.BigDecimal("123.456")));
        bind("C_DECIMAL", "setBigDecimal(123456789.12) precision overflow", ps -> ps.setBigDecimal(2, new java.math.BigDecimal("123456789.12")));
        bind("C_DECIMAL", "setDouble(0.1)", ps -> ps.setDouble(2, 0.1));
        bind("C_DECIMAL", "setLong(42)", ps -> ps.setLong(2, 42));
        bind("C_DECFLOAT34", "setBigDecimal(1E+400)", ps -> ps.setBigDecimal(2, new java.math.BigDecimal("1E+400")));
        bind("C_DECFLOAT34", "setDouble(NaN)", ps -> ps.setDouble(2, Double.NaN));
        bind("C_DECFLOAT34", "setDouble(Infinity)", ps -> ps.setDouble(2, Double.POSITIVE_INFINITY));
        bind("C_DECFLOAT34", "setString(\"NaN\")", ps -> ps.setString(2, "NaN"));
        bind("C_DECFLOAT16", "setBigDecimal(1234567890.123456789) > 16 digits", ps -> ps.setBigDecimal(2, new java.math.BigDecimal("1234567890.123456789")));
        bind("C_REAL", "setDouble(0.1)", ps -> ps.setDouble(2, 0.1));
        bind("C_REAL", "setFloat(0.1f)", ps -> ps.setFloat(2, 0.1f));
        bind("C_DOUBLE", "setDouble(NaN)", ps -> ps.setDouble(2, Double.NaN));
        bind("C_DOUBLE", "setDouble(Infinity)", ps -> ps.setDouble(2, Double.POSITIVE_INFINITY));
        bind("C_DOUBLE", "setBigDecimal(1E-310) denormal", ps -> ps.setBigDecimal(2, new java.math.BigDecimal("1E-310")));
        bind("C_CHAR", "setString(\"abc\") padded", ps -> ps.setString(2, "abc"));
        bind("C_CHAR", "setString(11 chars) overflow", ps -> ps.setString(2, "12345678901"));
        bind("C_VARCHAR", "setString with quote/backslash/newline/tab", ps -> ps.setString(2, "O'Reilly \\ \"q\" \n\t end"));
        bind("C_VARCHAR", "setString(\"caf\\u00e9 \\u65e5\\u672c\") 2+3 byte UTF-8", ps -> ps.setString(2, "café 日本"));
        bind("C_VARCHAR", "setString(emoji x12 = 48 bytes)", ps -> ps.setString(2, "😀".repeat(12)));
        bind("C_VARCHAR", "setString(emoji x13 = 52 bytes > 50)", ps -> ps.setString(2, "😀".repeat(13)));
        bind("C_VARCHAR", "setString(\"a\\u0000b\") NUL", ps -> ps.setString(2, "a\u0000b"));
        bind("C_VARCHAR", "setString(\"100%_\") wildcards", ps -> ps.setString(2, "100%_"));
        bind("C_VARCHAR", "setString(\"; DROP TABLE x --\")", ps -> ps.setString(2, "; DROP TABLE x --"));
        bind("C_VARCHAR", "setString(\"\") empty", ps -> ps.setString(2, ""));
        bind("C_VARCHAR", "setNString", ps -> ps.setNString(2, "nstring ü"));
        bind("C_VARCHAR", "setObject(Long 42)", ps -> ps.setObject(2, 42L));
        bind("C_VARCHAR", "setCharacterStream(reader)", ps -> ps.setCharacterStream(2, new java.io.StringReader("reader text")));
        bind("C_GRAPHIC", "setString(\"abc\") 3 of 5 codeunits", ps -> ps.setString(2, "abc"));
        bind("C_GRAPHIC", "setString(\"\\u65e5\\u672c\\u8a9e\\u30c6\\u30ad\") 5 chars", ps -> ps.setString(2, "日本語テキ"));
        bind("C_GRAPHIC", "setString(emoji x2 = 4 UTF-16 units)", ps -> ps.setString(2, "😀😀"));
        bind("C_GRAPHIC", "setString(emoji x3 = 6 UTF-16 units)", ps -> ps.setString(2, "😀😀😀"));
        bind("C_VARGRAPHIC", "setNString(\"ü\")", ps -> ps.setNString(2, "ü"));
        bind("C_VARGRAPHIC", "setString with quotes", ps -> ps.setString(2, "O'Reilly \"q\""));
        bind("C_DBCLOB", "setNClob via setNString", ps -> ps.setNString(2, "dbclob text 日本"));
        bind("C_DBCLOB", "setString", ps -> ps.setString(2, "dbclob via setString"));
        bind("C_DBCLOB", "setClob(createClob)", ps -> { Clob cl = c.createClob(); cl.setString(1, "clob obj"); ps.setClob(2, cl); });
        bind("C_DBCLOB", "setNClob(createNClob)", ps -> { NClob cl = c.createNClob(); cl.setString(1, "nclob obj"); ps.setNClob(2, cl); });
        bind("C_CLOB", "setNClob(createNClob) into CLOB", ps -> { NClob cl = c.createNClob(); cl.setString(1, "nclob into clob"); ps.setNClob(2, cl); });
        bind("C_CLOB", "setClob(createClob)", ps -> { Clob cl = c.createClob(); cl.setString(1, "clob into clob"); ps.setClob(2, cl); });
        bind("C_CLOB", "setString(1 MiB)", ps -> ps.setString(2, "x".repeat(1024 * 1024)));
        bind("C_CLOB", "setString(1 MiB + 1) overflow", ps -> ps.setString(2, "x".repeat(1024 * 1024 + 1)));
        bind("C_BINARY", "setBytes(3 bytes into BINARY(4))", ps -> ps.setBytes(2, new byte[]{1, 2, 3}));
        bind("C_BINARY", "setBytes(5 bytes into BINARY(4))", ps -> ps.setBytes(2, new byte[]{1, 2, 3, 4, 5}));
        bind("C_BINARY", "setBlob(createBlob)", ps -> { Blob b = c.createBlob(); b.setBytes(1, new byte[]{9, 9}); ps.setBlob(2, b); });
        bind("C_VARBINARY", "setBytes", ps -> ps.setBytes(2, new byte[]{0, (byte) 255, 127}));
        bind("C_VARBINARY", "setBinaryStream", ps -> ps.setBinaryStream(2, new java.io.ByteArrayInputStream(new byte[]{1, 2})));
        bind("C_VARBINARY", "setString(\"0A0B\") hex string", ps -> ps.setString(2, "0A0B"));
        bind("C_BLOB", "setBytes", ps -> ps.setBytes(2, new byte[]{1, 2, 3}));
        bind("C_BLOB", "setBlob(createBlob)", ps -> { Blob b = c.createBlob(); b.setBytes(1, new byte[]{9, 9}); ps.setBlob(2, b); });
        bind("C_BLOB", "setBinaryStream(1 MiB)", ps -> ps.setBinaryStream(2, new java.io.ByteArrayInputStream(new byte[1024 * 1024])));
        bind("C_BLOB", "setBytes(empty)", ps -> ps.setBytes(2, new byte[0]));
        bind("C_CHAR_BIT", "setBytes(4) into CHAR(4) FOR BIT DATA", ps -> ps.setBytes(2, new byte[]{1, 2, 3, 4}));
        bind("C_CHAR_BIT", "setString(\"abcd\")", ps -> ps.setString(2, "abcd"));
        bind("C_XML", "setSQLXML", ps -> { SQLXML x = c.createSQLXML(); x.setString("<a b=\"1\">t</a>"); ps.setSQLXML(2, x); });
        bind("C_XML", "setString(\"<a/>\")", ps -> ps.setString(2, "<a/>"));
        bind("C_XML", "setSQLXML text node only", ps -> { SQLXML x = c.createSQLXML(); x.setString("just text"); ps.setSQLXML(2, x); });
        bind("C_XML", "setSQLXML with XML decl + namespace", ps -> { SQLXML x = c.createSQLXML(); x.setString("<?xml version=\"1.0\" encoding=\"UTF-8\"?><p:a xmlns:p=\"urn:p\"><p:b>é</p:b></p:a>"); ps.setSQLXML(2, x); });
        bind("C_XML", "setSQLXML sequence of 2 roots", ps -> { SQLXML x = c.createSQLXML(); x.setString("<a/><b/>"); ps.setSQLXML(2, x); });
        bind("C_XML", "setSQLXML empty", ps -> { SQLXML x = c.createSQLXML(); x.setString(""); ps.setSQLXML(2, x); });

        section("UNTYPED PARAMETER MARKERS");
        tryQuery("SELECT ? FROM SYSIBM.SYSDUMMY1", ps -> ps.setString(1, "x"));
        tryQuery("SELECT ? + 1 FROM SYSIBM.SYSDUMMY1", ps -> ps.setLong(1, 41));
        tryQuery("SELECT CASE WHEN ? THEN 1 ELSE 0 END FROM SYSIBM.SYSDUMMY1", ps -> ps.setBoolean(1, true));
        tryQuery("SELECT * FROM SCHEMA.EMPLOYEE WHERE NAME LIKE ?", ps -> ps.setString(1, "A%"));
        tryQuery("SELECT * FROM SCHEMA.EMPLOYEE WHERE NAME LIKE ? ESCAPE '\\'", ps -> ps.setString(1, "100\\%"));
        tryQuery("SELECT * FROM SCHEMA.EMPLOYEE WHERE NAME IN (?, ?)", ps -> { ps.setString(1, "Ann"); ps.setString(2, "Bob"); });
        tryQuery("SELECT COUNT(*) FROM SCHEMA.EMPLOYEE WHERE ? IS NULL", ps -> ps.setNull(1, Types.VARCHAR));
        tryQuery("SELECT COUNT(*) FROM SCHEMA.EMPLOYEE WHERE SALARY > ?", ps -> ps.setBigDecimal(1, new java.math.BigDecimal("7000")));
        tryQuery("SELECT COUNT(*) FROM SCHEMA.EMPLOYEE WHERE SALARY > ?", ps -> ps.setDouble(1, 7000));
        tryQuery("SELECT COUNT(*) FROM SCHEMA.EMPLOYEE WHERE HIRED > ?", ps -> ps.setString(1, "2020-01-01"));
        tryQuery("SELECT COUNT(*) FROM SCHEMA.EMPLOYEE WHERE ACTIVE = ?", ps -> ps.setBoolean(1, true));
        tryQuery("SELECT COUNT(*) FROM SCHEMA.EMPLOYEE WHERE ACTIVE = ?", ps -> ps.setInt(1, 1));
        tryQuery("SELECT COUNT(*) FROM SCHEMA.EMPLOYEE WHERE ID = ?", ps -> ps.setString(1, "1"));
        tryQuery("SELECT COUNT(*) FROM SCHEMA.EMPLOYEE WHERE ID = ?", ps -> ps.setBigDecimal(1, new java.math.BigDecimal("1.0")));
        tryQuery("SELECT 'it''s \"quoted\" \\ -- ; /* c */' FROM SYSIBM.SYSDUMMY1", ps -> {});
        tryQuery("SELECT \"NAME\" FROM SCHEMA.\"EMPLOYEE\" WHERE \"ID\" = 1", ps -> {});
        tryQuery("SELECT NAME FROM SCHEMA.EMPLOYEE WHERE NAME = 'Ann'; ", ps -> {});
        tryQuery("SELECT NAME FROM SCHEMA.EMPLOYEE WHERE NAME = 'Ann'; SELECT 1 FROM SYSIBM.SYSDUMMY1", ps -> {});
        tryQuery("SELECT {fn CONCAT('a','b')} FROM SYSIBM.SYSDUMMY1", ps -> {});
        tryQuery("SELECT '{' || ? || '}' FROM SYSIBM.SYSDUMMY1", ps -> ps.setString(1, "brace"));
        tryQuery("SELECT 'a?b' FROM SYSIBM.SYSDUMMY1", ps -> {});
        tryQuery("SELECT 'a:b' FROM SYSIBM.SYSDUMMY1", ps -> {});
        tryQuery("SELECT NAME FROM SCHEMA.EMPLOYEE WHERE NAME = ? -- trailing comment ?", ps -> ps.setString(1, "Ann"));
        tryQuery("SELECT NAME /* ? */ FROM SCHEMA.EMPLOYEE WHERE NAME = ?", ps -> ps.setString(1, "Ann"));
        tryQuery("SELECT 'ünïcödé ✓ 😀' FROM SYSIBM.SYSDUMMY1", ps -> {});
        tryQuery("SELECT LENGTH(?), CHARACTER_LENGTH(?, CODEUNITS32) FROM SYSIBM.SYSDUMMY1", ps -> { ps.setString(1, "😀é"); ps.setString(2, "😀é"); });
        tryQuery("SELECT CAST(? AS VARCHAR(5)) FROM SYSIBM.SYSDUMMY1", ps -> ps.setString(1, "123456789"));
        tryQuery("VALUES DECFLOAT(?)", ps -> ps.setString(1, "NaN"));
        tryQuery("VALUES DECFLOAT(CAST(? AS VARCHAR(10)))", ps -> ps.setString(1, "NaN"));
        tryQuery("VALUES CAST(? AS DECFLOAT(34))", ps -> ps.setString(1, "Infinity"));
        tryQuery("VALUES CAST(? AS DECFLOAT(34))", ps -> ps.setBigDecimal(1, new java.math.BigDecimal("1E+400")));
        tryQuery("VALUES CAST(? AS DOUBLE)", ps -> ps.setDouble(1, 1e308));
        tryQuery("VALUES CAST(? AS DOUBLE)", ps -> ps.setBigDecimal(1, new java.math.BigDecimal("12345678901234567890.123")));
        tryQuery("VALUES CAST(? AS TIMESTAMP)", ps -> ps.setTimestamp(1, Timestamp.valueOf("0001-01-01 00:00:00")));
        tryQuery("VALUES CAST(? AS TIMESTAMP)", ps -> ps.setTimestamp(1, Timestamp.valueOf("9999-12-31 23:59:59.999999999")));
        tryQuery("VALUES CAST(? AS DATE)", ps -> ps.setDate(1, java.sql.Date.valueOf("0001-01-01")));
        tryQuery("VALUES CAST(? AS TIME)", ps -> ps.setTime(1, Time.valueOf("24:00:00".equals("x") ? "00:00:00" : "00:00:00")));
        tryQuery("VALUES CAST(? AS VARCHAR(10) FOR BIT DATA)", ps -> ps.setBytes(1, new byte[]{1, 2}));
        tryQuery("VALUES CAST(? AS BIGINT)", ps -> ps.setLong(1, Long.MIN_VALUE));
        tryQuery("VALUES CAST(? AS DECIMAL(31,0))", ps -> ps.setBigDecimal(1, new java.math.BigDecimal("9999999999999999999999999999999")));
        tryQuery("VALUES CAST(? AS DECIMAL(31,10))", ps -> ps.setBigDecimal(1, new java.math.BigDecimal("123456789012345678901.0123456789")));
        tryQuery("VALUES CAST(? AS VARCHAR(100))", ps -> ps.setString(1, "tab\there\nnewline\rcr\u0000nul end"));
        tryQuery("VALUES CAST(? AS VARGRAPHIC(100))", ps -> ps.setString(1, "😀 surrogate pair 日本"));
        tryQuery("VALUES CAST(? AS CLOB(1K))", ps -> ps.setString(1, "clob via cast"));
        tryQuery("VALUES XMLSERIALIZE(CAST(? AS XML) AS VARCHAR(100))", ps -> ps.setString(1, "<a>1</a>"));
        tryQuery("VALUES CAST(? AS BOOLEAN)", ps -> ps.setBoolean(1, true));
        tryQuery("VALUES CAST(? AS BOOLEAN)", ps -> ps.setString(1, "true"));
        tryQuery("VALUES JSON_OBJECT(KEY 'a' VALUE ?)", ps -> ps.setString(1, "x\"y"));
        tryQuery("VALUES CAST(? AS VARCHAR(20)) || CAST(? AS VARCHAR(20))", ps -> { ps.setString(1, "a"); ps.setString(2, "b"); });
        tryQuery("SELECT ID FROM SCHEMA.EMPLOYEE WHERE ID = ? OR ID = ?", ps -> { ps.setLong(1, 1); ps.setLong(2, 2); });

        section("STORED PROCEDURE OUT PARAM REGISTRATION");
        exec("CREATE OR REPLACE PROCEDURE SCHEMA.ALL_OUT (OUT P_SI SMALLINT, OUT P_I INT, OUT P_BI BIGINT, OUT P_DEC DECIMAL(10,2), OUT P_DF DECFLOAT(34), OUT P_R REAL, OUT P_D DOUBLE, OUT P_CH CHAR(5), OUT P_VC VARCHAR(20), OUT P_CL CLOB(1K), OUT P_G GRAPHIC(3), OUT P_VG VARGRAPHIC(10), OUT P_DBC DBCLOB(1K), OUT P_B BINARY(4), OUT P_VB VARBINARY(8), OUT P_BL BLOB(1K), OUT P_DT DATE, OUT P_TM TIME, OUT P_TS TIMESTAMP, OUT P_TS12 TIMESTAMP(12), OUT P_BOOL BOOLEAN, OUT P_XML XML) LANGUAGE SQL BEGIN "
                + "SET P_SI = 1; SET P_I = 2; SET P_BI = 3; SET P_DEC = 4.5; SET P_DF = 6.75; SET P_R = 1.25; SET P_D = 2.5; SET P_CH = 'ab'; SET P_VC = 'vc'; SET P_CL = 'clob'; SET P_G = G'日本語'; SET P_VG = G'vg'; SET P_DBC = G'dbc'; SET P_B = BX'01020304'; SET P_VB = BX'0A0B'; SET P_BL = BLOB(BX'FFEE'); SET P_DT = DATE('2024-02-29'); SET P_TM = TIME('10:11:12'); SET P_TS = TIMESTAMP('2024-02-29-10.11.12.123456'); SET P_TS12 = TIMESTAMP('2024-02-29-10.11.12.123456789012'); SET P_BOOL = TRUE; SET P_XML = XMLPARSE(DOCUMENT '<a>1</a>'); END");
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.ALL_OUT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")) {
            ParameterMetaData pm = cs.getParameterMetaData();
            for (int i = 1; i <= pm.getParameterCount(); i++) {
                System.out.printf("p%-3d %5d %-18s %s%n", i, pm.getParameterType(i), pm.getParameterTypeName(i), pm.getParameterClassName(i));
            }
            int[] types = {Types.SMALLINT, Types.INTEGER, Types.BIGINT, Types.DECIMAL, Types.DECIMAL, Types.REAL, Types.DOUBLE, Types.CHAR, Types.VARCHAR, Types.CLOB, Types.NCHAR, Types.NVARCHAR, Types.NCLOB, Types.BINARY, Types.VARBINARY, Types.BLOB, Types.DATE, Types.TIME, Types.TIMESTAMP, Types.TIMESTAMP, Types.BOOLEAN, Types.SQLXML};
            for (int i = 0; i < types.length; i++) {
                try { cs.registerOutParameter(i + 1, types[i]); } catch (SQLException e) { System.out.println("register p" + (i + 1) + " as " + types[i] + " FAILED: " + e.getMessage().split("\n")[0]); }
            }
            cs.execute();
            for (int i = 1; i <= types.length; i++) {
                try { Object v = cs.getObject(i); System.out.printf("out p%-3d getObject -> %s%n", i, show(v)); }
                catch (SQLException e) { System.out.println("out p" + i + " getObject FAILED: " + e.getMessage().split("\n")[0]); }
            }
            // registration of DECFLOAT with other codes
            for (int t : new int[]{Types.DECIMAL, Types.NUMERIC, Types.DOUBLE, Types.VARCHAR, Types.OTHER}) {
                try (CallableStatement cs2 = c.prepareCall("CALL SCHEMA.ALL_OUT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")) {
                    for (int i = 0; i < types.length; i++) cs2.registerOutParameter(i + 1, i == 4 ? t : types[i]);
                    cs2.execute();
                    System.out.println("DECFLOAT out registered as " + t + " -> " + show(cs2.getObject(5)) + " / getBigDecimal " + cs2.getBigDecimal(5));
                } catch (SQLException e) { System.out.println("DECFLOAT out registered as " + t + " FAILED: " + e.getMessage().split("\n")[0]); }
            }
            // XML out as VARCHAR / as CLOB
            for (int t : new int[]{Types.VARCHAR, Types.CLOB, Types.LONGVARCHAR}) {
                try (CallableStatement cs2 = c.prepareCall("CALL SCHEMA.ALL_OUT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")) {
                    for (int i = 0; i < types.length; i++) cs2.registerOutParameter(i + 1, i == 21 ? t : types[i]);
                    cs2.execute();
                    System.out.println("XML out registered as " + t + " -> " + show(cs2.getObject(22)) + " / getString " + cs2.getString(22));
                } catch (SQLException e) { System.out.println("XML out registered as " + t + " FAILED: " + e.getMessage().split("\n")[0]); }
            }
            // BOOLEAN out as BIT / SMALLINT ; GRAPHIC as CHAR ; DBCLOB as CLOB
            try (CallableStatement cs2 = c.prepareCall("CALL SCHEMA.ALL_OUT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")) {
                for (int i = 0; i < types.length; i++) cs2.registerOutParameter(i + 1, types[i]);
                cs2.registerOutParameter(21, Types.BIT); cs2.registerOutParameter(11, Types.CHAR); cs2.registerOutParameter(12, Types.VARCHAR); cs2.registerOutParameter(13, Types.CLOB);
                cs2.execute();
                System.out.println("BOOLEAN as BIT -> " + show(cs2.getObject(21)) + "; GRAPHIC as CHAR -> " + show(cs2.getObject(11)) + "; VARGRAPHIC as VARCHAR -> " + show(cs2.getObject(12)) + "; DBCLOB as CLOB -> " + show(cs2.getObject(13)));
            } catch (SQLException e) { System.out.println("alt registration FAILED: " + e.getMessage().split("\n")[0]); }
        }

        section("INOUT parameter with NULL in, and typed-null IN params to a procedure");
        exec("CREATE OR REPLACE PROCEDURE SCHEMA.ECHO_INOUT (INOUT P_V VARCHAR(20), INOUT P_N DECIMAL(10,2), INOUT P_TS TIMESTAMP, INOUT P_X XML) LANGUAGE SQL BEGIN SET P_V = COALESCE(P_V, 'was null') || '!'; SET P_N = COALESCE(P_N, 0) + 1; SET P_TS = COALESCE(P_TS, CURRENT TIMESTAMP); SET P_X = COALESCE(P_X, XMLPARSE(DOCUMENT '<null/>')); END");
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.ECHO_INOUT(?,?,?,?)")) {
            cs.setNull(1, Types.VARCHAR); cs.setNull(2, Types.VARCHAR); cs.setNull(3, Types.VARCHAR); cs.setNull(4, Types.VARCHAR);
            cs.registerOutParameter(1, Types.VARCHAR); cs.registerOutParameter(2, Types.DECIMAL); cs.registerOutParameter(3, Types.TIMESTAMP); cs.registerOutParameter(4, Types.SQLXML);
            cs.execute();
            System.out.println("nulls in (VARCHAR-typed) -> " + cs.getString(1) + ", " + cs.getBigDecimal(2) + ", " + cs.getTimestamp(3) + ", " + show(cs.getObject(4)));
        } catch (SQLException e) { System.out.println("INOUT nulls FAILED: " + e.getMessage().split("\n")[0]); }
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.ECHO_INOUT(?,?,?,?)")) {
            cs.setString(1, "O'Reilly \"x\""); cs.setBigDecimal(2, new java.math.BigDecimal("1.5")); cs.setTimestamp(3, Timestamp.valueOf("2024-02-29 10:11:12.123456")); SQLXML x = c.createSQLXML(); x.setString("<a/>"); cs.setSQLXML(4, x);
            cs.registerOutParameter(1, Types.VARCHAR); cs.registerOutParameter(2, Types.DECIMAL); cs.registerOutParameter(3, Types.TIMESTAMP); cs.registerOutParameter(4, Types.SQLXML);
            cs.execute();
            System.out.println("values in -> " + cs.getString(1) + ", " + cs.getBigDecimal(2) + ", " + cs.getTimestamp(3) + ", " + show(cs.getObject(4)));
        } catch (SQLException e) { System.out.println("INOUT values FAILED: " + e.getMessage().split("\n")[0]); }

        section("PROCEDURE: result set + update count + out param ordering; getMoreResults behaviour");
        exec("CREATE OR REPLACE PROCEDURE SCHEMA.MIXED (IN P_N VARCHAR(20), OUT P_CNT INT) DYNAMIC RESULT SETS 2 LANGUAGE SQL BEGIN DECLARE C1 CURSOR WITH RETURN FOR SELECT ID, NAME FROM SCHEMA.EMPLOYEE WHERE DEPT='ENG' ORDER BY ID; DECLARE C2 CURSOR WITH RETURN FOR SELECT COUNT(*) AS N FROM SCHEMA.EMPLOYEE; INSERT INTO SCHEMA.EXEC_T (NAME) VALUES (P_N); SELECT COUNT(*) INTO P_CNT FROM SCHEMA.EXEC_T; OPEN C1; OPEN C2; END");
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.MIXED(?, ?)")) {
            cs.setString(1, "x"); cs.registerOutParameter(2, Types.INTEGER);
            boolean isRs = cs.execute();
            System.out.println("execute() -> " + isRs + " updateCount=" + cs.getUpdateCount() + " out(before reading rs)=" + cs.getInt(2));
            int n = 0;
            do {
                try (ResultSet rs = cs.getResultSet()) { int rows = 0; while (rs != null && rs.next()) rows++; System.out.println(" result " + (++n) + " rows=" + rows); }
                isRs = cs.getMoreResults();
                System.out.println(" getMoreResults -> " + isRs + " updateCount=" + cs.getUpdateCount());
            } while (isRs || cs.getUpdateCount() != -1);
            System.out.println("out after=" + cs.getInt(2));
        }

        section("FUNCTION call via CALL / VALUES; procedure with no params; schema-qualified with quotes");
        exec("CREATE OR REPLACE FUNCTION SCHEMA.ADD1 (X INT) RETURNS INT LANGUAGE SQL RETURN X + 1");
        tryQuery("VALUES SCHEMA.ADD1(?)", ps -> ps.setInt(1, 41));
        tryQuery("SELECT SCHEMA.ADD1(41) FROM SYSIBM.SYSDUMMY1", ps -> {});
        try (CallableStatement cs = c.prepareCall("{? = CALL SCHEMA.ADD1(?)}")) { cs.registerOutParameter(1, Types.INTEGER); cs.setInt(2, 41); cs.execute(); System.out.println("{? = CALL fn} -> " + cs.getInt(1)); } catch (SQLException e) { System.out.println("{? = CALL fn} FAILED: " + e.getMessage().split("\n")[0]); }
        try (CallableStatement cs = c.prepareCall("{CALL SCHEMA.ALL_OUT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}")) { System.out.println("{CALL ...} escape prepared ok"); } catch (SQLException e) { System.out.println("{CALL} FAILED: " + e.getMessage().split("\n")[0]); }
        try (CallableStatement cs = c.prepareCall("CALL \"PROBE\".\"ALL_OUT\"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")) { System.out.println("quoted CALL prepared ok"); } catch (SQLException e) { System.out.println("quoted CALL FAILED: " + e.getMessage().split("\n")[0]); }

        section("BATCH: mixed types, nulls, errors, generated keys");
        try (PreparedStatement ps = c.prepareStatement("INSERT INTO SCHEMA.BATCH_T (ID, NAME) VALUES (?, ?)")) {
            ps.setInt(1, 1); ps.setString(2, "a"); ps.addBatch();
            ps.setInt(1, 2); ps.setNull(2, Types.VARCHAR); ps.addBatch();
            ps.setInt(1, 3); ps.setString(2, "ünï 😀"); ps.addBatch();
            ps.setInt(1, 1); ps.setString(2, "dup"); ps.addBatch();
            ps.setInt(1, 4); ps.setString(2, "after dup"); ps.addBatch();
            ps.setInt(1, 5); ps.setString(2, "x".repeat(21)); ps.addBatch();
            try { int[] r = ps.executeBatch(); System.out.println("executeBatch -> " + Arrays.toString(r)); }
            catch (BatchUpdateException e) { System.out.println("BatchUpdateException counts=" + Arrays.toString(e.getUpdateCounts()) + " msg=" + e.getMessage().split("\n")[0]); SQLException n = e.getNextException(); while (n != null) { System.out.println("  next: " + n.getSQLState() + " " + n.getErrorCode() + " " + n.getMessage().split("\n")[0]); n = n.getNextException(); } }
            try (ResultSet rs = c.createStatement().executeQuery("SELECT ID, NAME FROM SCHEMA.BATCH_T ORDER BY ID")) { while (rs.next()) System.out.println("  row " + rs.getInt(1) + " " + rs.getString(2)); }
        }
        try (PreparedStatement ps = c.prepareStatement("INSERT INTO SCHEMA.EXEC_T (NAME, AMOUNT) VALUES (?, ?)", Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, "k1"); ps.setBigDecimal(2, new java.math.BigDecimal("1.5")); ps.addBatch();
            ps.setString(1, "k2"); ps.setNull(2, Types.VARCHAR); ps.addBatch();
            int[] r = ps.executeBatch(); System.out.println("batch w/ RETURN_GENERATED_KEYS -> " + Arrays.toString(r));
            try (ResultSet rs = ps.getGeneratedKeys()) { while (rs.next()) System.out.println("  key " + rs.getObject(1) + " (" + rs.getMetaData().getColumnTypeName(1) + ")"); }
            catch (SQLException e) { System.out.println("  getGeneratedKeys FAILED: " + e.getMessage().split("\n")[0]); }
        } catch (SQLException e) { System.out.println("batch gen keys FAILED: " + e.getMessage().split("\n")[0]); }
        try (PreparedStatement ps = c.prepareStatement("INSERT INTO SCHEMA.EXEC_T (NAME) VALUES (?)", new String[]{"ID"})) {
            ps.setString(1, "named"); ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) { while (rs.next()) System.out.println("  named-col key " + rs.getObject(1) + " (" + rs.getMetaData().getColumnTypeName(1) + ")"); }
        } catch (SQLException e) { System.out.println("gen keys by column name FAILED: " + e.getMessage().split("\n")[0]); }
        try (PreparedStatement ps = c.prepareStatement("UPDATE SCHEMA.EXEC_T SET AMOUNT = AMOUNT + 1 WHERE NAME = ?", Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, "k1"); int n = ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) { int k = 0; while (rs.next()) k++; System.out.println("UPDATE with RETURN_GENERATED_KEYS -> " + n + " rows, " + k + " keys"); }
        } catch (SQLException e) { System.out.println("UPDATE gen keys FAILED: " + e.getMessage().split("\n")[0]); }
        try (PreparedStatement ps = c.prepareStatement("UPDATE SCHEMA.BATCH_T SET NAME = ? WHERE ID = ?")) {
            ps.setString(1, "u1"); ps.setInt(2, 1); ps.addBatch();
            ps.setString(1, "u9"); ps.setInt(2, 999); ps.addBatch();
            System.out.println("UPDATE batch (1 hit, 1 miss) -> " + Arrays.toString(ps.executeBatch()));
        }
        try (PreparedStatement ps = c.prepareStatement("INSERT INTO SCHEMA.DATA_TYPES (ID, C_DECIMAL, C_TIMESTAMP, C_XML, C_BLOB, C_BOOLEAN) VALUES (?,?,?,?,?,?)")) {
            ps.setInt(1, 800); ps.setBigDecimal(2, new java.math.BigDecimal("1.5")); ps.setTimestamp(3, Timestamp.valueOf("2024-02-29 10:11:12.5")); SQLXML x = c.createSQLXML(); x.setString("<a/>"); ps.setSQLXML(4, x); ps.setBytes(5, new byte[]{1}); ps.setBoolean(6, true); ps.addBatch();
            ps.setInt(1, 801); ps.setNull(2, Types.VARCHAR); ps.setNull(3, Types.VARCHAR); ps.setNull(4, Types.VARCHAR); ps.setNull(5, Types.VARCHAR); ps.setNull(6, Types.VARCHAR); ps.addBatch();
            ps.setInt(1, 802); ps.setLong(2, 7); ps.setString(3, "2024-02-29 10:11:12.5"); SQLXML x2 = c.createSQLXML(); x2.setString("<b/>"); ps.setSQLXML(4, x2); ps.setBytes(5, new byte[0]); ps.setBoolean(6, false); ps.addBatch();
            System.out.println("batch into typed columns (values/nulls/mixed) -> " + Arrays.toString(ps.executeBatch()));
        } catch (SQLException e) { System.out.println("typed batch FAILED: " + e.getMessage().split("\n")[0]); SQLException n = e.getNextException(); if (n != null) System.out.println("  next: " + n.getMessage().split("\n")[0]); }
        try (PreparedStatement ps = c.prepareStatement("INSERT INTO SCHEMA.DATA_TYPES (ID, C_INT) VALUES (?,?)")) {
            ps.setInt(1, 810); ps.setInt(2, 1); ps.addBatch();
            ps.setInt(1, 811); ps.setString(2, "2"); ps.addBatch();  // type changes between rows
            ps.setInt(1, 812); ps.setBigDecimal(2, new java.math.BigDecimal("3")); ps.addBatch();
            System.out.println("batch with changing param java types -> " + Arrays.toString(ps.executeBatch()));
        } catch (SQLException e) { System.out.println("changing-type batch FAILED: " + e.getMessage().split("\n")[0]); }

        section("STATEMENT CACHE / connection properties relevant to caching");
        for (String k : new String[]{"maxStatements", "enableSysplexWLB", "currentSchema", "fullyMaterializeLobData", "progressiveStreaming", "deferPrepares", "sendDataAsIs", "queryDataSize", "fetchSize", "resultSetHoldability", "currentLockTimeout", "allowNextOnExhaustedResultSet", "currentPackagePath"}) {
            System.out.println(k + " supported: " + Arrays.stream(((com.ibm.db2.jcc.DB2Connection) c).getClass().getMethods()).anyMatch(m -> m.getName().equalsIgnoreCase("get" + k) || m.getName().equalsIgnoreCase("set" + k)));
        }
        com.ibm.db2.jcc.DB2Connection dc = (com.ibm.db2.jcc.DB2Connection) c;
        System.out.println("isDB2Alive " + dc.isDB2Alive() + ", holdability " + c.getHoldability() + ", isolation " + c.getTransactionIsolation() + ", schema " + c.getSchema());
        c.close();
    }

    interface Binder { void bind(PreparedStatement ps) throws SQLException; }
    interface IdxBinder { void bind(PreparedStatement ps, int i) throws SQLException; }

    static int seq = 1000;

    static void bind(String col, String label, Binder b) {
        int id = seq++;
        String sql = "INSERT INTO SCHEMA.DATA_TYPES (ID, " + col + ") VALUES (?, ?)";
        try (PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setInt(1, id);
            b.bind(ps);
            ps.executeUpdate();
            try (PreparedStatement q = c.prepareStatement("SELECT " + col + " FROM SCHEMA.DATA_TYPES WHERE ID = ?")) {
                q.setInt(1, id);
                try (ResultSet rs = q.executeQuery()) { rs.next(); Object v = rs.getObject(1); System.out.printf("OK    %-13s %-52s -> %s%n", col, label, show(v)); }
            }
        } catch (SQLException e) {
            System.out.printf("FAIL  %-13s %-52s -> %s %d %s%n", col, label, e.getSQLState(), e.getErrorCode(), e.getMessage().split("\n")[0]);
        } catch (RuntimeException e) {
            System.out.printf("CRASH %-13s %-52s -> %s: %s%n", col, label, e.getClass().getName(), String.valueOf(e.getMessage()).split("\n")[0]);
        }
    }

    static void tryInsert(String[] cols, IdxBinder b, int id) {
        String marks = String.join(",", Collections.nCopies(cols.length - 1, "?"));
        String sql = "INSERT INTO SCHEMA.DATA_TYPES (" + String.join(",", cols) + ") VALUES (?," + marks + ")";
        try (PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setInt(1, id);
            for (int i = 2; i <= cols.length; i++) b.bind(ps, i);
            ps.executeUpdate();
            System.out.println("OK  all " + (cols.length - 1) + " columns accepted the null");
        } catch (SQLException e) {
            System.out.println("FAIL " + e.getSQLState() + " " + e.getErrorCode() + " " + e.getMessage().split("\n")[0]);
            // find which columns fail individually
            for (int i = 2; i <= cols.length; i++) {
                try (PreparedStatement ps = c.prepareStatement("INSERT INTO SCHEMA.DATA_TYPES (ID, " + cols[i - 1] + ") VALUES (?, ?)")) {
                    ps.setInt(1, id * 100 + i); b.bind(ps, 2); ps.executeUpdate();
                } catch (SQLException e2) { System.out.println("   " + cols[i - 1] + ": " + e2.getSQLState() + " " + e2.getMessage().split("\n")[0]); }
            }
        }
    }

    static void tryQuery(String sql, Binder b) {
        try (PreparedStatement ps = c.prepareStatement(sql)) {
            b.bind(ps);
            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData m = rs.getMetaData();
                StringBuilder sb = new StringBuilder();
                int rows = 0;
                while (rs.next() && rows < 3) { rows++; sb.append("["); for (int i = 1; i <= m.getColumnCount(); i++) sb.append(show(rs.getObject(i))).append(i < m.getColumnCount() ? ", " : ""); sb.append("] "); }
                System.out.printf("OK    %-75s -> col1 %s(%d) %s%n", sql.length() > 75 ? sql.substring(0, 72) + "..." : sql, m.getColumnTypeName(1), m.getColumnType(1), sb);
            }
        } catch (SQLException e) {
            System.out.printf("FAIL  %-75s -> %s %d %s%n", sql.length() > 75 ? sql.substring(0, 72) + "..." : sql, e.getSQLState(), e.getErrorCode(), e.getMessage().split("\n")[0]);
        }
    }

    static void exec(String sql) throws SQLException { try (Statement s = c.createStatement()) { s.execute(sql); } }

    static void section(String t) { System.out.println("\n##### " + t); }

    static String show(Object v) throws SQLException {
        if (v == null) return "NULL";
        if (v instanceof byte[]) { StringBuilder sb = new StringBuilder("0x"); for (byte x : (byte[]) v) sb.append(String.format("%02X", x)); return sb + "(" + ((byte[]) v).length + "B)"; }
        if (v instanceof Blob) { Blob b = (Blob) v; return "Blob:" + show(b.getBytes(1, (int) Math.min(b.length(), 16))) + " len=" + b.length(); }
        if (v instanceof Clob) { Clob cl = (Clob) v; return (v instanceof NClob ? "NClob:" : "Clob:") + "'" + cl.getSubString(1, (int) Math.min(cl.length(), 30)) + "' len=" + cl.length(); }
        if (v instanceof SQLXML) return "SQLXML:'" + ((SQLXML) v).getString() + "'";
        String s = v.toString().replace("\n", "\\n").replace("\t", "\\t").replace("\u0000", "\\0");
        if (s.length() > 60) s = s.substring(0, 57) + "...";
        return v.getClass().getSimpleName() + ":'" + s + "'";
    }
}
