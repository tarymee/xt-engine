# Design

## Context

本仓库与参考项目 spu-web-plugin-gitlab 同构：均为 GitLab 内部仓库，均在本地维护一个对应的 GitHub 镜像仓库。参考实现 `spu-web-plugin-gitlab/script/togithub.js`（74 行 ESM 脚本）已按其 `github-mirror-sync` spec 落地并稳定运行，本次直接移植其方案。差异点：

- 本仓库 `package.json` 无 `"type": "module"` → 脚本需命名为 `.mjs` 以保持 ESM 写法
- 目标路径不同：`F:\smart100\xt-engine-github`（分支 `main`，remote `git@github.com:tarymee/xt-engine.git`）
- 本仓库无 `script/` 目录 → 新建

## Goals / Non-Goals

**Goals:**

- 单脚本零依赖实现完整同步流程（校验 → 镜像删除 → 拷贝 → 提交 → 推送）
- 与参考项目行为完全一致，便于两个项目间互相理解与维护

**Non-Goals:**

- 不做增量同步/rsync 优化（数据量小，全量拷贝足够）
- 不做双向同步、不处理合并冲突
- 不引入 npm 依赖（fs/child_process 内置模块足够）

## Decisions

1. **移植参考脚本而非重写**：`spu-web-plugin-gitlab/script/togithub.js` 已验证，逐段移植只改常量（`DEST_ROOT`）与文件后缀，降低行为偏差风险。
2. **ESM via `.mjs`**：本仓库无 `"type": "module"`，`.mjs` 后缀让 Node 按模块解析，无需改动 `package.json` 的 type 字段影响现有代码。
3. **排除规则沿用参考实现**：顶层排除 `.git`/`node_modules`/`dist`/`.DS_Store`，任意层级排除 `.git`/`node_modules`/`.DS_Store`；顶层 `dist` 仅在顶层排除（本仓库构建产物在根级 `dist`，目标仓库当前无 `dist`，规则向前兼容）。
4. **`execFileSync` 同步执行 git 命令，push 用 `stdio: 'inherit'`**：与参考实现一致，错误直接抛出使进程非零退出，push 的 SSH 输出透传给用户。
5. **删除先于拷贝**：先 `mirrorDelete` 清理目标中源已不存在的条目，再 `cpSync` 覆盖，保证精确快照且避免已删除目录残留干扰。

## Risks / Trade-offs

- [目标仓库有未提交的本地改动会被一并卷入提交] → 接受：目标仓库定位为单向镜像，不应有本地改动；`git status` 的卷入行为与参考项目一致
- [硬编码绝对路径 `F:\smart100\xt-engine-github`] → 接受：个人开发机专用命令，与参考项目一致；换机器时改脚本常量即可
- [推送失败留下已提交未推送状态] → spec 已约定重试语义：再次运行无变动时跳过提交仅推送
- [全量拷贝大目录较慢] → 接受：仓库体积小，且排除了 `node_modules`/`dist`

## Migration Plan

新增文件与 script 条目，无破坏性变更，无需回滚方案（删除 `script/togithub.mjs`、package.json 中一行及 `openspec/` 目录即完全还原）。

## Open Questions

无。
