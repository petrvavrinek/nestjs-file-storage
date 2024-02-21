import { ConfigurableModuleBuilder } from "@nestjs/common";
import { FileStorageModuleOptions } from "./interfaces";

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<FileStorageModuleOptions>()
  .setClassMethodName("forRoot")
  .build();
