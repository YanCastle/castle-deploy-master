"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("castle-server/dist/index");
const index_2 = require("castle-router/dist/index");
const castle_ws_rpc_server_1 = require("castle-ws-rpc-server");
index_1.default.install({ install: index_2.install });
index_1.default.install({ install: castle_ws_rpc_server_1.install });
index_1.default.start(3000);
//# sourceMappingURL=index.js.map