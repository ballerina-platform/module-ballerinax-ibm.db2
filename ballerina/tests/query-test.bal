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

type DataTypes record {|
    int ID;
    int? C_SMALLINT;
    int? C_INT;
    int? C_BIGINT;
    decimal? C_DECIMAL;
    decimal? C_NUMERIC;
    float? C_REAL;
    float? C_DOUBLE;
    decimal? C_DECFLOAT16;
    decimal? C_DECFLOAT34;
    string? C_CHAR;
    string? C_VARCHAR;
    string? C_CLOB;
    string? C_GRAPHIC;
    string? C_VARGRAPHIC;
    string? C_DBCLOB;
    byte[]? C_BINARY;
    byte[]? C_VARBINARY;
    byte[]? C_BLOB;
    byte[]? C_CHAR_BIT;
    time:Date? C_DATE;
    time:TimeOfDay? C_TIME;
    time:Civil? C_TIMESTAMP;
    time:Civil? C_TIMESTAMP12;
    boolean? C_BOOLEAN;
    xml? C_XML;
|};

type Employee record {|
    int id;
    string name;
    string dept;
    decimal? salary;
    time:Date? hired;
    boolean active;
|};

@test:Config {
    groups: ["query", "types"]
}
function testQueryAllTypesTyped() returns error? {
    Client dbClient = check getClient();
    DataTypes row = check dbClient->queryRow(`SELECT * FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    check dbClient.close();

    test:assertEquals(row.C_SMALLINT, 1);
    test:assertEquals(row.C_INT, 2);
    test:assertEquals(row.C_BIGINT, 9223372036854775807);
    test:assertEquals(row.C_DECIMAL, 12345678.91d);
    test:assertEquals(row.C_NUMERIC, 12345.678d);
    test:assertEquals(row.C_REAL, 1.25);
    test:assertEquals(row.C_DOUBLE, 2.5);
    test:assertEquals(row.C_DECFLOAT16, 123.456d);
    test:assertEquals(row.C_DECFLOAT34, 1234567890.123456789012345678901234d);
    test:assertEquals(row.C_CHAR, "abc       ");
    test:assertEquals(row.C_VARCHAR, "hello db2");
    test:assertEquals(row.C_CLOB, "clob text");
    test:assertEquals(row.C_GRAPHIC, "ｱｲｳ  ");
    test:assertEquals(row.C_VARGRAPHIC, "日本語テキスト");
    test:assertEquals(row.C_DBCLOB, "dbclob 日本");
    test:assertEquals(row.C_BINARY, [1, 2, 3, 4]);
    test:assertEquals(row.C_VARBINARY, [10, 11]);
    test:assertEquals(row.C_BLOB, [255, 238]);
    test:assertEquals(row.C_CHAR_BIT, [222, 173, 190, 239]);
    test:assertEquals(row.C_DATE, <time:Date>{year: 2026, month: 10, day: 29});
    test:assertEquals(row.C_TIME, <time:TimeOfDay>{hour: 13, minute: 14, second: 15});
    test:assertEquals(row.C_TIMESTAMP, <time:Civil>{year: 2026, month: 10, day: 29, hour: 13, minute: 14, second: 15.123456d});
    // Db2 keeps picoseconds; Java timestamps (and so Ballerina) keep nanoseconds.
    test:assertEquals(row.C_TIMESTAMP12, <time:Civil>{year: 2026, month: 10, day: 29, hour: 13, minute: 14, second: 15.123456789d});
    test:assertEquals(row.C_BOOLEAN, true);
    test:assertEquals(row.C_XML, xml `<employee><name>Ann</name></employee>`);
}

@test:Config {
    groups: ["query", "types"]
}
function testQueryAllTypesNull() returns error? {
    Client dbClient = check getClient();
    DataTypes row = check dbClient->queryRow(`SELECT * FROM BALTEST.DATA_TYPES WHERE ID = 2`);
    check dbClient.close();
    test:assertEquals(row, {
        ID: 2, C_SMALLINT: (), C_INT: (), C_BIGINT: (), C_DECIMAL: (), C_NUMERIC: (), C_REAL: (), C_DOUBLE: (),
        C_DECFLOAT16: (), C_DECFLOAT34: (), C_CHAR: (), C_VARCHAR: (), C_CLOB: (), C_GRAPHIC: (), C_VARGRAPHIC: (),
        C_DBCLOB: (), C_BINARY: (), C_VARBINARY: (), C_BLOB: (), C_CHAR_BIT: (), C_DATE: (), C_TIME: (),
        C_TIMESTAMP: (), C_TIMESTAMP12: (), C_BOOLEAN: (), C_XML: ()
    });
}

@test:Config {
    groups: ["query", "types"]
}
function testQueryAllTypesOpenRecord() returns error? {
    Client dbClient = check getClient();
    record {} row = check dbClient->queryRow(`SELECT * FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    check dbClient.close();
    // Without a declared type, DECFLOAT must still come back as a decimal, not a string.
    test:assertEquals(row["C_DECFLOAT16"], 123.456d);
    test:assertEquals(row["C_DECFLOAT34"], 1234567890.123456789012345678901234d);
    test:assertEquals(row["C_INT"], 2);
    test:assertEquals(row["C_DECIMAL"], 12345678.91d);
    test:assertEquals(row["C_VARGRAPHIC"], "日本語テキスト");
    test:assertEquals(row["C_BOOLEAN"], true);
    test:assertTrue(row["C_XML"] is xml);
    test:assertTrue(row["C_BLOB"] is byte[]);
}

@test:Config {
    groups: ["query", "types"]
}
function testDecFloatToIntAndFloat() returns error? {
    Client dbClient = check getClient();
    record {|int C_DECFLOAT16; float C_DECFLOAT34;|} row =
        check dbClient->queryRow(`SELECT C_DECFLOAT16, C_DECFLOAT34 FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    check dbClient.close();
    test:assertEquals(row.C_DECFLOAT16, 123);
    test:assertEquals(row.C_DECFLOAT34, 1234567890.1234567);
}

@test:Config {
    groups: ["query", "types"]
}
function testDecFloatSpecialValues() returns error? {
    Client dbClient = check getClient();
    record {|string C_DECFLOAT16; string C_DECFLOAT34;|} asString =
        check dbClient->queryRow(`SELECT C_DECFLOAT16, C_DECFLOAT34 FROM BALTEST.DATA_TYPES WHERE ID = 3`);
    test:assertEquals(asString, {C_DECFLOAT16: "Infinity", C_DECFLOAT34: "NaN"});

    record {|float C_DECFLOAT16; float C_DECFLOAT34;|} asFloat =
        check dbClient->queryRow(`SELECT C_DECFLOAT16, C_DECFLOAT34 FROM BALTEST.DATA_TYPES WHERE ID = 3`);
    test:assertEquals(asFloat.C_DECFLOAT16, float:Infinity);
    test:assertTrue(asFloat.C_DECFLOAT34.isNaN());

    record {} open = check dbClient->queryRow(`SELECT C_DECFLOAT16 FROM BALTEST.DATA_TYPES WHERE ID = 3`);
    test:assertEquals(open["C_DECFLOAT16"], "Infinity");

    record {|decimal C_DECFLOAT16;|}|sql:Error asDecimal =
        dbClient->queryRow(`SELECT C_DECFLOAT16 FROM BALTEST.DATA_TYPES WHERE ID = 3`);
    if asDecimal !is sql:Error {
        test:assertFail("Expected an error when mapping Infinity to decimal");
    }
    test:assertTrue(asDecimal.message().includes("cannot be converted to a Ballerina decimal"), asDecimal.message());
    check dbClient.close();
}

@test:Config {
    groups: ["query"]
}
function testQueryStreamWithParams() returns error? {
    Client dbClient = check getClient();
    string dept = "ENG";
    stream<Employee, sql:Error?> employees = dbClient->query(
        `SELECT ID AS "id", NAME AS "name", DEPT AS "dept", SALARY AS "salary", HIRED AS "hired", ACTIVE AS "active"
         FROM BALTEST.EMPLOYEE WHERE DEPT = ${dept} AND ID <= 5 ORDER BY ID`);
    Employee[] result = check from Employee e in employees select e;
    check dbClient.close();
    test:assertEquals(result.length(), 3);
    test:assertEquals(result[0], {id: 1, name: "Ann", dept: "ENG", salary: 9500.00d,
        hired: {year: 2020, month: 1, day: 15}, active: true});
    test:assertEquals(result[2].salary, ());
}

@test:Config {
    groups: ["query"]
}
function testQueryRowScalar() returns error? {
    Client dbClient = check getClient();
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EMPLOYEE WHERE DEPT = ${"ENG"}`);
    test:assertTrue(count >= 3);
    string name = check dbClient->queryRow(`SELECT NAME FROM BALTEST.EMPLOYEE WHERE ID = ${1}`);
    test:assertEquals(name, "Ann");
    check dbClient.close();
}

@test:Config {
    groups: ["query"]
}
function testQueryRowNoRows() returns error? {
    Client dbClient = check getClient();
    string|sql:Error name = dbClient->queryRow(`SELECT NAME FROM BALTEST.EMPLOYEE WHERE ID = ${-1}`);
    check dbClient.close();
    test:assertTrue(name is sql:NoRowsError);
}

@test:Config {
    groups: ["query"]
}
function testFullStreamOfManyRows() returns error? {
    Client dbClient = check getClient();
    stream<record {|int ID; string PAYLOAD;|}, sql:Error?> rows =
        dbClient->query(`SELECT ID, PAYLOAD FROM BALTEST.BIG_T ORDER BY ID`);
    int count = 0;
    int lastId = 0;
    check from var row in rows
        do {
            count += 1;
            lastId = row.ID;
        };
    check dbClient.close();
    test:assertEquals(count, 20000);
    test:assertEquals(lastId, 20000);
}

@test:Config {
    groups: ["query"]
}
function testEarlyStreamClose() returns error? {
    Client dbClient = check getClient(connectionPool = {maxOpenConnections: 1});
    // With one connection, an unclosed stream would block the next statement.
    foreach int i in 1 ... 5 {
        stream<record {|int ID;|}, sql:Error?> rows = dbClient->query(`SELECT ID FROM BALTEST.BIG_T ORDER BY ID`);
        _ = check rows.next();
        check rows.close();
    }
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BIG_T`);
    test:assertEquals(count, 20000);
    check dbClient.close();
}

@test:Config {
    groups: ["query"]
}
function testNextAfterStreamExhausted() returns error? {
    Client dbClient = check getClient();
    stream<record {|int ONE;|}, sql:Error?> rows = dbClient->query(`SELECT 1 AS ONE FROM SYSIBM.SYSDUMMY1`);
    _ = check rows.next();
    // JCC closes the cursor once the last row is read; reaching the end must not surface ERRORCODE=-4470.
    record {|record {|int ONE;|} value;|}? second = check rows.next();
    test:assertEquals(second, ());
    check dbClient.close();
}

@test:Config {
    groups: ["query"]
}
function testUntypedParameterMarkerNeedsCast() returns error? {
    Client dbClient = check getClient();
    // Db2 has to know the type of every parameter marker (SQL0418N).
    int|sql:Error untyped = dbClient->queryRow(`SELECT ${5} FROM SYSIBM.SYSDUMMY1`);
    assertDatabaseError(untyped, "42610", -418);
    int typed = check dbClient->queryRow(`SELECT CAST(${5} AS INT) FROM SYSIBM.SYSDUMMY1`);
    test:assertEquals(typed, 5);
    check dbClient.close();
}

@test:Config {
    groups: ["query"]
}
function testParameterizedQueryPreventsInjection() returns error? {
    Client dbClient = check getClient();
    string malicious = "Ann' OR '1'='1";
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EMPLOYEE WHERE NAME = ${malicious}`);
    test:assertEquals(count, 0);
    check dbClient.close();
}

