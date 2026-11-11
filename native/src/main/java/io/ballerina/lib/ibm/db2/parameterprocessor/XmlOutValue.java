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

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.StringReader;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.sql.SQLXML;

import javax.xml.transform.Result;
import javax.xml.transform.Source;

/**
 * The serialized document of an XML OUT parameter. The driver's own {@code SQLXML} can be read only once, so the
 * document is kept as a string and handed out as a re-readable value.
 *
 * @since 1.0.0
 */
final class XmlOutValue implements SQLXML {

    private final String document;

    XmlOutValue(String document) {
        this.document = document;
    }

    @Override
    public String getString() {
        return document;
    }

    @Override
    public Reader getCharacterStream() {
        return new StringReader(document);
    }

    @Override
    public InputStream getBinaryStream() {
        return new ByteArrayInputStream(document.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void free() {
    }

    @Override
    public void setString(String value) throws SQLException {
        throw new SQLFeatureNotSupportedException("The value of an OUT parameter is read only");
    }

    @Override
    public OutputStream setBinaryStream() throws SQLException {
        throw new SQLFeatureNotSupportedException("The value of an OUT parameter is read only");
    }

    @Override
    public Writer setCharacterStream() throws SQLException {
        throw new SQLFeatureNotSupportedException("The value of an OUT parameter is read only");
    }

    @Override
    public <T extends Source> T getSource(Class<T> sourceClass) throws SQLException {
        throw new SQLFeatureNotSupportedException("Use getString or getCharacterStream");
    }

    @Override
    public <T extends Result> T setResult(Class<T> resultClass) throws SQLException {
        throw new SQLFeatureNotSupportedException("The value of an OUT parameter is read only");
    }
}
