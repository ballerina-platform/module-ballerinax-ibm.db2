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

// Every column of BALTEST.DATA_TYPES mapped to the closest Ballerina type.
type AllTypesRow record {|
    int ID;
    int C_SMALLINT;
    int C_INT;
    int C_BIGINT;
    decimal C_DECIMAL;
    decimal C_NUMERIC;
    float C_REAL;
    float C_DOUBLE;
    decimal C_DECFLOAT16;
    decimal C_DECFLOAT34;
    string C_CHAR;
    string C_VARCHAR;
    string C_CLOB;
    string C_GRAPHIC;
    string C_VARGRAPHIC;
    string C_DBCLOB;
    byte[] C_BINARY;
    byte[] C_VARBINARY;
    byte[] C_BLOB;
    byte[] C_CHAR_BIT;
    time:Date C_DATE;
    time:TimeOfDay C_TIME;
    time:Civil C_TIMESTAMP;
    time:Civil C_TIMESTAMP12;
    boolean C_BOOLEAN;
    xml C_XML;
|};

type AllTypesOptionalRow record {|
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

type DecimalRow record {|
    decimal D;
    decimal N;
    decimal DF;
|};

final time:Civil & readonly CIVIL_12 = {year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12.123456789d};

@test:Config {
    groups: ["types"]
}
function testTypedValuesIntoEveryColumn() returns error? {
    Client dbClient = check getClient();
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_SMALLINT, C_INT, C_BIGINT, C_DECIMAL, C_NUMERIC,
        C_REAL, C_DOUBLE, C_DECFLOAT16, C_DECFLOAT34, C_CHAR, C_VARCHAR, C_CLOB, C_GRAPHIC, C_VARGRAPHIC, C_DBCLOB,
        C_BINARY, C_VARBINARY, C_BLOB, C_CHAR_BIT, C_DATE, C_TIME, C_TIMESTAMP, C_TIMESTAMP12, C_BOOLEAN, C_XML)
        VALUES (1001, ${new sql:SmallIntValue(-32768)}, ${new sql:IntegerValue(2147483647)},
        ${new sql:BigIntValue(-9223372036854775807)}, ${new sql:DecimalValue(-12345678.99d)},
        ${new sql:NumericValue(12345.678d)}, ${new sql:RealValue(1.5)}, ${new sql:DoubleValue(-2.25)},
        ${new sql:DecimalValue(1234567890.123456d)}, ${new sql:DecimalValue(1e30d)},
        ${new sql:CharValue("char")}, ${new sql:VarcharValue("varchar ✓")}, ${new sql:ClobValue("clob")},
        ${new sql:NCharValue("日本")}, ${new sql:NVarcharValue("ユニコード 😀")}, ${new sql:NClobValue("dbclob 日本")},
        ${new sql:BinaryValue([1, 2, 3, 4])}, ${new sql:VarBinaryValue([255, 0, 127])}, ${new sql:BlobValue([9, 8, 7])},
        ${new sql:BinaryValue([222, 173, 190, 239])}, ${new sql:DateValue({year: 2024, month: 2, day: 29})},
        ${new sql:TimeValue({hour: 23, minute: 59, second: 59})},
        ${new sql:DateTimeValue({year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12.5d})},
        ${new sql:DateTimeValue(CIVIL_12)}, ${new sql:BooleanValue(true)}, ${xml `<a b="1">t</a>`})`);
    AllTypesRow row = check dbClient->queryRow(`SELECT * FROM BALTEST.DATA_TYPES WHERE ID = 1001`);
    check dbClient.close();
    test:assertEquals(row.C_SMALLINT, -32768);
    test:assertEquals(row.C_INT, 2147483647);
    test:assertEquals(row.C_BIGINT, -9223372036854775807);
    test:assertEquals(row.C_DECIMAL, -12345678.99d);
    test:assertEquals(row.C_NUMERIC, 12345.678d);
    test:assertEquals(row.C_REAL, 1.5);
    test:assertEquals(row.C_DOUBLE, -2.25);
    test:assertEquals(row.C_DECFLOAT16, 1234567890.123456d);
    test:assertEquals(row.C_DECFLOAT34, 1e30d);
    test:assertEquals(row.C_CHAR, "char      ", "CHAR columns are blank padded");
    test:assertEquals(row.C_VARCHAR, "varchar ✓");
    test:assertEquals(row.C_CLOB, "clob");
    test:assertEquals(row.C_GRAPHIC, "日本   ", "GRAPHIC columns are blank padded");
    test:assertEquals(row.C_VARGRAPHIC, "ユニコード 😀");
    test:assertEquals(row.C_DBCLOB, "dbclob 日本");
    test:assertEquals(row.C_BINARY, [1, 2, 3, 4]);
    test:assertEquals(row.C_VARBINARY, [255, 0, 127]);
    test:assertEquals(row.C_BLOB, [9, 8, 7]);
    test:assertEquals(row.C_CHAR_BIT, [222, 173, 190, 239]);
    test:assertEquals(row.C_DATE, <time:Date>{year: 2024, month: 2, day: 29});
    test:assertEquals(row.C_TIME, <time:TimeOfDay>{hour: 23, minute: 59, second: 59});
    test:assertEquals(row.C_TIMESTAMP, <time:Civil>{year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12.5d});
    test:assertEquals(row.C_TIMESTAMP12, CIVIL_12);
    test:assertEquals(row.C_BOOLEAN, true);
    test:assertEquals(row.C_XML, xml `<a b="1">t</a>`);
}

@test:Config {
    groups: ["types"]
}
function testTypedNullsIntoEveryColumn() returns error? {
    Client dbClient = check getClient();
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_SMALLINT, C_INT, C_BIGINT, C_DECIMAL, C_NUMERIC,
        C_REAL, C_DOUBLE, C_DECFLOAT16, C_DECFLOAT34, C_CHAR, C_VARCHAR, C_CLOB, C_GRAPHIC, C_VARGRAPHIC, C_DBCLOB,
        C_BINARY, C_VARBINARY, C_BLOB, C_CHAR_BIT, C_DATE, C_TIME, C_TIMESTAMP, C_TIMESTAMP12, C_BOOLEAN)
        VALUES (1002, ${new sql:SmallIntValue()}, ${new sql:IntegerValue()}, ${new sql:BigIntValue()},
        ${new sql:DecimalValue()}, ${new sql:NumericValue()}, ${new sql:RealValue()}, ${new sql:DoubleValue()},
        ${new sql:FloatValue()}, ${new sql:DecimalValue()}, ${new sql:CharValue()}, ${new sql:VarcharValue()},
        ${new sql:ClobValue()}, ${new sql:NCharValue()}, ${new sql:NVarcharValue()}, ${new sql:NClobValue()},
        ${new sql:BinaryValue()}, ${new sql:VarBinaryValue()}, ${new sql:BlobValue()}, ${new sql:BinaryValue()},
        ${new sql:DateValue()}, ${new sql:TimeValue()}, ${new sql:TimestampValue()}, ${new sql:DateTimeValue()},
        ${new sql:BooleanValue()})`);
    AllTypesOptionalRow row = check dbClient->queryRow(`SELECT * FROM BALTEST.DATA_TYPES WHERE ID = 1002`);
    check dbClient.close();
    AllTypesOptionalRow expected = {
        ID: 1002, C_SMALLINT: (), C_INT: (), C_BIGINT: (), C_DECIMAL: (), C_NUMERIC: (), C_REAL: (), C_DOUBLE: (),
        C_DECFLOAT16: (), C_DECFLOAT34: (), C_CHAR: (), C_VARCHAR: (), C_CLOB: (), C_GRAPHIC: (), C_VARGRAPHIC: (),
        C_DBCLOB: (), C_BINARY: (), C_VARBINARY: (), C_BLOB: (), C_CHAR_BIT: (), C_DATE: (), C_TIME: (),
        C_TIMESTAMP: (), C_TIMESTAMP12: (), C_BOOLEAN: (), C_XML: ()
    };
    test:assertEquals(row, expected);
}

