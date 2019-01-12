import server from 'castle-server/dist/index'
import { install } from 'castle-router/dist/index'
import { install as installWS } from 'castle-ws-rpc-server'
server.install({ install })
server.install({ install: installWS })
server.start(3000);