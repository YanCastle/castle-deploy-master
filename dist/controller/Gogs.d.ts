import BaseController from 'castle-controller/dist/base_controller';
import { GogsWebhook } from '../iface/gogs';
export default class Gogs extends BaseController {
    webhook(post: GogsWebhook): Promise<void>;
}
