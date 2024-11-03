let output = new TextEncoder().encode(`const context = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  } else if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();
const defines = __DEFINES__;
Object.keys(defines).forEach((key) => {
  const segments = key.split(".");
  let target = context;
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (i === segments.length - 1) {
      target[segment] = defines[key];
    } else {
      target = target[segment] || (target[segment] = {});
    }
  }
});
`)
const relativePathToOriginal = "env.mjs"
try {
    if (relativePathToOriginal && globalThis?.Deno?.readFileSync instanceof Function) {
        const { FileSystem } = await import("https://deno.land/x/quickr@0.6.72/main/file_system.js")
        // equivlent to: import.meta.resolve(relativePathToOriginal)
        // but more bundler-friendly
        const path = `${FileSystem.thisFolder}/${relativePathToOriginal}`
        const current = await Deno.readFile(path)
        const original = output
        output = current

        // update the file whenever (no await)
        const thisFile = FileSystem.thisFile // equivlent to: import.meta.filename, but more bundler-friendly
        setTimeout(async () => {
            try {
                const changeOccured = !(current.length == original.length && current.every((value, index) => value == original[index]))
                // update this file
                if (changeOccured) {
                    const { binaryify } = await import("https://deno.land/x/binaryify@2.5.3.0/binaryify_api.js")
                    await binaryify({
                        pathToBinary: path,
                        pathToBinarified: thisFile,
                    })
                }
            } catch (e) {
            }
        }, 0)
    }
} catch (e) {
    
}
        
export default output