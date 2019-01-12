"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliyun_1 = require("../config/aliyun");
const utils_1 = require("./utils");
const mz_1 = require("mz");
const path_1 = require("path");
class OSSStorage {
    /**
     * 列出存储空间
     * @param config
     */
    listBuckets(prefix = "") {
        return aliyun_1.OSSInstance.listBuckets({ prefix });
    }
    /**
     * 新建存储空间
     * @param Bucket
     */
    addBuckets(Bucket) {
        return aliyun_1.OSSInstance.putBucket(Bucket);
    }
    /**
     * 删除存储空间
     * @param Bucket
     */
    delBuckets(Bucket) {
        return aliyun_1.OSSInstance.deleteBucket(Bucket);
    }
    /**
     * 设置公有读
     * @param Bucket
     */
    setPublicRead(Bucket) {
        return aliyun_1.OSSInstance.putBucketACL(Bucket, "public-read");
    }
    setBucketWebsite(Bucket, config = {
        index: 'index.html',
        error: 'error.html',
    }) {
        return aliyun_1.OSSInstance.putBucketWebsite(Bucket, config);
    }
    async checkOSSWebSite(Bucket, Host) {
        let ossName = `www-${Bucket}`;
        let bucket = await oss.listBuckets(ossName);
        if (bucket.buckets == null) {
            //不存在
            await oss.addBuckets(ossName);
            await oss.setPublicRead(ossName);
            await oss.setBucketWebsite(ossName);
            return false;
        }
        return true;
    }
    async syncDirToOSS(Bucket, Dir) {
        let ossName = `www-${Bucket}`;
        await aliyun_1.OSSInstance.useBucket(ossName);
        Dir = path_1.resolve(Dir);
        let files = await utils_1.foreachdir(Dir);
        let p = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i].replace(Dir, '').replace(/\\/g, '/').substr(1);
            p.push(aliyun_1.OSSInstance.putStream(file, mz_1.fs.createReadStream(files[i])));
        }
        return await Promise.all(p);
    }
}
const oss = new OSSStorage();
exports.default = oss;
// (async () => {
//     try {
//         let bucket = 'testwebsite-tsy'
//         let rs;
//         rs = await oss.checkOSSWebSite(bucket, './unzip')
//         rs = await oss.syncDirToOSS(bucket, './unzip')
//         process.exit()
//     } catch (error) {
//         debugger
//     }
// })()
//# sourceMappingURL=OSS.js.map