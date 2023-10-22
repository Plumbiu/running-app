# running-app

> 用于监控应用程序窗口句柄的变化

# 安装

```bash
pnpm install running-app
```

# 基本使用

```ts
import { createRules, watchWin } from 'running-app'

const rules = createRules([
  {
    pattern: ['QQ', 'WeChat', 'Discord'],
    doing: '聊天',
  },
  {
    pattern: ['Chrome', 'Edge', 'Firefox'],
    doing: '网上冲浪',
  },
  // Code 指的是 Vscode 指定的工作区文件
  {
    pattern: ['Code'],
    doing: '敲代码',
    map: {
      Code: 'Visual Studio Code',
    },
  },
])

watchWin(rules, (err, doing) => {
  if (err) {
    /* handle error */
    return
  }
  console.log(doing)
})
```

`watchWin` API 会自动检测窗口变化：

当你打开 `QQ` 时，打印结果:

```js
{ title: "QQ", program: "QQ", doing: "聊天" }
```

切换到 `Vscode`，打印:

```js
{
  title: "watch.ts - what-are-u-doing - Visual Studio Code",
  program: "Visual Studio Code",
  doing: "敲代码"
}
```

# API

## createRules

`createRules` API 用于创建监听的规则，例如你想监听 QQ、Chrome，你应该这样写

```ts
const rules = createRules([
  {
    pattern: ['QQ'],
    doing: '聊天',
  },
  {
    pattern: ['Chrome'],
    doing: '网上冲浪',
  },
])
```

> 注意，`pattern` 中的字段指的不是“应用名称”，而是"映像名称"，你可以在 cmd 命令中输入 `tasklist` 获取所有的"映像名称"，`running-app` 会去掉结尾的 `.exe` 字符串，也可以通过 `watchWin` 的 debug 选项确认

关于更多属性，请查看 [rules-规则](#rules-规则)

## watchWin

用于监听用户窗口句柄变化

```ts
watchWin(rules, (err, doing) => {}, {
  debug: false,
})
```

当 `debug` 选项为 true 时，在切换窗口时，会打印对应窗口的映像名称，

# rules 规则

## hideTitle

默认情况下，`running-app` 的打印结果会包括窗口标题，如果你不希望展示自己的标题，你可以加上 `hideTitle: true`：

```ts
const rules = createRules([
  {
    pattern: ['QQ'],
    doing: '聊天'
  },
  {
    pattern: ['Chrome'],
    doing: '网上冲浪,'
    // 你不希望展示网页标题
    hideTitle: true
  },
])
```

## map

`map` 用于指定输出的 `program` 属性和 `pattern` 之间的对应关系，例如 `VsCode` 的映像名称为 `Code.exe`，但你希望打印出来的是 `Visual Studio Code`：

```ts
const rules = createRules([
  {
    pattern: ['Code'],
    doing: '敲代码',
    map: {
      // 指定之后，打印出的 program 属性不再是 Code，而是 Visual Studio Code
      Code: 'Visual Studio Code',
    },
  },
])
```

## extra

如果你希望一个程序有额外数据的话，将其写在 `extra` 属性上

```ts
type extra = Record<string, any>
```

```ts
const rules = createRules([
  {
    pattern: ['Code'],
    doing: '敲代码',
    map: {
      // 指定之后，打印出的 program 属性不再是 Code，而是 Visual Studio Code
      Code: 'Visual Studio Code',
    },
    extra: {
      icon: '🤩',
    },
  },
])
```

## program

`program` 用于指定所有 `pattern` 的程序名，这个属性适合于一些不宜展示的程序，这样显示的程序名称都将是这个 `program` 属性：

```ts
const rules = createRules([
  {
    pattern: ['PicACG', 'EHviewer'],
    doing: '悄咪咪的事情',
    program: '不可描述的程序',
  },
])
```

# 我的 rules

```ts
export const rules: Rule[] = createRules([
  {
    pattern: ['QQ', 'WeChat', 'Discord'],
    doing: '聊天',
    hideTitle: true,
    extra: {
      hello: 'world',
    },
  },
  {
    pattern: ['Chrome', 'Edge', 'Firefox'],
    doing: '网上冲浪',
    hideTitle: true,
  },
  {
    pattern: ['Code', 'RedPandaIDE'],
    doing: '敲代码',
    map: {
      Code: 'Visual Studio Code',
    },
  },
  {
    pattern: ['postman'],
    doing: '调试',
  },
  {
    pattern: ['Termius'],
    doing: '搞服务器',
  },
  {
    pattern: ['Typora'],
    doing: '记笔记',
  },
  {
    pattern: ['Feishu', 'DingTalk', 'WINWORD', 'EXCEL', 'POWERPNT'],
    doing: '办公',
    map: {
      WINWORD: 'Word',
      EXCEL: 'Excel',
      POWERPNT: 'PowerPoint',
    },
  },
  {
    pattern: ['哔哩哔哩'],
    doing: '娱乐',
  },
  {
    pattern: ['cloudmusic'],
    doing: '听音乐',
    map: {
      cloudmusic: '网易云音乐',
    },
  },
  {
    pattern: ['Clash for Windows', 'PicACG', 'EHviewer'],
    doing: '悄咪咪的事情',
    program: '不可描述的程序',
  },
])
```
