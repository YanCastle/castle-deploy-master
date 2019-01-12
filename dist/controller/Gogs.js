"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("castle-controller/dist/base_controller");
const castle_ws_rpc_server_1 = require("castle-ws-rpc-server");
class Gogs extends base_controller_1.default {
    async webhook(post) {
        castle_ws_rpc_server_1.WSRPCServer.publish('gogs/push', post);
    }
}
exports.default = Gogs;
//# sourceMappingURL=Gogs.js.map