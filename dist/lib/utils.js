"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("mz/fs");
const path_1 = require("path");
async function foreachdir(path) {
    let fslist = [];
    if ((await fs.lstat(path)).isDirectory()) {
        let dirfiles = await fs.readdir(path);
        for (let i = 0; i < dirfiles.length; i++) {
            let p = path_1.join(path, dirfiles[i]);
            if ((await fs.lstat(p)).isDirectory()) {
                fslist.push(...await foreachdir(p));
            }
            else {
                fslist.push(p);
            }
        }
    }
    else {
        fslist.push(path);
    }
    return fslist;
}
exports.foreachdir = foreachdir;
//# sourceMappingURL=utils.js.map