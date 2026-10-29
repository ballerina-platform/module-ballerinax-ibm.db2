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

db2:Client dbClient = check new db2:Client("url", (), (), "SAMPLE", 120, { loginTimeout: -2 }, { maxOpenConnections: -1 });

public function main() returns error? {

    db2:Client dbClient1 = check new("url", connectionPool = { maxOpenConnections: -1 });
    check dbClient1.close();

    db2:Client dbClient2 = check new("url", options = { loginTimeout: -2 });
    check dbClient2.close();

    db2:Client dbClient3 = check new("url", (), (), "SAMPLE", 120, { loginTimeout: -2 });
    check dbClient3.close();
}