@test:Config {
    groups: ["types"]
}
function testDateTimeTypedValuesFromStrings() returns error? {
    Client dbClient = check getClient();
    // Both the JDBC and the Db2 string formats are accepted.
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_DATE, C_TIME, C_TIMESTAMP, C_TIMESTAMP12)
        VALUES (1003, ${new sql:DateValue("2024-02-29")}, ${new sql:TimeValue("23:59:59")},
        ${new sql:TimestampValue("2024-02-29 10:11:12.5")}, ${new sql:DateTimeValue("2024-02-29-10.11.12.123456789")})`);
    record {|string C_DATE; string C_TIME; string C_TIMESTAMP; time:Civil C_TIMESTAMP12;|} row =
        check dbClient->queryRow(`SELECT C_DATE, C_TIME, C_TIMESTAMP, C_TIMESTAMP12 FROM BALTEST.DATA_TYPES WHERE ID = 1003`);
    // Db2 TIME has no fractional seconds.
    sql:ExecutionResult|sql:Error fraction = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_TIME)
        VALUES (1004, ${new sql:TimeValue("23:59:59.5")})`);
    check dbClient.close();
    test:assertEquals(row.C_DATE, "2024-02-29");
    test:assertEquals(row.C_TIME, "23:59:59");
    test:assertEquals(row.C_TIMESTAMP, "2024-02-29 10:11:12.5");
    test:assertEquals(row.C_TIMESTAMP12, CIVIL_12);
    assertDatabaseError(fraction, "22007", -180);
}

