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

type Batch2Row record {|
    int ID;
    string? V;
    decimal? D;
    time:Civil? TS;
    byte[]? B;
    xml? X;
    boolean? BOOL;
|};

@test:Config {
    groups: ["batch", "types"]
}
function testBatchWithEveryColumnType() returns error? {
    Client dbClient = check getClient();
    time:Civil civil = {year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12.123456789d};
    sql:ParameterizedQuery[] inserts = [
        // Plain Ballerina values.
        `INSERT INTO BALTEST.BATCH2_T (ID, V, D, TS, B, X, BOOL) VALUES (${1}, ${"plain ✓"}, ${1.5d}, ${civil}, ${<byte[]>[1, 2]}, ${xml `<a/>`}, ${true})`,
        // Nils in every column.
        `INSERT INTO BALTEST.BATCH2_T (ID, V, D, TS, B, X, BOOL) VALUES (${2}, ${()}, ${()}, ${()}, ${()}, ${()}, ${()})`,
        // Typed values and typed nulls.
        `INSERT INTO BALTEST.BATCH2_T (ID, V, D, TS, B, X, BOOL) VALUES (${3}, ${new sql:VarcharValue("typed")}, ${new sql:DecimalValue(2.25d)}, ${new sql:TimestampValue("2024-02-29 10:11:12.5")}, ${new sql:BlobValue([3])}, ${xml `<b>x</b>`}, ${new sql:BooleanValue(false)})`,
        `INSERT INTO BALTEST.BATCH2_T (ID, V, D, TS, B, X, BOOL) VALUES (${4}, ${new sql:VarcharValue()}, ${new sql:DecimalValue()}, ${new sql:TimestampValue()}, ${new sql:BlobValue()}, ${()}, ${new sql:BooleanValue()})`,
        // The Java types of the parameters change between rows.
        `INSERT INTO BALTEST.BATCH2_T (ID, V, D, TS, B, X, BOOL) VALUES (${5}, ${"int for decimal"}, ${7}, ${"2024-02-29-10.11.12"}, ${new sql:VarBinaryValue([5])}, ${xml `<c/>`}, ${1})`
    ];
    sql:ExecutionResult[] results = check dbClient->batchExecute(inserts);
    stream<Batch2Row, sql:Error?> rows = dbClient->query(`SELECT * FROM BALTEST.BATCH2_T ORDER BY ID`);
    Batch2Row[] stored = check from Batch2Row row in rows select row;
    check dbClient.close();
    test:assertEquals(results.map(r => r.affectedRowCount), [1, 1, 1, 1, 1]);
    test:assertEquals(stored.length(), 5);
    test:assertEquals(stored[0], {ID: 1, V: "plain ✓", D: 1.5d, TS: civil, B: [1, 2], X: xml `<a/>`, BOOL: true});
    test:assertEquals(stored[1], {ID: 2, V: (), D: (), TS: (), B: (), X: (), BOOL: ()});
    test:assertEquals(stored[2], {ID: 3, V: "typed", D: 2.25d, TS: {year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12.5d}, B: [3], X: xml `<b>x</b>`, BOOL: false});
    test:assertEquals(stored[3], {ID: 4, V: (), D: (), TS: (), B: (), X: (), BOOL: ()});
    test:assertEquals(stored[4], {ID: 5, V: "int for decimal", D: 7d, TS: {year: 2024, month: 2, day: 29, hour: 10, minute: 11, second: 12d}, B: [5], X: xml `<c/>`, BOOL: true});
}

@test:Config {
    groups: ["batch"]
}
function testBatchGeneratedKeysAreNotReturned() returns error? {
    Client dbClient = check getClient();
    sql:ParameterizedQuery[] inserts = from int i in 1 ... 3
        select `INSERT INTO BALTEST.EXEC_T (NAME, AMOUNT) VALUES (${"batch " + i.toString()}, ${<decimal>i})`;
    sql:ExecutionResult[] results = check dbClient->batchExecute(inserts);
    sql:ExecutionResult single = check dbClient->execute(`INSERT INTO BALTEST.EXEC_T (NAME) VALUES (${"single"})`);
    check dbClient.close();
    test:assertEquals(results.map(r => r.affectedRowCount), [1, 1, 1]);
    // The Db2 driver does not report the generated keys of a batch, so `lastInsertId` is nil in every result.
    test:assertEquals(results.map(r => r.lastInsertId), [(), (), ()]);
    test:assertTrue(single.lastInsertId is int, "a single insert does return its identity value");
}

