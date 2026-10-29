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

package io.ballerina.lib.ibm.db2.datasource;

import com.ibm.db2.jcc.DB2XADataSource;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Proxy;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.sql.DataSource;
import javax.sql.XAConnection;

/**
 * XA data source for Db2 that can be used by the SQL module.
 * <p>
 * The SQL module configures a vendor XA data source through HikariCP (or Atomikos when the transaction manager is
 * enabled) and expects it to be both a {@link DataSource} that accepts a {@code url} property and an
 * {@link javax.sql.XADataSource}. The IBM JCC {@link DB2XADataSource} is neither a {@link DataSource} nor does it
 * accept a URL, so this class adds both:
 * <ul>
 *     <li>{@link #setUrl(String)} maps the JDBC URL onto {@code serverName}, {@code portNumber} and
 *     {@code databaseName}.</li>
 *     <li>{@link #getConnection()} hands out the logical connection of a new XA connection. Closing it also closes
 *     the physical XA connection, so the connections pooled by HikariCP do not leak.</li>
 * </ul>
 *
 * @since 0.1.0
 */
public class Db2XADataSource extends DB2XADataSource implements DataSource {

    private static final long serialVersionUID = 1L;
    private static final Pattern URL_PATTERN =
            Pattern.compile("^jdbc:db2://(\\[[^\\]]+\\]|[^:/]+)(?::(\\d+))?/([^:;]+)(?::.*)?$");

    public Db2XADataSource() {
        super();
        setDriverType(4);
    }

    public synchronized void setUrl(String url) {
        Matcher matcher = URL_PATTERN.matcher(url);
        if (!matcher.matches()) {
            throw new IllegalArgumentException("Invalid Db2 JDBC URL: " + url);
        }
        String host = matcher.group(1);
        if (host.startsWith("[")) {
            host = host.substring(1, host.length() - 1);
        }
        setServerName(host);
        if (matcher.group(2) != null) {
            setPortNumber(Integer.parseInt(matcher.group(2)));
        }
        setDatabaseName(matcher.group(3));
    }

    @Override
    public Connection getConnection() throws SQLException {
        return toConnection(getXAConnection());
    }

    @Override
    public Connection getConnection(String user, String password) throws SQLException {
        return toConnection(getXAConnection(user, password));
    }

    @Override
    public <T> T unwrap(Class<T> iface) throws SQLException {
        if (iface.isInstance(this)) {
            return iface.cast(this);
        }
        throw new SQLException("Db2XADataSource is not a wrapper for " + iface.getName());
    }

    @Override
    public boolean isWrapperFor(Class<?> iface) {
        return iface.isInstance(this);
    }

    private static Connection toConnection(XAConnection xaConnection) throws SQLException {
        Connection connection;
        try {
            connection = xaConnection.getConnection();
        } catch (SQLException e) {
            xaConnection.close();
            throw e;
        }
        return (Connection) Proxy.newProxyInstance(Db2XADataSource.class.getClassLoader(),
                new Class<?>[]{Connection.class}, (proxy, method, args) -> {
                    try {
                        if ("close".equals(method.getName()) && method.getParameterCount() == 0) {
                            try {
                                connection.close();
                            } finally {
                                xaConnection.close();
                            }
                            return null;
                        }
                        return method.invoke(connection, args);
                    } catch (InvocationTargetException e) {
                        throw e.getCause();
                    }
                });
    }
}
