import { build } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { createI18nPlugin } from "../dist";
import { describe, expect, it } from "vitest";
import path from "path";

async function bundle(fileName: string) {
  const result = await build({
    plugins: [createVuePlugin(), createI18nPlugin({ defaultLang: "yaml" })],
    build: {
      write: false,
      minify: false,
      rollupOptions: {
        input: path.resolve(__dirname, "fixtures", fileName),
      },
    },
  });
  return {
    code: (result as any).output[0].code,
  };
}

async function getMessages(fileName: string) {
  const { code } = await bundle(fileName);
  const func = new Function(`${code} return __i18n;`);
  return func();
}

describe("bundle", () => {
  it("yaml.vue", async () => {
    const messages = await getMessages("yaml.vue");
    expect(messages.zh.title).toBe("标题");
    expect(messages.en.title).toBe("Title");
  });
  it("yaml-import.vue", async () => {
    const messages = await getMessages("yaml-import.vue");
    expect(messages.zh.title).toBe("标题");
    expect(messages.en.title).toBe("Title");
  });
  it("json.vue", async () => {
    const messages = await getMessages("json.vue");
    expect(messages.zh.title).toBe("标题");
    expect(messages.en.title).toBe("Title");
  });
  it("json-import.vue", async () => {
    const messages = await getMessages("json-import.vue");
    expect(messages.zh.title).toBe("标题");
    expect(messages.en.title).toBe("Title");
  });
});
