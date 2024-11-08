
/*
  @license
	Rollup.js v4.24.3
	Tue, 29 Oct 2024 14:13:34 GMT - commit 69353a84d70294ecfcd5e1ab8e372e21e94c9f8e

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
import "./native.js"
import parseAst_js from "./shared/parseAst.js"
import "node:path"

export const parseAst = parseAst_js.parseAst
export const parseAstAsync = parseAst_js.parseAstAsync

export default parseAst_js