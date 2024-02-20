# React + Vite

## npm create vite@latest your_app_name -- --template react

# ESLint

## npm install eslint --save-dev

## npm init @eslint/config

# Prettier

## npm install --save-dev --save-exact prettier

## npm install --save-dev eslint-config-prettier

`
{
"printWidth": 100, // 一行的字符数
"tabWidth": 2, // 一个tab代表几个空格数
"useTabs": true, //是否使用tab进行缩进
"singleQuote": true, //字符串是否使用单引号
"semi": true, // 行尾是否使用分号，默认为true
"trailingComma": "es5", // 是否使用尾逗号
"htmlWhitespaceSensitivity": "strict", // HTML空白敏感度
"bracketSpacing": true, // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
"proseWrap": "never", // 换行设置
"endOfLine": "lf"
}

`

# Husky

## npm i husky lint-staged -D

## npx mrm@2 lint-staged

# commitlint

## npm install --save-dev @commitlint/config-conventional @commitlint/cli

- 添加 .commitlintrc.json 文件

`
{
"extends": [
"@commitlint/config-conventional"
  ],
"rules": {
"body-max-line-length": [
      0,
"always",
"Infinity"
    ],
"footer-max-line-length": [
      0,
"always",
"Infinity"
    ]
  }
}

`

# 浏览器默认样式

## npm install sanitize.css --save

# CSS 方案 TailwindCSS

## npm install -D tailwindcss postcss autoprefixer

## npx tailwindcss init -p

- @type {import('tailwindcss').Config}

`
export default {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

`

现在打开文件并为 Tailwind 的每个层./src/index.css 添加指令：

`
@tailwind base;
@tailwind components;
@tailwind utilities;

`

# mock 服务

## npm install msw --save-dev

### 创建 handlers 文件添加接口处理逻辑 ： touch src/mocks/handlers.js

### 基于前端项目中的 public 文件夹对 msw 进行初始化： npx msw init public/ --save

### 配置 worker： touch src/mocks/browser.js

### 创建 worker

`
import { setupWorker } from 'msw'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

#  在  App.js  中启动  worker

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

`

- https://juejin.cn/post/7263844088545722405#heading-4

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
