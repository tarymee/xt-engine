# xt-engine

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# 原则

+ IDE配置时 控件属性 options 等都是字符串 或者 false true 或者支持flycode的话，就可以是数字

+ 输入型控件 无值输出空字符串 多选时输出数组（多选无值空字符串或者null？）
+ 数组型控件 无值输出空数组 焦点项无值输出null
+ mixin统一在接受viewRule时校验各通用属性值的类型
+ viewRule的width和style的width

