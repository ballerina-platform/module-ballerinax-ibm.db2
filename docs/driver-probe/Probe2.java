import java.sql.*;
import java.util.*;

/** Follow-ups: BOOLEAN OUT getters, INOUT nulls, TIMESTAMP(12) OUT, arrays, procedure result-set metadata. */
public class Probe2 {
    static Connection c;

    public static void main(String[] a) throws Exception {
        Properties p = new Properties();
        p.put("user", "db2inst1"); p.put("password", "Test123#"); p.put("retrieveMessagesFromServerOnGetMessage", "true");
        c = DriverManager.getConnection("jdbc:db2://127.0.0.1:50000/TESTDB", p);

        System.out.println("##### BOOLEAN OUT getters");
        exec("CREATE OR REPLACE PROCEDURE SCHEMA.BOOL_OUT (IN P_IN BOOLEAN, OUT P_T BOOLEAN, OUT P_F BOOLEAN, OUT P_N BOOLEAN) LANGUAGE SQL BEGIN SET P_T = P_IN; SET P_F = NOT P_IN; SET P_N = NULL; END");
        for (int reg : new int[]{Types.BOOLEAN, Types.BIT, Types.SMALLINT, Types.INTEGER, Types.VARCHAR, Types.CHAR}) {
            try (CallableStatement cs = c.prepareCall("CALL SCHEMA.BOOL_OUT(?,?,?,?)")) {
                cs.setBoolean(1, true);
                for (int i = 2; i <= 4; i++) cs.registerOutParameter(i, reg);
                cs.execute();
                StringBuilder sb = new StringBuilder("registered as " + reg + ": ");
                for (int i = 2; i <= 4; i++) {
                    sb.append(" p").append(i).append("[");
                    try { sb.append("getBoolean=").append(cs.getBoolean(i)).append(cs.wasNull() ? "(null)" : ""); } catch (SQLException e) { sb.append("getBoolean!"); }
                    try { sb.append(" getInt=").append(cs.getInt(i)); } catch (SQLException e) { sb.append(" getInt!"); }
                    try { sb.append(" getString=").append(cs.getString(i)); } catch (SQLException e) { sb.append(" getString!"); }
                    try { sb.append(" getObject=").append(cs.getObject(i)); } catch (SQLException e) { sb.append(" getObject!(" + e.getErrorCode() + ")"); }
                    sb.append("]");
                }
                System.out.println(sb);
            } catch (SQLException e) { System.out.println("registered as " + reg + " FAILED: " + e.getMessage().split("\n")[0]); }
        }
        // IN boolean as int / string
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.BOOL_OUT(?,?,?,?)")) { cs.setInt(1, 0); for (int i = 2; i <= 4; i++) cs.registerOutParameter(i, Types.BOOLEAN); cs.execute(); System.out.println("IN setInt(0) -> p2 getBoolean=" + cs.getBoolean(2)); } catch (SQLException e) { System.out.println("IN setInt FAILED: " + e.getMessage().split("\n")[0]); }
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.BOOL_OUT(?,?,?,?)")) { cs.setString(1, "false"); for (int i = 2; i <= 4; i++) cs.registerOutParameter(i, Types.BOOLEAN); cs.execute(); System.out.println("IN setString(false) -> p2 getBoolean=" + cs.getBoolean(2)); } catch (SQLException e) { System.out.println("IN setString FAILED: " + e.getMessage().split("\n")[0]); }
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.BOOL_OUT(?,?,?,?)")) { cs.setNull(1, Types.VARCHAR); for (int i = 2; i <= 4; i++) cs.registerOutParameter(i, Types.BOOLEAN); cs.execute(); System.out.println("IN setNull(VARCHAR) -> p2 getBoolean=" + cs.getBoolean(2) + " wasNull=" + cs.wasNull()); } catch (SQLException e) { System.out.println("IN setNull FAILED: " + e.getMessage().split("\n")[0]); }

        System.out.println("\n##### INOUT nulls: set type vs register type");
        exec("CREATE OR REPLACE PROCEDURE SCHEMA.ECHO_INOUT (INOUT P_V VARCHAR(20), INOUT P_N DECIMAL(10,2), INOUT P_TS TIMESTAMP, INOUT P_X XML) LANGUAGE SQL BEGIN SET P_V = COALESCE(P_V, 'was null') || '!'; SET P_N = COALESCE(P_N, 0) + 1; SET P_TS = COALESCE(P_TS, TIMESTAMP('2000-01-01-00.00.00')); SET P_X = COALESCE(P_X, XMLPARSE(DOCUMENT '<null/>')); END");
        inout("setNull(VARCHAR) + register VARCHAR for all", cs -> { for (int i = 1; i <= 4; i++) { cs.setNull(i, Types.VARCHAR); cs.registerOutParameter(i, Types.VARCHAR); } });
        inout("setNull(matching) + register matching", cs -> { cs.setNull(1, Types.VARCHAR); cs.setNull(2, Types.DECIMAL); cs.setNull(3, Types.TIMESTAMP); cs.setNull(4, Types.SQLXML); cs.registerOutParameter(1, Types.VARCHAR); cs.registerOutParameter(2, Types.DECIMAL); cs.registerOutParameter(3, Types.TIMESTAMP); cs.registerOutParameter(4, Types.SQLXML); });
        inout("setObject(null) + register matching", cs -> { for (int i = 1; i <= 4; i++) cs.setObject(i, null); cs.registerOutParameter(1, Types.VARCHAR); cs.registerOutParameter(2, Types.DECIMAL); cs.registerOutParameter(3, Types.TIMESTAMP); cs.registerOutParameter(4, Types.SQLXML); });
        inout("setNull(VARCHAR) + register matching (mismatch)", cs -> { for (int i = 1; i <= 4; i++) cs.setNull(i, Types.VARCHAR); cs.registerOutParameter(1, Types.VARCHAR); cs.registerOutParameter(2, Types.DECIMAL); cs.registerOutParameter(3, Types.TIMESTAMP); cs.registerOutParameter(4, Types.SQLXML); });
        inout("setBigDecimal(1.5) + register NUMERIC (DECIMAL col)", cs -> { cs.setString(1, "a"); cs.setBigDecimal(2, new java.math.BigDecimal("1.5")); cs.setTimestamp(3, Timestamp.valueOf("2024-02-29 10:11:12")); cs.setString(4, "<a/>"); cs.registerOutParameter(1, Types.VARCHAR); cs.registerOutParameter(2, Types.NUMERIC); cs.registerOutParameter(3, Types.TIMESTAMP); cs.registerOutParameter(4, Types.VARCHAR); });
        inout("setLong(2) + register BIGINT (DECIMAL col) ; setString for TS; SQLXML obj for XML + register SQLXML", cs -> { cs.setString(1, "a"); cs.setLong(2, 2); cs.setString(3, "2024-02-29 10:11:12.5"); SQLXML x = c.createSQLXML(); x.setString("<b/>"); cs.setSQLXML(4, x); cs.registerOutParameter(1, Types.VARCHAR); cs.registerOutParameter(2, Types.BIGINT); cs.registerOutParameter(3, Types.TIMESTAMP); cs.registerOutParameter(4, Types.SQLXML); });
        inout("setString('2024-02-29 10:11:12.5') for TS + register VARCHAR", cs -> { cs.setString(1, "a"); cs.setLong(2, 2); cs.setString(3, "2024-02-29 10:11:12.5"); cs.setString(4, "<b/>"); cs.registerOutParameter(1, Types.VARCHAR); cs.registerOutParameter(2, Types.BIGINT); cs.registerOutParameter(3, Types.VARCHAR); cs.registerOutParameter(4, Types.VARCHAR); });

        System.out.println("\n##### TIMESTAMP(12) OUT precision; DECFLOAT special OUT; GRAPHIC OUT registered as NCHAR; BINARY OUT via getBytes/getString");
        exec("CREATE OR REPLACE PROCEDURE SCHEMA.PREC_OUT (OUT P_TS12 TIMESTAMP(12), OUT P_TS0 TIMESTAMP(0), OUT P_DF DECFLOAT(34), OUT P_DFI DECFLOAT(34), OUT P_B BINARY(4), OUT P_VB VARBINARY(8), OUT P_CB CHAR(4) FOR BIT DATA, OUT P_G GRAPHIC(3)) LANGUAGE SQL BEGIN SET P_TS12 = TIMESTAMP '2024-02-29-10.11.12.123456789012'; SET P_TS0 = TIMESTAMP '2024-02-29-10.11.12'; SET P_DF = DECFLOAT('NaN'); SET P_DFI = DECFLOAT('-Infinity'); SET P_B = BX'01020304'; SET P_VB = BX'0A0B'; SET P_CB = BX'DEADBEEF'; SET P_G = G'日本語'; END");
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.PREC_OUT(?,?,?,?,?,?,?,?)")) {
            cs.registerOutParameter(1, Types.TIMESTAMP); cs.registerOutParameter(2, Types.TIMESTAMP); cs.registerOutParameter(3, Types.DECIMAL); cs.registerOutParameter(4, Types.VARCHAR); cs.registerOutParameter(5, Types.BINARY); cs.registerOutParameter(6, Types.VARBINARY); cs.registerOutParameter(7, Types.BINARY); cs.registerOutParameter(8, Types.NCHAR);
            cs.execute();
            System.out.println("TS12 getTimestamp=" + cs.getTimestamp(1) + " nanos=" + cs.getTimestamp(1).getNanos() + " getString=" + cs.getString(1));
            System.out.println("TS0 getTimestamp=" + cs.getTimestamp(2) + " getString=" + cs.getString(2));
            try { System.out.println("DECFLOAT NaN as DECIMAL getBigDecimal=" + cs.getBigDecimal(3)); } catch (SQLException e) { System.out.println("DECFLOAT NaN as DECIMAL getBigDecimal FAILED: " + e.getMessage().split("\n")[0]); }
            try { System.out.println("DECFLOAT NaN as DECIMAL getString=" + cs.getString(3)); } catch (SQLException e) { System.out.println("DECFLOAT NaN as DECIMAL getString FAILED: " + e.getMessage().split("\n")[0]); }
            try { System.out.println("DECFLOAT NaN as DECIMAL getDouble=" + cs.getDouble(3)); } catch (SQLException e) { System.out.println("DECFLOAT NaN as DECIMAL getDouble FAILED: " + e.getMessage().split("\n")[0]); }
            try { System.out.println("DECFLOAT -Inf as VARCHAR getString=" + cs.getString(4) + " getDouble=" + cs.getDouble(4)); } catch (SQLException e) { System.out.println("DECFLOAT -Inf as VARCHAR FAILED: " + e.getMessage().split("\n")[0]); }
            System.out.println("BINARY getBytes=" + hex(cs.getBytes(5)) + " getString=" + cs.getString(5) + " getObject=" + cs.getObject(5).getClass().getSimpleName());
            System.out.println("VARBINARY getBytes=" + hex(cs.getBytes(6)) + " getString=" + cs.getString(6));
            System.out.println("CHAR FOR BIT getBytes=" + hex(cs.getBytes(7)) + " getString=" + cs.getString(7));
            System.out.println("GRAPHIC as NCHAR getString='" + cs.getString(8) + "' getNString='" + cs.getNString(8) + "'");
        } catch (SQLException e) { System.out.println("PREC_OUT FAILED: " + e.getMessage().split("\n")[0]); }

