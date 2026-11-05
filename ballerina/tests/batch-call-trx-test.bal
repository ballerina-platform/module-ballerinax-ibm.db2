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

type BatchRow record {|
    int id;
    string name;
|};

@test:Config {
    groups: ["batch"]
}
function testBatchInsert() returns error? {
    Client dbClient = check getClient();
    BatchRow[] rows = from int i in 1 ... 500 select {id: i, name: string `n-${i}`};
    sql:ParameterizedQuery[] queries = from BatchRow row in rows
        select `INSERT INTO BALTEST.BATCH_T (ID, NAME) VALUES (${row.id}, ${row.name})`;
    sql:ExecutionResult[] results = check dbClient->batchExecute(queries);
    test:assertEquals(results.length(), 500);
    test:assertTrue(results.every(r => r.affectedRowCount == 1));
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BATCH_T WHERE ID <= 500`);
    test:assertEquals(count, 500);
    check dbClient.close();
}

@test:Config {
    groups: ["batch"],
    dependsOn: [testBatchInsert]
}
function testBatchUpdate() returns error? {
    Client dbClient = check getClient();
    sql:ParameterizedQuery[] queries = from int i in 1 ... 10
        select `UPDATE BALTEST.BATCH_T SET NAME = ${"u-" + i.toString()} WHERE ID = ${i}`;
    sql:ExecutionResult[] results = check dbClient->batchExecute(queries);
    test:assertEquals(results.length(), 10);
    string name = check dbClient->queryRow(`SELECT NAME FROM BALTEST.BATCH_T WHERE ID = 10`);
    test:assertEquals(name, "u-10");
    check dbClient.close();
}

@test:Config {
    groups: ["batch"]
}
function testBatchPartialFailure() returns error? {
    Client dbClient = check getClient();
    // ID 1001 is inserted twice: Db2 runs the whole batch and reports the failing element.
    BatchRow[] rows = [{id: 1001, name: "a"}, {id: 1002, name: "b"}, {id: 1001, name: "dup"}, {id: 1003, name: "c"}];
    sql:ParameterizedQuery[] queries = from BatchRow row in rows
        select `INSERT INTO BALTEST.BATCH_T VALUES (${row.id}, ${row.name})`;
    sql:ExecutionResult[]|sql:Error result = dbClient->batchExecute(queries);
    if result !is sql:BatchExecuteError {
        test:assertFail(string `Expected sql:BatchExecuteError, found: ${result is error ? result.message() : "success"}`);
    }
    sql:ExecutionResult[] executionResults = result.detail().executionResults;
    test:assertEquals(executionResults.map(r => r.affectedRowCount), [1, 1, -3, 1]);
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.BATCH_T WHERE ID BETWEEN 1001 AND 1003`);
    test:assertEquals(count, 3);
    check dbClient.close();
}

@test:Config {
    groups: ["batch"]
}
function testBatchEmpty() returns error? {
    Client dbClient = check getClient();
    sql:ExecutionResult[]|sql:Error result = dbClient->batchExecute([]);
    test:assertTrue(result is sql:ApplicationError);
    check dbClient.close();
}

@test:Config {
    groups: ["call"]
}
function testCallWithOutParamAndResultSet() returns error? {
    Client dbClient = check getClient();
    sql:IntegerOutParameter count = new;
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.GET_EMPLOYEES(${"ENG"}, ${count})`,
        [EmployeeSummary]);
    stream<record {}, sql:Error?>? resultSet = result.queryResult;
    if resultSet is () {
        test:assertFail("Expected a result set");
    }
    EmployeeSummary[] employees = check from record {} row in resultSet select check row.cloneWithType();
    // OUT parameters are read from the statement, so they must be read before the call result is closed.
    int total = check count.get(int);
    check result.close();
    check dbClient.close();
    test:assertEquals(total, 3);
    test:assertEquals(employees.length(), 3);
    test:assertEquals(employees[0], {ID: 1, NAME: "Ann", SALARY: 9500.00d});
}

type EmployeeSummary record {|
    int ID;
    string NAME;
    decimal? SALARY;
|};

@test:Config {
    groups: ["call"]
}
function testCallWithInOutParam() returns error? {
    Client dbClient = check getClient();
    sql:InOutParameter value = new (12.50d);
    sql:VarcharOutParameter label = new;
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.SCALE_VALUE(${value}, ${3}, ${label})`);
    decimal scaled = check value.get(decimal);
    string text = check label.get(string);
    check result.close();
    check dbClient.close();
    test:assertEquals(scaled, 37.50d);
    test:assertEquals(text, "scaled by 3");
}

