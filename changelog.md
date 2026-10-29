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
