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

type StrRow record {|
    string? V;
    string? G;
    string? C;
|};

final string[] & readonly SPECIAL_STRINGS = [
    "O'Reilly",
    "it''s doubled",
    "\"double\" 'single' `back`",
    "back\\slash \\\\ two \\n not a newline",
    "line1\nline2\ttab\rcr",
    "nul\u{0}inside",
    "100%_wild%",
    "-- not a comment",
    "/* not a comment */",
    "; DROP TABLE BALTEST.STR_T; --",
    "' OR '1'='1",
    "x' UNION SELECT NULL --",
    "${not} a #template {fn now()} :named @var",
    "q? colon: braces{} brackets[] pipes|| amp&&",
    "café Ünïcödé ✓ ✗ → ∞",
    "日本語テキスト 中文 한국어",
    "😀🎉👍🏽 emoji",
    "e\u{0301} combining acute",
    "العربية עברית",
    "   leading and trailing   "
];

@test:Config {
    groups: ["special"]
}
function testSpecialCharactersRoundTripThroughParameters() returns error? {
    Client dbClient = check getClient();
    foreach string s in SPECIAL_STRINGS {
        _ = check dbClient->execute(`INSERT INTO BALTEST.STR_T (V, G, C) VALUES (${s}, ${new sql:NVarcharValue(s)}, ${new sql:ClobValue(s)})`);
        StrRow row = check dbClient->queryRow(`SELECT V, G, C FROM BALTEST.STR_T WHERE V = ${s}`);
        test:assertEquals(row, <StrRow>{V: s, G: s, C: s}, string `round trip of ${s.toBalString()}`);
        int matches = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T WHERE V = ${s} AND G = ${s}`);
        test:assertEquals(matches, 1, string `equality match of ${s.toBalString()}`);
    }
    int total = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T`);
    check dbClient.close();
    test:assertEquals(total, SPECIAL_STRINGS.length(), "the injection payloads were stored as data, not executed");
}

@test:Config {
    groups: ["special"],
    dependsOn: [testSpecialCharactersRoundTripThroughParameters]
}
function testInjectionPayloadsAreData() returns error? {
    Client dbClient = check getClient();
    string[] payloads = ["' OR '1'='1", "x' OR 1=1 --", "'; DELETE FROM BALTEST.STR_T; --", "1 UNION SELECT NULL, NULL, NULL"];
    foreach string payload in payloads {
        int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T WHERE V = ${payload}`);
        test:assertTrue(count <= 1, string `payload matched ${count} rows: ${payload}`);
        sql:ExecutionResult result = check dbClient->execute(`DELETE FROM BALTEST.STR_T WHERE V = ${payload} AND V = ${"never"}`);
        test:assertEquals(result.affectedRowCount, 0);
    }
    int total = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T`);
    check dbClient.close();
    test:assertEquals(total, SPECIAL_STRINGS.length());
}

@test:Config {
    groups: ["special"],
    dependsOn: [testSpecialCharactersRoundTripThroughParameters]
}
function testLikeWildcardsAndEscape() returns error? {
    Client dbClient = check getClient();
    // `%` and `_` inside a parameter are wildcards for LIKE unless escaped.
    int wildcard = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T WHERE V LIKE ${"100%"}`);
    int escaped = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T WHERE V LIKE ${"100\\%\\_wild%"} ESCAPE '\'`);
    int underscore = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T WHERE V LIKE ${"O'Reill_"}`);
    int literalUnderscore = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T WHERE V LIKE ${"O'Reill!_"} ESCAPE '!'`);
    int emoji = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T WHERE V LIKE ${"%🎉%"}`);
    int graphic = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.STR_T WHERE G LIKE ${"%中文%"}`);
    check dbClient.close();
    test:assertEquals(wildcard, 1);
    test:assertEquals(escaped, 1);
    test:assertEquals(underscore, 1);
    test:assertEquals(literalUnderscore, 0);
    test:assertEquals(emoji, 1);
    test:assertEquals(graphic, 1);
}

