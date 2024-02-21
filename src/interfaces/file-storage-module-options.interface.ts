import { FileStorage } from "./file-storage.interface";

export type FileStorageOptions = {
  name?: string
	driver: { new(): FileStorage };
	isGlobal?: boolean
}

export type FileStorageManyOptions = {
	storages: (Omit<FileStorageOptions, "isGlobal"> & { name: string })[],
	isGlobal?: boolean
}

export type FileStorageModuleOptions = FileStorageOptions | FileStorageManyOptions;
