# vite-plugin-vue-i18n

Vite plugin for Vue2 I18n

## Installation

### npm

```shell
$ npm i @zhengchunling/vite-plugin-vue-i18n --save-dev
```

### yarn

```shell
$ yarn add @zhengchunling/vite-plugin-vue-i18n -D
```

## Usage

### yaml

```yaml
<i18n>
zh:
  title: "标题"
en:
  title: "Title"
</i18n>
```

### yaml-import:

```yaml
<i18n src="./locale.yaml">
</i18n>
```

### json

```yaml
<i18n lang="json">
{
  "zh": {
    "title": "标题"
  },
  "en": {
    "title": "Title"
  }
}
</i18n>
```

### json-import

```yaml
<i18n src="./locale.json" lang="json">
</i18n>
```

##  Options

### `exclude`

- **Type:** `string | string[] | undefined`

- **Default:** `undefined`

  A [minimatch](https://github.com/isaacs/minimatch) pattern, or array of patterns

### `defaultLang`

- **Type:** `string | undefined`

- **Default:** `"yaml"`

  The extensions of i18n resources supported are as follows:

  ```yaml
  - json
  - yaml
  - yml
  ```

  