@test:Config {
    groups: ["special"]
}
function testSpecialTokensInTheSqlText() returns error? {
    Client dbClient = check getClient();
    // Question marks, braces, comments and colons in the literal SQL do not interfere with the parameters.
    record {|string Q; string FN; string CAT; int N;|} row = check dbClient->queryRow(
        `SELECT 'a?b' AS Q, {fn CONCAT(${"x"}, 'y?')} AS FN, '{' || ${"brace"} || '}' AS CAT, -- trailing ? comment
            /* block ? comment */ 1 + ${41} AS N
         FROM SYSIBM.SYSDUMMY1 WHERE 'it''s' = ${"it's"} AND ':x' = ':x'`);
    check dbClient.close();
    test:assertEquals(row, {Q: "a?b", FN: "xy?", CAT: "{brace}", N: 42});
}

@test:Config {
    groups: ["special"]
}
function testUntypedParameterMarkersNeedCasts() returns error? {
    Client dbClient = check getClient();
    // Db2 cannot infer the type of a lone parameter marker or of an ambiguous function argument.
    string|sql:Error lone = dbClient->queryRow(`SELECT ${"x"} FROM SYSIBM.SYSDUMMY1`);
    int|sql:Error ambiguous = dbClient->queryRow(`SELECT LENGTH(${"😀é"}) FROM SYSIBM.SYSDUMMY1`);
    string withCast = check dbClient->queryRow(`SELECT CAST(${"x"} AS VARCHAR(10)) FROM SYSIBM.SYSDUMMY1`);
    // LENGTH counts bytes for VARCHAR. An emoji is 4 bytes and é is 2 bytes in UTF-8.
    int bytes = check dbClient->queryRow(`SELECT LENGTH(CAST(${"😀é"} AS VARCHAR(10))) FROM SYSIBM.SYSDUMMY1`);
    int characters = check dbClient->queryRow(`SELECT CHARACTER_LENGTH(CAST(${"😀é"} AS VARCHAR(10)), CODEUNITS32) FROM SYSIBM.SYSDUMMY1`);
    check dbClient.close();
    assertDatabaseError(lone, "42610", -418);
    assertDatabaseError(ambiguous, "428F5", -245);
    test:assertEquals(withCast, "x");
    test:assertEquals(bytes, 6);
    test:assertEquals(characters, 2);
}

@test:Config {
    groups: ["special"]
}
function testLengthLimitsAreBytesForVarcharAndCodeUnitsForGraphic() returns error? {
    Client dbClient = check getClient();
    string twelveEmoji = repeat("😀", 12);
    string thirteenEmoji = repeat("😀", 13);
    // VARCHAR(50) holds 50 bytes: 12 emoji are 48 bytes, 13 are 52.
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_VARCHAR) VALUES (1101, ${twelveEmoji})`);
    sql:ExecutionResult|sql:Error tooLong = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_VARCHAR) VALUES (1102, ${thirteenEmoji})`);
    // GRAPHIC(5) holds 5 UTF-16 code units: 2 emoji are 4 units, 3 are 6.
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_GRAPHIC) VALUES (1103, ${"😀😀"})`);
    sql:ExecutionResult|sql:Error graphicTooLong = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_GRAPHIC) VALUES (1104, ${"😀😀😀"})`);
    // 50 ASCII characters fit, 51 do not.
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_VARCHAR) VALUES (1105, ${repeat("a", 50)})`);
    sql:ExecutionResult|sql:Error asciiTooLong = dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_VARCHAR) VALUES (1106, ${repeat("a", 51)})`);
    string stored = check dbClient->queryRow(`SELECT C_VARCHAR FROM BALTEST.DATA_TYPES WHERE ID = 1101`);
    string graphic = check dbClient->queryRow(`SELECT C_GRAPHIC FROM BALTEST.DATA_TYPES WHERE ID = 1103`);
    check dbClient.close();
    test:assertEquals(stored, twelveEmoji);
    test:assertEquals(graphic, "😀😀 ");
    assertDatabaseError(tooLong, "22001", -302);
    assertDatabaseError(graphicTooLong, "22001", -302);
    assertDatabaseError(asciiTooLong, "22001", -302);
}

