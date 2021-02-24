# [taro/vue](https://nervjs.github.io/taro/docs/README)

# 辅助工具

## eslint

- 在 git commit hook 强制验证 格式规则地址: .eslintrc

## prettierrc

- prettierrc 在开发过程中保存 强制格式。格式规则地: .prettierrc.js

# 项目介绍

- 版本: 👽 Taro v3.0.15

- 模块:vue 版本

下载依赖（推荐 yarn）

- `npm i yarn -g`

- `yarn`

启动项目

- `yarn dev:weapp` OR `npm run dev:weapp`

快速创建一个页面([必须全局下载 @tarojs/cli](https://nervjs.github.io/taro/docs/GETTING-STARTED))

`Taro create --name page-name`

# 项目结构

```js
|-src
  |-@conf // 项目的配置文件
  |  |-api.js  // api 配置文件
  |  |-errorMes.js // 错误处理的文件
  |  |-generate.js
  |  |-index.js
  |-app.config.js
  |-app.js
  |-app.less
  |-components // 组件文件
  |  |-NumberDisplay.vue
  |-index.html
  |-pages // 页面文件
  |  |-home
  |  |  |-index.config.js
  |  |  |-index.less
  |  |  |-index.vue
  |  |-index
  |  |  |-index.config.js
  |  |  |-index.less
  |  |  |-index.vue
  |  |-myPage
  |  |  |-index.config.js
  |  |  |-index.less
  |  |  |-index.vue
  |-utils  // 公共的类
  |  |-axios.js  // axios 类
  |  |-encrypt.js
  |  |-index.js
```

# AXIOS

## 接口注册(src/@conf/api.js)

```js
{
  privatePath: {// 需要token
      getMessage: '/xy/login/AccountsInfo'
  },
  publicPath: { // 不需要token
    AccountsInfo: '/xy/login/AccountsInfo'
  },
  webHM: {}
}
```

## 发送请求

写法一(同步回调)

```js
import Taro, { axios } from '@utils'
axios({
  url: 'path',
  loading,// 可以不写,需要页面loading时传入
  type: 'post' //默认是get
  data:{},
  success(res){
      // todo something
  }
})
```

方法二:（async)

```js
import { axios } from '@utils'
;async () => {
  let { data } = await axios({ url: 'AccountsInfo' })
  // todo something
}
```

方法三:（then)

```js
axios({ url: 'AccountsInfo' }).then(res => {
  // todo something
})
```

请求数据

- data 只包含请求业务参数
- token 会根据接口注册的位置 自动添加
- loading 当页面发送请求时，需要 loadind 添加`true`, 默认不 loaing,请求完成自动关闭
- success 成功后的逻辑
