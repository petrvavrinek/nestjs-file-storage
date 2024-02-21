import { File } from "classes/file";
import { FileSaveOptions } from "./file-save-options.interface";

export interface FileStorage {
  /**
   * Allows to save file or buffer to specified location
   * @param source Path or buffer
   * @param options Save options
   */
  save(source: Buffer | string, dist: string, options: FileSaveOptions): Promise<File>;

  // // TODO
  // read(location: string, key: string);

  /**
   * Allows to check if specified file exist
   * @param location File location
   * @param key File name
   */
  exists(path: string): Promise<boolean>;

  /**
   * Allows to delete file
   * @param location File location
   * @param key File name
   */
  delete(path: string): Promise<boolean>;

  /**
   * Returns public URL for resource
   */
  getPublicUrl(path: string): Promise<string>;
}
