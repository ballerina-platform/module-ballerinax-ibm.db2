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

package io.ballerina.lib.db2.nativeimpl;

import io.ballerina.lib.db2.Constants;
import io.ballerina.lib.db2.utils.Utils;
import io.ballerina.runtime.api.creators.ValueCreator;
import io.ballerina.runtime.api.values.BMap;
import io.ballerina.runtime.api.values.BObject;
import io.ballerina.runtime.api.values.BString;
import io.ballerina.stdlib.sql.datasource.SQLDatasource;
import io.ballerina.stdlib.sql.observability.ObservabilityUtils;
import io.ballerina.stdlib.sql.utils.ErrorGenerator;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Creates and closes the Db2 client.
 *
 * @since 0.1.0
 */
public final class ClientProcessorUtils {

    private ClientProcessorUtils() {
    }

    @SuppressWarnings("unchecked")
    public static Object createClient(BObject client, BMap<BString, Object> clientConfig,
                                      BMap<BString, Object> globalPool) {
        String host = clientConfig.getStringValue(Constants.ClientConfiguration.HOST).getValue();
        long port = clientConfig.getIntValue(Constants.ClientConfiguration.PORT);
        String database = clientConfig.getStringValue(Constants.ClientConfiguration.DATABASE).getValue().trim();
        String hostPart = host.contains(":") && !host.startsWith("[") ? "[" + host + "]" : host;
        String url = Constants.JDBC_URL_PREFIX + hostPart + (port > 0 ? ":" + port : "") + "/" + database;

        BString userVal = clientConfig.getStringValue(Constants.ClientConfiguration.USER);
        String user = userVal == null ? null : userVal.getValue();
        BString passwordVal = clientConfig.getStringValue(Constants.ClientConfiguration.PASSWORD);
        String password = passwordVal == null ? null : passwordVal.getValue();

        // Ask the server for the message text so that errors read "SQL0204N "DB2INST1.FOO" is an undefined
        // name" instead of only "SQLCODE=-204, SQLSTATE=42704".
        BMap<BString, Object> properties = ValueCreator.createMapValue();
        properties.put(Constants.DriverProps.RETRIEVE_MESSAGES, true);
        // JCC closes a result set implicitly once the last row is read; a further `next()` would fail with
        // ERRORCODE=-4470 instead of returning `false`.
        properties.put(Constants.DriverProps.ALLOW_NEXT_ON_EXHAUSTED_RESULT_SET, 1L);

        String datasourceName = null;
        Properties poolProperties = null;
        BMap<BString, Object> options =
                (BMap<BString, Object>) clientConfig.getMapValue(Constants.ClientConfiguration.OPTIONS);
        if (options != null) {
            try {
                Utils.populateProperties(properties, options);
            } catch (IllegalArgumentException e) {
                return ErrorGenerator.getSQLApplicationError(e.getMessage());
            }
            long loginTimeout = Utils.getTimeoutInSeconds(options.get(Constants.Options.LOGIN_TIMEOUT));
            if (loginTimeout > 0) {
                poolProperties = new Properties();
                poolProperties.setProperty(Constants.POOL_CONNECTION_TIMEOUT, String.valueOf(loginTimeout * 1000));
            }
            if (options.getBooleanValue(Constants.Options.USE_XA_DATASOURCE)) {
                datasourceName = Constants.DB2_XA_DATASOURCE_NAME;
            }
        }

        BMap<BString, Object> connectionPool =
                (BMap<BString, Object>) clientConfig.getMapValue(Constants.ClientConfiguration.CONNECTION_POOL_OPTIONS);

        Map<String, String> metricsTags = new HashMap<>();
        metricsTags.put(ObservabilityUtils.TAG_DB_HOST, host);
        metricsTags.put(ObservabilityUtils.TAG_DB_PORT, String.valueOf(port));
        metricsTags.put(ObservabilityUtils.TAG_DB_NAME, database);

        // Non-XA clients use the JCC `java.sql.Driver` with the URL. The JCC data source classes do not accept a
        // `url` property, so the XA client uses `Db2XADataSource`, which maps the URL onto the data source fields.
        SQLDatasource.SQLDatasourceParams sqlDatasourceParams = new SQLDatasource.SQLDatasourceParams()
                .setUrl(url)
                .setUser(user)
                .setPassword(password)
                .setDatasourceName(datasourceName)
                .setOptions(properties)
                .setConnectionPool(connectionPool, globalPool)
                .setPoolProperties(poolProperties)
                .setMetricsTags(metricsTags);
        // Db2 returns no generated keys for batched statements, so they are only requested for single executions.
        return io.ballerina.stdlib.sql.nativeimpl.ClientProcessor.createClient(client, sqlDatasourceParams,
                true, false);
    }

    public static Object close(BObject client) {
        return io.ballerina.stdlib.sql.nativeimpl.ClientProcessor.close(client);
    }
}
