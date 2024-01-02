
# done
+ filter 支持显示查询按钮
+ 参考 photo 优化 attchment
+ scoped 样式 或者额外 class
+ 接入图片
+ xt-for 控件
+ list 支持 operartor 高度计算很麻烦 兼容多种情况
+ 考虑怎么接入 vue-route
+ xt-engine 上的loadding要用全局命令式
+ table只读 按钮操作栏只读
+ 容器控件或数组控件设置readonly应连带子控件
+ 输入型控件readonly文字加深
+ 兼容 tree option： id = key name = text parentid


# todo
+ 日期选择器 时间选择器
+ tablestyle: border | ... 支持多一种样式
+ 优化 dealInnerProps 利用 parentcodepath
+ xt-engine xt-page？？
+ 事件 code 校验重复 空值
+ tabboard 内控件校验 支持垂直样式
+ popview 支持抽屉 支持show-close 优化校验代码
+ tags 控件优化样式
+ 控制 frontoperations 显隐
+ StorageProxy 所有项目检查 clear 方法有误
+ 研究 StorageProxy 用 代理写
+ 抽取baseinput slot
+ table update字数太多 操作栏错乱
+ table columns 隐藏某一列


# 原则
+ IDE配置时 控件属性 options 等都是字符串 或者 false true 或者支持flycode的话，就可以是数字
+ 输入型控件 无值输出空字符串 多选时输出数组（多选无值空字符串或者null？）
+ 数组型控件 无值输出空数组 焦点项无值输出null
+ mixin统一在接受viewRule时校验各通用属性值的类型
+ viewRule的width和style的width

