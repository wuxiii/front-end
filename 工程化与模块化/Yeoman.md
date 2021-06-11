# 前端工程化

## 表现

提高效率，降低成本，保证质量的手段都属于工程化

## 过程

- 创建项目阶段： cli
- 编码：格式化代码，校验代码，编译构建打包
- 预览测试：web server/mock/live reloading/source map

## 脚手架工具

### Yeoman <https://yeoman.io/>

- 安装

```
// 全局安装
yarn add yo -g
// 安装generator
yarn add generator-node -g
```

- 使用 yo 运行 generator

```
yo node
```

### 自定义 Yeoman generator <https://yeoman.io/authoring/>

1，generator 的核心就是一个 nodejs 模块。创建一个文件夹名字必须为`generator-${name}`，初始化这个 nodejs 模块

```json
{
  "name": "generator-name",
  "version": "0.1.0",
  "description": "",
  "files": ["generators"],
  "keywords": ["yeoman-generator"],
  "dependencies": {
    "yeoman-generator": "^1.0.0"
  }
}
```

keywords 属性必须包含"yeoman-generator"，并且 repo 必须具有要由我们的 generators 页面建立索引的描述。

2， 目录结构

```
├───package.json
└───generators/
    ├───app/
    │   └───index.js
    └───router/
        └───index.js
```
