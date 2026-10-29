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

package io.ballerina.lib.ibm.db2;

import io.ballerina.runtime.api.utils.StringUtils;
import io.ballerina.runtime.api.values.BString;

/**
 * Constants for the Db2 connector.
 *
 * @since 0.1.0
 */
public final class Constants {

    private Constants() {
    }

    public static final String JDBC_URL_PREFIX = "jdbc:db2://";
    public static final String DB2_XA_DATASOURCE_NAME = "io.ballerina.lib.ibm.db2.datasource.Db2XADataSource";
    public static final String POOL_CONNECTION_TIMEOUT = "connectionTimeout";

    /**
     * Fields of the `ClientConfiguration` record.
     */
    public static final class ClientConfiguration {
        private ClientConfiguration() {
        }

        public static final BString HOST = StringUtils.fromString("host");
        public static final BString PORT = StringUtils.fromString("port");
        public static final BString USER = StringUtils.fromString("user");
        public static final BString PASSWORD = StringUtils.fromString("password");
        public static final BString DATABASE = StringUtils.fromString("database");
        public static final BString OPTIONS = StringUtils.fromString("options");
        public static final BString CONNECTION_POOL_OPTIONS = StringUtils.fromString("connectionPool");
    }

    /**
     * Fields of the `Options` record.
     */
    public static final class Options {
        private Options() {
        }

        public static final BString SECURE_SOCKET = StringUtils.fromString("secureSocket");
        public static final BString CURRENT_SCHEMA = StringUtils.fromString("currentSchema");
        public static final BString SECURITY_MECHANISM = StringUtils.fromString("securityMechanism");
        public static final BString LOGIN_TIMEOUT = StringUtils.fromString("loginTimeout");
        public static final BString SOCKET_TIMEOUT = StringUtils.fromString("socketTimeout");
        public static final BString QUERY_TIMEOUT = StringUtils.fromString("queryTimeout");
        public static final BString CLIENT_PROGRAM_NAME = StringUtils.fromString("clientProgramName");
        public static final BString USE_XA_DATASOURCE = StringUtils.fromString("useXADatasource");
        public static final BString PROPERTIES = StringUtils.fromString("properties");
    }

    /**
     * Fields of the `SecureSocket` record.
     */
    public static final class SecureSocket {
        private SecureSocket() {
        }

        public static final BString CERT = StringUtils.fromString("cert");
        public static final BString CERT_FILE = StringUtils.fromString("certFile");
        public static final BString KEY = StringUtils.fromString("key");
        public static final BString TLS_VERSION = StringUtils.fromString("tlsVersion");
        public static final BString VERIFY_HOST_NAME = StringUtils.fromString("verifyHostName");
        public static final BString STORE_PATH = StringUtils.fromString("path");
        public static final BString STORE_PASSWORD = StringUtils.fromString("password");
    }

    /**
     * IBM Data Server Driver for JDBC (JCC) property names.
     */
    public static final class DriverProps {
        private DriverProps() {
        }

        public static final BString RETRIEVE_MESSAGES =
                StringUtils.fromString("retrieveMessagesFromServerOnGetMessage");
        public static final BString ALLOW_NEXT_ON_EXHAUSTED_RESULT_SET =
                StringUtils.fromString("allowNextOnExhaustedResultSet");
        public static final BString CURRENT_SCHEMA = StringUtils.fromString("currentSchema");
        public static final BString SECURITY_MECHANISM = StringUtils.fromString("securityMechanism");
        public static final BString LOGIN_TIMEOUT = StringUtils.fromString("loginTimeout");
        public static final BString BLOCKING_READ_TIMEOUT = StringUtils.fromString("blockingReadConnectionTimeout");
        public static final BString COMMAND_TIMEOUT = StringUtils.fromString("commandTimeout");
        public static final BString CLIENT_PROGRAM_NAME = StringUtils.fromString("clientProgramName");
        public static final BString SSL_CONNECTION = StringUtils.fromString("sslConnection");
        public static final BString SSL_TRUSTSTORE_LOCATION = StringUtils.fromString("sslTrustStoreLocation");
        public static final BString SSL_TRUSTSTORE_PASSWORD = StringUtils.fromString("sslTrustStorePassword");
        public static final BString SSL_TRUSTSTORE_TYPE = StringUtils.fromString("sslTrustStoreType");
        public static final BString SSL_KEYSTORE_LOCATION = StringUtils.fromString("sslKeyStoreLocation");
        public static final BString SSL_KEYSTORE_PASSWORD = StringUtils.fromString("sslKeyStorePassword");
        public static final BString SSL_KEYSTORE_TYPE = StringUtils.fromString("sslKeyStoreType");
        public static final BString SSL_CERT_LOCATION = StringUtils.fromString("sslCertLocation");
        public static final BString SSL_VERSION = StringUtils.fromString("sslVersion");
        public static final BString SSL_HOSTNAME_VALIDATION = StringUtils.fromString("sslClientHostnameValidation");
    }

    /**
     * Db2 specific SQL type codes reported by the JCC driver that are not part of {@link java.sql.Types}.
     */
    public static final class Db2Types {
        private Db2Types() {
        }

        public static final int DECFLOAT = -100001;
    }
}
