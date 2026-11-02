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

The IBM JCC driver is provided by the `ballerinax/ibm.db2.driver` package. Import it alongside the connector:

```ballerina
import ballerinax/ibm.db2;
import ballerinax/ibm.db2.driver as _;
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
import ballerinax/ibm.db2;
import ballerinax/ibm.db2.driver as _;
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
        // The host name used to connect must match a name in the server certificate,
        // unless `verifyHostName: false` is set.
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
| `DATE` | `time:Date` or `string` |
| `TIME` | `time:TimeOfDay` or `string` |
| `TIMESTAMP(p)` | `time:Civil`, `time:Utc`, `string` or `int` (nanosecond precision; picoseconds are truncated) |
| `BOOLEAN` | `boolean` (`int` and `string` are accepted too) |
| `XML` | `xml` |

Every `sql:*Value` typed parameter of the `ballerina/sql` module is supported except the array values. The following rules come from Db2 and its driver:

- **Nulls.** A `()` or a typed null such as `new sql:DecimalValue()` can be bound to a column of any type.
- **Instants.** Db2 has no time zone types. A `time:Utc` value, and a `time:Civil` value with a `utcOffset`, are stored as the UTC wall clock time with their full precision. A `TIMESTAMP` column read as `time:Utc` or `int` (epoch milliseconds) is interpreted as UTC, so these values round-trip. A `time:TimeOfDay` with a `utcOffset` is rejected because `TIME` has no zone.
- **Fractions of a second.** `TIME` has no fractional seconds: the fraction of a `time:TimeOfDay` is dropped and a string such as `"10:11:12.5"` fails with `SQL0180N`. `TIMESTAMP(12)` keeps the nine digits a `time:Civil` can hold.
- **`NaN` and `Infinity`.** A `float` that is not finite cannot be bound: `DOUBLE` and `REAL` have no such values, and the driver cannot bind them for `DECFLOAT`. The connector rejects them with a clear error; use the SQL literal `DECFLOAT('NaN')` instead. Reading such a `DECFLOAT` value into a `decimal` field is an error; use `float` or `string`.
- **Numeric conversions.** An `int` or `float` bound to a `DECIMAL` column and a `decimal` bound to a `DOUBLE` column are converted by the server. A `decimal` bound to an `INTEGER` column is truncated by the driver (`12.7` becomes `12`). A value too large for the column fails: `SQL0302N` (SQLSTATE `22001`/`22003`) from the server, or `-4461` from the driver for an `int` outside `SMALLINT` or `INTEGER`.
- **Lengths are in bytes.** `CHAR`, `VARCHAR` and `CLOB` lengths count UTF-8 bytes, so `VARCHAR(50)` holds 12 emoji (48 bytes) but not 13. `GRAPHIC`, `VARGRAPHIC` and `DBCLOB` lengths count UTF-16 code units (an emoji needs two). `LENGTH()` returns bytes; use `CHARACTER_LENGTH(x, CODEUNITS32)` for characters.
- **Arrays.** The driver cannot bind arrays, so `int[]`, `string[]` and the `sql:*ArrayValue` types are rejected. Pass the elements as separate parameters: `WHERE ID IN (${a}, ${b})`.
- **`CHAR` and `GRAPHIC`** values come back blank padded to the column length.

### Parameter markers need a type

Db2 has to know the type of every parameter marker. A parameter whose type cannot be derived from the statement fails with `SQL0418N` (SQLSTATE `42610`), and a parameter passed to an overloaded function such as `LENGTH(?)` fails with `SQL0245N`, so add a cast:

```ballerina
// Fails: SELECT ? FROM SYSIBM.SYSDUMMY1
int value = check dbClient->queryRow(`SELECT CAST(${5} AS INT) FROM SYSIBM.SYSDUMMY1`);
```

### Stored procedures

`call` supports `IN`, `OUT` and `INOUT` parameters and any number of result sets. Read the OUT parameters before closing the `sql:ProcedureCallResult`, because the values live in the statement.

Use the OUT parameter classes of this module for binary and XML values. The `ballerina/sql` classes convert their values in a way the Db2 driver does not support, and the connector rejects them with a message that names the replacement:

| Db2 parameter type | OUT parameter class |
|---|---|
| `BINARY`, `CHAR FOR BIT DATA` | `db2:BinaryOutParameter` |
| `VARBINARY`, `VARCHAR FOR BIT DATA` | `db2:VarBinaryOutParameter` |
| `BLOB` | `db2:BlobOutParameter` |
| `XML` | `db2:XmlOutParameter` (read as `xml` or `string`) |
| `DECFLOAT` | `sql:DecimalOutParameter`; `sql:DoubleOutParameter` or `sql:VarcharOutParameter` for `NaN` and `Infinity` |
| `GRAPHIC`, `VARGRAPHIC`, `DBCLOB` | `sql:NCharOutParameter`, `sql:NVarcharOutParameter`, `sql:NClobOutParameter` |
| every other type | the matching `sql:*OutParameter` |

```ballerina
db2:BlobOutParameter image = new;
sql:ProcedureCallResult result = check dbClient->call(`CALL GET_IMAGE(${id}, ${image})`);
byte[] bytes = check image.get();
check result.close();
```

An `INOUT` parameter takes its SQL type from the value passed in. A `()` has no type, so the parameter is registered as `VARCHAR` and its value comes back as a `string`; pass a typed null such as `new sql:DecimalValue()` to keep the type. An `xml` value passed to an `INOUT` parameter also comes back as a string. A `NULL` returned through an `sql:BooleanOutParameter` cannot be read, because `get` requires a `boolean`, `int` or `string`.

Db2 procedures are called with `CALL` or the JDBC escape `{CALL ...}`. Functions cannot be called with `CALL`; use `VALUES MYFUNC(${x})` or `SELECT` instead.

### Batch operations

All statements in a `batchExecute` call must have the same SQL text, so pass every changing value as a parameter, including identifiers such as `${id}` rather than a literal `1`. The statements are sent in chunks of 1,000, and a batch can run inside a `transaction` block.

Bind values with the same type as the column (for example a `decimal` for a `DECIMAL` column): mixing an `int` value into a `DECIMAL` column makes the driver convert every row and made batches about 40% slower in our tests.

Db2 keeps executing after a failed statement. The `sql:BatchExecuteError` carries an `affectedRowCount` of `-3` for each failed statement and the driver's batch failure code `-4229`; the rows that succeeded stay applied unless the batch runs in a transaction. The driver does not report the generated keys of a batch, so `lastInsertId` is `()` for batched inserts; a single `execute` does return the identity value.

### Special characters

Pass every value as a parameter. Quotes, backslashes, newlines, `NUL` characters, `%`, `_`, comments, semicolons and SQL keywords in a parameter are stored as data and never change the statement. `%` and `_` keep their meaning in `LIKE`, so escape them: `V LIKE ${"100\\%"} ESCAPE '\'`. Question marks, braces and colons inside string literals of the SQL text are passed through unchanged.

