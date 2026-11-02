# Change Log
This file contains all the notable changes done to the Ballerina db2 package through the releases.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Db2 client with `query`, `queryRow`, `execute`, `batchExecute` and `call` operations based on `ballerina/sql`
- Connection options for TLS, the current schema, DRDA security mechanisms, timeouts, the client program name and additional JCC driver properties
- XA data source support for distributed transactions
- Mapping of the Db2 `DECFLOAT`, `XML`, `GRAPHIC`, `VARGRAPHIC`, `DBCLOB` and `BOOLEAN` types
- Compiler plugin validations for the connection pool and the timeout options
- `BinaryOutParameter`, `VarBinaryOutParameter`, `BlobOutParameter` and `XmlOutParameter` for reading binary and XML OUT parameters
- UTC storage of `time:Utc` values and `time:Civil` values with a `utcOffset`, and UTC interpretation of `TIMESTAMP` columns read as `time:Utc` or `int`
- Clear errors for array parameters, `NaN`/`Infinity` values and `time:TimeOfDay` values with a `utcOffset`
- `sql:NClobValue` support (bound as a CLOB) and string timestamps in INOUT parameters
- Tests for every Db2 data type, stored procedure parameter type, batch behaviour and special characters