@test:Config {
    groups: ["call"]
}
function testCallWithMultipleResultSets() returns error? {
    Client dbClient = check getClient();
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.TWO_RESULT_SETS()`);
    stream<record {}, sql:Error?>? first = result.queryResult;
    if first is () {
        test:assertFail("Expected the first result set");
    }
    record {}[] engineers = check from record {} row in first select row;
    test:assertTrue(engineers.length() >= 3);
    test:assertTrue(check result.getNextQueryResult());
    stream<record {}, sql:Error?>? second = result.queryResult;
    if second is () {
        test:assertFail("Expected the second result set");
    }
    record {}[] totals = check from record {} row in second select row;
    test:assertEquals(totals.length(), 3);
    test:assertFalse(check result.getNextQueryResult());
    check result.close();
    check dbClient.close();
}

@test:Config {
    groups: ["call"]
}
function testCallWithoutResults() returns error? {
    Client dbClient = check getClient();
    sql:ProcedureCallResult result = check dbClient->call(`CALL BALTEST.ADD_EMPLOYEE(${"Fay"}, ${"OPS"})`);
    test:assertEquals(result.queryResult, ());
    check result.close();
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EMPLOYEE WHERE NAME = 'Fay'`);
    test:assertEquals(count, 1);
    check dbClient.close();
}

@test:Config {
    groups: ["call"]
}
function testCallUnknownProcedure() returns error? {
    Client dbClient = check getClient();
    sql:ProcedureCallResult|sql:Error result = dbClient->call(`CALL BALTEST.NO_SUCH_PROC()`);
    assertDatabaseError(result, "42884", -440);
    check dbClient.close();
}

@test:Config {
    groups: ["transaction"]
}
function testLocalTransactionCommit() returns error? {
    Client dbClient = check getClient();
    transaction {
        _ = check dbClient->execute(`INSERT INTO BALTEST.TRX_T VALUES (1, 'one')`);
        _ = check dbClient->execute(`INSERT INTO BALTEST.TRX_T VALUES (2, 'two')`);
        check commit;
    }
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.TRX_T WHERE ID IN (1, 2)`);
    test:assertEquals(count, 2);
    check dbClient.close();
}

@test:Config {
    groups: ["transaction"]
}
function testLocalTransactionRollbackOnError() returns error? {
    Client dbClient = check getClient();
    error? outcome = trap insertTwiceInTransaction(dbClient);
    test:assertTrue(outcome is error);
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.TRX_T WHERE ID = 10`);
    test:assertEquals(count, 0, "The first insert must be rolled back");
    check dbClient.close();
}

function insertTwiceInTransaction(Client dbClient) returns error? {
    transaction {
        _ = check dbClient->execute(`INSERT INTO BALTEST.TRX_T VALUES (10, 'ten')`);
        _ = check dbClient->execute(`INSERT INTO BALTEST.TRX_T VALUES (10, 'again')`);
        check commit;
    }
}

