// Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerina/sql;
import ballerina/test;
import ballerina/time;

@test:Config {
    groups: ["execute"]
}
function testInsertReturnsGeneratedKey() returns error? {
    Client dbClient = check getClient();
    sql:ExecutionResult first = check dbClient->execute(
        `INSERT INTO BALTEST.EXEC_T (NAME, AMOUNT) VALUES (${"first"}, ${10.50d})`);
    sql:ExecutionResult second = check dbClient->execute(
        `INSERT INTO BALTEST.EXEC_T (NAME, AMOUNT) VALUES (${"second"}, ${20.25d})`);
    check dbClient.close();
    test:assertEquals(first.affectedRowCount, 1);
    int firstId = check first.lastInsertId.ensureType();
    int secondId = check second.lastInsertId.ensureType();
    test:assertEquals(secondId, firstId + 1);
}

@test:Config {
    groups: ["execute"],
    dependsOn: [testInsertReturnsGeneratedKey]
}
function testUpdateAndDeleteCounts() returns error? {
    Client dbClient = check getClient();
    sql:ExecutionResult updated = check dbClient->execute(
        `UPDATE BALTEST.EXEC_T SET AMOUNT = AMOUNT + ${1} WHERE NAME IN (${"first"}, ${"second"})`);
    test:assertEquals(updated.affectedRowCount, 2);
    test:assertEquals(updated.lastInsertId, ());
    sql:ExecutionResult none = check dbClient->execute(`DELETE FROM BALTEST.EXEC_T WHERE NAME = ${"missing"}`);
    test:assertEquals(none.affectedRowCount, 0);
    check dbClient.close();
}

@test:Config {
    groups: ["execute"]
}
function testDdlStatements() returns error? {
    Client dbClient = check getClient();
    _ = check dbClient->execute(`CREATE TABLE BALTEST.DDL_T (ID INT NOT NULL PRIMARY KEY, NOTE VARCHAR(10))`);
    _ = check dbClient->execute(`ALTER TABLE BALTEST.DDL_T ADD COLUMN EXTRA INT`);
    _ = check dbClient->execute(`CREATE INDEX BALTEST.DDL_T_IDX ON BALTEST.DDL_T (NOTE)`);
    _ = check dbClient->execute(`INSERT INTO BALTEST.DDL_T VALUES (1, 'x', 2)`);
    int extra = check dbClient->queryRow(`SELECT EXTRA FROM BALTEST.DDL_T WHERE ID = 1`);
    test:assertEquals(extra, 2);
    _ = check dbClient->execute(`DROP TABLE BALTEST.DDL_T`);
    check dbClient.close();
}

@test:Config {
    groups: ["execute", "types"]
}
function testInsertNilIntoEveryColumnType() returns error? {
    // The JCC driver rejects `Types.NULL`, so `()` parameters are sent as typed nulls.
    Client dbClient = check getClient();
    int? i = ();
    decimal? d = ();
    float? f = ();
    string? s = ();
    byte[]? b = ();
    time:Date? date = ();
    time:TimeOfDay? tod = ();
    time:Civil? civil = ();
    boolean? flag = ();
    xml? x = ();
    sql:ExecutionResult result = check dbClient->execute(`INSERT INTO BALTEST.NULLS_T VALUES (1,
        ${i}, ${i}, ${d}, ${f}, ${d}, ${s}, ${s}, ${s}, ${s}, ${b}, ${b}, ${date}, ${tod}, ${civil}, ${flag}, ${x})`);
    test:assertEquals(result.affectedRowCount, 1);
    record {} row = check dbClient->queryRow(`SELECT * FROM BALTEST.NULLS_T WHERE ID = 1`);
    foreach [string, anydata] [column, value] in row.entries() {
        if column != "ID" {
            test:assertEquals(value, (), string `Column ${column} should be NULL`);
        }
    }
    check dbClient.close();
}