@test:Config {
    groups: ["batch"]
}
function testBatchLargerThanTheInternalChunkSize() returns error? {
    Client dbClient = check getClient();
    // The SQL module sends batches in chunks of 1000 statements.
    sql:ParameterizedQuery[] inserts = from int i in 1 ... 2500
        select `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${100000 + i}, ${"row " + i.toString()})`;
    sql:ExecutionResult[] results = check dbClient->batchExecute(inserts);
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BATCH_T WHERE ID > 100000`);
    string last = check dbClient->queryRow(`SELECT NAME FROM BALTEST.BATCH_T WHERE ID = 102500`);
    _ = check dbClient->execute(`DELETE FROM BALTEST.BATCH_T WHERE ID > 100000`);
    check dbClient.close();
    test:assertEquals(results.length(), 2500);
    test:assertTrue(results.every(r => r.affectedRowCount == 1));
    test:assertEquals(count, 2500);
    test:assertEquals(last, "row 2500");
}

@test:Config {
    groups: ["batch"]
}
function testBatchErrorReportsEveryFailedStatement() returns error? {
    Client dbClient = check getClient();
    sql:ParameterizedQuery[] inserts = [
        `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${200001}, ${"ok"})`,
        `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${200001}, ${"duplicate key"})`,
        `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${200002}, ${"ok"})`,
        `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${200003}, ${"this name is longer than twenty characters"})`,
        `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${200004}, ${"ok"})`
    ];
    sql:ExecutionResult[]|sql:Error result = dbClient->batchExecute(inserts);
    int stored = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BATCH_T WHERE ID BETWEEN 200001 AND 200004`);
    _ = check dbClient->execute(`DELETE FROM BALTEST.BATCH_T WHERE ID BETWEEN 200001 AND 200004`);
    check dbClient.close();
    if result !is sql:BatchExecuteError {
        test:assertFail(string `Expected sql:BatchExecuteError, found: ${result is error ? result.message() : "success"}`);
    }
    sql:ExecutionResult[] executionResults = result.detail().executionResults;
    // Db2 keeps executing after a failed statement and reports -3 (EXECUTE_FAILED) for each failure.
    test:assertEquals(executionResults.map(r => r.affectedRowCount), [1, -3, 1, -3, 1]);
    test:assertEquals(stored, 3, "the statements that did not fail are applied");
    // The driver reports the batch failure itself (-4229); the per-statement causes are chained exceptions
    // that the SQL module does not expose yet.
    test:assertEquals(result.detail().errorCode, -4229, result.message());
    test:assertTrue(result.message().includes("Batch failure"), result.message());
}

@test:Config {
    groups: ["batch"]
}
function testBatchRejectsDifferentStatements() returns error? {
    Client dbClient = check getClient();
    sql:ExecutionResult[]|sql:Error result = dbClient->batchExecute([
        `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${300001}, ${"a"})`,
        `UPDATE BALTEST.BATCH_T SET NAME = ${"b"} WHERE ID = ${300001}`
    ]);
    check dbClient.close();
    test:assertTrue(result is sql:ApplicationError, "expected an ApplicationError");
    test:assertTrue((<sql:Error>result).message().includes("different SQL"), (<sql:Error>result).message());
}

@test:Config {
    groups: ["batch"]
}
function testBatchUpdateCountsIncludeZero() returns error? {
    Client dbClient = check getClient();
    _ = check dbClient->execute(`INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (300010, 'u')`);
    sql:ExecutionResult[] results = check dbClient->batchExecute([
        `UPDATE BALTEST.BATCH_T SET NAME = ${"hit"} WHERE ID = ${300010}`,
        `UPDATE BALTEST.BATCH_T SET NAME = ${"miss"} WHERE ID = ${300011}`,
        `UPDATE BALTEST.BATCH_T SET NAME = ${"hit again"} WHERE ID = ${300010}`
    ]);
    sql:ExecutionResult[] deletes = check dbClient->batchExecute([
        `DELETE FROM BALTEST.BATCH_T WHERE ID = ${300010}`,
        `DELETE FROM BALTEST.BATCH_T WHERE ID = ${300010}`
    ]);
    check dbClient.close();
    test:assertEquals(results.map(r => r.affectedRowCount), [1, 0, 1]);
    test:assertEquals(deletes.map(r => r.affectedRowCount), [1, 0]);
}

@test:Config {
    groups: ["batch", "types"]
}
function testBatchWithVaryingDecimalScalesAndNulls() returns error? {
    Client dbClient = check getClient();
    sql:ParameterizedQuery[] inserts = [
        `INSERT INTO BALTEST.DEC_T (ID, D, N, DF) VALUES (${11}, ${new sql:DecimalValue(1.5d)}, ${new sql:NumericValue(1.5d)}, ${1.5d})`,
        `INSERT INTO BALTEST.DEC_T (ID, D, N, DF) VALUES (${12}, ${new sql:DecimalValue(1234.5678d)}, ${new sql:NumericValue(12.34d)}, ${1234.5678d})`,
        `INSERT INTO BALTEST.DEC_T (ID, D, N, DF) VALUES (${13}, ${new sql:DecimalValue()}, ${new sql:NumericValue()}, ${()})`,
        `INSERT INTO BALTEST.DEC_T (ID, D, N, DF) VALUES (${14}, ${123456789012345678901.0123456789d}, ${999999.9999d}, ${1e400d})`,
        `INSERT INTO BALTEST.DEC_T (ID, D, N, DF) VALUES (${15}, ${-1d}, ${0.0001d}, ${new sql:DecimalValue(1e-400d)})`
    ];
    sql:ExecutionResult[] results = check dbClient->batchExecute(inserts);
    stream<record {|int ID; decimal? D; decimal? N; decimal? DF;|}, sql:Error?> rows =
        dbClient->query(`SELECT ID, D, N, DF FROM BALTEST.DEC_T WHERE ID BETWEEN 11 AND 15 ORDER BY ID`);
    record {|int ID; decimal? D; decimal? N; decimal? DF;|}[] stored = check from var row in rows select row;
    check dbClient.close();
    test:assertEquals(results.length(), 5);
    test:assertEquals(stored, [
        {ID: 11, D: 1.5d, N: 1.5d, DF: 1.5d},
        {ID: 12, D: 1234.5678d, N: 12.34d, DF: 1234.5678d},
        {ID: 13, D: (), N: (), DF: ()},
        {ID: 14, D: 123456789012345678901.0123456789d, N: 999999.9999d, DF: 1e400d},
        {ID: 15, D: -1d, N: 0.0001d, DF: 1e-400d}
    ]);
}

