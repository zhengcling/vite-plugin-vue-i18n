import { Plugin } from "vite";
import YAML from "js-yaml";

/**
 * check if is custom block in vue component file
 * @date 2022-06-30
 * @param id string
 * @returns result
 */
function isCustomBlock(id: string) {
  return /type=i18n/i.test(id);
}

/**
 * Convert source code into assignment.
 *
 * @param varName the variable name.
 * @param source the source code to convert.
 * @returns the converted code.
 */
function convert(varName: string, source: string) {
  const assignmentPrefix = `const ${varName} =`;
  const codeTrimed = source.trim();
  if (codeTrimed.startsWith("{")) {
    return `${assignmentPrefix} ${codeTrimed};`;
  } else {
    try {
      const data = YAML.load(codeTrimed);
      return `${assignmentPrefix} ${JSON.stringify(data)};`;
    } catch (err) {
      return codeTrimed.replace(/export default/, assignmentPrefix);
    }
  }
}

/**
 * Create the i18n plugin.
 *
 * @returns the i18n plugin.
 */
export function createI18nPlugin(): Plugin {
  return {
    name: "zhengcling:vite-plugin-vue-i18n",
    transform(source: string, id: string) {
      if (isCustomBlock(id)) {
        const value = convert("__i18n", source);
        return {
          code:
            value +
            `export default function i18n(Component) {\n` +
            `  const options = Component.options || Component\n` +
            `  options.__i18n = options.__i18n || []\n` +
            `  options.__i18n.push(JSON.stringify(__i18n))\n` +
            `}`,
          map: {
            mappings: '',
          },
        };
      }
    },
  };
}
