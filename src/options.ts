import { FilterPattern } from "@rollup/pluginutils";

export function getLocale(id: string): string {
  const url = new URL(id);
  const params = url.searchParams;
  const langParam = Object.keys(Object.fromEntries(params)).find((key) =>
    /lang\./i.test(key)
  );
  if (langParam) {
    const [, lang] = langParam.split(".");
    return lang;
  } else {
    return "";
  }
}

export enum TYPES {
  Yaml = "yaml",
  Yml = "yml",
  JSON = "json",
}

export interface VitePluginVueI18nOptions {
  exclude?: FilterPattern;
  defaultLang?: string;
}
