import { OSSInstance } from '../config/aliyun'
import { readdir } from 'mz/fs';
import { foreachdir } from './utils';
import { fs } from 'mz';
import { dirname, resolve } from 'path';
class OSSStorage {
    /**
     * 列出存储空间
     * @param config 
     */
    listBuckets(prefix: string = ""): Promise<any> {
        return OSSInstance.listBuckets({ prefix });
    }
    /**
     * 新建存储空间
     * @param Bucket 
     */
    addBuckets(Bucket: string) {
        return OSSInstance.putBucket(Bucket)
    }
    /**
     * 删除存储空间
     * @param Bucket 
     */
    delBuckets(Bucket: string) {
        return OSSInstance.deleteBucket(Bucket)
    }
    /**
     * 设置公有读
     * @param Bucket 
     */
    setPublicRead(Bucket: string) {
        return OSSInstance.putBucketACL(Bucket, "public-read")
    }
    setBucketWebsite(Bucket: string, config = {
        index: 'index.html',
        error: 'error.html',
    }) {
        return OSSInstance.putBucketWebsite(Bucket, config)
    }
    async checkOSSWebSite(Bucket: string, Host: string) {
        let ossName = `www-${Bucket}`;
        let bucket = await oss.listBuckets(ossName)
        if (bucket.buckets == null) {
            //不存在
            await oss.addBuckets(ossName);
            await oss.setPublicRead(ossName);
            await oss.setBucketWebsite(ossName);
            return false;
        }
        return true;
    }
    async syncDirToOSS(Bucket: string, Dir: string) {
        let ossName = `www-${Bucket}`;
        await OSSInstance.useBucket(ossName);
        Dir = resolve(Dir)
        let files = await foreachdir(Dir);
        let p = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i].replace(Dir, '').replace(/\\/g, '/').substr(1);
            p.push(OSSInstance.putStream(file, fs.createReadStream(files[i])))
        }
        return await Promise.all(p)
    }
}

const oss = new OSSStorage()
export default oss;

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