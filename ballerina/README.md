## Overview

This package provides the functionality required to access and manipulate data stored in an IBM Db2 database.

[IBM Db2](https://www.ibm.com/db2) is a family of relational database servers that runs on Linux, UNIX and Windows (Db2 LUW), on IBM Z (Db2 for z/OS) and on IBM i, as well as a managed service on IBM Cloud and AWS.

The connector is built on the [`ballerina/sql`](https://central.ballerina.io/ballerina/sql/latest) package and uses the IBM Data Server Driver for JDBC and SQLJ (JCC, type 4) to talk to the server, so it offers the same programming model as the other Ballerina SQL connectors.

### Key features

- Query, execute, batch execute and stored procedure calls (IN, OUT, INOUT parameters and multiple result sets)
- Local transactions and distributed (XA) transactions
- Connection pooling, with a global pool shared by all clients by default
- Db2 data types, including `DECFLOAT`, `GRAPHIC`/`VARGRAPHIC`/`DBCLOB`, `XML`, `BOOLEAN`, `BINARY`/`VARBINARY`, `FOR BIT DATA` columns and `TIMESTAMP(12)`
- Readable server error messages with the SQLSTATE and SQLCODE available as error details
- TLS and DRDA security mechanisms, including TLS client certificate authentication
- Compile-time validation of connection pool and timeout values

## Setup guide

### Add the driver

The IBM JCC driver is provided by the `ballerinax/db2.driver` package. Import it alongside the connector:

```ballerina
import ballerinax/db2;
import ballerinax/db2.driver as _;
```

You can also add another version of the driver yourself in the `Ballerina.toml` file:

```toml
[[platform.java21.dependency]]
groupId = "com.ibm.db2"
artifactId = "jcc"
version = "12.1.5.0"
```

### Get a database

Any Db2 11.1 or later server works. For local development, run the free Db2 Community Edition:

```bash
docker run -d --name db2 --privileged -p 50000:50000 \
  -e LICENSE=accept -e DB2INST1_PASSWORD=<password> -e DBNAME=SAMPLE \
  icr.io/db2_community/db2:12.1.2.0
```

The first start creates the instance and the database, which takes a few minutes.

## Quickstart

### Step 1: Import the connector

```ballerina
import ballerina/io;
import ballerina/sql;
import ballerinax/db2;
import ballerinax/db2.driver as _;
```

### Step 2: Create a client

```ballerina
configurable string host = ?;
configurable int port = 50000;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;

final db2:Client dbClient = check new (host, user, password, database, port);
```

The `database` is required. For Db2 for z/OS, it is the location name.

### Step 3: Run operations

```ballerina
type Employee record {|
    int id;
    string name;
    decimal salary;
|};

public function main() returns error? {
    // Query with parameters. Values are always sent as bind parameters, never concatenated.
    string dept = "ENG";
    stream<Employee, sql:Error?> employees = dbClient->query(
        `SELECT ID AS "id", NAME AS "name", SALARY AS "salary" FROM EMPLOYEE WHERE DEPT = ${dept}`);
    check from Employee e in employees
        do {
            io:println(e);
        };

    // Single row or value
    int count = check dbClient->queryRow(`SELECT COUNT(*) FROM EMPLOYEE`);

    // Insert and read the generated identity value
    sql:ExecutionResult result = check dbClient->execute(
        `INSERT INTO EMPLOYEE (NAME, DEPT, SALARY) VALUES (${"Ann"}, ${dept}, ${9500.00d})`);
    int|string? newId = result.lastInsertId;
}
```

## Connection options

```ballerina
db2:Options options = {
    currentSchema: "PAYROLL",            // resolves unqualified table names
    clientProgramName: "payroll-sync",   // shown in MON_GET_CONNECTION and `db2 list applications`
    loginTimeout: 10,
    socketTimeout: 60,
    queryTimeout: 30,                    // statements running longer are cancelled (SQLSTATE 57014)
    secureSocket: {
        cert: {path: "truststore.p12", password: "changeit"}
    }
};
db2:Client dbClient = check new (host, user, password, database, port, options);
```

Any other [JCC property](https://www.ibm.com/docs/en/db2/12.1.x?topic=information-data-server-driver-jdbc-sqlj-properties) can be passed through `properties`, for example client reroute settings or IBM Cloud IAM authentication:

```ballerina
db2:Options options = {
    properties: {"securityMechanism": 15, "pluginName": "IBMIAMauth", "apiKey": apiKey}
};
```

## Db2 specifics

### Type mapping

| Db2 type | Ballerina type |
|---|---|
| `SMALLINT`, `INTEGER`, `BIGINT` | `int` |
| `DECIMAL`, `NUMERIC` | `decimal` |
| `DECFLOAT(16)`, `DECFLOAT(34)` | `decimal` (`float` or `string` for `Infinity`/`NaN`) |
| `REAL`, `DOUBLE` | `float` |
| `CHAR`, `VARCHAR`, `CLOB`, `GRAPHIC`, `VARGRAPHIC`, `DBCLOB` | `string` |
| `BINARY`, `VARBINARY`, `BLOB`, `CHAR`/`VARCHAR FOR BIT DATA` | `byte[]` |
| `DATE` | `time:Date` |
| `TIME` | `time:TimeOfDay` |
| `TIMESTAMP(p)` | `time:Civil` (nanosecond precision; picoseconds are truncated) |
| `BOOLEAN` | `boolean` |
| `XML` | `xml` |

`DECFLOAT` can hold `Infinity` and `NaN`, which a Ballerina `decimal` cannot represent. Mapping such a value to a `decimal` field returns an error that says so; map the column to `float` or `string` if it can hold these values.

### Parameter markers need a type

Db2 has to know the type of every parameter marker. A parameter whose type cannot be derived from the statement fails with `SQL0418N` (SQLSTATE `42610`), so add a cast:

```ballerina
// Fails: SELECT ? FROM SYSIBM.SYSDUMMY1
int value = check dbClient->queryRow(`SELECT CAST(${5} AS INT) FROM SYSIBM.SYSDUMMY1`);
```

### Batch operations

All statements in a `batchExecute` call must have the same SQL text. Bind values with the same type as the column (for example a `decimal` for a `DECIMAL` column): mixing an `int` value into a `DECIMAL` column makes the driver convert every row and made batches about 40% slower in our tests.

### Distributed transactions

Set `useXADatasource: true` on every client that takes part in an XA transaction. The Ballerina transaction manager uses one transaction branch for all resources, so the clients must point to different databases. Two XA clients on the same database in one transaction fail with `XAER_DUPID`; use a single client for each database instead.

### Errors

The connector asks the server for the message text, so errors read like `"DB2INST1.ORDERS" is an undefined name` instead of only an SQLCODE. The SQLSTATE and SQLCODE are available in the error detail:

```ballerina
sql:ExecutionResult|sql:Error result = dbClient->execute(`INSERT INTO ORDERS VALUES (${id})`);
if result is sql:DatabaseError {
    int sqlCode = result.detail().errorCode;   // e.g. -803
    string? sqlState = result.detail().sqlState; // e.g. "23505"
}
```

## Examples

The [examples](https://github.com/ballerina-platform/module-ballerinax-db2/tree/main/examples) directory shows how to use the connector:

1. [Basic operations](https://github.com/ballerina-platform/module-ballerinax-db2/tree/main/examples/basic-operations) - Create a table, insert, query, update and delete records.
2. [Stored procedures and transactions](https://github.com/ballerina-platform/module-ballerinax-db2/tree/main/examples/procedures-and-transactions) - Call a stored procedure with OUT parameters and a result set, and group statements in a transaction.
