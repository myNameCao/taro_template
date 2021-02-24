import erroeMes from './errorMes'

export const requestSuccess = ({ data, url }, { privatePath, publicPath }) => {
  data = data || {}
  let token
  let path = privatePath[url] || publicPath[url]
  if (privatePath[url]) {
    token = wx.getStorageSync('token') || ''
  }
  return { data, path, token }
}
export const responseSuccess = res => {
  let errObj = erroeMes[res.statusCode]
  if (!res.data.success) {
    wx.showToast({
      title: res.data.msg,
      icon: 'none',
      duration: 3000
    })
  }
  errObj && errObj.callBack(res.data)
}
export const responseFail = P => {
  console.log(P, '错误')
}
