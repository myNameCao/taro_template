const path = require('path')
const config = {
  projectName: 'miniWechat',
  date: '2020-11-2',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  alias: {
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@conf': path.resolve(__dirname, '..', 'src/@conf'),
    '@pages': path.resolve(__dirname, '..', 'src/pages')
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'vue',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          // limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function(merge) {
  console.log(`请注意:当前环境为 =>>>>>  ${process.env.NODE_ENV} !!!!!!!!!`)
  if (process.env.NODE_ENV === 'cexu') {
    return merge({}, config, require('./cexu'))
  }
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}