@test:Config {
    groups: ["transaction"]
}
function testExplicitRollback() returns error? {
    Client dbClient = check getClient();
    boolean abort = true;
    transaction {
        _ = check dbClient->execute(`INSERT INTO BALTEST.TRX_T VALUES (20, 'twenty')`);
        if abort {
            rollback;
        } else {
            check commit;
        }
    }
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.TRX_T WHERE ID = 20`);
    test:assertEquals(count, 0);
    check dbClient.close();
}

configurable string secondDatabase = "TESTDB2";

@test:Config {
    groups: ["transaction", "xa"]
}
function testXATransactionAcrossTwoDatabases() returns error? {
    Client xaClient1 = check getClient({useXADatasource: true}, {maxOpenConnections: 2});
    Client xaClient2 = check new (host, user, password, secondDatabase, port, {useXADatasource: true},
        {maxOpenConnections: 2});
    _ = check xaClient2->execute(`CREATE TABLE IF NOT EXISTS XA_T (ID INT NOT NULL PRIMARY KEY, NAME VARCHAR(20))`);
    _ = check xaClient2->execute(`DELETE FROM XA_T`);

    transaction {
        _ = check xaClient1->execute(`INSERT INTO BALTEST.TRX_T VALUES (30, 'xa-1')`);
        _ = check xaClient2->execute(`INSERT INTO XA_T VALUES (31, 'xa-2')`);
        check commit;
    }
    int committed1 = check xaClient1->queryRow(`SELECT COUNT(*) FROM BALTEST.TRX_T WHERE ID = 30`);
    int committed2 = check xaClient2->queryRow(`SELECT COUNT(*) FROM XA_T WHERE ID = 31`);
    test:assertEquals([committed1, committed2], [1, 1]);

    boolean abort = true;
    transaction {
        _ = check xaClient1->execute(`INSERT INTO BALTEST.TRX_T VALUES (32, 'xa-3')`);
        _ = check xaClient2->execute(`INSERT INTO XA_T VALUES (33, 'xa-4')`);
        if abort {
            rollback;
        } else {
            check commit;
        }
    }
    int rolledBack1 = check xaClient1->queryRow(`SELECT COUNT(*) FROM BALTEST.TRX_T WHERE ID = 32`);
    int rolledBack2 = check xaClient2->queryRow(`SELECT COUNT(*) FROM XA_T WHERE ID = 33`);
    test:assertEquals([rolledBack1, rolledBack2], [0, 0]);

    // A failure in the second database rolls back the first one as well.
    error? failed = trap xaInsertWithDuplicate(xaClient1, xaClient2);
    test:assertTrue(failed is error);
    int afterFailure = check xaClient1->queryRow(`SELECT COUNT(*) FROM BALTEST.TRX_T WHERE ID = 34`);
    test:assertEquals(afterFailure, 0);

    _ = check xaClient2->execute(`DROP TABLE XA_T`);
    check xaClient1.close();
    check xaClient2.close();
}

function xaInsertWithDuplicate(Client xaClient1, Client xaClient2) returns error? {
    transaction {
        _ = check xaClient1->execute(`INSERT INTO BALTEST.TRX_T VALUES (34, 'xa-5')`);
        _ = check xaClient2->execute(`INSERT INTO XA_T VALUES (31, 'duplicate')`);
        check commit;
    }
}

@test:Config {
    groups: ["transaction", "xa"]
}
function testXATwoClientsOnSameDatabase() returns error? {
    // The transaction manager uses one XID for all resources. Db2 sees two connections to the same database as the
    // same resource manager and rejects the second branch with XAER_DUPID.
    Client xaClient1 = check getClient({useXADatasource: true}, {maxOpenConnections: 2});
    Client xaClient2 = check getClient({useXADatasource: true, clientProgramName: "xa2"}, {maxOpenConnections: 3});
    error? result = trap insertWithTwoXAClients(xaClient1, xaClient2);
    if result !is error {
        test:assertFail("Expected XAER_DUPID");
    }
    test:assertTrue(result.message().includes("XAER_DUPID"), result.message());
    check xaClient1.close();
    check xaClient2.close();
}

function insertWithTwoXAClients(Client xaClient1, Client xaClient2) returns error? {
    transaction {
        _ = check xaClient1->execute(`INSERT INTO BALTEST.TRX_T VALUES (40, 'a')`);
        _ = check xaClient2->execute(`INSERT INTO BALTEST.TRX_T VALUES (41, 'b')`);
        check commit;
    }
}

@test:Config {
    groups: ["concurrency"]
}
function testConcurrentWorkers() returns error? {
    Client dbClient = check getClient(connectionPool = {maxOpenConnections: 5});
    future<int|error>[] futures = [];
    foreach int w in 0 ..< 20 {
        future<int|error> f = start sumIds(dbClient, w);
        futures.push(f);
    }
    foreach int w in 0 ..< 20 {
        int total = check wait futures[w];
        int expected = 0;
        foreach int id in (w * 100 + 1) ... (w * 100 + 100) {
            expected += id;
        }
        test:assertEquals(total, expected);
    }
    check dbClient.close();
}

isolated function sumIds(Client dbClient, int workerId) returns int|error {
    int total = 0;
    foreach int i in 1 ... 10 {
        int s = check dbClient->queryRow(`SELECT SUM(ID) FROM BALTEST.BIG_T
            WHERE ID BETWEEN ${workerId * 100 + 1} AND ${workerId * 100 + 100}`);
        total = s;
    }
    return total;
}
