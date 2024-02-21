import { FileStorage } from "interfaces";
import path from "path";

export type FileMetadata = { filepath: string };

export class File {
  constructor(
    private readonly metadata: FileMetadata,
    private readonly storage: FileStorage
  ) {}

  /**
   * File path including file name
   */
  public get filepath() {
    return this.metadata.filepath;
  }

  /**
   * Only file name
   */
  public get filename() {
    return path.basename(this.filepath);
  }

  /**
   * File directory
   */
  public get directory() {
    return path.dirname(this.filepath);
  }

  delete() {
    return this.storage.delete(this.filepath);
  }

  size() {
    return 0;
  }
}
