import * as fs from 'mz/fs'
import { join } from 'path';

export async function foreachdir(path: string): Promise<string[]> {
    let fslist = []
    if ((await fs.lstat(path)).isDirectory()) {
        let dirfiles = await fs.readdir(path)
        for (let i = 0; i < dirfiles.length; i++) {
            let p = join(path, dirfiles[i])
            if ((await fs.lstat(p)).isDirectory()) {
                fslist.push(...await foreachdir(p))
            } else {
                fslist.push(p)
            }
        }
    } else {
        fslist.push(path)
    }
    return fslist
}