@test:Config {
    groups: ["special"]
}
function testQuotedIdentifiers() returns error? {
    Client dbClient = check getClient();
    _ = check dbClient->execute(`INSERT INTO BALTEST."Mixed Case" ("a b", "select", "ünï", "q""q") VALUES (${1}, ${"kw"}, ${2}, ${3})`);
    record {} open = check dbClient->queryRow(`SELECT * FROM BALTEST."Mixed Case"`);
    record {|int 'a\ b; string 'select; int 'ünï;|} closed = check dbClient->queryRow(`SELECT "a b", "select", "ünï" FROM BALTEST."Mixed Case"`);
    int viaWhere = check dbClient->queryRow(`SELECT "ünï" FROM BALTEST."Mixed Case" WHERE "select" = ${"kw"} AND "q""q" = ${3}`);
    // Unquoted identifiers are folded to upper case, quoted ones keep their case.
    record {} aliases = check dbClient->queryRow(`SELECT ID AS "my id", NAME AS lower_alias, NAME AS "MiXeD" FROM BALTEST.EMPLOYEE WHERE ID = 1`);
    record {|int 'my\ id; string LOWER_ALIAS; string MiXeD;|} typedAliases = check dbClient->queryRow(
        `SELECT ID AS "my id", NAME AS lower_alias, NAME AS "MiXeD" FROM BALTEST.EMPLOYEE WHERE ID = 1`);
    check dbClient.close();
    test:assertEquals(open, {"a b": 1, "select": "kw", "ünï": 2, "q\"q": 3});
    test:assertEquals(closed, {'a\ b: 1, 'select: "kw", 'ünï: 2});
    test:assertEquals(viaWhere, 2);
    test:assertEquals(aliases, {"my id": 1, "LOWER_ALIAS": "Ann", "MiXeD": "Ann"});
    test:assertEquals(typedAliases, {'my\ id: 1, LOWER_ALIAS: "Ann", MiXeD: "Ann"});
}

@test:Config {
    groups: ["special"]
}
function testXmlWithSpecialContent() returns error? {
    Client dbClient = check getClient();
    xml doc = xml `<r a="it's &quot;q&quot;" xmlns:p="urn:p"><p:t>tom &amp; jerry &lt;3 é 😀</p:t><![CDATA[<raw> & stuff]]><e/></r>`;
    sql:ExecutionResult result = check dbClient->execute(`INSERT INTO BALTEST.STR_T (V, X) VALUES (${"xml"}, ${doc})`);
    xml stored = check dbClient->queryRow(`SELECT X FROM BALTEST.STR_T WHERE ID = ${result.lastInsertId}`);
    string serialized = check dbClient->queryRow(`SELECT XMLSERIALIZE(X AS VARCHAR(500)) FROM BALTEST.STR_T WHERE ID = ${result.lastInsertId}`);
    string viaXquery = check dbClient->queryRow(`SELECT XMLCAST(XMLQUERY('declare namespace p="urn:p"; $X/r/p:t/text()' PASSING X AS "X") AS VARCHAR(100))
        FROM BALTEST.STR_T WHERE ID = ${result.lastInsertId}`);
    // Only well-formed documents can be stored.
    sql:ExecutionResult|sql:Error textOnly = dbClient->execute(`INSERT INTO BALTEST.STR_T (V, X) VALUES (${"bad"}, ${xml `just text`})`);
    sql:ExecutionResult|sql:Error twoRoots = dbClient->execute(`INSERT INTO BALTEST.STR_T (V, X) VALUES (${"bad"}, ${xml `<a/><b/>`})`);
    check dbClient.close();
    xml:Element root = <xml:Element>stored;
    test:assertEquals(root.getAttributes()["a"], (<xml:Element>doc).getAttributes()["a"]);
    xml children = root.getChildren();
    test:assertEquals(children.elements()[0].data(), "tom & jerry <3 é 😀");
    test:assertTrue(children.data().includes("<raw> & stuff"), "CDATA content survives as text");
    test:assertTrue(serialized.includes("&amp;"), serialized);
    test:assertEquals(viaXquery, "tom & jerry <3 é 😀");
    assertDatabaseError(textOnly, "2200M");
    assertDatabaseError(twoRoots, "2200M");
}

@test:Config {
    groups: ["special", "call"],
    dependsOn: [testSpecialCharactersRoundTripThroughParameters]
}
function testSpecialCharactersThroughProcedureParameters() returns error? {
    Client dbClient = check getClient();
    foreach string s in ["O'Reilly", "; DROP TABLE BALTEST.STR_T; --", "😀🎉👍🏽 emoji", "日本語テキスト 中文 한국어"] {
        sql:IntegerOutParameter count = new;
        sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.COUNT_NAME(${s}, ${count})`);
        test:assertEquals(check count.get(int), 1, s);
        check result.close();
    }
    sql:IntegerOutParameter none = new;
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.COUNT_NAME(${"missing"}, ${none})`);
    test:assertEquals(check none.get(int), 0);
    check result.close();
    check dbClient.close();
}

@test:Config {
    groups: ["special"]
}
function testQueryConcatKeepsSpecialCharacters() returns error? {
    Client dbClient = check getClient();
    string name = "O'Reilly; --";
    sql:ParameterizedQuery base = `SELECT COUNT(*) FROM BALTEST.STR_T WHERE 1 = 1`;
    sql:ParameterizedQuery filter = ` AND V = ${name}`;
    sql:ParameterizedQuery combined = sql:queryConcat(base, filter, ` AND G = ${name}`);
    int count = check dbClient->queryRow(combined);
    sql:ParameterizedQuery literalOnly = ``;
    literalOnly.strings = ["SELECT COUNT(*) FROM BALTEST.STR_T WHERE V = 'O''Reilly; --'"];
    int literal = check dbClient->queryRow(literalOnly);
    check dbClient.close();
    test:assertEquals(count, 0, "nothing stored with both columns equal to this name");
    test:assertEquals(literal, 0);
}

@test:Config {
    groups: ["special"]
}
function testMultipleStatementsInOneQueryAreRejected() returns error? {
    Client dbClient = check getClient();
    sql:ExecutionResult|sql:Error result = dbClient->execute(`INSERT INTO BALTEST.BATCH_T VALUES (600001, 'a'); INSERT INTO BALTEST.BATCH_T VALUES (600002, 'b')`);
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BATCH_T WHERE ID > 600000`);
    // A single trailing semicolon is accepted by the driver.
    int one = check dbClient->queryRow(`SELECT 1 FROM SYSIBM.SYSDUMMY1;`);
    check dbClient.close();
    assertDatabaseError(result, "42601", -104);
    test:assertEquals(count, 0);
    test:assertEquals(one, 1);
}

@test:Config {
    groups: ["special"]
}
function testBinaryWithEveryByteValue() returns error? {
    Client dbClient = check getClient();
    byte[] allBytes = from int i in 0 ... 255 select <byte>i;
    _ = check dbClient->execute(`INSERT INTO BALTEST.DATA_TYPES (ID, C_BLOB, C_VARBINARY) VALUES (1107, ${allBytes}, ${allBytes.slice(0, 16)})`);
    record {|byte[] C_BLOB; byte[] C_VARBINARY;|} row = check dbClient->queryRow(`SELECT C_BLOB, C_VARBINARY FROM BALTEST.DATA_TYPES WHERE ID = 1107`);
    int matches = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.DATA_TYPES WHERE C_VARBINARY = ${allBytes.slice(0, 16)}`);
    check dbClient.close();
    test:assertEquals(row.C_BLOB, allBytes);
    test:assertEquals(row.C_VARBINARY, allBytes.slice(0, 16));
    test:assertEquals(matches, 1);
}

function repeat(string s, int times) returns string {
    string result = "";
    foreach int _ in 1 ... times {
        result += s;
    }
    return result;
}
