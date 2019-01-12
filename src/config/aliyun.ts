import { env } from 'process';
import * as OSS from 'ali-oss'
import * as Promise from 'bluebird'
const config = {
    AK: env.ALIYUN_AK || "",
    SK: env.ALIYUN_SK || "",
    OSSEndPoint: env.ALIYUN_OSS_ENDPOINT || "http://oss-cn-hangzhou.aliyuncs.com"
}
export const OSSInstance = new OSS({
    accessKeyId: config.AK,
    accessKeySecret: config.SK,
    region: env.ALIYUN_REGION || "oss-cn-hangzhou",
    bucket: env.ALIYUN_BUCKET || "backup-tsy",
    internal: env.IS_ALIYUN ? true : false
})