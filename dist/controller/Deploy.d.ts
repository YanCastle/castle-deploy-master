import BaseController from 'castle-controller/dist/base_controller';
export default class Deploy extends BaseController {
    web({ Host, Del, Bucket }: {
        Host: string;
        Del: boolean;
        Bucket: string;
    }, ctx: any): Promise<{}>;
    server(): Promise<void>;
}
