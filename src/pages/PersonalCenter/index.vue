<template>
  <view class="PersonalCenter">
    <view class="usermsg">
      <view class="user-info">
        <view class="infoname">
          <text>{{ userInfo.userName }}</text>
          <view class="userrole">
            {{ userInfo.roleName }}
          </view>
        </view>
        <view class="accountnumber_phone"> 手机号：{{ userInfo.mobile }} </view>
      </view>
      <view class="userhead">
        <image src="../../assets/imgs/head_man.png" />
      </view>
    </view>
    <view class="user-operation">
      <view class="user-operation-item" @tap="Feedback()">
        <image src="../../assets/imgs/yijian-icon.png" />
        <view class="text">
          意见反馈
          <!-- <view class="line" /> -->
        </view>
      </view>
      <view class="user-operation-item" @tap="UserAgreement()">
        <image src="../../assets/imgs/xieyi-icon.png" />
        <view class="text">
          用户协议
          <!-- <view class="line" /> -->
        </view>
      </view>
      <view class="user-operation-item" @tap="UserSet()">
        <image src="../../assets/imgs/set-icon.png" />
        <view class="text">
          设置
          <!-- <view class="line" /> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import './index.less'
  import Taro, { axios } from '@utils'

  export default {
    data() {
      return {
        userInfo: {}
      }
    },
    onShow() {
      let obj = Taro.getStorageSync('dataList')
      if (obj.roles[0] === 'teacher') {
        obj.roleName = '教师'
      }
      if (obj.roles[0] === 'admin') {
        obj.roleName = '学校用户'
      }
      if (obj.roles[0] === 'student') {
        obj.roleName = '学生'
      }
      this.userInfo = obj
      this.getUserInfo(obj.loginName, obj.roles[0], obj.schoolId)
    },
    methods: {
      getUserInfo(param1, param2, param3) {
        if (param2 !== 'admin') {
          let data = {
            Id: param1,
            schoolId: param3,
            userType: param2
          }
          axios({ url: 'UserInfo', type: 'get', data, loading: true }).then(
            res => {
              if (res.success) {
                this.$set(this.userInfo, 'mobile', res.data.mobile)
                // this.userInfo.mobile = res.data.mobile
              } else {
                this.userInfo.mobile = ''
              }
            }
          )
          // console.log(this.userInfo)
        } else {
          this.userInfo.mobile = ''
        }
      },
      // 意见反馈
      Feedback() {
        Taro.navigateTo({
          url: '/pagesPackage/FeedBack/index'
        })
      },
      // 用户协议
      UserAgreement() {
        Taro.navigateTo({
          url: '/pagesPackage/UserAgreement/index'
        })
      },
      // 设置
      UserSet() {
        Taro.navigateTo({
          url: '/pagesPackage/UserSet/index'
        })
      }
    }
  }
</script>
