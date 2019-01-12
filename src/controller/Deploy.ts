import BaseController from 'castle-controller/dist/base_controller';
import * as fs from 'mz/fs'
import * as unzip from 'unzip'
import oss from '../lib/OSS'
export default class Deploy extends BaseController {
    web({ Host, Del, Bucket }: { Host: string, Del: boolean, Bucket: string }, ctx: any) {
        //接收上传的zip文件部署到阿里云oss上，若指定的域名的的oss不存在则自动创建，若存在则删除原有文件并写入新文件
        //此处不提供打包服务，需要额外提供出来
        return new Promise(async (s, j) => {
            try {
                if (ctx.req.files && ctx.req.files.Upload) {
                    if (Del) {

                    }
                    Bucket = Bucket || Host.replace('.', '-');
                    let savePath = './unzip/' + Bucket;
                    fs.createReadStream(ctx.req.files.Upload.path)
                        .pipe(unzip.Extract({ path: savePath }))
                    let exist = await oss.checkOSSWebSite(Bucket, Host);
                    await oss.syncDirToOSS(Bucket, savePath);
                    s(exist);
                } else {
                    j(new Error("NO_UPLOAD_FILE"))
                }
            } catch (error) {
                j(error)
            }
        })
    }
    async server() {

    }
}