@test:Config {
    groups: ["query"]
}
function testQueryErrorHasServerMessage() returns error? {
    Client dbClient = check getClient();
    int|sql:Error result = dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.NO_SUCH_TABLE`);
    assertDatabaseError(result, "42704", -204);
    if result is sql:Error {
        test:assertTrue(result.message().includes("BALTEST.NO_SUCH_TABLE"), result.message());
    }
    check dbClient.close();
}

@test:Config {
    groups: ["query"]
}
function testFetchFirstAndOffset() returns error? {
    Client dbClient = check getClient();
    stream<record {|int ID;|}, sql:Error?> rows = dbClient->query(
        `SELECT ID FROM BALTEST.BIG_T ORDER BY ID OFFSET ${10} ROWS FETCH FIRST ${3} ROWS ONLY`);
    int[] ids = check from var row in rows select row.ID;
    test:assertEquals(ids, [11, 12, 13]);
    check dbClient.close();
}

@test:Config {
    groups: ["query", "types"]
}
function testStreamRowsUseDb2TypeMapping() returns error? {
    // Every row of a stream (not only the first) must be read with the Db2 type mapping.
    Client dbClient = check getClient();
    stream<record {}, sql:Error?> rows = dbClient->query(
        `SELECT ID, C_DECFLOAT16, C_XML FROM BALTEST.DATA_TYPES WHERE ID IN (1, 2, 3) ORDER BY ID`);
    record {}[] result = check from record {} row in rows select row;
    check dbClient.close();
    test:assertEquals(result[0]["C_DECFLOAT16"], 123.456d);
    test:assertEquals(result[0]["C_XML"], xml `<employee><name>Ann</name></employee>`);
    test:assertEquals(result[1]["C_DECFLOAT16"], ());
    test:assertEquals(result[2]["C_DECFLOAT16"], "Infinity");
}
