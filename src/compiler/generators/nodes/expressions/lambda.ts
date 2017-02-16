
//
// Copyright © 2017-present Kary Foundation, Inc. All rights reserved.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

/// <reference path="../../../tools/reporter.ts" />
/// <reference path="../../switcher.ts" />

namespace KaryScript.Compiler.Nodes.Lambda {

    //
    // ─── LAMBDA EXPRESSION ──────────────────────────────────────────────────────────
    //

        export function Compile ( node: AST.ILambdaExpression,
                                   env: IEnvInfo ): SourceMap.SourceNode {
            if ( node.code.type === 'Body' )
                return env.GenerateSourceNode( node, '' )
            else
                return CompileSimpleLambda( node, env )
        }

    //
    // ─── COMPILE SIMPLE LAMBDA ──────────────────────────────────────────────────────
    //

        function CompileSimpleLambda ( node: AST.ILambdaExpression, env: IEnvInfo ) {
            const args = Join(', ',
                node.args.map( x =>
                    Address.CompileIdentifier( x, env ) ) )

            let parts = Array<CompiledCode>( )
            if ( node.args.length === 1 ) {
                parts = parts.concat( args )
            } else {
                parts.push("(")
                parts = parts.concat( args )
                parts.push(")")
            }

            parts.push( ' => ' )
            parts.push( Nodes.CompileSingleNode( node.code, env ) )

            return env.GenerateSourceNode( node, parts )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}