"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("castle-controller/dist/base_controller");
const fs = require("mz/fs");
const unzip = require("unzip");
const OSS_1 = require("../lib/OSS");
class Deploy extends base_controller_1.default {
    web({ Host, Del, Bucket }, ctx) {
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
                        .pipe(unzip.Extract({ path: savePath }));
                    let exist = await OSS_1.default.checkOSSWebSite(Bucket, Host);
                    await OSS_1.default.syncDirToOSS(Bucket, savePath);
                    s(exist);
                }
                else {
                    j(new Error("NO_UPLOAD_FILE"));
                }
            }
            catch (error) {
                j(error);
            }
        });
    }
    async server() {
    }
}
exports.default = Deploy;
//# sourceMappingURL=Deploy.js.map