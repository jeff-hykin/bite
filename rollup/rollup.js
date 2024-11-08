
/*
  @license
	Rollup.js v4.24.3
	Tue, 29 Oct 2024 14:13:34 GMT - commit 69353a84d70294ecfcd5e1ab8e372e21e94c9f8e

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
'use strict';

var exports = {};
import rollup from "./shared/rollup.js"
import parseAst_js from "./shared/parseAst.js"
import fseventsImporter from "./shared/fsevents-importer.js"
import "node:process"
import "node:tty"
import "node:path"
import "node:path"
import "./native.js"
import "node:perf_hooks"
import "node:fs/promises"

class WatchEmitter {
    constructor() {
        this.currentHandlers = Object.create(null);
        this.persistentHandlers = Object.create(null);
    }
    // Will be overwritten by Rollup
    async close() { }
    emit(event, ...parameters) {
        return Promise.all([...this.getCurrentHandlers(event), ...this.getPersistentHandlers(event)].map(handler => handler(...parameters)));
    }
    off(event, listener) {
        const listeners = this.persistentHandlers[event];
        if (listeners) {
            // A hack stolen from "mitt": ">>> 0" does not change numbers >= 0, but -1
            // (which would remove the last array element if used unchanged) is turned
            // into max_int, which is outside the array and does not change anything.
            listeners.splice(listeners.indexOf(listener) >>> 0, 1);
        }
        return this;
    }
    on(event, listener) {
        this.getPersistentHandlers(event).push(listener);
        return this;
    }
    onCurrentRun(event, listener) {
        this.getCurrentHandlers(event).push(listener);
        return this;
    }
    once(event, listener) {
        const selfRemovingListener = (...parameters) => {
            this.off(event, selfRemovingListener);
            return listener(...parameters);
        };
        this.on(event, selfRemovingListener);
        return this;
    }
    removeAllListeners() {
        this.removeListenersForCurrentRun();
        this.persistentHandlers = Object.create(null);
        return this;
    }
    removeListenersForCurrentRun() {
        this.currentHandlers = Object.create(null);
        return this;
    }
    getCurrentHandlers(event) {
        return this.currentHandlers[event] || (this.currentHandlers[event] = []);
    }
    getPersistentHandlers(event) {
        return this.persistentHandlers[event] || (this.persistentHandlers[event] = []);
    }
}

function watch(configs) {
    const emitter = new WatchEmitter();
    watchInternal(configs, emitter).catch(error => {
        rollup.handleError(error);
    });
    return emitter;
}
async function watchInternal(configs, emitter) {
    const optionsList = await Promise.all(rollup.ensureArray(configs).map(config => rollup.mergeOptions(config, true)));
    const watchOptionsList = optionsList.filter(config => config.watch !== false);
    if (watchOptionsList.length === 0) {
        return parseAst_js.error(parseAst_js.logInvalidOption('watch', parseAst_js.URL_WATCH, 'there must be at least one config where "watch" is not set to "false"'));
    }
    await fseventsImporter.loadFsEvents();
    const { Watcher } = await import('./shared/watch.js')/* FIXME: can't auto handle deep require (await import('./shared/watch.js')) */;
    new Watcher(watchOptionsList, emitter);
}

var { version : VERSION, defineConfig, rollup: rollupInner } = rollup;
exports.VERSION = rollup.version;
exports.defineConfig = rollup.defineConfig;
exports.rollup = rollup.rollup;
exports.watch = watch;
export {
    VERSION,
    defineConfig,
    rollupInner as rollup,
    watch,
}
//# sourceMappingURL=rollup.js.map
;export default exports