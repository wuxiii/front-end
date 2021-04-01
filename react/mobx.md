# mobx 使用

### 安装依赖

```bash
npm install mobx mobx-react
```

### 配置装饰器语法

这里使用 react-app-rewired customize-cra 去重写 webpack 配置

1. 安装依赖到开发环境

```bash
npm install @babel/plugin-proposal-decorators react-app-rewired customize-cra --save-dev
```

2. 新建 config-overrides.js 修改配置

```js
const { override, addDecoratorsLegacy } = require("customize-cra");

module.exports = override(addDecoratorsLegacy());
```

### 添加 sass 支持（可选）

这里我使用的是 sass-resources-loader

1。安装依赖

```bash
// 如果提示module sass can not found 需安装node-sass 依赖
npm install sass-resources-loader node-sass --save-dev
```

2. 配置

```js
const {
  override,
  addDecoratorsLegacy,
  adjustStyleLoaders,
} = require("customize-cra");

module.exports = override(
  addDecoratorsLegacy(), // 装饰器支持
  adjustStyleLoaders((rule) => {
    if (rule.test.toString().includes("scss")) {
      rule.use.push({
        loader: require.resolve("sass-resources-loader"),
        options: {
          resources: "./src/styles/*.scss", //这里是你自己放公共scss变量的路径
        },
      });
    }
  })
);
```

3. vscode 配置 eslint 检查

新建 jsconfig.json 文件

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

修改 vocode 配置："javascript.implicitProjectConfig.experimentalDecorators": true 这个  方法已经过时了

4. 解决编译时 eslint 检查的问题

package.json 中添加 rule 字段，添加对应规则约束,例如

```json
 "rules": {
    "no-unused-vars": "off"
  }
```

### mobx 的使用

mobx 5 和 mobx6 使用方法不太相同这点需要注意

1. 创建 store
2. store 数据注入 provider
3. 属性注入组件，监听数据变化
