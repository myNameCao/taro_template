<template>
  <view v-if="isShow" class="modal-backdrop">
    <view class="modal">
      <view class="modal-header">
        <view class="titleTxt">
          写评语
        </view>
      </view>
      <view class="co1">
        <view class="modal-body">
          <textarea
            v-model="txtValue"
            focus="true"
            auto-focus="true"
            placeholder="请输入评语"
            class="txta"
          ></textarea>
        </view>
      </view>
      <view class="modal-footer">
        <cover-view class="btn-close btn" type="default" @tap="closeMt">
          取消
        </cover-view>
        <cover-view class="shu" />
        <cover-view class="btn-confirm btn" @tap="isTrue">
          确认
        </cover-view>
      </view>
    </view>
  </view>
</template>
<script>
  import EventBus from '../eventBus'
  export default {
    data() {
      return {
        isShow: false,
        txtValue: ''
      }
    },
    watch: {
      isShow(val) {
        console.log(val)
        this.$emit('disPlay', val)
      }
    },
    mounted() {
      EventBus.$on('isShow', res => {
        this.isShow = res
        this.txtValue = ''
      })
    },
    methods: {
      isTrue() {
        this.isShow = false
        EventBus.$emit('txt', this.txtValue)
      },
      closeMt() {
        this.isShow = false
        EventBus.$emit('txt', '')
      }
    }
  }
</script>
<style lang="less">
  // 弹窗
  @w: 100/1334vw;
  @h: 100/750vh;
  @bg: #0080ff;
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100100;
  }
  .modal {
    background-color: #fff;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 50%;
    border-radius: 20px;
    // position: relative;
  }
  .titleTxt {
    width: 96px;
    height: 30px;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #333333;
    line-height: 34px;
  }
  .co1 {
    // position: relative;
    height: 50%;
  }
  // .cow {
  //   height: 30%;
  // }
  .shu {
    height: 100%;
    width: 1px;
    background: #e5e5e5;
  }
  .modal-header {
    // position: relative;
    color: #313131;
    justify-content: center;
    padding: 10px;
    display: flex;
    font-size: 20px;
  }
  .modal-footer {
    height: 26%;
    justify-content: space-around;
    display: flex;
    align-items: center;
    border-top: 1px solid #e5e5e5;
  }
  .modal-body {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .txta {
    width: 80%;
    height: 100%;
    text-align: left;
    // padding: 5px;
    // z-index: 99999;
  }
  .btn {
    width: 50%;
    height: 100%;
    font-size: 20px;
    text-align: center;
    line-height: 100 * @h;
    padding: 0;
    &:active {
      background-color: #f8f8f8;
    }
  }
  .btn-close {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #333333;
    border-right: 1px solid #e5e5e5;
  }
  .btn-confirm {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #576b94;
  }
</style>
