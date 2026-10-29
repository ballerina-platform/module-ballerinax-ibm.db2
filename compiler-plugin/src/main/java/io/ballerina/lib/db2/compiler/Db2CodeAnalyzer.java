/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package io.ballerina.lib.db2.compiler;

import io.ballerina.compiler.syntax.tree.SyntaxKind;
import io.ballerina.lib.db2.compiler.analyzer.InitializerParamAnalyzer;
import io.ballerina.lib.db2.compiler.analyzer.RecordAnalyzer;
import io.ballerina.projects.plugins.CodeAnalysisContext;
import io.ballerina.projects.plugins.CodeAnalyzer;

import java.util.List;

/**
 * Db2 Code Analyzer.
 */
public class Db2CodeAnalyzer extends CodeAnalyzer {

    @Override
    public void init(CodeAnalysisContext ctx) {
        ctx.addSyntaxNodeAnalysisTask(new InitializerParamAnalyzer(),
                List.of(SyntaxKind.IMPLICIT_NEW_EXPRESSION, SyntaxKind.EXPLICIT_NEW_EXPRESSION));
        ctx.addSyntaxNodeAnalysisTask(new RecordAnalyzer(),
                List.of(SyntaxKind.LOCAL_VAR_DECL, SyntaxKind.MODULE_VAR_DECL));
    }
}
