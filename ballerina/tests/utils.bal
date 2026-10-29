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
import ballerina/test;

configurable string host = "localhost";
configurable int port = 50000;
configurable string user = "db2inst1";
configurable string password = "Test123#";
configurable string database = "TESTDB";

const SCHEMA = "BALTEST";

function getClient(Options? options = (), sql:ConnectionPool? connectionPool = ()) returns Client|sql:Error {
    return new (host, user, password, database, port, options, connectionPool);
}

function executeScript(Client dbClient, string path) returns error? {
    string script = check io:fileReadString(path);
    // Statements are separated by a line holding only `@` so that procedure bodies can contain `;`.
    foreach string statement in re `\n@\s*\n`.split(script) {
        string trimmed = statement.trim();
        if trimmed.length() == 0 {
            continue;
        }
        sql:ParameterizedQuery query = ``;
        query.strings = [trimmed];
        sql:ExecutionResult|sql:Error result = dbClient->execute(query);
        if result is sql:Error {
            // Dropping an object that does not exist yet is expected on the first run.
            if trimmed.startsWith("DROP") {
                continue;
            }
            return error(string `Setup statement failed: ${trimmed}`, result);
        }
    }
}

@test:BeforeSuite
function setupDatabase() returns error? {
    Client dbClient = check getClient();
    check executeScript(dbClient, "tests/resources/sql/setup.sql");
    check dbClient.close();
}

@test:AfterSuite {}
function cleanupDatabase() returns error? {
    Client dbClient = check getClient();
    check executeScript(dbClient, "tests/resources/sql/cleanup.sql");
    check dbClient.close();
}

isolated function assertDatabaseError(any|error result, string sqlState, int errorCode = 0) {
    if result !is sql:DatabaseError {
        test:assertFail(string `Expected sql:DatabaseError with SQLSTATE ${sqlState}, found: ${result is error ? result.message() : "success"}`);
    }
    sql:DatabaseErrorDetail detail = result.detail();
    test:assertEquals(detail.sqlState, sqlState, result.message());
    if errorCode != 0 {
        test:assertEquals(detail.errorCode, errorCode, result.message());
    }
}
