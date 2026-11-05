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

configurable string host = ?;
configurable int port = ?;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;

type Product record {|
    int id;
    string name;
    decimal price;
    int stock;
|};

public function main() returns error? {
    db2:Client dbClient = check new (host, user, password, database, port);

    // Create a table.
    dropIfExists(dbClient, `DROP TABLE PRODUCT`);
    _ = check dbClient->execute(`CREATE TABLE PRODUCT (
        ID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        NAME VARCHAR(50) NOT NULL,
        PRICE DECIMAL(10, 2) NOT NULL,
        STOCK INT NOT NULL)`);

    // Insert a row and read the generated identity value.
    sql:ExecutionResult result = check dbClient->execute(
        `INSERT INTO PRODUCT (NAME, PRICE, STOCK) VALUES (${"Notebook"}, ${4.50d}, ${120})`);
    io:println("Inserted product with ID: ", result.lastInsertId);

    // Insert several rows in one batch. Every statement in a batch must have the same SQL text.
    Product[] products = [
        {id: 0, name: "Pen", price: 1.20, stock: 500},
        {id: 0, name: "Stapler", price: 8.99, stock: 40},
        {id: 0, name: "Marker", price: 2.35, stock: 300}
    ];
    sql:ParameterizedQuery[] inserts = from Product p in products
        select `INSERT INTO PRODUCT (NAME, PRICE, STOCK) VALUES (${p.name}, ${p.price}, ${p.stock})`;
    sql:ExecutionResult[] batchResults = check dbClient->batchExecute(inserts);
    io:println("Batch inserted rows: ", batchResults.length());

    // Query multiple rows as a stream of records.
    decimal maxPrice = 5;
    stream<Product, sql:Error?> cheapProducts = dbClient->query(
        `SELECT ID AS "id", NAME AS "name", PRICE AS "price", STOCK AS "stock"
         FROM PRODUCT WHERE PRICE < ${maxPrice} ORDER BY PRICE`);
    check from Product p in cheapProducts
        do {
            io:println(p);
        };

    // Query a single value.
    int totalStock = check dbClient->queryRow(`SELECT SUM(STOCK) FROM PRODUCT`);
    io:println("Total stock: ", totalStock);

    // Update and delete.
    sql:ExecutionResult updated = check dbClient->execute(
        `UPDATE PRODUCT SET STOCK = STOCK - ${10} WHERE NAME = ${"Pen"}`);
    io:println("Updated rows: ", updated.affectedRowCount);
    sql:ExecutionResult deleted = check dbClient->execute(`DELETE FROM PRODUCT WHERE STOCK < ${50}`);
    io:println("Deleted rows: ", deleted.affectedRowCount);

    // Database errors carry the SQLSTATE and SQLCODE.
    sql:ExecutionResult|sql:Error failed = dbClient->execute(`INSERT INTO PRODUCT (NAME) VALUES (${"No price"})`);
    if failed is sql:DatabaseError {
        io:println(string `Insert failed with SQLSTATE ${failed.detail().sqlState ?: ""}, ` +
            string `SQLCODE ${failed.detail().errorCode}`);
    }

    _ = check dbClient->execute(`DROP TABLE PRODUCT`);
    check dbClient.close();
}

// Drops a table or procedure, ignoring the error raised when it does not exist yet.
function dropIfExists(db2:Client dbClient, sql:ParameterizedQuery drop) {
    sql:ExecutionResult|sql:Error result = dbClient->execute(drop);
    if result is sql:Error {
        io:println("Nothing to drop: ", result.message());
    }
}
