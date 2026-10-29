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

package io.ballerina.lib.db2.utils;

import io.ballerina.lib.db2.Constants;
import io.ballerina.runtime.api.utils.StringUtils;
import io.ballerina.runtime.api.values.BDecimal;
import io.ballerina.runtime.api.values.BMap;
import io.ballerina.runtime.api.values.BString;

import java.util.Locale;

/**
 * Maps the Ballerina `db2:Options` record to IBM JCC driver properties.
 *
 * @since 0.1.0
 */
public final class Utils {

    private Utils() {
    }

    @SuppressWarnings("unchecked")
    public static void populateProperties(BMap<BString, Object> properties, BMap<BString, Object> options) {
        addSecureSocketOptions((BMap<BString, Object>) options.getMapValue(Constants.Options.SECURE_SOCKET),
                properties);

        BString currentSchema = options.getStringValue(Constants.Options.CURRENT_SCHEMA);
        if (currentSchema != null && !currentSchema.getValue().isEmpty()) {
            properties.put(Constants.DriverProps.CURRENT_SCHEMA, currentSchema);
        }
        BString securityMechanism = options.getStringValue(Constants.Options.SECURITY_MECHANISM);
        if (securityMechanism != null) {
            properties.put(Constants.DriverProps.SECURITY_MECHANISM,
                    (long) getSecurityMechanismCode(securityMechanism.getValue()));
        }
        long loginTimeout = getTimeoutInSeconds(options.get(Constants.Options.LOGIN_TIMEOUT));
        if (loginTimeout > 0) {
            properties.put(Constants.DriverProps.LOGIN_TIMEOUT, loginTimeout);
        }
        long socketTimeout = getTimeoutInSeconds(options.get(Constants.Options.SOCKET_TIMEOUT));
        if (socketTimeout > 0) {
            properties.put(Constants.DriverProps.BLOCKING_READ_TIMEOUT, socketTimeout);
        }
        long queryTimeout = getTimeoutInSeconds(options.get(Constants.Options.QUERY_TIMEOUT));
        if (queryTimeout > 0) {
            properties.put(Constants.DriverProps.COMMAND_TIMEOUT, queryTimeout);
        }
        BString clientProgramName = options.getStringValue(Constants.Options.CLIENT_PROGRAM_NAME);
        if (clientProgramName != null) {
            properties.put(Constants.DriverProps.CLIENT_PROGRAM_NAME, clientProgramName);
        }

        BMap<BString, Object> extraProperties =
                (BMap<BString, Object>) options.getMapValue(Constants.Options.PROPERTIES);
        if (extraProperties != null) {
            for (BString key : extraProperties.getKeys()) {
                properties.put(key, extraProperties.get(key));
            }
        }
    }

    public static long getTimeoutInSeconds(Object seconds) {
        if (seconds instanceof BDecimal timeout) {
            double value = timeout.floatValue();
            if (value > 0) {
                // The JCC driver accepts whole seconds only. Round up so that sub-second values do not disable
                // the timeout.
                return (long) Math.ceil(value);
            }
        }
        return -1;
    }

    private static short getSecurityMechanismCode(String mechanism) {
        return switch (mechanism) {
            case "CLEAR_TEXT_PASSWORD" -> 3;
            case "ENCRYPTED_PASSWORD" -> 7;
            case "ENCRYPTED_USER_AND_PASSWORD" -> 9;
            case "KERBEROS" -> 11;
            case "ENCRYPTED_USER_PASSWORD_AND_DATA" -> 13;
            case "TLS_CLIENT_CERTIFICATE" -> 18;
            default -> throw new IllegalArgumentException("Unsupported security mechanism: " + mechanism);
        };
    }

    @SuppressWarnings("unchecked")
    private static void addSecureSocketOptions(BMap<BString, Object> secureSocket, BMap<BString, Object> properties) {
        if (secureSocket == null) {
            return;
        }
        properties.put(Constants.DriverProps.SSL_CONNECTION, true);

        BMap<BString, Object> trustStore =
                (BMap<BString, Object>) secureSocket.getMapValue(Constants.SecureSocket.CERT);
        if (trustStore != null) {
            BString path = trustStore.getStringValue(Constants.SecureSocket.STORE_PATH);
            properties.put(Constants.DriverProps.SSL_TRUSTSTORE_LOCATION, path);
            properties.put(Constants.DriverProps.SSL_TRUSTSTORE_PASSWORD,
                    trustStore.getStringValue(Constants.SecureSocket.STORE_PASSWORD));
            properties.put(Constants.DriverProps.SSL_TRUSTSTORE_TYPE, getStoreType(path.getValue()));
        }
        BString certFile = secureSocket.getStringValue(Constants.SecureSocket.CERT_FILE);
        if (certFile != null) {
            properties.put(Constants.DriverProps.SSL_CERT_LOCATION, certFile);
        }
        BMap<BString, Object> keyStore = (BMap<BString, Object>) secureSocket.getMapValue(Constants.SecureSocket.KEY);
        if (keyStore != null) {
            BString path = keyStore.getStringValue(Constants.SecureSocket.STORE_PATH);
            properties.put(Constants.DriverProps.SSL_KEYSTORE_LOCATION, path);
            properties.put(Constants.DriverProps.SSL_KEYSTORE_PASSWORD,
                    keyStore.getStringValue(Constants.SecureSocket.STORE_PASSWORD));
            properties.put(Constants.DriverProps.SSL_KEYSTORE_TYPE, getStoreType(path.getValue()));
        }
        BString tlsVersion = secureSocket.getStringValue(Constants.SecureSocket.TLS_VERSION);
        if (tlsVersion != null) {
            properties.put(Constants.DriverProps.SSL_VERSION, tlsVersion);
        }
        // The JCC driver validates the host name by default, so the value is always set explicitly.
        boolean verifyHostName = secureSocket.getBooleanValue(Constants.SecureSocket.VERIFY_HOST_NAME);
        properties.put(Constants.DriverProps.SSL_HOSTNAME_VALIDATION,
                StringUtils.fromString(verifyHostName ? "BASIC" : "OFF"));
    }

    private static BString getStoreType(String path) {
        String lowerCasePath = path.toLowerCase(Locale.ROOT);
        if (lowerCasePath.endsWith(".jks")) {
            return StringUtils.fromString("JKS");
        }
        return StringUtils.fromString("PKCS12");
    }
}
