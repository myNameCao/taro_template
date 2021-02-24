<template>
  <view class="OlineMarking">
    <view class="banner">
      <text>欢迎来到晓羊策学</text>
      <!-- <image src="../../assets/imgs/index_banner.png" /> -->
      <view class="swiper-tab">
        <view
          class="tab-item"
          :class="{ swiperTabList: currentTab == 0 ? 'swiperTabList' : '' }"
          data-current="0"
          @tap="tabChange"
        >
          进行中
          <image
            v-if="currentTab == 0"
            src="../../assets/imgs/tabline.png"
            alt=""
          />
        </view>
        <view
          class="tab-item"
          data-current="1"
          :class="{ swiperTabList: currentTab == 1 ? 'swiperTabList' : '' }"
          @tap="tabChange"
        >
          已完成
          <image
            v-if="currentTab == 1"
            src="../../assets/imgs/tabline.png"
            alt=""
          />
        </view>
      </view>
    </view>
    <scroll-view scrollY="true">
      <view class="mark-content">
        <view class="tab-content">
          <view v-if="currentTab == 0" class="demo-text">
            <view v-show="underwayList.length">
              <view
                v-for="(underway, index) in underwayList"
                :key="index"
                class="list-item"
                @tap="ToyueJuan(underway)"
              >
                <view class="list-item-content">
                  <image
                    v-if="underway.meExamType === 0"
                    src="./image/kaotype0.png"
                  />
                  <image
                    v-if="underway.meExamType === 1"
                    src="./image/kaotype1.png"
                  />
                  <image
                    v-if="underway.meExamType === 2"
                    src="./image/kaotype2.png"
                  />
                  <image
                    v-if="underway.meExamType === 3"
                    src="./image/kaotype3.png"
                  />
                  <image
                    v-if="underway.meExamType === 4"
                    src="./image/kaotype4.png"
                  />
                  <image
                    v-if="underway.meExamType === 5"
                    src="./image/kaotype5.png"
                  />
                  <view class="task-msg">
                    <view class="question-msg">
                      <view class="question-type">
                        {{ underway.questionName }}
                      </view>
                      <view class="question-name">
                        {{ underway.seName + underway.markTypeView }}
                      </view>
                    </view>
                    <view class="exam_times">
                      考试日期：{{ underway.seDate }}
                    </view>
                    <view class="task-schedule">
                      阅卷任务：{{ underway.finishCount }}/{{
                        underway.allCount
                      }}
                    </view>
                  </view>
                </view>
                <view class="schedule">
                  <view class="progress-bar">
                    <view class="schedule-text">
                      <progress
                        :percent="underway.planNumber"
                        activeColor="#0080ff"
                        stroke-width="8"
                        border-radius="5"
                        backgroundColor="#ddf0ff"
                        active-mode="backwards"
                        duration="0"
                      ></progress>
                      我的进度：
                      {{ underway.planNumber }}%
                    </view>
                    <button
                      v-if="!underway.reviewState"
                      type="primary"
                      plain="true"
                      @tap="ToyueJuan(underway)"
                    >
                      进入阅卷
                    </button>
                    <button
                      v-if="underway.reviewState"
                      type="primary"
                      plain="true"
                      @tap="ToyueJuan(underway)"
                    >
                      回评
                    </button>
                  </view>
                </view>
              </view>
            </view>
            <view
              v-show="!underwayList.length && sendState"
              class="StudentAnalysis"
            >
              <view class="coming-soon">
                <image src="https://wximg.xycxedu.com/wximg/soon.png" />
                <text>当前没有阅卷信息</text>
                <text>请下拉刷新以获取最新阅卷任务</text>
              </view>
            </view>
          </view>
          <view v-if="currentTab == 1" class="demo-text">
            <view v-show="completedList.length">
              <view
                v-for="(complete, index) in completedList"
                :key="index"
                class="list-item"
                @tap="ExamineCompleted(complete)"
              >
                <view class="list-item-content">
                  <image
                    v-if="complete.meExamType === 0"
                    src="./image/kaotype0.png"
                  />
                  <image
                    v-if="complete.meExamType === 1"
                    src="./image/kaotype1.png"
                  />
                  <image
                    v-if="complete.meExamType === 2"
                    src="./image/kaotype2.png"
                  />
                  <image
                    v-if="complete.meExamType === 3"
                    src="./image/kaotype3.png"
                  />
                  <image
                    v-if="complete.meExamType === 4"
                    src="./image/kaotype4.png"
                  />
                  <image
                    v-if="complete.meExamType === 5"
                    src="./image/kaotype5.png"
                  />
                  <view class="task-msg">
                    <view class="question-msg">
                      <view class="question-type">
                        {{ complete.questionName }}
                      </view>
                      <view class="question-name">
                        {{ complete.seName + complete.markTypeView }}
                      </view>
                    </view>
                    <view class="exam_times">
                      考试日期：{{ complete.seDate }}
                    </view>
                  </view>
                </view>
                <view class="schedule">
                  <view class="progress-bar">
                    <view class="schedule-text">
                      <progress
                        :percent="complete.planNumber"
                        activeColor="#0080ff"
                        stroke-width="8"
                        border-radius="5"
                        backgroundColor="#ddf0ff"
                        active-mode="backwards"
                        duration="0"
                      ></progress>
                      我的进度：{{ complete.planNumber }}%
                    </view>
                    <button
                      type="primary"
                      plain="true"
                      @tap="ExamineCompleted(complete)"
                    >
                      查看
                    </button>
                  </view>
                </view>
              </view>
            </view>
            <view
              v-show="!completedList.length && sendState"
              class="StudentAnalysis"
            >
              <view class="coming-soon">
                <image src="https://wximg.xycxedu.com/wximg/soon.png" />
                <text>当前没有阅卷信息</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import './index.less'
  import Taro, { axios, DateFormat } from '@utils'

  export default {
    data() {
      return {
        winWidth: 0,
        winHeight: 0,
        currentTab: '0',
        userInfo: {},
        underwayList: [], //进行中任务列表
        completedList: [], //已完成列表
        sendState: false
      }
    },
    onPullDownRefresh() {
      this.pullDownData()
    },
    onShow() {
      this.userInfo = {}
      this.underwayList = []
      this.completedList = []
      this.userInfo = Taro.getStorageSync('dataList')
      if (this.currentTab === '0') {
        this.pullDownData()
      }
      if (this.currentTab === '1') {
        this.getCompleted()
      }
    },
    methods: {
      tabChange(e) {
        this.sendState = false
        this.currentTab = e.target.dataset.current
        if (e.target.dataset.current === '0') {
          this.pullDownData()
        }
        if (e.target.dataset.current === '1') {
          this.getCompleted()
        }
      },
      pullDownData() {
        let data = {
          teacherId: this.userInfo.authcode
        }
        axios({ url: 'pullDown', type: 'get', data, loading: true }).then(
          res => {
            if (res) {
              this.getUnderway()
            }
          }
        )
      },
      // 获取进行中列表
      getUnderway() {
        let data = {
          teaId: this.userInfo.authcode,
          status: 1
        }
        axios({ url: 'examTasks', type: 'get', data, loading: true }).then(
          res => {
            if (res.success) {
              Taro.stopPullDownRefresh()
              this.sendState = true
              if (res.data !== null) {
                res.data.forEach(item => {
                  let str = ''
                  let rs = ''
                  let num = 0
                  if (item.finishCount > 0 && item.allCount > 0) {
                    num = item.finishCount / item.allCount //我的进度
                    rs = item.finishCount / item.allCount //评阅状态
                  } else {
                    num = 0
                  }
                  // rs = item.finishCount / item.allCount //评阅状态
                  if (item.markType === 1) {
                    str = '(正评)'
                  }
                  if (item.markType === 2) {
                    str = '(补评)'
                  }
                  if (item.markType === 3) {
                    str = '(审评)'
                  }
                  item.finishType = false //完成状态
                  item.markTypeView = str //审评名称
                  item.planNumber = Math.floor(num * 100)
                  item.seDate = DateFormat(new Date(item.seDate), 'yyyy-MM-dd')
                  item.reviewState = Math.floor(rs * 100) === 100 //评阅状态
                })
                this.underwayList = res.data
              } else {
                this.underwayList = []
              }
            } else {
              this.sendState = false
              this.underwayList = []
            }
          }
        )
      },
      // 获取已完成列表
      getCompleted() {
        let data = {
          teaId: this.userInfo.authcode,
          status: 2
        }
        axios({ url: 'examTasks', type: 'get', data, loading: true }).then(
          res => {
            if (res.success) {
              this.sendState = true
              if (res.data !== null) {
                res.data.forEach(item => {
                  let num = 0
                  let str = ''
                  if (item.finishCount > 0 && item.allCount > 0) {
                    num = item.finishCount / item.allCount //我的进度
                  } else {
                    num = 0
                  }
                  if (item.markType === 1) {
                    str = '(正评)'
                  }
                  if (item.markType === 2) {
                    str = '(补评)'
                  }
                  if (item.markType === 3) {
                    str = '(审评)'
                  }
                  item.markTypeView = str //审评名称
                  item.finishType = true
                  item.seDate = DateFormat(new Date(item.seDate), 'yyyy-MM-dd')
                  item.planNumber = Math.floor(num * 100)
                })
                this.completedList = res.data
                console.log(this.completedList)
              } else {
                this.completedList = []
                console.log(this.completedList)
              }
            } else {
              this.sendState = false
              this.completedList = []
            }
            // console.log(this.completedList)
          }
        )
      },
      // 进入阅卷
      ToyueJuan(obj) {
        // console.log(obj)
        Taro.navigateTo({
          url: '/pagesPackage/markDetail/index?examMsg=' + JSON.stringify(obj)
        })
      },
      // 查看已完成
      ExamineCompleted(obj) {
        // console.log(obj)
        Taro.navigateTo({
          url: '/pagesPackage/markDetail/index?examMsg=' + JSON.stringify(obj)
        })
      }
    }
  }
</script>