@test:Config {
    groups: ["execute", "types"]
}
function testInsertValuesIntoEveryColumnType() returns error? {
    Client dbClient = check getClient();
    byte[] bytes = [1, 2, 3];
    time:Date date = {year: 2025, month: 2, day: 28};
    time:TimeOfDay tod = {hour: 23, minute: 59, second: 58};
    time:Civil civil = {year: 2025, month: 2, day: 28, hour: 23, minute: 59, second: 58.5d};
    xml doc = xml `<order id="7"><item>Pen</item></order>`;
    _ = check dbClient->execute(`INSERT INTO BALTEST.NULLS_T VALUES (2,
        ${42}, ${9007199254740993}, ${12.34d}, ${1.5}, ${0.1d}, ${"text"}, ${"long text"}, ${"グラフィック"},
        ${"二バイト"}, ${bytes}, ${bytes}, ${date}, ${tod}, ${civil}, ${false}, ${doc})`);
    record {|
        int C_INT; int C_BIGINT; decimal C_DECIMAL; float C_DOUBLE; decimal C_DECFLOAT; string C_VARCHAR;
        string C_CLOB; string C_VARGRAPHIC; string C_DBCLOB; byte[] C_VARBINARY; byte[] C_BLOB; time:Date C_DATE;
        time:TimeOfDay C_TIME; time:Civil C_TIMESTAMP; boolean C_BOOLEAN; xml C_XML;
    |} row = check dbClient->queryRow(`SELECT C_INT, C_BIGINT, C_DECIMAL, C_DOUBLE, C_DECFLOAT, C_VARCHAR, C_CLOB,
        C_VARGRAPHIC, C_DBCLOB, C_VARBINARY, C_BLOB, C_DATE, C_TIME, C_TIMESTAMP, C_BOOLEAN, C_XML
        FROM BALTEST.NULLS_T WHERE ID = 2`);
    check dbClient.close();
    test:assertEquals(row.C_INT, 42);
    test:assertEquals(row.C_BIGINT, 9007199254740993);
    test:assertEquals(row.C_DECIMAL, 12.34d);
    test:assertEquals(row.C_DOUBLE, 1.5);
    // DECFLOAT keeps the exact decimal value (a binary double would turn 0.1 into 0.1000000000000000055...).
    test:assertEquals(row.C_DECFLOAT, 0.1d);
    test:assertEquals(row.C_VARGRAPHIC, "グラフィック");
    test:assertEquals(row.C_DBCLOB, "二バイト");
    test:assertEquals(row.C_VARBINARY, bytes);
    test:assertEquals(row.C_BLOB, bytes);
    test:assertEquals(row.C_DATE, date);
    test:assertEquals(row.C_TIME, tod);
    test:assertEquals(row.C_TIMESTAMP, civil);
    test:assertEquals(row.C_BOOLEAN, false);
    test:assertEquals(row.C_XML, doc);
}

type TypedRow record {|
    int? C_INT;
    string? C_VARCHAR;
    byte[]? C_BLOB;
    xml? C_XML;
|};

@test:Config {
    groups: ["execute", "types"]
}
function testTypedValueParameters() returns error? {
    Client dbClient = check getClient();
    _ = check dbClient->execute(`INSERT INTO BALTEST.NULLS_T (ID, C_INT, C_DECIMAL, C_VARCHAR, C_CLOB, C_BLOB, C_XML,
        C_BOOLEAN, C_TIMESTAMP) VALUES (3, ${new sql:IntegerValue(7)}, ${new sql:DecimalValue(1.01d)},
        ${new sql:VarcharValue("typed")}, ${new sql:ClobValue("clob")}, ${new sql:BlobValue([9, 8])},
        ${xml `<t/>`}, ${new sql:BooleanValue(true)},
        ${new sql:TimestampValue("2024-02-29 10:11:12.5")})`);
    _ = check dbClient->execute(`INSERT INTO BALTEST.NULLS_T (ID, C_INT, C_VARCHAR) VALUES (4,
        ${new sql:IntegerValue()}, ${new sql:VarcharValue()})`);
    stream<TypedRow, sql:Error?> typedRows = dbClient->query(
        `SELECT C_INT, C_VARCHAR, C_BLOB, C_XML FROM BALTEST.NULLS_T WHERE ID IN (3, 4) ORDER BY ID`);
    TypedRow[] rows = check from TypedRow r in typedRows select r;
    check dbClient.close();
    test:assertEquals(rows[0], {C_INT: 7, C_VARCHAR: "typed", C_BLOB: [9, 8], C_XML: xml `<t/>`});
    test:assertEquals(rows[1], {C_INT: (), C_VARCHAR: (), C_BLOB: (), C_XML: ()});
}

