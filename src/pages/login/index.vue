<template>
  <view class="login">
    <view class="content">
      <input
        id="phoneNum"
        v-model="phoneNumber"
        class="weui-input"
        type="text"
        placeholder="请输入账户/手机号"
      />
      <!-- <view class="ipt2"> -->
      <input
        id="password"
        v-model="password"
        class="weui-input2"
        :password="flag"
        placeholder="请输入密码"
      />
      <!-- <text class="eye" @tap="changeIpt">*</text> -->
      <!-- </view> -->
    </view>
    <!-- <view class="tishi">手机验证码登录</view> -->
    <view class="gitBtn">
      <view class="loginBtn" @tap="login">
        登录
      </view>
    </view>
  </view>
</template>

<script>
  import './index.less'
  import Taro, { axios, testData, testIpt } from '@utils'

  export default {
    data() {
      return {
        phoneNumber: '',
        password: '',
        flag: true,
        num: 0
      }
    },
    created() {
      let token = Taro.getStorageSync('token')
      if (token) {
        Taro.switchTab({ url: '/pages/OlineMarking/index' })
      }
    },
    methods: {
      login() {
        if (this.num > 0) return
        if (this.phoneNumber) {
          if (testData(this.phoneNumber)) {
            wx.showToast({
              title: '用户名不可有空格',
              icon: 'none',
              duration: 2000
            })
            return
          }
        } else {
          wx.showToast({
            title: '请输入用户名',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (!this.password) {
          wx.showToast({
            title: '请输入密码',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (testData(this.password)) {
          if (!testIpt(this.password)) {
            wx.showToast({
              title: '密码不可以全为空格',
              icon: 'none',
              duration: 2000
            })
            return
          }
        }
        this.num++
        setTimeout(() => {
          this.num = 0
        }, 2000)
        let data = {
          userName: this.phoneNumber,
          password: this.password,
          ClientInfo: 'NZClient',
          remember: true
        }
        axios({
          type: 'post',
          url: 'login',
          data
        }).then(res => {
          if (res.success) {
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('dataList', res.data.user)
            Taro.switchTab({ url: '/pages/home/index' })
          } else {
            this.num = 0
            // wx.showModal({
            //   icon: 'none',
            //   showCancel: false,
            //   confirmColor: '#008cff',
            //   content: '您输入的账号或密码有错误，请重新输入！'
            // })
          }
        })
      }
      // changeIpt() {
      //   this.flag = !this.flag
      // }
    }
  }
</script>
