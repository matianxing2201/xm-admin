# Vue 3 + TypeScript + Vite xm自用后台管理模板

### 一、环境配置

1. node >= 16 (https://pnpm.io/zh/cli/env)
2. pnpm >= 7
3. 必须-Eslint插件，设置-->打开json设置-->setting.json中添加

```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```

5. 推荐: Tailwind CSS IntelliSense插件
6. 推荐: Tailwind Config Viewer插件
7. 推荐: Git Graph/GitLens/Vue-devtools chrome扩展

### 二、 目录结构：

```
  xm-admin:
    public: 全局公共静态资源
    build:  打包配置
    src:
        assets: 资源
        components: 组件
    .commitlint.config.js：commit-msg校验
    .eslint.config.js：eslint配置，
    .lint-staged.config.cjs: githook
    pnpm-lock.yaml：pnpm lock file
    tailwind.config.js: tailwindcss配置
```

### 三、 运行:

1. 安装pnpm

```
npm install pnpm -g
```

2. 依赖安装

```
pnpm install/pnpm i
```

3. 启动

```
pnpm run dev
```

4. 打包

```
pnpm run build
```

### 提交规范

```js
types: [
  { value: "feat", name: "✨ feat: 一项新功能" },
  { value: "fix", name: "🐛 fix: 修复一个Bug" },
  { value: "docs", name: "📝 docs: 文档变更" },
  { value: "style", name: "💄 style: 代码风格，格式修复" },
  { value: "refactor", name: "♻️ refactor: 代码重构，注意和feat、fix区分开" },
  { value: "perf", name: "⚡️ perf: 代码优化,改善性能" },
  { value: "test", name: "✅ test: 测试" },
  { value: "chore", name: "🚀 chore: 变更构建流程或辅助工具" },
  { value: "revert", name: "revert: 代码回退" },
  { value: "init", name: "🎉 init: 项目初始化" },
  { value: "ci", name: "👷 ci: 对CI配置文件和脚本的更改" },
  { value: "build", name: "📦️ build: 变更项目构建或外部依赖" },
  { value: "WIP", name: "🚧 WIP: 进行中的工作" }
];
```
