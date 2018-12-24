import BaseController from 'castle-controller/dist/base_controller';
import { GogsWebhook } from '../iface/gogs';
import { WSRPCServer } from 'castle-ws-rpc-server'
export default class Gogs extends BaseController {
    async webhook(post: GogsWebhook) {
        WSRPCServer.publish('gogs/push', post)
    }
}