Identifiers are folded to upper case unless quoted. A quoted identifier with spaces, a keyword or non-ASCII letters is returned under that exact name, so a record field for it needs a quoted identifier too: `record {| int 'my\ id; string 'select; |}`.

Db2 accepts one statement per call. A second statement after a `;` fails with `SQL0104N`.

### Concurrency and virtual threads

The Ballerina runtime runs strands on Java virtual threads, and the IBM JCC driver does its network I/O inside `synchronized` methods. On Java 21 this pins the carrier thread for the duration of every database call, so by default an application can only have as many Db2 calls in flight as the machine has CPU cores, regardless of the pool size.

For applications that run many database calls concurrently, raise the number of carrier threads when starting the program. About four times the number of cores worked best in our tests:

```bash
java -Djdk.virtualThreadScheduler.parallelism=16 -jar app.jar
```

On a 4-core host this doubled insert throughput at 16 concurrent workers (1,035 to 2,246 inserts per second) and raised a mixed read/update workload from 3,765 to 8,652 operations per second.

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

The [examples](https://github.com/ballerina-platform/module-ballerinax-ibm.db2/tree/main/examples) directory shows how to use the connector:

1. [Basic operations](https://github.com/ballerina-platform/module-ballerinax-ibm.db2/tree/main/examples/basic-operations) - Create a table, insert, query, update and delete records.
2. [Stored procedures and transactions](https://github.com/ballerina-platform/module-ballerinax-ibm.db2/tree/main/examples/procedures-and-transactions) - Call a stored procedure with OUT parameters and a result set, and group statements in a transaction.
