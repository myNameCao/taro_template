/* eslint-disable no-undef */
// import erroeMes from '@conf/errorMes'
import Taro from '@tarojs/taro'
import { api, requestSuccess, responseSuccess, responseFail } from '@conf'
let encryptedData = '',
  wechatToken = '',
  iv = ''
export const axios = P => {
  let { data, path, token } = requestSuccess(P, api)
  P.loading && Taro.showLoading({ title: '加载中', mask: true })
  return new Promise(resolve => {
    wx.request({
      url: BASE_URL + path,
      data: data,
      method: P.type || 'GET',
      header: {
        'content-type': 'application/json',
        token
      },
      success(res) {
        responseSuccess(res, P)
        if (res.statusCode !== 200) return
        resolve(res.data)
        P.success && P.success(res.data)
      },
      complete() {
        P.loading && Taro.hideLoading()
      },
      fail(res) {
        responseFail(res)
        Taro.showToast({
          title: '网络请求失败，请检查您的网络配置',
          duration: 2000,
          icon: 'none'
        })
      }
    })
  })
}
export const login = P => {
  wx.removeStorageSync('Token')
  const promiseWx = new Promise(function(resolve) {
    wx.login({
      success: res => {
        let code = res.code
        resolve(code)
      }
    })
  })
  promiseWx.then(function(code) {
    ajax({
      url: P.url || 'signIn',
      data: {
        code: code
      },
      special(res) {
        wx.hideLoading()
        if (res.data.code === 201 && !P.notMust) {
          wx.redirectTo({
            url: '/pages/login/login'
          }) //  携带  wechatToken  进入注册页面
          wechatToken = res.data.result.wechatMPToken
        }
      },
      success() {
        // wx.setStorage({ key: 'Token', data: res.result.token });
        wx.redirectTo({
          url: '/pages/index/index'
        }) //  携带  wechatToken  进入注册页面
        //  获得当前页面   刷新
      }
    })
  })
} //登录接口
export const Authorization = P => {
  encryptedData = P.encryptedData
  iv = P.iv
} //登录授权
export const checkAuthorization = type => {
  let p = new Promise(function(resolve) {
    wx.getSetting({
      success(res) {
        let obj = res.authSetting
        let str = 'scope.' + type
        resolve(obj[str])
      }
    })
  })
  return p
} // 判断授权
export const signUp = P => {
  if (!encryptedData) return false // 如果微信没有授权   return  false 检测重新授权
  ajax({
    url: 'signUp',
    loading: true,
    data: {
      phone: P.phone,
      code: P.code,
      wechatMPToken: wechatToken,
      encryptedData: encryptedData,
      iv: iv
    },
    error() {
      P.success()
    },
    success() {
      P.success()
    }
  })
  return true
} //注册接口
