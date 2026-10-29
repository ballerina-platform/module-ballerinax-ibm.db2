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

import ballerina/crypto;

# Advanced Db2 connection options.
#
# + secureSocket - SSL/TLS configuration. When provided, the connection is encrypted using TLS
# + currentSchema - Default schema used to resolve unqualified object names (sets the `CURRENT SCHEMA` special register)
# + securityMechanism - DRDA security mechanism used to authenticate the user
# + loginTimeout - Maximum time in seconds to wait for a connection to be established and authenticated
#                  (0 means no timeout)
# + socketTimeout - Maximum time in seconds to wait for a reply from the server on an established connection
#                   (0 means no timeout)
# + queryTimeout - Maximum time in seconds a statement is allowed to run before it is cancelled (0 means no timeout)
# + clientProgramName - Application name reported to the server (visible in `MON_GET_CONNECTION` and `db2 list applications`)
# + useXADatasource - Enable XA transactions
# + properties - Additional IBM Data Server Driver for JDBC (JCC) properties, such as client reroute or IAM settings.
#                These are passed to the driver as-is and override the values derived from the other options
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
# + certFile - Path to a PEM or ARM file with the server (or CA) certificate. Used instead of `cert`
# + key - Keystore holding the client certificate and private key. Required for TLS client certificate authentication
# + tlsVersion - TLS protocol version to use (e.g., `TLSv1.3`). The JVM default is used when not provided
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
    # User ID and password are sent in clear text (rely on TLS for confidentiality)
    CLEAR_TEXT_PASSWORD = "CLEAR_TEXT_PASSWORD",
    # Only the password is encrypted
    ENCRYPTED_PASSWORD = "ENCRYPTED_PASSWORD",
    # User ID and password are encrypted
    ENCRYPTED_USER_AND_PASSWORD = "ENCRYPTED_USER_AND_PASSWORD",
    # User ID, password and the security-sensitive data are encrypted
    ENCRYPTED_USER_PASSWORD_AND_DATA = "ENCRYPTED_USER_PASSWORD_AND_DATA",
    # Kerberos authentication
    KERBEROS = "KERBEROS",
    # Authentication using the client certificate in `SecureSocket.key`
    TLS_CLIENT_CERTIFICATE = "TLS_CLIENT_CERTIFICATE"
}