@test:Config {
    groups: ["execute"]
}
function testLargeLobRoundTrip() returns error? {
    Client dbClient = check getClient();
    string big = "";
    foreach int i in 1 ... 1000 {
        big += "0123456789abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqr";
    }
    byte[] blob = big.toBytes();
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_CLOB, C_BLOB) VALUES (10, ${big}, ${blob})`);
    record {|string C_CLOB; byte[] C_BLOB;|} row =
        check dbClient->queryRow(`SELECT C_CLOB, C_BLOB FROM BALTEST.DATA_TYPES WHERE ID = 10`);
    test:assertEquals(row.C_CLOB.length(), 100000);
    test:assertEquals(row.C_BLOB, blob);
    _ = check dbClient->execute(`DELETE FROM BALTEST.DATA_TYPES WHERE ID = 10`);
    check dbClient.close();
}

@test:Config {
    groups: ["execute"]
}
function testConstraintViolationError() returns error? {
    Client dbClient = check getClient();
    sql:ExecutionResult|sql:Error result = dbClient->execute(
        `INSERT INTO BALTEST.DATA_TYPES (ID) VALUES (${1})`);
    assertDatabaseError(result, "23505", -803);
    sql:ExecutionResult|sql:Error notNull = dbClient->execute(
        `INSERT INTO BALTEST.EMPLOYEE (NAME, DEPT) VALUES (${()}, ${"ENG"})`);
    assertDatabaseError(notNull, "23502", -407);
    sql:ExecutionResult|sql:Error tooLong = dbClient->execute(
        `INSERT INTO BALTEST.BATCH_T VALUES (${999}, ${"a value that is longer than twenty chars"})`);
    assertDatabaseError(tooLong, "22001", -302);
    check dbClient.close();
}

@test:Config {
    groups: ["execute"]
}
function testSyntaxError() returns error? {
    Client dbClient = check getClient();
    sql:ExecutionResult|sql:Error result = dbClient->execute(`UPDATE BALTEST.EMPLOYEE SETT NAME = 'x'`);
    assertDatabaseError(result, "42601", -104);
    check dbClient.close();
}

@test:Config {
    groups: ["execute", "timeout"]
}
function testQueryTimeout() returns error? {
    Client dbClient = check getClient({queryTimeout: 2});
    // A cross join large enough to run for well over two seconds.
    int|sql:Error result = dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BIG_T A, BALTEST.BIG_T B
        WHERE A.PAYLOAD || B.PAYLOAD LIKE '%zz%'`);
    if result !is sql:Error {
        test:assertFail("Expected the statement to be cancelled by the query timeout");
    }
    // The SQLCODE and SQLSTATE of the cancellation are in the error detail. The message text is fetched from the
    // server with a second request, which does not always succeed right after a cancellation.
    sql:DatabaseErrorDetail detail = (<sql:DatabaseError>result).detail();
    test:assertTrue(detail.errorCode == -952 || detail.sqlState == "57014",
        string `${result.message()} ${detail.toString()}`);
    // The connection remains usable after the cancellation.
    int one = check dbClient->queryRow(`SELECT 1 FROM SYSIBM.SYSDUMMY1`);
    test:assertEquals(one, 1);
    check dbClient.close();
}
