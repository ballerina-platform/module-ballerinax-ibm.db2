# Specification: Ballerina IBM Db2 Library

_Owners_: @daneshk  
_Reviewers_: @daneshk  
_Created_: 2026/10/29  
_Updated_: 2026/10/29  
_Edition_: Swan Lake  

## Introduction

This is the specification for the IBM Db2 library of [Ballerina language](https://ballerina.io/), which provides the functionality that is required to access and manipulate data stored in an IBM Db2 database.

The Db2 library specification has evolved and may continue to evolve in the future. The released versions of the specification can be found under the relevant GitHub tag.

If you have any feedback or suggestions about the library, start a discussion via a [GitHub issue](https://github.com/ballerina-platform/ballerina-library/issues) or in the [Discord server](https://discord.gg/ballerinalang). Based on the outcome of the discussion, the specification and implementation can be updated. Community feedback is always welcome. Any accepted proposal, which affects the specification is stored under `/docs/proposals`. Proposals under discussion can be found with the label `type/proposal` in GitHub.

The conforming implementation of the specification is released to Ballerina central. Any deviation from the specification is considered a bug.

## Contents

1. [Overview](#1-overview)
2. [Client](#2-client)
    * 2.1. [Connection options](#21-connection-options)
    * 2.2. [Handle connection pools](#22-handle-connection-pools)
    * 2.3. [Close the client](#23-close-the-client)
3. [Queries and values](#3-queries-and-values)
    * 3.1. [Type mapping](#31-type-mapping)
    * 3.2. [Parameters](#32-parameters)
4. [Database operations](#4-database-operations)
5. [Transactions](#5-transactions)
6. [Errors](#6-errors)
7. [Observability](#7-observability)

# 1. Overview

This specification elaborates on the usage of the Db2 `Client` object to interface with an IBM Db2 database. The client works with Db2 for Linux, UNIX and Windows, Db2 for z/OS and Db2 for i through the IBM Data Server Driver for JDBC and SQLJ (JCC) type 4 driver, which is provided by the `ballerinax/db2.driver` package.

`Client` supports five database operations as follows,
1. Executes the query, which may return multiple results.
2. Executes the query, which is expected to return at most one row of the result.
3. Executes the SQL query. Only the metadata of the execution is returned.
4. Executes the SQL query with multiple sets of parameters in a batch. Only the metadata of the execution is returned.
5. Executes an SQL query, which calls a stored procedure. This can either return results or nil.

All the above operations make use of `sql:ParameterizedQuery` object, backtick surrounded string template to pass SQL statements to the database.

# 2. Client

Each client represents a pool of connections to the database. The pool of connections is maintained throughout the lifetime of the client.

**Initialisation of the client:**
```ballerina
# Connects to a Db2 database with the specified configuration.
#
# + host - Db2 server hostname
# + user - Database username
# + password - Database password
# + database - Name of the Db2 database to connect to (the location name for Db2 for z/OS)
# + port - Db2 server port
# + options - Db2 database connection options
# + connectionPool - Connection pool for connection reuse. If not provided, the global connection pool
#                    (shared by all clients) will be used
# + return - `sql:Error` if the client creation fails
public isolated function init(string host = "localhost", string? user = (), string? password = (),
        string? database = (), int port = 50000, Options? options = (),
        sql:ConnectionPool? connectionPool = ()) returns sql:Error?;
```

The `database` parameter is required: when it is nil or empty, the client returns an `sql:ApplicationError` without contacting the server.

The client connects with the JDBC URL `jdbc:db2://<host>:<port>/<database>` and always sets the `retrieveMessagesFromServerOnGetMessage` driver property, so that the error messages carry the server message text.

## 2.1. Connection options

```ballerina
# Advanced Db2 connection options.
#
# + secureSocket - SSL/TLS configuration. When provided, the connection is encrypted using TLS
# + currentSchema - Default schema used to resolve unqualified object names
# + securityMechanism - DRDA security mechanism used to authenticate the user
# + loginTimeout - Maximum time in seconds to wait for a connection to be established and authenticated
# + socketTimeout - Maximum time in seconds to wait for a reply from the server on an established connection
# + queryTimeout - Maximum time in seconds a statement is allowed to run before it is cancelled
# + clientProgramName - Application name reported to the server
# + useXADatasource - Enable XA transactions
# + properties - Additional JCC driver properties, which override the values derived from the other options
public type Options record {|
    SecureSocket secureSocket?;
    string currentSchema?;
    SecurityMechanism securityMechanism?;
    decimal loginTimeout?;
    decimal socketTimeout?;
    decimal queryTimeout?;
    string clientProgramName?;
    boolean useXADatasource = false;
    map<string|int|boolean> properties?;
|};

# SSL/TLS configuration used to connect to a Db2 server.
#
# + cert - Truststore holding the certificate of the CA that signed the Db2 server certificate
# + certFile - Path to a PEM or ARM file with the server (or CA) certificate
# + key - Keystore holding the client certificate and private key
# + tlsVersion - TLS protocol version to use
# + verifyHostName - Validate that the host name of the server matches the server certificate
public type SecureSocket record {|
    crypto:TrustStore cert?;
    string certFile?;
    crypto:KeyStore key?;
    string tlsVersion?;
    boolean verifyHostName = false;
|};

# DRDA security mechanisms supported by the Db2 client.
public enum SecurityMechanism {
    CLEAR_TEXT_PASSWORD,
    ENCRYPTED_PASSWORD,
    ENCRYPTED_USER_AND_PASSWORD,
    ENCRYPTED_USER_PASSWORD_AND_DATA,
    KERBEROS,
    TLS_CLIENT_CERTIFICATE
}
```

The options map to the JCC driver properties as follows.

| Option | JCC property |
|---|---|
| `secureSocket` | `sslConnection=true` |
| `secureSocket.cert` | `sslTrustStoreLocation`, `sslTrustStorePassword`, `sslTrustStoreType` (`JKS` for `.jks` files, otherwise `PKCS12`) |
| `secureSocket.certFile` | `sslCertLocation` |
| `secureSocket.key` | `sslKeyStoreLocation`, `sslKeyStorePassword`, `sslKeyStoreType` |
| `secureSocket.tlsVersion` | `sslVersion` |
| `secureSocket.verifyHostName` | `sslClientHostnameValidation=BASIC` |
| `currentSchema` | `currentSchema` |
| `securityMechanism` | `securityMechanism` (3, 7, 9, 13, 11 and 18 respectively) |
| `loginTimeout` | `loginTimeout` (and the pool connection timeout) |
| `socketTimeout` | `blockingReadConnectionTimeout` |
| `queryTimeout` | `commandTimeout` |
| `clientProgramName` | `clientProgramName` |

The timeout values are rounded up to whole seconds, which is the resolution of the driver. The compiler plugin reports an error for a negative timeout.

## 2.2. Handle connection pools

Connection pool handling is generic and implemented through the `sql` module. For more information, see the [SQL specification](https://github.com/ballerina-platform/module-ballerina-sql/blob/master/docs/spec/spec.md#21-connection-pool-handling).

## 2.3. Close the client

Once all the database operations are performed, the client can be closed by invoking the `close()` operation. This will close the corresponding connection pool if it is not shared by any other database clients.

```ballerina
public isolated function close() returns sql:Error?;
```

# 3. Queries and values

All the generic `sql` queries and values are supported. For more information, see the [SQL specification](https://github.com/ballerina-platform/module-ballerina-sql/blob/master/docs/spec/spec.md#3-queries-and-values).

## 3.1. Type mapping

In addition to the generic mapping of the `sql` module, the Db2 client maps the following Db2 types.

| Db2 type | Ballerina type | Notes |
|---|---|---|
| `DECFLOAT(16)`, `DECFLOAT(34)` | `decimal`, `float`, `int`, `string` | Returned as `decimal` for `anydata` fields. `Infinity`, `-Infinity`, `NaN` and `sNaN` are returned as `string` for `anydata` fields and result in an `sql:Error` for `decimal` fields. |
| `XML` | `xml` | Parsed from the serialized document. |
| `GRAPHIC`, `VARGRAPHIC`, `DBCLOB` | `string` | |
| `BOOLEAN` | `boolean` | |
| `TIMESTAMP(p)` | `time:Civil`, `time:Utc`, `string` | Nanosecond precision. |

This mapping applies to `queryRow`, to every row of the streams returned by `query`, and to the result sets of `call`. `XML` OUT parameters are parsed in the same way.

## 3.2. Parameters

A nil value is sent to the server as a typed null, because the JCC driver does not accept the JDBC `NULL` type. The server takes the type of the parameter marker from its context, so the value can be inserted into a nullable column of any type.

An `xml` value is sent as a serialized XML document.

Db2 must be able to derive the type of every parameter marker from the statement. Otherwise, the statement fails with `SQL0418N` (SQLSTATE `42610`), and the parameter has to be cast, for example `` `SELECT CAST(${value} AS INT) FROM SYSIBM.SYSDUMMY1` ``.

# 4. Database operations

`Client` supports five database operations as follows,
1. Executes the query, which may return multiple results.
2. Executes the query, which is expected to return at most one row of the result.
3. Executes the SQL query. Only the metadata of the execution is returned.
4. Executes the SQL query with multiple sets of parameters in a batch. Only the metadata of the execution is returned.
5. Executes an SQL query, which calls a stored procedure. This can either return results or nil.

For more information on database operations see the [SQL specification](https://github.com/ballerina-platform/module-ballerina-sql/blob/master/docs/spec/spec.md#4-database-operations).

The `lastInsertId` of the `sql:ExecutionResult` returned by `execute` holds the value of the identity column of the inserted row. Db2 does not return the generated keys of batched statements, so `batchExecute` returns nil `lastInsertId` values.

When a command of a batch fails, Db2 continues with the remaining commands. The returned `sql:BatchExecuteError` holds the result of every command, where a failed command has an `affectedRowCount` of `-3`.

# 5. Transactions

Local transactions are supported through the Ballerina `transaction` statement.

Distributed transactions are supported when `useXADatasource` is set to `true`. The client then uses an XA data source that also accepts the JDBC URL. Each client in a distributed transaction must connect to a different database, as the Ballerina transaction manager uses the same transaction branch for all the participating resources. Two XA clients that connect to the same database in one transaction fail with `XAER_DUPID`.

# 6. Errors

Database errors are returned as `sql:DatabaseError` values. The `errorCode` field of the error detail holds the SQLCODE (or the JCC driver error code for client side errors) and the `sqlState` field holds the SQLSTATE.

# 7. Observability

The Db2 module supports observability through connection pool metrics, reported via the `ballerina/observe` module. The metric names and lifecycle are defined by the `ballerina/sql` module.

The Db2 module sets the following metric tags on every connection pool it creates.

| Tag | Source | Always present | Description |
|---|---|---|---|
| `db_host` | `host` parameter | Yes | Hostname of the server (defaults to `"localhost"`) |
| `db_port` | `port` parameter | Yes | Port number of the server (defaults to `50000`) |
| `db_name` | `database` parameter | Yes | Database name |
