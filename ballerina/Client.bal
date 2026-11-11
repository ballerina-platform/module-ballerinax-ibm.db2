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

import ballerina/jballerina.java;
import ballerina/sql;

# IBM Db2 client that enables interaction with Db2 for Linux, UNIX and Windows (LUW), Db2 for z/OS and
# Db2 for i servers, and supports the standard SQL operations.
public isolated client class Client {
    *sql:Client;

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
            sql:ConnectionPool? connectionPool = ()) returns sql:Error? {
        if database is () || database.trim().length() == 0 {
            return error sql:ApplicationError("A database name is required to connect to a Db2 server. " +
                "Provide it using the `database` parameter.");
        }
        ClientConfiguration clientConfig = {
            host,
            port,
            user,
            password,
            database,
            options,
            connectionPool
        };
        return createClient(self, clientConfig, sql:getGlobalConnectionPool());
    }

    # Executes a SQL query and returns multiple results as a stream.
    #
    # + sqlQuery - SQL query with optional parameters (e.g., `` `SELECT * FROM EMPLOYEE WHERE EMPNO = ${empNo}` ``)
    # + rowType - Record type to map query results to
    # + return - Stream of records containing the query results. Please ensure that the stream is fully consumed,
    #            or close the stream.
    remote isolated function query(sql:ParameterizedQuery sqlQuery, typedesc<record {}> rowType = <>)
    returns stream<rowType, sql:Error?> = @java:Method {
        'class: "io.ballerina.lib.ibm.db2.nativeimpl.QueryProcessorUtils",
        name: "nativeQuery"
    } external;

    # Executes a SQL query that is expected to return a single row or value as the result.
    # If the query returns no results, `sql:NoRowsError` is returned.
    #
    # + sqlQuery - SQL query (e.g., `` `SELECT * FROM EMPLOYEE WHERE EMPNO = ${empNo}` ``)
    # + returnType - The `typedesc` of the record to which the result should be mapped.
    #                It can be a basic type if the query result contains only one column
    # + return - Result in the `returnType` type or an `sql:Error`
    remote isolated function queryRow(sql:ParameterizedQuery sqlQuery, typedesc<anydata> returnType = <>)
    returns returnType|sql:Error = @java:Method {
        'class: "io.ballerina.lib.ibm.db2.nativeimpl.QueryProcessorUtils",
        name: "nativeQueryRow"
    } external;

    # Executes a SQL query and returns execution metadata (not the actual query results).
    #
    # + sqlQuery - SQL query with parameters (e.g., `` `DELETE FROM EMPLOYEE WHERE EMPNO = ${empNo}` ``)
    # + return - Execution metadata as an `sql:ExecutionResult`, or an `sql:Error` if execution fails
    remote isolated function execute(sql:ParameterizedQuery sqlQuery)
    returns sql:ExecutionResult|sql:Error = @java:Method {
        'class: "io.ballerina.lib.ibm.db2.nativeimpl.ExecuteProcessorUtils",
        name: "nativeExecute"
    } external;

    # Executes multiple SQL commands in a single batch operation, and returns execution metadata
    # (not the actual query results). If one command fails, the `sql:BatchExecuteError` is returned
    # with the details of the commands that were executed.
    #
    # + sqlQueries - Array of SQL queries with parameters
    # + return - Array of execution results or an `sql:Error` if the operation fails
    remote isolated function batchExecute(sql:ParameterizedQuery[] sqlQueries)
    returns sql:ExecutionResult[]|sql:Error {
        if sqlQueries.length() == 0 {
            return error sql:ApplicationError("Parameter 'sqlQueries' cannot be an empty array");
        }
        return nativeBatchExecute(self, sqlQueries);
    }

    # Calls a stored procedure with the given SQL query.
    # Once the results are processed, invoke the `close` method on the `sql:ProcedureCallResult`.
    #
    # + sqlQuery - SQL query to call the procedure (e.g., `` `CALL GET_EMPLOYEE(${empNo})` ``)
    # + rowTypes - `typedesc` array of the records to which the results should be mapped
    # + return - Summary of the execution and results as `sql:ProcedureCallResult`, or an `sql:Error`
    #            if the call fails
    remote isolated function call(sql:ParameterizedCallQuery sqlQuery, typedesc<record {}>[] rowTypes = [])
    returns sql:ProcedureCallResult|sql:Error = @java:Method {
        'class: "io.ballerina.lib.ibm.db2.nativeimpl.CallProcessorUtils",
        name: "nativeCall"
    } external;

    # Closes the Db2 client and shuts down the connection pool.
    # The client should be closed only at the end of the application lifetime, or when performing graceful
    # stops in a service.
    #
    # + return - `sql:Error` if closing the client fails
    public isolated function close() returns sql:Error? = @java:Method {
        'class: "io.ballerina.lib.ibm.db2.nativeimpl.ClientProcessorUtils",
        name: "close"
    } external;
}

# Db2 client connection configuration.
#
# + host - Db2 server hostname
# + port - Db2 server port
# + user - Database username
# + password - Database password
# + database - Database name
# + options - Db2 database connection options
# + connectionPool - Connection pool configuration
type ClientConfiguration record {|
    string host;
    int port;
    string? user;
    string? password;
    string database;
    Options? options;
    sql:ConnectionPool? connectionPool;
|};

isolated function createClient(Client db2Client, ClientConfiguration clientConfig,
        sql:ConnectionPool globalConnPool) returns sql:Error? = @java:Method {
    'class: "io.ballerina.lib.ibm.db2.nativeimpl.ClientProcessorUtils"
} external;

isolated function nativeBatchExecute(Client sqlClient, sql:ParameterizedQuery[] sqlQueries)
returns sql:ExecutionResult[]|sql:Error = @java:Method {
    'class: "io.ballerina.lib.ibm.db2.nativeimpl.ExecuteProcessorUtils"
} external;