        System.out.println("\n##### ARRAY support");
        try { Array arr = c.createArrayOf("INTEGER", new Object[]{1, 2, 3}); System.out.println("createArrayOf OK: " + arr); } catch (SQLException e) { System.out.println("createArrayOf FAILED: " + e.getMessage().split("\n")[0]); }
        try { exec("CREATE OR REPLACE TYPE SCHEMA.INTARR AS INTEGER ARRAY[10]"); exec("CREATE OR REPLACE PROCEDURE SCHEMA.SUM_ARR (IN P_A SCHEMA.INTARR, OUT P_S INT) LANGUAGE SQL BEGIN DECLARE I INT DEFAULT 1; SET P_S = 0; WHILE I <= CARDINALITY(P_A) DO SET P_S = P_S + P_A[I]; SET I = I + 1; END WHILE; END");
            try (CallableStatement cs = c.prepareCall("CALL SCHEMA.SUM_ARR(?, ?)")) { cs.setArray(1, c.createArrayOf("INTEGER", new Object[]{1, 2, 3})); cs.registerOutParameter(2, Types.INTEGER); cs.execute(); System.out.println("SUM_ARR via setArray -> " + cs.getInt(2)); }
        } catch (SQLException e) { System.out.println("array procedure FAILED: " + e.getMessage().split("\n")[0]); }
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.SUM_ARR(ARRAY[1,2,3,4], ?)")) { cs.registerOutParameter(1, Types.INTEGER); cs.execute(); System.out.println("SUM_ARR with ARRAY literal -> " + cs.getInt(1)); } catch (SQLException e) { System.out.println("ARRAY literal FAILED: " + e.getMessage().split("\n")[0]); }

