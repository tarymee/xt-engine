# Proposal

## Why

本仓库（GitLab 内部仓库 xt-engine）需要将代码同步维护一份到本地 GitHub 仓库（`F:\smart100\xt-engine-github`，对应 `git@github.com:tarymee/xt-engine.git`），目前只能手动"拷贝 → 提交 → 推送"，繁琐且易漏。参考 spu-web-plugin-gitlab 已落地的 `npm run togithub` 方案，在本仓库提供同样的一键镜像同步命令。

## What Changes

- 新增 `script/togithub.mjs` 脚本：将源仓库根目录全部内容镜像同步到 `F:\smart100\xt-engine-github`（拷贝覆盖 + 镜像删除），排除 `.git`、`node_modules`、`dist`、`.DS_Store`
- 同步完成后在目标仓库自动 `git add -A`，有变动时以 `feat: 同步YYYY-MM-DD HH:mm:ss` 格式提交并推送到 `origin main`，无变动时跳过提交仅推送
- `package.json` 新增 `"togithub"` script，通过 `npm run togithub` 触发
- 同步前校验目标目录存在且为有效 git 仓库，不满足时报错退出且不做任何修改

## Capabilities

### New Capabilities

- `github-mirror-sync`: 提供 `npm run togithub` 一键镜像同步能力——将本仓库内容镜像到本地 GitHub 仓库并自动提交推送，含排除规则、镜像删除、提交推送与前置校验等行为约定

### Modified Capabilities

（无——本仓库此前没有任何 OpenSpec spec）

## Impact

- 新增文件：`script/togithub.mjs`（本项目 `package.json` 无 `"type": "module"`，故用 `.mjs` 后缀保持 ESM 写法）
- 修改文件：`package.json`（scripts 增加 `togithub`）
- 新增目录：`script/`、`openspec/`
- 外部依赖：目标仓库 `F:\smart100\xt-engine-github` 必须存在且为 git 仓库（已确认存在，分支 `main`，remote `git@github.com:tarymee/xt-engine.git`）
- 运行依赖：仅使用 Node.js 内置模块（`fs`、`path`、`child_process`），无新增 npm 依赖
