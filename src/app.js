import Vue from 'vue'
import './app.less'
// import Taro from '@tarojs/taro'

const App = new Vue({
  onShow() {
    // Taro.hideTabBar()
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
})

export default App
