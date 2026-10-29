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

import ballerina/http;
import ballerinax/ibm.db2;
import ballerinax/ibm.db2.driver as _;

const ROWS = 8;

// Connection details of the Db2 database
configurable string dbHost = ?;
configurable string dbUsername = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;
configurable int dbPort = ?;

type Customer record {
    int customerId;
    string lastName;
    string firstName;
    int registrationId;
    float creditLimit;
    string country;
};

final db2:Client dbClient = check new (host = dbHost, user = dbUsername, password = dbPassword, port = dbPort,
    database = dbName);

public function main() returns error? {
    _ = check dbClient->execute(`DROP TABLE IF EXISTS Customers`);
    _ = check dbClient->execute(`
        CREATE TABLE Customers (
            customerId INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            firstName VARCHAR(300),
            lastName  VARCHAR(300),
            registrationID INT,
            creditLimit DOUBLE,
            country  VARCHAR(300)
        )
    `);
    foreach int registrationId in 1 ... ROWS {
        boolean even = registrationId % 2 == 0;
        _ = check dbClient->execute(`
            INSERT INTO Customers (firstName, lastName, registrationID, creditLimit, country)
            VALUES (${even ? "Dan" : "Peter"}, ${even ? "Brown" : "Stuart"}, ${registrationId},
                ${even ? 10000.0 : 5000.75}, ${even ? "UK" : "USA"})`);
    }
}

isolated service /customer on new http:Listener(9092) {
    resource isolated function get .(int id) returns string|error {
        // Column names are returned in upper case by Db2, so they are mapped with quoted aliases.
        Customer customer = check dbClient->queryRow(`SELECT customerId AS "customerId", lastName AS "lastName",
            firstName AS "firstName", registrationId AS "registrationId", creditLimit AS "creditLimit",
            country AS "country" FROM Customers WHERE customerId = ${id}`);
        return customer.toString();
    }
}