@test:Config {
    groups: ["types"]
}
function testUtcAndOffsetTimestampsAreStoredAsUtc() returns error? {
    Client dbClient = check getClient();
    time:Utc utc = check time:utcFromString("2024-02-29T10:11:12.123456789Z");
    time:Civil plus530 = {year: 2024, month: 2, day: 29, hour: 15, minute: 41, second: 12.5d,
        utcOffset: {hours: 5, minutes: 30}};
    time:Civil minus8 = {year: 2024, month: 2, day: 29, hour: 2, minute: 11, second: 12, utcOffset: {hours: -8, minutes: 0}};
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_TIMESTAMP12) VALUES (1005, ${utc})`);
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_TIMESTAMP12) VALUES (1006, ${plus530})`);
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_TIMESTAMP12) VALUES (1007, ${minus8})`);
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_TIMESTAMP12) VALUES (1008, ${new sql:TimestampValue(utc)})`);
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_TIMESTAMP12) VALUES (1009, ${new sql:DateTimeValue(plus530)})`);
    stream<record {|int ID; time:Civil C_TIMESTAMP12;|}, sql:Error?> rows = dbClient->query(
        `SELECT ID, C_TIMESTAMP12 FROM BALTEST.DATA_TYPES WHERE ID BETWEEN 1005 AND 1009 ORDER BY ID`);
    time:Civil[] stored = check from var row in rows select row.C_TIMESTAMP12;
    // A TIMESTAMP column read as time:Utc.
    time:Utc back = check dbClient->queryRow(`SELECT C_TIMESTAMP12 FROM BALTEST.DATA_TYPES WHERE ID = 1005`);
    check dbClient.close();
    test:assertEquals(stored[0], CIVIL_12, "time:Utc keeps its nanoseconds");
    test:assertEquals(stored[1], <time:Civil>{year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12.5d},
        "+05:30 is converted to UTC");
    test:assertEquals(stored[2], <time:Civil>{year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12},
        "-08:00 is converted to UTC");
    test:assertEquals(stored[3], CIVIL_12);
    test:assertEquals(stored[4], stored[1]);
    test:assertEquals(back[0], utc[0], "the seconds of a time:Utc survive the round trip");
}

@test:Config {
    groups: ["types"]
}
function testTimeOfDayWithOffsetIsRejected() returns error? {
    Client dbClient = check getClient();
    time:TimeOfDay withOffset = {hour: 10, minute: 11, second: 12, utcOffset: {hours: 2, minutes: 0}};
    sql:ExecutionResult|sql:Error result = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_TIME)
        VALUES (1010, ${withOffset})`);
    sql:ExecutionResult|sql:Error typed = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_TIME)
        VALUES (1010, ${new sql:TimeValue(withOffset)})`);
    check dbClient.close();
    test:assertTrue(result is sql:DataError, "expected a DataError");
    test:assertTrue((<sql:Error>result).message().includes("time zone"), (<sql:Error>result).message());
    test:assertTrue(typed is sql:DataError);
}

@test:Config {
    groups: ["types"]
}
function testNanAndInfinityAreRejected() returns error? {
    Client dbClient = check getClient();
    sql:ExecutionResult|sql:Error nan = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_DOUBLE)
        VALUES (1011, ${float:NaN})`);
    sql:ExecutionResult|sql:Error infinity = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_DECFLOAT34)
        VALUES (1011, ${new sql:DoubleValue(float:Infinity)})`);
    sql:ExecutionResult|sql:Error typedNan = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_REAL)
        VALUES (1011, ${new sql:RealValue(-float:NaN)})`);
    // The SQL literal is the way to store a special DECFLOAT value.
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_DECFLOAT34) VALUES (1011, DECFLOAT('-Infinity'))`);
    string literal = check dbClient->queryRow(`SELECT C_DECFLOAT34 FROM BALTEST.DATA_TYPES WHERE ID = 1011`);
    float asFloat = check dbClient->queryRow(`SELECT C_DECFLOAT34 FROM BALTEST.DATA_TYPES WHERE ID = 1011`);
    check dbClient.close();
    foreach var result in [nan, infinity, typedNan] {
        test:assertTrue(result is sql:DataError, "expected a DataError");
        test:assertTrue((<sql:Error>result).message().includes("DECFLOAT('"), (<sql:Error>result).message());
    }
    test:assertEquals(literal, "-Infinity");
    test:assertEquals(asFloat, -float:Infinity);
}

@test:Config {
    groups: ["types"]
}
function testArrayParametersAreRejected() returns error? {
    Client dbClient = check getClient();
    int[] ids = [1, 2];
    stream<record {}, sql:Error?> plain = dbClient->query(`SELECT ID FROM BALTEST.EMPLOYEE WHERE ID IN (${ids})`);
    record {|record {} value;|}|sql:Error? first = plain.next();
    sql:ExecutionResult|sql:Error typed = dbClient->execute(`INSERT INTO BALTEST.BATCH_T VALUES (${new sql:IntegerArrayValue([7])}, 'x')`);
    check dbClient.close();
    test:assertTrue(first is sql:DataError, "expected a DataError");
    test:assertTrue((<sql:Error>first).message().includes("ARRAY"), (<sql:Error>first).message());
    test:assertTrue(typed is sql:DataError);
}

@test:Config {
    groups: ["types"]
}
function testNumericCoercionsAndLimits() returns error? {
    Client dbClient = check getClient();
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_DECIMAL, C_NUMERIC, C_INT, C_SMALLINT, C_BOOLEAN, C_DECFLOAT16)
        VALUES (1012, ${42}, ${0.1}, ${12.7d}, ${true}, ${1}, ${new sql:FloatValue(2.5)})`);
    record {|decimal C_DECIMAL; decimal C_NUMERIC; int C_INT; int C_SMALLINT; boolean C_BOOLEAN; float C_DECFLOAT16;|} row =
        check dbClient->queryRow(`SELECT C_DECIMAL, C_NUMERIC, C_INT, C_SMALLINT, C_BOOLEAN, C_DECFLOAT16
            FROM BALTEST.DATA_TYPES WHERE ID = 1012`);
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_DECIMAL, C_BOOLEAN) VALUES (1013, ${123.456d}, ${new sql:BitValue(1)})`);
    record {|decimal C_DECIMAL; boolean C_BOOLEAN;|} rounded =
        check dbClient->queryRow(`SELECT C_DECIMAL, C_BOOLEAN FROM BALTEST.DATA_TYPES WHERE ID = 1013`);
    sql:ExecutionResult|sql:Error smallOverflow = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_SMALLINT) VALUES (1014, ${40000})`);
    sql:ExecutionResult|sql:Error intOverflow = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_INT) VALUES (1014, ${3000000000})`);
    sql:ExecutionResult|sql:Error decimalOverflow = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_DECIMAL) VALUES (1014, ${123456789.12d})`);
    sql:ExecutionResult|sql:Error charOverflow = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_CHAR) VALUES (1014, ${"12345678901"})`);
    sql:ExecutionResult|sql:Error binaryOverflow = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_BINARY) VALUES (1014, ${<byte[]>[1, 2, 3, 4, 5]})`);
    sql:ExecutionResult|sql:Error badBit = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_BOOLEAN) VALUES (1014, ${new sql:BitValue(2)})`);
    check dbClient.close();
    test:assertEquals(row.C_DECIMAL, 42.00d, "int into DECIMAL");
    test:assertEquals(row.C_NUMERIC, 0.100d, "float into NUMERIC");
    test:assertEquals(row.C_INT, 12, "a decimal into INT is truncated by the driver");
    test:assertEquals(row.C_SMALLINT, 1, "boolean into SMALLINT");
    test:assertEquals(row.C_BOOLEAN, true, "1 into BOOLEAN");
    test:assertEquals(row.C_DECFLOAT16, 2.5);
    test:assertEquals(rounded.C_DECIMAL, 123.46d, "excess scale is rounded");
    test:assertEquals(rounded.C_BOOLEAN, true);
    assertDatabaseError(smallOverflow, "42815", -4461);
    assertDatabaseError(intOverflow, "42815", -4461);
    assertDatabaseError(decimalOverflow, "22003", -4220);
    assertDatabaseError(charOverflow, "22001", -302);
    assertDatabaseError(binaryOverflow, "22001", -302);
    test:assertTrue(badBit is sql:DataError, "only 0 and 1 are accepted for BIT");
}

@test:Config {
    groups: ["types"]
}
function testDecimalPrecisionLimits() returns error? {
    Client dbClient = check getClient();
    decimal d31 = 123456789012345678901.0123456789d;
    _ = check dbClient->execute(`INSERT INTO BALTEST.DEC_T VALUES (1, ${d31}, ${999999.9999d}, ${1e400d})`);
    _ = check dbClient->execute(`INSERT INTO BALTEST.DEC_T VALUES (2, ${-d31}, ${-0.0001d}, ${1e-400d})`);
    _ = check dbClient->execute(`INSERT INTO BALTEST.DEC_T VALUES (3, ${new sql:DecimalValue(1.5d)}, ${new sql:NumericValue(2)}, ${new sql:DecimalValue(1.5)})`);
    stream<DecimalRow, sql:Error?> resultStream = dbClient->query(`SELECT D, N, DF FROM BALTEST.DEC_T WHERE ID <= 3 ORDER BY ID`);
    DecimalRow[] rows = check from DecimalRow row in resultStream select row;
    check dbClient.close();
    test:assertEquals(rows[0], {D: d31, N: 999999.9999d, DF: 1e400d});
    test:assertEquals(rows[1], {D: -d31, N: -0.0001d, DF: 1e-400d});
    test:assertEquals(rows[2], {D: 1.5d, N: 2d, DF: 1.5d});
}

@test:Config {
    groups: ["types"]
}
function testQueryRowScalarsOfEveryType() returns error? {
    Client dbClient = check getClient();
    int i = check dbClient->queryRow(`SELECT C_BIGINT FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    int small = check dbClient->queryRow(`SELECT C_SMALLINT FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    decimal d = check dbClient->queryRow(`SELECT C_DECIMAL FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    string dString = check dbClient->queryRow(`SELECT C_DECIMAL FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    float f = check dbClient->queryRow(`SELECT C_DOUBLE FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    float r = check dbClient->queryRow(`SELECT C_REAL FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    decimal df = check dbClient->queryRow(`SELECT C_DECFLOAT16 FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    float dfFloat = check dbClient->queryRow(`SELECT C_DECFLOAT16 FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    int dfInt = check dbClient->queryRow(`SELECT C_DECFLOAT34 FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    string s = check dbClient->queryRow(`SELECT C_VARGRAPHIC FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    string clob = check dbClient->queryRow(`SELECT C_DBCLOB FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    byte[] b = check dbClient->queryRow(`SELECT C_BLOB FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    byte[] bit = check dbClient->queryRow(`SELECT C_CHAR_BIT FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    time:Date date = check dbClient->queryRow(`SELECT C_DATE FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    string dateString = check dbClient->queryRow(`SELECT C_DATE FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    time:TimeOfDay tod = check dbClient->queryRow(`SELECT C_TIME FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    time:Civil civil = check dbClient->queryRow(`SELECT C_TIMESTAMP FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    time:Utc utc = check dbClient->queryRow(`SELECT C_TIMESTAMP FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    string tsString = check dbClient->queryRow(`SELECT C_TIMESTAMP FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    int tsMillis = check dbClient->queryRow(`SELECT C_TIMESTAMP FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    boolean bool = check dbClient->queryRow(`SELECT C_BOOLEAN FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    string boolString = check dbClient->queryRow(`SELECT C_BOOLEAN FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    int boolInt = check dbClient->queryRow(`SELECT C_BOOLEAN FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    xml x = check dbClient->queryRow(`SELECT C_XML FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    string xString = check dbClient->queryRow(`SELECT XMLSERIALIZE(C_XML AS VARCHAR(100)) FROM BALTEST.DATA_TYPES WHERE ID = 1`);
    check dbClient.close();
    test:assertEquals(i, 9223372036854775807);
    test:assertEquals(small, 1);
    test:assertEquals(d, 12345678.91d);
    test:assertEquals(dString, "12345678.91");
    test:assertEquals(f, 2.5);
    test:assertEquals(r, 1.25);
    test:assertEquals(df, 123.456d);
    test:assertEquals(dfFloat, 123.456);
    test:assertEquals(dfInt, 1234567890);
    test:assertEquals(s, "日本語テキスト");
    test:assertEquals(clob, "dbclob 日本");
    test:assertEquals(b, [255, 238]);
    test:assertEquals(bit, [222, 173, 190, 239]);
    test:assertEquals(date, <time:Date>{year: 2026, month: 10, day: 29});
    test:assertEquals(dateString, "2026-10-29");
    test:assertEquals(tod, <time:TimeOfDay>{hour: 13, minute: 14, second: 15});
    test:assertEquals(civil, <time:Civil>{year: 2026, month: 10, day: 29, hour: 13, minute: 14, second: 15.123456d});
    test:assertEquals(time:utcToString(utc).substring(0, 19), "2026-10-29T13:14:15");
    test:assertEquals(tsString, "2026-10-29 13:14:15.123456");
    test:assertEquals(tsMillis, utc[0] * 1000 + <int>(utc[1] * 1000d), "a TIMESTAMP read as int is epoch milliseconds");
    test:assertEquals(bool, true);
    test:assertEquals(boolString, "true");
    test:assertEquals(boolInt, 1);
    test:assertEquals(x, xml `<employee><name>Ann</name></employee>`);
    test:assertEquals(xString, "<employee><name>Ann</name></employee>");
}

@test:Config {
    groups: ["types"]
}
function testEmptyStringIsNotNull() returns error? {
    Client dbClient = check getClient();
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_VARCHAR, C_CLOB, C_VARGRAPHIC, C_DBCLOB, C_VARBINARY, C_BLOB)
        VALUES (1015, ${""}, ${new sql:ClobValue("")}, ${new sql:NVarcharValue("")}, ${new sql:NClobValue("")},
        ${<byte[]>[]}, ${new sql:BlobValue(<byte[]>[])})`);
    record {|string? C_VARCHAR; string? C_CLOB; string? C_VARGRAPHIC; string? C_DBCLOB; byte[]? C_VARBINARY; byte[]? C_BLOB;|} row =
        check dbClient->queryRow(`SELECT C_VARCHAR, C_CLOB, C_VARGRAPHIC, C_DBCLOB, C_VARBINARY, C_BLOB FROM BALTEST.DATA_TYPES WHERE ID = 1015`);
    int matches = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.DATA_TYPES WHERE C_VARCHAR = ${""}`);
    int nulls = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.DATA_TYPES WHERE C_VARCHAR IS NULL AND ID = 2`);
    check dbClient.close();
    test:assertEquals(row, {C_VARCHAR: "", C_CLOB: "", C_VARGRAPHIC: "", C_DBCLOB: "", C_VARBINARY: <byte[]>[], C_BLOB: <byte[]>[]});
    test:assertEquals(matches, 1);
    test:assertEquals(nulls, 1);
}
