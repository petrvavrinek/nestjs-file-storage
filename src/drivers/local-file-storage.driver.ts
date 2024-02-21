import fs from "fs";
import path from "path";
import { promisify } from "util";

import { File } from "classes/file";
import { FileStorage } from "interfaces";

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);
const existAsync = promisify(fs.exists);
const rmAsync = promisify(fs.rm);

export class LocalFileStorageDriver implements FileStorage {
  async save(source: string | Buffer, dist: string): Promise<File> {
    const dirname = path.dirname(dist);
    if (!dirname.trim().length) await mkdirAsync(dirname, { recursive: true });
    await writeFileAsync(source, dist);
    return this.createFile(dist);
  }

  exists(path: string): Promise<boolean> {
    return existAsync(path);
  }

  async delete(path: string): Promise<boolean> {
    const exists = await this.exists(path);
    if (exists) await rmAsync(path);
    return true;
  }

  getPublicUrl(path: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  private createFile(filepath: string) {
    return new File({ filepath }, this);
  }
}
