# 更新日志

## v1.0.7（2025-11-14）

- feat: 接口支持加密解密

## v1.0.6（2025-05-28）

- feat(flycode): 新增 page.runEventByCode 方法
- feat(event): 执行事件时如果传参错误在控制台打印友好提示
- feat(flycode): 新增 page.triggerEvent 方法

## v1.0.5（2025-03-11）

- feat(layout): layout 控件支持局部校验

## v1.0.4（2025-01-23）

- feat(tabboard): 修复 tabboard 显示蓝色框的样式问题
- feat(tabboard): tabboard 支持 onvaluechangebefore 事件

## v1.0.3（2024-01-14）

- feat(textinput): textinput 增加正则校验

## v1.0.2（2024-04-03）

- feat(table): 支持 flycode: getCheck
- feat(list): 支持 flycode: getCheck setCheck
- feat(list): 支持 frontoperationshidden 属性

## v1.0.1（2024-03-25）

- feat(table): 优化 tree cascade date 控件在 table 中的显示效果
- feat(table): 头部改为灰色背景 优化各输入型控件在 table 中的显示效果
- feat(table): 支持操作栏相关属性 operationshidden rowoperationshidden rowoperationstitle rowoperationswidth
- feat(checkbox radio): 优化只读样式 文字显示更清晰

## v1.0.0（2024-03-25）

- chore: 架构改造，移除 learn 架构，兼容旧架构，新架构采用 vue 插件形式安装
- feat(tabboard): 支持初始 value 值，支持取值赋值，优化 value 值类型为 number，支持对内部控件设置只读，完善校验方法
- feat(select): 优化 value 值类型为 any
- feat(filter): 支持对内部控件设置只读
- feat(tags): 支持 el-tag 样式
- feat(attachment): 支持定义上传按钮样式和定义上传文件的显隐，优化超过 maxsize 提示文字
- feat(photo): 优化超过 maxsize 提示文字

## v0.2.11

- feat(element-ui): element-ui 由 2.15.5 升级至 2.15.14
- feat(tree): 支持树节点显示标签

## v0.2.10

- chore: 优化架构，包装成 vue 插件并兼容之前使用方式

## v0.2.9

- feat(list): 赋值时同时支持设置控件的其他属性值

## v0.2.8

- feat(eventlist): 支持直接在 eventlist 里面写 flycode
