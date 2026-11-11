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

type Bytes byte[];

type Xml xml;

@test:Config {
    groups: ["call", "types"]
}
function testOutParametersOfEveryType() returns error? {
    Client dbClient = check getClient();
    sql:SmallIntOutParameter si = new;
    sql:IntegerOutParameter i = new;
    sql:BigIntOutParameter bi = new;
    sql:DecimalOutParameter dec = new;
    sql:DecimalOutParameter df = new;
    sql:RealOutParameter r = new;
    sql:DoubleOutParameter d = new;
    sql:CharOutParameter ch = new;
    sql:VarcharOutParameter vc = new;
    sql:ClobOutParameter cl = new;
    sql:NCharOutParameter g = new;
    sql:NVarcharOutParameter vg = new;
    sql:NClobOutParameter dbc = new;
    BinaryOutParameter b = new;
    VarBinaryOutParameter vb = new;
    BlobOutParameter bl = new;
    sql:DateOutParameter dt = new;
    sql:TimeOutParameter tm = new;
    sql:TimestampOutParameter ts = new;
    sql:DateTimeOutParameter ts12 = new;
    sql:BooleanOutParameter bool = new;
    XmlOutParameter x = new;
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.ALL_OUT(${si}, ${i}, ${bi}, ${dec}, ${df}, ${r},
        ${d}, ${ch}, ${vc}, ${cl}, ${g}, ${vg}, ${dbc}, ${b}, ${vb}, ${bl}, ${dt}, ${tm}, ${ts}, ${ts12}, ${bool}, ${x})`);
    test:assertEquals(check si.get(int), -32768);
    test:assertEquals(check i.get(int), 2147483647);
    test:assertEquals(check bi.get(int), -9223372036854775807);
    test:assertEquals(check dec.get(decimal), 12345678.91d);
    test:assertEquals(check dec.get(string), "12345678.91");
    test:assertEquals(check df.get(decimal), 1234567890.123456789012345678901234d, "DECFLOAT through DecimalOutParameter");
    test:assertEquals(check r.get(float), 1.25);
    test:assertEquals(check d.get(float), -2.5);
    test:assertEquals(check ch.get(string), "ab   ");
    test:assertEquals(check vc.get(string), "O'Reilly \"x\"");
    test:assertEquals(check cl.get(string), "clob out");
    test:assertEquals(check g.get(string), "日本語");
    test:assertEquals(check vg.get(string), "ユニコード");
    test:assertEquals(check dbc.get(string), "dbclob 日本");
    test:assertEquals(check b.get(Bytes), [1, 2, 3, 4]);
    test:assertEquals(check vb.get(Bytes), [10, 11, 255]);
    test:assertEquals(check bl.get(Bytes), [255, 238]);
    test:assertEquals(check dt.get(time:Date), <time:Date>{year: 2024, month: 2, day: 29});
    test:assertEquals(check dt.get(string), "2024-02-29");
    test:assertEquals(check tm.get(time:TimeOfDay), <time:TimeOfDay>{hour: 23, minute: 59, second: 59});
    test:assertEquals(check ts.get(time:Civil), <time:Civil>{year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12.123456d});
    test:assertEquals(check ts12.get(time:Civil), CIVIL_12, "TIMESTAMP(12) keeps nanoseconds");
    test:assertEquals(check ts12.get(string), "2024-02-29 10:11:12.123456789");
    test:assertEquals(check bool.get(boolean), true);
    test:assertEquals(check x.get(Xml), xml `<a b="1">t &amp; u</a>`);
    test:assertEquals(check x.get(string), "<a b=\"1\">t &amp; u</a>");
    check result.close();
    check dbClient.close();
}

@test:Config {
    groups: ["call", "types"]
}
function testInParametersOfEveryTypeAreEchoed() returns error? {
    Client dbClient = check getClient();
    sql:IntegerOutParameter oI = new;
    sql:DecimalOutParameter oDec = new;
    sql:DoubleOutParameter oDf = new;
    sql:VarcharOutParameter oV = new;
    sql:NVarcharOutParameter oG = new;
    VarBinaryOutParameter oB = new;
    sql:DateOutParameter oDt = new;
    sql:TimeOutParameter oTm = new;
    sql:TimestampOutParameter oTs = new;
    sql:BooleanOutParameter oBool = new;
    XmlOutParameter oX = new;
    time:Civil civil = {year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12.123456789d};
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.ECHO_TYPES(${42}, ${oI}, ${12.5d}, ${oDec},
        ${new sql:DecimalValue(1e20d)}, ${oDf}, ${"it's \"quoted\" \\ 😀"}, ${oV}, ${new sql:NVarcharValue("日本語 ✓")}, ${oG},
        ${<byte[]>[0, 255, 7]}, ${oB}, ${<time:Date>{year: 2024, month: 2, day: 29}}, ${oDt},
        ${<time:TimeOfDay>{hour: 1, minute: 2, second: 3}}, ${oTm}, ${civil}, ${oTs}, ${false}, ${oBool},
        ${xml `<p:a xmlns:p="urn:p"><p:b>é &amp; ü</p:b></p:a>`}, ${oX})`);
    test:assertEquals(check oI.get(int), 42);
    test:assertEquals(check oDec.get(decimal), 12.50d);
    test:assertEquals(check oDf.get(float), 1e20);
    test:assertEquals(check oV.get(string), "it's \"quoted\" \\ 😀");
    test:assertEquals(check oG.get(string), "日本語 ✓");
    test:assertEquals(check oB.get(Bytes), [0, 255, 7]);
    test:assertEquals(check oDt.get(time:Date), <time:Date>{year: 2024, month: 2, day: 29});
    test:assertEquals(check oTm.get(time:TimeOfDay), <time:TimeOfDay>{hour: 1, minute: 2, second: 3});
    test:assertEquals(check oTs.get(time:Civil), civil);
    test:assertEquals(check oBool.get(boolean), false);
    xml echoed = check oX.get(Xml);
    test:assertEquals((echoed/*).data(), "é & ü");
    check result.close();
    check dbClient.close();
}

@test:Config {
    groups: ["call", "types"]
}
function testInOutParametersWithValues() returns error? {
    Client dbClient = check getClient();
    sql:InOutParameter v = new ("O'Reilly \"x\" 😀");
    sql:InOutParameter n = new (1.5d);
    sql:InOutParameter ts = new (<time:Civil>{year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12.5d});
    sql:InOutParameter x = new (xml `<a/>`);
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.ECHO_INOUT(${v}, ${n}, ${ts}, ${x})`);
    test:assertEquals(check v.get(string), "O'Reilly \"x\" 😀!");
    test:assertEquals(check n.get(decimal), 2.50d);
    test:assertEquals(check ts.get(time:Civil), <time:Civil>{year: 2024, month: 3, day: 1, hour: 10, minute: 11, second: 12.5d});
    // The SQL module cannot convert an XML INOUT value to `xml`, so it is returned as a string.
    test:assertEquals(check x.get(string), "<a/>");
    check result.close();
    check dbClient.close();
}

@test:Config {
    groups: ["call", "types"]
}
function testInOutParametersWithTypedValues() returns error? {
    Client dbClient = check getClient();
    sql:InOutParameter v = new (new sql:VarcharValue("typed"));
    sql:InOutParameter n = new (new sql:DecimalValue(7));
    sql:InOutParameter ts = new (new sql:TimestampValue("2024-02-29 10:11:12"));
    sql:InOutParameter x = new (xml `<b>1</b>`);
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.ECHO_INOUT(${v}, ${n}, ${ts}, ${x})`);
    test:assertEquals(check v.get(string), "typed!");
    test:assertEquals(check n.get(decimal), 8.00d);
    test:assertEquals(check ts.get(string), "2024-03-01 10:11:12.0");
    test:assertEquals(xml:fromString(check x.get(string)), xml `<b>1</b>`);
    check result.close();
    check dbClient.close();
}

@test:Config {
    groups: ["call", "types"]
}
function testInOutParametersWithNil() returns error? {
    Client dbClient = check getClient();
    sql:InOutParameter v = new (());
    sql:InOutParameter n = new (());
    sql:InOutParameter ts = new (());
    sql:InOutParameter x = new (());
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.ECHO_INOUT(${v}, ${n}, ${ts}, ${x})`);
    // A nil has no SQL type, so the parameter is registered as VARCHAR and its value comes back as a string.
    test:assertEquals(check v.get(string), "was null!");
    test:assertEquals(check n.get(string), "1.00");
    test:assertEquals(check ts.get(string), "2000-01-02 00:00:00.0");
    test:assertEquals(check x.get(string), "<null/>");
    check result.close();
    // A typed null keeps the SQL type of the parameter.
    sql:InOutParameter typedN = new (new sql:DecimalValue());
    sql:InOutParameter typedTs = new (new sql:TimestampValue());
    sql:ProcedureCallResult typed = check dbClient->call(`CALL BALTEST.ECHO_INOUT(${v}, ${typedN}, ${typedTs}, ${x})`);
    test:assertEquals(check typedN.get(decimal), 1.00d);
    test:assertEquals(check typedTs.get(time:Civil), <time:Civil>{year: 2000, month: 1, day: 2, hour: 0, minute: 0, second: 0d});
    check typed.close();
    check dbClient.close();
}

@test:Config {
    groups: ["call", "types"]
}
function testBooleanOutParameters() returns error? {
    Client dbClient = check getClient();
    sql:BooleanOutParameter same = new;
    sql:BooleanOutParameter not = new;
    sql:BooleanOutParameter nil = new;
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.BOOL_OUT(${true}, ${same}, ${not}, ${nil})`);
    test:assertEquals(check same.get(boolean), true);
    test:assertEquals(check not.get(boolean), false);
    test:assertEquals(check same.get(int), 1);
    test:assertEquals(check not.get(string), "false");
    // The SQL module cannot return a nil from a typed `get`, so a NULL OUT value panics with a type cast error.
    anydata|error nilValue = trap nil.get(boolean);
    test:assertTrue(nilValue is error || nilValue is (), "a NULL boolean OUT value must not be read as false");
    check result.close();
    sql:BitOutParameter bit = new;
    sql:ProcedureCallResult viaBit = check dbClient->call(`CALL BALTEST.BOOL_OUT(${new sql:BooleanValue(false)}, ${bit}, ${not}, ${nil})`);
    test:assertEquals(check bit.get(boolean), false);
    test:assertEquals(check not.get(boolean), true);
    check viaBit.close();
    check dbClient.close();
}

@test:Config {
    groups: ["call", "types"]
}
function testDecFloatSpecialValuesAsOutParameters() returns error? {
    Client dbClient = check getClient();
    sql:DecimalOutParameter nanAsDecimal = new;
    sql:VarcharOutParameter infAsString = new;
    sql:DoubleOutParameter bigAsFloat = new;
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.DECFLOAT_OUT(${nanAsDecimal}, ${infAsString}, ${bigAsFloat})`);
    decimal|sql:Error nan = nanAsDecimal.get(decimal);
    test:assertTrue(nan is sql:Error, "NaN has no decimal representation");
    test:assertEquals(check infAsString.get(string), "-Infinity");
    test:assertEquals(check bigAsFloat.get(float), 1e300);
    check result.close();
    sql:DoubleOutParameter nanAsFloat = new;
    sql:DoubleOutParameter infAsFloat = new;
    sql:DecimalOutParameter bigAsDecimal = new;
    sql:ProcedureCallResult asFloats = check dbClient->call(`CALL BALTEST.DECFLOAT_OUT(${nanAsFloat}, ${infAsFloat}, ${bigAsDecimal})`);
    test:assertTrue((check nanAsFloat.get(float)).isNaN());
    test:assertEquals(check infAsFloat.get(float), -float:Infinity);
    test:assertEquals(check bigAsDecimal.get(decimal), 1e300d);
    check asFloats.close();
    check dbClient.close();
}

@test:Config {
    groups: ["call", "types"]
}
function testProcedureResultSetUsesDb2TypeMapping() returns error? {
    Client dbClient = check getClient();
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.ALL_TYPES_RS()`, [AllTypesOptionalRow]);
    stream<record {}, sql:Error?>? resultSet = result.queryResult;
    if resultSet is () {
        test:assertFail("Expected a result set");
    }
    record {}[] rows = check from record {} row in resultSet select row;
    check result.close();
    // The same row read with an open record, which relies on the Db2 mapping of DECFLOAT and XML.
    sql:ProcedureCallResult open = check dbClient->call(`CALL BALTEST.ALL_TYPES_RS()`);
    stream<record {}, sql:Error?>? openSet = open.queryResult;
    if openSet is () {
        test:assertFail("Expected a result set");
    }
    record {}[] openRows = check from record {} row in openSet select row;
    check open.close();
    check dbClient.close();
    AllTypesOptionalRow row = check rows[0].cloneWithType();
    test:assertEquals(row.C_DECFLOAT34, 1234567890.123456789012345678901234d);
    test:assertEquals(row.C_XML, xml `<employee><name>Ann</name></employee>`);
    test:assertEquals(row.C_TIMESTAMP12, <time:Civil>{year: 2026, month: 10, day: 29, hour: 13, minute: 14, second: 15.123456789d});
    test:assertEquals(row.C_GRAPHIC, "ｱｲｳ  ");
    test:assertEquals(row.C_CHAR_BIT, [222, 173, 190, 239]);
    test:assertEquals(row.C_BOOLEAN, true);
    test:assertEquals(openRows[0]["C_DECFLOAT16"], 123.456d);
    test:assertEquals(openRows[0]["C_XML"], xml `<employee><name>Ann</name></employee>`);
    test:assertEquals(openRows[0]["C_BOOLEAN"], true);
    test:assertTrue(openRows[0]["C_BLOB"] is byte[]);
}

type EngineerRow record {|
    int ID;
    string NAME;
|};

type TotalRow record {|
    int TOTAL;
|};

@test:Config {
    groups: ["call"]
}
function testProcedureWithInsertResultSetsAndOutParameter() returns error? {
    Client dbClient = check getClient();
    int before = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EXEC_T`);
    sql:IntegerOutParameter count = new;
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.MIXED_RESULTS(${"from proc 😀"}, ${count})`,
        [EngineerRow, TotalRow]);
    stream<record {}, sql:Error?>? first = result.queryResult;
    if first is () {
        test:assertFail("Expected the first result set");
    }
    EngineerRow[] engineers = check from record {} row in first select check row.cloneWithType();
    test:assertTrue(check result.getNextQueryResult());
    stream<record {}, sql:Error?>? second = result.queryResult;
    if second is () {
        test:assertFail("Expected the second result set");
    }
    TotalRow[] totals = check from record {} row in second select check row.cloneWithType();
    test:assertFalse(check result.getNextQueryResult());
    int outCount = check count.get(int);
    check result.close();
    string inserted = check dbClient->queryRow(`SELECT NAME FROM BALTEST.EXEC_T WHERE NAME = ${"from proc 😀"}`);
    check dbClient.close();
    test:assertTrue(engineers.length() >= 3);
    test:assertEquals(engineers[0], {ID: 1, NAME: "Ann"});
    test:assertEquals(totals[0].TOTAL, before + 1);
    test:assertEquals(outCount, before + 1);
    test:assertEquals(inserted, "from proc 😀");
}

@test:Config {
    groups: ["call"]
}
function testWrongNumberOfRowTypes() returns error? {
    Client dbClient = check getClient();
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.TWO_RESULT_SETS()`, [EngineerRow]);
    boolean|sql:Error next = result.getNextQueryResult();
    check result.close();
    check dbClient.close();
    test:assertTrue(next is sql:Error, "a second result set without a row type must be an error");
}

@test:Config {
    groups: ["call"]
}
function testProcedureSignalsError() returns error? {
    Client dbClient = check getClient();
    sql:ProcedureCallResult|sql:Error result = dbClient->call(`CALL BALTEST.RAISE_ERR(${"custom failure 😀"})`);
    check dbClient.close();
    assertDatabaseError(result, "75001", -438);
    test:assertTrue((<sql:Error>result).message().includes("custom failure 😀"), (<sql:Error>result).message());
}

@test:Config {
    groups: ["call"]
}
function testJdbcCallEscapeSyntax() returns error? {
    Client dbClient = check getClient();
    sql:InOutParameter value = new (2d);
    sql:VarcharOutParameter label = new;
    sql:ProcedureCallResult result = check dbClient->call(`{CALL BALTEST.SCALE_VALUE(${value}, ${5}, ${label})}`);
    test:assertEquals(check value.get(decimal), 10.00d);
    test:assertEquals(check label.get(string), "scaled by 5");
    check result.close();
    sql:ProcedureCallResult quoted = check dbClient->call(`CALL "BALTEST"."SCALE_VALUE"(${value}, ${2}, ${label})`);
    test:assertEquals(check value.get(decimal), 4.00d);
    check quoted.close();
    check dbClient.close();
}

@test:Config {
    groups: ["call", "transaction"]
}
function testProcedureCallInsideTransactionIsRolledBack() returns error? {
    Client dbClient = check getClient();
    int before = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EMPLOYEE`);
    boolean abort = true;
    transaction {
        sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.ADD_EMPLOYEE(${"Rolled"}, ${"OPS"})`);
        check result.close();
        if abort {
            rollback;
        } else {
            check commit;
        }
    }
    int afterRollback = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EMPLOYEE`);
    transaction {
        sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.ADD_EMPLOYEE(${"Committed"}, ${"OPS"})`);
        check result.close();
        check commit;
    }
    int afterCommit = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EMPLOYEE`);
    check dbClient.close();
    test:assertEquals(afterRollback, before);
    test:assertEquals(afterCommit, before + 1);
}

@test:Config {
    groups: ["call"]
}
function testProcedureResultSetStreamedPartially() returns error? {
    Client dbClient = check getClient();
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.TWO_RESULT_SETS()`);
    stream<record {}, sql:Error?>? first = result.queryResult;
    if first is () {
        test:assertFail("Expected a result set");
    }
    // Read only one row and close the call. The statement and connection must be released cleanly.
    record {|record {} value;|}? row = check first.next();
    test:assertTrue(row is record {|record {} value;|});
    check result.close();
    // The connection is usable again.
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EMPLOYEE`);
    test:assertTrue(count > 0);
    check dbClient.close();
}

@test:Config {
    groups: ["call", "types"]
}
function testSqlBinaryOutParametersAreRejectedWithGuidance() returns error? {
    Client dbClient = check getClient();
    sql:BinaryOutParameter b = new;
    sql:ProcedureCallResult|sql:Error result = dbClient->call(`CALL BALTEST.PREC_OUT_BINARY(${b})`);
    check dbClient.close();
    test:assertTrue(result is sql:DataError, "expected a DataError");
    test:assertTrue((<sql:Error>result).message().includes("db2:BinaryOutParameter"), (<sql:Error>result).message());
}
