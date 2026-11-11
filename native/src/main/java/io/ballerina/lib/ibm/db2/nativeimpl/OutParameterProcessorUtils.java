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

import io.ballerina.lib.ibm.db2.parameterprocessor.Db2ResultParameterProcessor;
import io.ballerina.runtime.api.values.BObject;
import io.ballerina.runtime.api.values.BTypedesc;
import io.ballerina.stdlib.sql.nativeimpl.OutParameterProcessor;

/**
 * Reads the OUT parameters defined by this module with the Db2 result processor. The OUT parameter classes of the
 * SQL module are always converted with the default processor, which cannot read Db2 binary and XML values.
 *
 * @since 1.0.0
 */
public final class OutParameterProcessorUtils {

    private OutParameterProcessorUtils() {
    }

    public static Object getOutParameterValue(BObject result, BTypedesc typeDesc) {
        return OutParameterProcessor.get(result, typeDesc, Db2ResultParameterProcessor.getInstance(), "OutParameter");
    }
}
