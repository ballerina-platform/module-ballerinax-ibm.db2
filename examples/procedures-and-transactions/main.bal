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

import ballerina/io;
import ballerina/sql;
import ballerinax/ibm.db2;
import ballerinax/ibm.db2.driver as _;

configurable string host = ?;
configurable int port = ?;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;

type Account record {|
    int ID;
    string OWNER;
    decimal BALANCE;
|};

public function main() returns error? {
    db2:Client dbClient = check new (host, user, password, database, port);
    check setUp(dbClient);

    // Call a procedure with an IN parameter, an OUT parameter and a result set.
    sql:DecimalOutParameter total = new;
    sql:ProcedureCallResult callResult = check dbClient->call(
        `CALL ACCOUNTS_ABOVE(${100.00d}, ${total})`, [Account]);
    stream<record {}, sql:Error?>? accounts = callResult.queryResult;
    if accounts !is () {
        check from record {} account in accounts
            do {
                io:println("Account: ", account);
            };
    }
    // OUT parameters are read from the statement, so read them before closing the result.
    io:println("Total balance above 100: ", check total.get(decimal));
    check callResult.close();

    // Move money between two accounts in a transaction.
    check transfer(dbClient, 1, 2, 50.00);
    io:println("Transferred 50.00 from account 1 to 2");

    // A failing transfer is rolled back: the balance check rejects the overdraft.
    error? failed = transfer(dbClient, 3, 1, 1000.00);
    if failed is error {
        io:println("Transfer rolled back: ", failed.message());
    }

    stream<Account, sql:Error?> balances = dbClient->query(`SELECT ID, OWNER, BALANCE FROM ACCOUNT ORDER BY ID`);
    check from Account account in balances
        do {
            io:println(account);
        };

    _ = check dbClient->execute(`DROP PROCEDURE ACCOUNTS_ABOVE`);
    _ = check dbClient->execute(`DROP TABLE ACCOUNT`);
    check dbClient.close();
}

function transfer(db2:Client dbClient, int fromId, int toId, decimal amount) returns error? {
    transaction {
        _ = check dbClient->execute(`UPDATE ACCOUNT SET BALANCE = BALANCE - ${amount} WHERE ID = ${fromId}`);
        _ = check dbClient->execute(`UPDATE ACCOUNT SET BALANCE = BALANCE + ${amount} WHERE ID = ${toId}`);
        check commit;
    }
}

function setUp(db2:Client dbClient) returns error? {
    dropIfExists(dbClient, `DROP PROCEDURE ACCOUNTS_ABOVE`);
    dropIfExists(dbClient, `DROP TABLE ACCOUNT`);
    _ = check dbClient->execute(`CREATE TABLE ACCOUNT (
        ID INT NOT NULL PRIMARY KEY,
        OWNER VARCHAR(40) NOT NULL,
        BALANCE DECIMAL(12, 2) NOT NULL CHECK (BALANCE >= 0))`);
    _ = check dbClient->execute(`INSERT INTO ACCOUNT VALUES (1, 'Ann', 500.00), (2, 'Bob', 80.00), (3, 'Cara', 20.00)`);
    _ = check dbClient->execute(`CREATE PROCEDURE ACCOUNTS_ABOVE (IN P_MIN DECIMAL(12, 2), OUT P_TOTAL DECIMAL(12, 2))
        DYNAMIC RESULT SETS 1
        LANGUAGE SQL
        BEGIN
            DECLARE C1 CURSOR WITH RETURN FOR
                SELECT ID, OWNER, BALANCE FROM ACCOUNT WHERE BALANCE > P_MIN ORDER BY ID;
            SELECT COALESCE(SUM(BALANCE), 0) INTO P_TOTAL FROM ACCOUNT WHERE BALANCE > P_MIN;
            OPEN C1;
        END`);
}

// Drops a table or procedure, ignoring the error raised when it does not exist yet.
function dropIfExists(db2:Client dbClient, sql:ParameterizedQuery drop) {
    sql:ExecutionResult|sql:Error result = dbClient->execute(drop);
    if result is sql:Error {
        io:println("Nothing to drop: ", result.message());
    }
}
