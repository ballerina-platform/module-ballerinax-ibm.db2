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

@test:Config {
    groups: ["connection"]
}
function testConnectionWithAllParams() returns error? {
    Client dbClient = check new (host, user, password, database, port);
    int one = check dbClient->queryRow(`SELECT 1 FROM SYSIBM.SYSDUMMY1`);
    test:assertEquals(one, 1);
    check dbClient.close();
}

@test:Config {
    groups: ["connection"]
}
function testConnectionWithNamedParams() returns error? {
    Client dbClient = check new (database = database, user = user, password = password, host = host, port = port);
    check dbClient.close();
}

@test:Config {
    groups: ["connection"]
}
function testConnectionWithoutDatabase() {
    Client|sql:Error dbClient = new (host, user, password);
    if dbClient !is sql:ApplicationError {
        test:assertFail("Expected an sql:ApplicationError when the database is not provided");
    }
    test:assertTrue(dbClient.message().startsWith("A database name is required"), dbClient.message());
}

@test:Config {
    groups: ["connection"]
}
function testConnectionWithBlankDatabase() {
    Client|sql:Error dbClient = new (host, user, password, "  ", port);
    test:assertTrue(dbClient is sql:ApplicationError);
}

@test:Config {
    groups: ["connection"]
}
function testConnectionWithWrongPassword() {
    Client|sql:Error dbClient = new (host, user, "wrong-password", database, port);
    if dbClient !is sql:Error {
        test:assertFail("Expected an error for invalid credentials");
    }
    test:assertTrue(dbClient.message().includes("User ID or Password invalid"), dbClient.message());
    test:assertFalse(dbClient.message().includes("wrong-password"), "Password must not leak into the error message");
}

@test:Config {
    groups: ["connection"]
}
function testConnectionWithUnknownDatabase() {
    Client|sql:Error dbClient = new (host, user, password, "NODB", port);
    if dbClient !is sql:Error {
        test:assertFail("Expected an error for an unknown database");
    }
    test:assertTrue(dbClient.message().includes("NODB"), dbClient.message());
}

@test:Config {
    groups: ["connection"]
}
function testConnectionToClosedPort() {
    Client|sql:Error dbClient = new (host, user, password, database, 50999, {loginTimeout: 3});
    test:assertTrue(dbClient is sql:Error);
}

@test:Config {
    groups: ["connection"]
}
function testCurrentSchemaOption() returns error? {
    Client dbClient = check getClient({currentSchema: SCHEMA});
    string schema = check dbClient->queryRow(`VALUES CURRENT SCHEMA`);
    test:assertEquals(schema.trim(), SCHEMA);
    // Unqualified names now resolve to the configured schema.
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM EMPLOYEE`);
    test:assertTrue(count >= 5);
    check dbClient.close();
}

@test:Config {
    groups: ["connection"]
}
function testClientProgramNameOption() returns error? {
    Client dbClient = check getClient({clientProgramName: "baltests"});
    string? applName = check dbClient->queryRow(`SELECT APPLICATION_NAME FROM TABLE(MON_GET_CONNECTION(MON_GET_APPLICATION_HANDLE(), -1))`);
    test:assertEquals(applName, "baltests");
    check dbClient.close();
}

@test:Config {
    groups: ["connection"]
}
function testClearTextSecurityMechanism() returns error? {
    Client dbClient = check getClient({securityMechanism: CLEAR_TEXT_PASSWORD});
    int one = check dbClient->queryRow(`SELECT 1 FROM SYSIBM.SYSDUMMY1`);
    test:assertEquals(one, 1);
    check dbClient.close();
}

@test:Config {
    groups: ["connection"]
}
function testEncryptedSecurityMechanismIsSentToServer() {
    // The test server uses AUTHENTICATION=SERVER, which only accepts clear-text credentials. The rejection shows
    // that the configured mechanism reaches the server.
    Client|sql:Error dbClient = getClient({securityMechanism: ENCRYPTED_USER_AND_PASSWORD});
    if dbClient !is sql:Error {
        test:assertFail("Expected the server to reject the encrypted security mechanism");
    }
    test:assertTrue(dbClient.message().includes("Security mechanism not supported"), dbClient.message());
}

@test:Config {
    groups: ["connection"]
}
function testExtraDriverProperties() returns error? {
    Client dbClient = check getClient({properties: {"currentSchema": "SYSCAT", "fetchSize": 50}});
    string schema = check dbClient->queryRow(`VALUES CURRENT SCHEMA`);
    test:assertEquals(schema.trim(), "SYSCAT");
    check dbClient.close();
}

@test:Config {
    groups: ["connection"]
}
function testInvalidDriverProperty() {
    Client|sql:Error dbClient = getClient({properties: {"securityMechanism": "not-a-number"}});
    test:assertTrue(dbClient is sql:Error);
}

@test:Config {
    groups: ["connection"]
}
function testTlsWithoutServerSupport() {
    // The test server only listens for plain TCP, so the TLS handshake must fail cleanly instead of hanging.
    Client|sql:Error dbClient = getClient({secureSocket: {}, loginTimeout: 5});
    test:assertTrue(dbClient is sql:Error);
}

@test:Config {
    groups: ["connection", "pool"]
}
function testLocalConnectionPool() returns error? {
    sql:ConnectionPool pool = {maxOpenConnections: 3, minIdleConnections: 1, maxConnectionLifeTime: 1800};
    Client dbClient = check getClient(connectionPool = pool);
    int[] results = [];
    foreach int i in 1 ... 10 {
        int doubled = check dbClient->queryRow(`SELECT CAST(${i} AS INT) * 2 FROM SYSIBM.SYSDUMMY1`);
        results.push(doubled);
    }
    test:assertEquals(results[9], 20);
    check dbClient.close();
}

@test:Config {
    groups: ["connection", "pool"]
}
function testPoolIsSharedAcrossClientsWithSameConfig() returns error? {
    sql:ConnectionPool pool = {maxOpenConnections: 2};
    Client client1 = check getClient(connectionPool = pool);
    Client client2 = check getClient(connectionPool = pool);
    check client1.close();
    // The pool stays open while another client still uses it.
    int one = check client2->queryRow(`SELECT 1 FROM SYSIBM.SYSDUMMY1`);
    test:assertEquals(one, 1);
    check client2.close();
}

@test:Config {
    groups: ["connection"]
}
function testOperationsOnClosedClient() returns error? {
    Client dbClient = check getClient();
    check dbClient.close();
    sql:ExecutionResult|sql:Error result = dbClient->execute(`DELETE FROM BALTEST.EXEC_T WHERE 1 = 0`);
    if result !is sql:Error {
        test:assertFail("Expected an error on a closed client");
    }
    test:assertTrue(result.message().startsWith("SQL Client is already closed"), result.message());
}

@test:Config {
    groups: ["connection", "xa"]
}
function testXADatasourceConnection() returns error? {
    Client dbClient = check getClient({useXADatasource: true});
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM BALTEST.EMPLOYEE`);
    test:assertTrue(count >= 5);
    check dbClient.close();
}
