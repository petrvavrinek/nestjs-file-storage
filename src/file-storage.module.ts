import { DynamicModule, Module, Provider } from "@nestjs/common";
import { getStorageInjectToken } from "./constants";
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from "./file-storage.module-definition";

type Options = typeof OPTIONS_TYPE;
type AsyncOptions = typeof ASYNC_OPTIONS_TYPE;

export class FileStorageModule extends ConfigurableModuleClass {
  static forRoot(options: Options): DynamicModule {
    const moduleOptions = super.forRoot(options);
    moduleOptions.global = options.isGlobal;

    if (!moduleOptions.providers) moduleOptions.providers = [];
    if (!moduleOptions.exports) moduleOptions.exports = [];

    const hasManyStorages = "storages" in options;

    if (hasManyStorages) {
      const providers: Provider[] = options.storages.map((e) => ({
        provide: getStorageInjectToken(e.name),
        useClass: e.driver,
      }));

      moduleOptions.providers.push(...providers);
      // TODO: Options for export?
      moduleOptions.exports.push(...providers);

      return moduleOptions;
    }

    const provider: Provider = {
      provide: getStorageInjectToken(),
      useClass: options.driver,
    };
    moduleOptions.providers.push(provider);
    moduleOptions.exports.push(provider);

    return moduleOptions;
  }

  // static forRootAsync(options: AsyncOptions): DynamicModule {
  //   const moduleOptions = super.forRootAsync(options);

  //   moduleOptions.imports = moduleOptions?.imports ?? [];
  //   moduleOptions.providers = moduleOptions?.providers ?? [];


  //   if (options.imports) moduleOptions.imports.push(...options.imports);

  //   const OPTIONS_TOKEN = "OPTIONS_TOKEN";

  //   let optionsProvider: Provider = this.buildOptionsProvider(
  //     OPTIONS_TOKEN,
  //     options
  //   );
  

  //   moduleOptions.providers.push(optionsProvider);

  //   return moduleOptions;
  // }

  // private static buildOptionsProvider(
  //   provide: string,
  //   options: AsyncOptions
  // ): Provider {
  //   if (options.useExisting)
  //     return { provide, useExisting: options.useExisting };
  //   else if (options.useClass) return { provide, useClass: options.useClass };
  //   else if (options.useFactory)
  //     return {
  //       provide,
  //       useFactory: options.useFactory,
  //       inject: options.inject,
  //     };

  //   throw new Error("Must provide useExisting, useClass or useFactory");
  // }
}
