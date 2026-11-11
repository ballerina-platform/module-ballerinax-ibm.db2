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

package io.ballerina.lib.ibm.db2.nativeimpl;

import io.ballerina.lib.ibm.db2.parameterprocessor.Db2StatementParameterProcessor;
import io.ballerina.runtime.api.Environment;
import io.ballerina.runtime.api.values.BArray;
import io.ballerina.runtime.api.values.BObject;

/**
 * Native implementation of the Db2 client `execute` and `batchExecute` remote methods.
 *
 * @since 1.0.0
 */
public final class ExecuteProcessorUtils {

    private ExecuteProcessorUtils() {
    }

    public static Object nativeExecute(Environment env, BObject client, BObject paramSQLString) {
        return io.ballerina.stdlib.sql.nativeimpl.ExecuteProcessor.nativeExecute(env, client, paramSQLString,
                Db2StatementParameterProcessor.getInstance());
    }

    public static Object nativeBatchExecute(Environment env, BObject client, BArray paramSQLStrings) {
        return io.ballerina.stdlib.sql.nativeimpl.ExecuteProcessor.nativeBatchExecute(env, client, paramSQLStrings,
                Db2StatementParameterProcessor.getInstance());
    }
}
