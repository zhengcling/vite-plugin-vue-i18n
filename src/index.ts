import { Plugin } from "vite";
import { createFilter } from "@rollup/pluginutils";
import YAML from "js-yaml";
import { VitePluginVueI18nOptions, getLocale, TYPES } from "./options";

/**
 * check if is custom block in vue component file
 * @date 2022-06-30
 * @param id string
 * @returns result
 */
function isCustomBlock(id: string) {
  return /type=i18n/i.test(id);
}

const hasConvertedReg = /export default/;

/**
 * Convert source code into assignment.
 *
 * @param varName the variable name.
 * @param source the source code to convert.
 * @param lang language
 * @returns the converted code.
 */
function convert(varName: string, source: string, lang: string) {
  const assignmentPrefix = `const ${varName} =`;
  const codeTrimed = source.trim();
  if (hasConvertedReg.test(source)) {
    return codeTrimed.replace(hasConvertedReg, assignmentPrefix);
  } else {
    if (lang === TYPES.JSON) {
      return `${assignmentPrefix} ${codeTrimed};`;
    } else {
      const data = YAML.load(codeTrimed);
      return `${assignmentPrefix} ${JSON.stringify(data)};`;
    }
  }
}

/**
 * Create the i18n plugin.
 *
 * @returns the i18n plugin.
 */
export function createI18nPlugin(
  options?: VitePluginVueI18nOptions
): Plugin {
  const filter = createFilter(undefined, options?.exclude);
  return {
    name: "zhengcling:vite-plugin-vue-i18n",
    transform(source: string, id: string) {
      if (isCustomBlock(id) && filter(id)) {
        let lang = getLocale(id);
        if (!lang || lang === "i18n") {
          lang = options?.defaultLang || TYPES.Yaml;
        }
        const value = convert("__i18n", source, lang);
        return {
          code:
            value +
            `export default function i18n(Component) {\n` +
            `  const options = Component.options || Component\n` +
            `  options.__i18n = options.__i18n || []\n` +
            `  options.__i18n.push(JSON.stringify(__i18n))\n` +
            `}`,
          map: {
            mappings: "",
          },
        };
      }
    },
  };
}
