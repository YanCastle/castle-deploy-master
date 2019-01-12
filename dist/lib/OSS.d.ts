/// <reference types="ali-oss" />
declare class OSSStorage {
    /**
     * 列出存储空间
     * @param config
     */
    listBuckets(prefix?: string): Promise<any>;
    /**
     * 新建存储空间
     * @param Bucket
     */
    addBuckets(Bucket: string): Promise<{
        bucket: string;
        res: import("ali-oss").NormalSuccessResponse;
    }>;
    /**
     * 删除存储空间
     * @param Bucket
     */
    delBuckets(Bucket: string): Promise<import("ali-oss").NormalSuccessResponse>;
    /**
     * 设置公有读
     * @param Bucket
     */
    setPublicRead(Bucket: string): Promise<import("ali-oss").NormalSuccessResponse>;
    setBucketWebsite(Bucket: string, config?: {
        index: string;
        error: string;
    }): Promise<import("ali-oss").NormalSuccessResponse>;
    checkOSSWebSite(Bucket: string, Host: string): Promise<boolean>;
    syncDirToOSS(Bucket: string, Dir: string): Promise<{
        name: string;
        res: import("ali-oss").NormalSuccessResponse;
    }[]>;
}
declare const oss: OSSStorage;
export default oss;
