<template>
  <view class="handleBtn">
    <cover-image
      v-show="flag"
      class="rightPic"
      src="https://wximg.xycxedu.com/wximg/right.png"
      @tap="changeDirection"
    />
    <cover-image
      v-show="!flag"
      class="rightPic"
      src="https://wximg.xycxedu.com/wximg/left.png"
      mode="aspectFit"
      @tap="changeDirection"
    />
    <cover-view class="btnBox">
      <cover-view :class="['btnData', { move: !flag }]">
        <cover-view class="btn">
          <cover-view
            :class="['txt', { btnStatus: btnFlag == 17 }]"
            @tap="changeStatus(17)"
          >
            优
          </cover-view>
        </cover-view>
        <cover-view class="btn">
          <cover-view
            :class="['txt', { btnStatus: btnFlag == 18 }]"
            @tap="changeStatus(18)"
          >
            典
          </cover-view>
        </cover-view>
        <cover-view class="btn">
          <cover-view
            :class="['txt', { btnNums: btnNum == 5 }]"
            @tap="changeStatus(5)"
          >
            横
          </cover-view>
        </cover-view>
        <cover-view class="btn">
          <cover-view
            :class="['txt', { btnNums: btnNum == 4 }]"
            @tap="changeStatus(4)"
          >
            折
          </cover-view>
        </cover-view>
        <cover-view class="btn">
          <cover-view
            :class="['txt', { btnStatus: btnFlag == 2 }]"
            @tap="changeStatus(2)"
          >
            字
          </cover-view>
        </cover-view>
        <cover-view class="btn">
          <cover-view
            :class="['txt', { btnStatus: btnFlag == 6 }]"
            @tap="changeStatus(6)"
          >
            删
          </cover-view>
        </cover-view>
        <cover-view class="btn">
          <cover-view
            :class="['txt', { btnStatus: btnFlag == 7 }]"
            @tap="changeStatus(7)"
          >
            原
          </cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
  </view>
</template>

<script>
  import EventBus from '../eventBus.js'
  export default {
    props: {
      currentIndex: {
        type: Number,
        default: () => {
          return Number
        }
      }
    },
    data() {
      return {
        phoneNumber: '',
        password: '',
        flag: true,
        // showWindow: false,
        btnNum: null,
        btnFlag: null
        // currentIndexs: null
      }
    },
    watch: {
      currentIndex() {
        this.flag = true
        this.btnNum = null
      }
    },
    methods: {
      changeDirection() {
        this.flag = !this.flag
      },
      changeStatus(num) {
        let _this = this
        this.btnFlag = num
        setTimeout(() => {
          _this.btnFlag = null
        }, 200)
        if (num == 4 || num == 5) {
          if (this.btnNum == num) {
            this.btnNum = null
          } else {
            this.btnNum = num
          }
        } else {
          this.btnNum = num
        }
        EventBus.$emit('type', this.btnNum)
        // if (num === 2) {
        //   this.showWindow = true
        // }
      }
    }
  }
</script>
<style lang="less">
  @w: 100/1334vw;
  @h: 100/750vh;
  @bg: #0080ff;
  .handleBtn {
    width: 100%;
    height: 78 * @h;
    position: absolute;
    bottom: 5px;
    left: 0;
    z-index: 6;
    .btnBox {
      width: 95%;
      height: 78 * @h;
      position: absolute;
      left: 49 * @w;
      overflow: hidden;
      .btnData {
        width: 100%;
        height: 78 * @h;
        line-height: 78 * @h;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #666666;
        position: absolute;
        -webkit-transform: translate3d(-101%, 0, 0);
        // -webkit-transition: -webkit-transform 0.45s ease-out;
        transform: translate3d(-101%, 0, 0);
        .btn {
          flex-grow: 1;
          display: flex;
          height: 78 * @h;
          line-height: 78 * @h;
          align-items: center;
          justify-content: center;
          background: #666666;
          .txt {
            display: inline-block;
            width: 60 * @w;
            height: 60 * @h;
            line-height: 60 * @h;
            font-size: 20px;
            border-radius: 50%;
            color: #fff;
            // background: #333333;
          }
        }
      }
      .move {
        -webkit-transform: translate3d(0, 0, 0);
        -webkit-transition: -webkit-transform 0.45s ease-out;
        transform: translate3d(0, 0, 0);
      }
    }
    .rightPic {
      height: 78 * @h;
      width: 50 * @w;
      display: inline-block;
      position: absolute;
      left: 0;
    }
  }
  .btnNums {
    background: #333333;
  }
  .btnStatus {
    background: #333333;
  }
</style>
