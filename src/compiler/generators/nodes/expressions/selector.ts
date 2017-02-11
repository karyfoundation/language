
//
// Copyright © 2017-present Kary Foundation, Inc. All rights reserved.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

/// <reference path="../../switcher.ts" />
/// <reference path="address.ts" />

namespace KaryScript.Compiler.Nodes.Selector {

    //
    // ─── COMPILE ────────────────────────────────────────────────────────────────────
    //

        export function Compile ( node: AST.ISelector, env: IEnvInfo ) {
            const name = Nodes.Address.Compile( node.searchable, env )
            const query = Nodes.CompileSingleNode( node.query, env )

            if ( node.query.type === "LambdaExpression" )
                return name + '.find(' + query + ')'
            else
                return "[" + query + "]"
        }
    
    // ────────────────────────────────────────────────────────────────────────────────

}