        System.out.println("\n##### Procedure result set metadata vs direct query (all types)");
        exec("CREATE OR REPLACE PROCEDURE SCHEMA.ALL_TYPES_RS () DYNAMIC RESULT SETS 1 LANGUAGE SQL BEGIN DECLARE C1 CURSOR WITH RETURN FOR SELECT * FROM SCHEMA.DATA_TYPES WHERE ID = 1; OPEN C1; END");
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.ALL_TYPES_RS()")) {
            cs.execute();
            try (ResultSet rs = cs.getResultSet()) {
                ResultSetMetaData m = rs.getMetaData(); rs.next();
                StringBuilder sb = new StringBuilder();
                for (int i = 1; i <= m.getColumnCount(); i++) sb.append(m.getColumnName(i)).append("=").append(m.getColumnType(i)).append("/").append(m.getColumnTypeName(i)).append(" ");
                System.out.println(sb);
                System.out.println("XML from proc rs: " + rs.getSQLXML(26).getString() + "; DECFLOAT getObject: " + rs.getObject(9) + "; BOOLEAN getObject: " + rs.getObject(25) + " (" + rs.getObject(25).getClass().getSimpleName() + ")");
            }
        }

        System.out.println("\n##### Cursor holdability / stream after commit; result set type");
        try (PreparedStatement ps = c.prepareStatement("SELECT ID FROM SCHEMA.BIG_T ORDER BY ID")) {
            System.out.println("default rs type=" + ps.getResultSetType() + " concurrency=" + ps.getResultSetConcurrency() + " holdability=" + ps.getResultSetHoldability() + " fetchSize=" + ps.getFetchSize());
        }
        c.setAutoCommit(false);
        try (PreparedStatement ps = c.prepareStatement("SELECT ID FROM SCHEMA.BIG_T ORDER BY ID"); ResultSet rs = ps.executeQuery()) {
            rs.next(); c.commit(); int n = 1; while (rs.next()) n++; System.out.println("rows read across a commit: " + n);
        } catch (SQLException e) { System.out.println("rows across commit FAILED: " + e.getMessage().split("\n")[0]); }
        c.setAutoCommit(true);

        System.out.println("\n##### Identifier special characters");
        exec("CREATE TABLE SCHEMA.\"Mixed Case\" (\"a b\" INT, \"select\" VARCHAR(5), \"ünï\" INT, \"q\"\"q\" INT)");
        try (PreparedStatement ps = c.prepareStatement("INSERT INTO SCHEMA.\"Mixed Case\" (\"a b\", \"select\", \"ünï\", \"q\"\"q\") VALUES (?, ?, ?, ?)")) { ps.setInt(1, 1); ps.setString(2, "x"); ps.setInt(3, 2); ps.setInt(4, 3); ps.executeUpdate(); }
        try (Statement s = c.createStatement(); ResultSet rs = s.executeQuery("SELECT * FROM SCHEMA.\"Mixed Case\"")) {
            ResultSetMetaData m = rs.getMetaData(); rs.next();
            for (int i = 1; i <= m.getColumnCount(); i++) System.out.println("  column label='" + m.getColumnLabel(i) + "' name='" + m.getColumnName(i) + "' -> " + rs.getObject(i));
        }
        exec("DROP TABLE SCHEMA.\"Mixed Case\"");
        try (Statement s = c.createStatement(); ResultSet rs = s.executeQuery("SELECT ID AS \"my id\", NAME AS lower_alias, NAME AS \"MiXeD\" FROM SCHEMA.EMPLOYEE WHERE ID = 1")) {
            ResultSetMetaData m = rs.getMetaData(); rs.next();
            for (int i = 1; i <= m.getColumnCount(); i++) System.out.println("  alias label='" + m.getColumnLabel(i) + "' name='" + m.getColumnName(i) + "'");
        }
        c.close();
    }

    interface Prep { void prep(CallableStatement cs) throws SQLException; }

    static void inout(String label, Prep p) {
        try (CallableStatement cs = c.prepareCall("CALL SCHEMA.ECHO_INOUT(?,?,?,?)")) {
            p.prep(cs); cs.execute();
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i <= 4; i++) { Object v; try { v = cs.getObject(i); } catch (SQLException e) { v = "getObject!(" + e.getErrorCode() + ")"; } sb.append(" p").append(i).append("=").append(v instanceof SQLXML ? ((SQLXML) v).getString() : v); }
            System.out.println("OK   " + label + " ->" + sb);
        } catch (SQLException e) { System.out.println("FAIL " + label + " -> " + e.getErrorCode() + " " + e.getMessage().split("\n")[0]); }
    }

    static void exec(String sql) throws SQLException { try (Statement s = c.createStatement()) { s.execute(sql); } }
    static String hex(byte[] b) { if (b == null) return "null"; StringBuilder sb = new StringBuilder("0x"); for (byte x : b) sb.append(String.format("%02X", x)); return sb.toString(); }
}
