/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package io.ballerina.lib.ibm.db2.parameterprocessor;

import io.ballerina.runtime.api.values.BXml;
import io.ballerina.stdlib.sql.exception.DataError;
import io.ballerina.stdlib.sql.parameterprocessor.DefaultStatementParameterProcessor;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.SQLXML;
import java.sql.Types;

/**
 * Sets the parameters of Db2 prepared statements.
 *
 * @since 0.1.0
 */
public class Db2StatementParameterProcessor extends DefaultStatementParameterProcessor {

    private static final Db2StatementParameterProcessor INSTANCE = new Db2StatementParameterProcessor();

    private Db2StatementParameterProcessor() {
    }

    public static Db2StatementParameterProcessor getInstance() {
        return INSTANCE;
    }

    @Override
    public int setSQLValueParam(Connection connection, PreparedStatement preparedStatement, int index, Object object,
                                boolean returnType) throws DataError, SQLException {
        if (object == null) {
            // The JCC driver rejects `Types.NULL` ("Unrecognized JDBC type: 0", ERRORCODE=-4228). The server takes
            // the type of a parameter marker from its context, so a typed null is accepted by any nullable column.
            preparedStatement.setNull(index, Types.VARCHAR);
            return Types.VARCHAR;
        }
        return super.setSQLValueParam(connection, preparedStatement, index, object, returnType);
    }

    @Override
    protected void setXml(Connection connection, PreparedStatement preparedStatement, int index, BXml value)
            throws SQLException, DataError {
        // Bind the serialized document. The text value of an element only holds its character data.
        SQLXML sqlxml = connection.createSQLXML();
        sqlxml.setString(value.toString());
        preparedStatement.setSQLXML(index, sqlxml);
    }
}
