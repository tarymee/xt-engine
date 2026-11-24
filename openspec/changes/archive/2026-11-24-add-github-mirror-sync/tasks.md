# Tasks

## 1. 同步脚本实现

- [x] 1.1 创建 `script/togithub.mjs`：移植参考脚本 `spu-web-plugin-gitlab/script/togithub.js`，`DEST_ROOT` 改为 `F:/smart100/xt-engine-github`，其余逻辑（排除规则、镜像删除、提交推送、前置校验）保持一致。验证：`node --check script/togithub.mjs` 通过且 `node script/togithub.mjs` 干跑逻辑正确（校验分支可运行）
- [x] 1.2 `package.json` scripts 添加 `"togithub": "node script/togithub.mjs"`。验证：`npm run togithub --silent` 可触发脚本（可通过前置校验报错路径或完整执行观察输出）

## 2. 端到端验证

- [x] 2.1 运行 `npm run togithub` 完整流程：确认目标仓库 `F:\smart100\xt-engine-github` 出现源仓库内容、`node_modules`/`.git` 未被动、产生 `feat: 同步...` 提交并推送成功；二次运行输出"无变动，跳过提交"仍执行推送。验证：目标仓库 `git log -1` 与 `git status` 输出符合 spec 各 Scenario
