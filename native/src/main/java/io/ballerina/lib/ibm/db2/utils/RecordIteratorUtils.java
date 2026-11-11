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

package io.ballerina.lib.ibm.db2.utils;

import io.ballerina.lib.ibm.db2.parameterprocessor.Db2ResultParameterProcessor;
import io.ballerina.runtime.api.values.BObject;

/**
 * Reads the rows of query streams and procedure result sets with the Db2 result processor.
 *
 * @since 1.0.0
 */
public final class RecordIteratorUtils {

    private RecordIteratorUtils() {
    }

    public static Object nextResult(BObject customResultIterator, BObject iterator) {
        return io.ballerina.stdlib.sql.utils.RecordIteratorUtils.nextResult(iterator,
                Db2ResultParameterProcessor.getInstance());
    }

    public static Object getNextQueryResult(BObject customResultIterator, BObject callResult) {
        return io.ballerina.stdlib.sql.utils.ProcedureCallResultUtils.getNextQueryResult(callResult,
                Db2ResultParameterProcessor.getInstance());
    }
}
