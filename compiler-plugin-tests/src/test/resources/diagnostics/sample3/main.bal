// Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
//
// WSO2 Inc. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerinax/ibm.db2;

public function main() {

    int id = 5;

    int|db2:Options pool1 = 5;

    int|db2:Options pool2 = {
        loginTimeout: -2,
        socketTimeout: -3
    };

    db2:Options|int pool3 = {
        loginTimeout: -2,
        socketTimeout: -3
    };

    db2:Options pool4 = {
        loginTimeout: -2,
        socketTimeout: -3,
        queryTimeout: -1
    };

    db2:Options pool5 = {
    };
}
