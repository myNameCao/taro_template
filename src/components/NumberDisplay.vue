<template>
  <view class="test">
    {{ cont }}
    <view class="clickbtn" @tap="btnClick">
      点击
    </view>
  </view>
</template>
<script>
  export default {
    name: 'Index',
    data() {
      return {
        cont: 0
      }
    },
    methods: {
      btnClick() {
        this.cont++
      }
    }
  }
</script>
<style lang="less">
  .test {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border: 1px red solid;
    .clickbtn {
      background: gray;
    }
  }
</style>
