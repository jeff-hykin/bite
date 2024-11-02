import {
	parse,
	xxhashBase64Url,
	xxhashBase36,
	xxhashBase16,
} from "./wasm-node/bindings_wasm.js"

export const parseAsync = parse
const exports = {
    parse,
	xxhashBase64Url,
	xxhashBase36,
	xxhashBase16,
    parseAsync,
}

export {
    parse
    xxhashBase64Url
    xxhashBase36
    xxhashBase16
}
export default exports