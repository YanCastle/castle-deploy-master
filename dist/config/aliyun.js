"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const OSS = require("ali-oss");
const config = {
    AK: process_1.env.ALIYUN_AK || "",
    SK: process_1.env.ALIYUN_SK || "",
    OSSEndPoint: process_1.env.ALIYUN_OSS_ENDPOINT || "http://oss-cn-hangzhou.aliyuncs.com"
};
exports.OSSInstance = new OSS({
    accessKeyId: config.AK,
    accessKeySecret: config.SK,
    region: process_1.env.ALIYUN_REGION || "oss-cn-hangzhou",
    bucket: process_1.env.ALIYUN_BUCKET || "backup-tsy",
    internal: process_1.env.IS_ALIYUN ? true : false
});
//# sourceMappingURL=aliyun.js.map