@test:Config {
    groups: ["batch", "transaction"]
}
function testBatchInsideTransaction() returns error? {
    Client dbClient = check getClient();
    sql:ParameterizedQuery[] inserts = from int i in 1 ... 5
        select `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${400000 + i}, ${"trx"})`;
    boolean abort = true;
    transaction {
        _ = check dbClient->batchExecute(inserts);
        if abort {
            rollback;
        } else {
            check commit;
        }
    }
    int afterRollback = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BATCH_T WHERE ID > 400000`);
    transaction {
        _ = check dbClient->batchExecute(inserts);
        check commit;
    }
    int afterCommit = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BATCH_T WHERE ID > 400000`);
    _ = check dbClient->execute(`DELETE FROM BALTEST.BATCH_T WHERE ID > 400000`);
    check dbClient.close();
    test:assertEquals(afterRollback, 0);
    test:assertEquals(afterCommit, 5);
}

@test:Config {
    groups: ["batch", "transaction"]
}
function testBatchErrorInsideTransactionRollsBack() returns error? {
    Client dbClient = check getClient();
    error? outcome = trap batchWithDuplicateInTransaction(dbClient);
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BATCH_T WHERE ID > 500000`);
    check dbClient.close();
    test:assertTrue(outcome is error);
    test:assertEquals(count, 0, "the rows before the failure must be rolled back");
}

function batchWithDuplicateInTransaction(Client dbClient) returns error? {
    transaction {
        _ = check dbClient->batchExecute([
            `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${500001}, ${"a"})`,
            `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${500001}, ${"dup"})`
        ]);
        check commit;
    }
}

@test:Config {
    groups: ["batch", "cache"]
}
function testParameterizedStatementsShareOnePackageCacheEntry() returns error? {
    Client dbClient = check getClient();
    // A unique comment keeps this statement apart from the other tests in the Db2 package cache.
    foreach int i in 1 ... 30 {
        string? _ = check dbClient->queryRow(`SELECT /* cache-test-a1b2 */ NAME FROM BALTEST.EMPLOYEE WHERE ID = ${i % 5 + 1}`);
    }
    stream<record {|int NUM_EXECUTIONS; string STMT_TEXT;|}, sql:Error?> cached = dbClient->query(
        `SELECT NUM_EXECUTIONS, VARCHAR(STMT_TEXT, 200) AS STMT_TEXT
         FROM TABLE(MON_GET_PKG_CACHE_STMT('D', NULL, NULL, -2))
         WHERE STMT_TEXT LIKE '%cache-test-a1b2%' AND STMT_TEXT NOT LIKE '%MON_GET_PKG_CACHE_STMT%'`);
    record {|int NUM_EXECUTIONS; string STMT_TEXT;|}[] entries = check from var row in cached select row;
    check dbClient.close();
    // Every execution reused the single prepared statement with a parameter marker instead of compiling a new one.
    test:assertEquals(entries.length(), 1, entries.toString());
    test:assertTrue(entries[0].NUM_EXECUTIONS >= 30, entries[0].toString());
    test:assertTrue(entries[0].STMT_TEXT.includes("?"), entries[0].STMT_TEXT);
}

@test:Config {
    groups: ["batch", "cache"]
}
function testConnectionPoolReusesConnections() returns error? {
    // Tag the connections of this test so that they can be counted on the server.
    Client dbClient = check getClient({clientProgramName: "pool-reuse-test"});
    Client monitor = check getClient();
    foreach int i in 1 ... 100 {
        int _ = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EMPLOYEE WHERE ID = ${i}`);
    }
    sql:ParameterizedQuery[] batch = from int i in 1 ... 20 select `UPDATE BALTEST.EMPLOYEE SET DEPT = DEPT WHERE ID = ${i}`;
    _ = check dbClient->batchExecute(batch);
    int connections = check monitor->queryRow(`SELECT COUNT(*) FROM TABLE(MON_GET_CONNECTION(NULL, -2))
        WHERE APPLICATION_NAME = 'pool-reuse-test'`);
    check dbClient.close();
    check monitor.close();
    // Config.toml limits the pool to 10 open connections; sequential work needs far fewer.
    test:assertTrue(connections >= 1 && connections <= 10, string `connections: ${connections}`);
}
