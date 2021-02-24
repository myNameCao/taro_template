<template>
  <view class="canvasView">
    <scroll-view class="swiper" :scrollTop="scrollTop" :scrollY="canScroll">
      <view class="cleax">
        小程序的bug
      </view>
      <view
        :class="['run', { mT: canvasShow }]"
        :style="style"
        @touchStart="touchStart"
        @touchEnd="touchEnd"
        @touchMove="touchMove"
      >
        <view :style="chris" class="imageView" />
        <!-- <view
          style="position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;"
          
        > -->
        <canvas
          ref="canvasShow"
          class="image2"
          canvas-id="Review"
          @touchStart="touchStart1"
          @touchEnd="touchEnd1"
          @touchMove="touchMove1"
        ></canvas>
        <!-- </view> -->
        <cover-view
          v-for="(item, index) in answerlist"
          :key="item.id"
          :style="item.style"
          :class="['click']"
          @tap="questionCanvasClick(item, index)"
        >
          <cover-view
            :style="item.rec"
            :class="['rec', { activeAnson: item === stuAnswer }]"
          >
            <cover-image
              v-if="item.esaStatus"
              class="icon"
              :src="getICon(item)"
            />
          </cover-view>
          <cover-view
            v-if="item.esaStatus == 2"
            :style="item.text"
            class="scoreText"
          >
            {{ item.esaScore }}
          </cover-view>
        </cover-view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
  import Taro from '@utils'

  import EventBus from '../eventBus.js'
  let clientW = null
  let clientH = null
  let scale = 1
  let goPage = false
  let mystudent = null

  let scollTop = 0
  export default {
    name: 'Canvas',
    props: {
      currentStudent: {
        type: Object,
        default: () => {
          return {}
        }
      },
      showdrawCanvas: {
        type: Boolean,
        default: true
      },
      stuAnswer: {
        type: Object,
        default: () => {
          return {}
        }
      },
      examTemp: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        cont: 0,
        style: {},
        chris: {},
        goPage: false, //记录次数
        canScroll: true,
        scrollTop: 0,
        answerlist: [], //
        // 底部按钮变量
        drawType: -1, // 选定的按钮功能
        isMourseDownStart: false, // 判定是否可以使用横和折工能
        drawImage: '',
        startDrawX: null, // 起始点X轴坐标
        startDrawY: null, // 起始点Y轴坐标
        startDrawX1: null, // 起始点X轴坐标
        startDrawY1: null, // 起始点Y轴坐标
        txtValue: '', // 评语
        moveJl: null, // 移动距离
        currentIndex: -1, // 当前题索引
        curXywh: '', // 当前题坐标
        controlNum: null,
        canvasShow: false
      }
    },
    watch: {
      currentStudent(val) {
        if (!val) return
        this.getSwiperWidth(val)
        mystudent = val
      }
    },
    mounted() {
      this.getBtnNumber() // 获取点
    },
    beforeDestroy() {
      EventBus.$off('type')
    },
    methods: {
      getSwiperWidth(val) {
        let _this = this
        if (clientW) {
          _this.setRunVIew(val)
          return
        }
        setTimeout(() => {
          const query = Taro.createSelectorQuery()
          query
            .selectAll('.swiper')
            .boundingClientRect(rec => {
              clientW = rec[0].width
              clientH = rec[0].height
              _this.setRunVIew(val)
            })
            .exec()
        }, 1000)
      },
      setRunVIew(val) {
        let { myInfo } = val
        let xywh = myInfo.xywh

        scale = clientW / xywh[2] < 1 ? clientW / xywh[2] : 1
        // scale = 1
        let height = Math.round(xywh[3] * scale)
        this.style = {
          width: `${Math.round(xywh[2] * scale)}px`,
          marginTop: `${
            height > clientH ? 0 : (clientH - Math.round(xywh[3] * scale)) / 2
          }px`,
          height: `${height}px`
        }

        this.drawAnswer(val)
        this.drawBtn()
        this.showStudentImage(val)
      },
      showStudentImage({ myInfo }) {
        let imgPrefix = myInfo.imageurl
        let xywh = myInfo.xywh
        this.curXywh = xywh.join(',')
        this.chris = {
          backgroundImage: `url(${imgPrefix})`,
          backgroundSize: `${xywh[6] * scale}px,${xywh[7] * scale}px`,
          width: Math.round(xywh[6] * 1) * scale + 'px',
          left: -Math.round(xywh[0] * 1) * scale + 'px',
          top: -Math.round(xywh[1] * 1) * scale + 'px',
          height: Math.round(xywh[7] * 1) * scale + 'px'
        }
      },
      drawAnswer(val) {
        val.stuAnswers.map(item => {
          let list = item.myinfo.eqAnswerIpxywh
          let style = {
            left: `${(list[0] - val.myInfo.xywh[0]) * scale}px`,
            top: `${(list[1] - val.myInfo.xywh[1]) * scale}px`
          }
          item.rec = {
            width: `${list[2] * scale}px`,
            height: `${list[3] * scale}px`,
            lineHeight: `${list[2] * scale}px`
          }
          // item.textRight =
          //   item.esaScore > 10
          //     ? Math.round(list[2] * scale) * 1.5
          //     : Math.round(list[2] * scale)
          item.style = style
          item.text = {
            fontSize: `${list[2] * scale}px`,
            left: `${list[2] * scale + 5}px`
          }
        })
        this.answerlist = val.stuAnswers
      },
      getICon(item) {
        let scoreList = item.myinfo.scoreList
        let imgicon = 'https://wximg.xycxedu.com/wximg/halfRight_icon.png'
        if (item.esaScore === scoreList[0]) {
          imgicon = 'https://wximg.xycxedu.com/wximg/right_icon.png'
        }
        if (item.esaScore === 0) {
          imgicon = 'https://wximg.xycxedu.com/wximg/wrong_icon.png'
        }
        return imgicon
      },
      /***********按钮事件加载*********************************************/
      getBtnNumber() {
        EventBus.$off('type')
        this.$nextTick(() => {
          // 判定选中的按钮功能
          EventBus.$on('type', num => {
            this.drawType = num
            if (num == null) {
              this.canScroll = true
              this.isMourseDownStart = false
            }
            if (num == 17 || num == 18) {
              this.canScroll = true
              this.isMourseDownStart = false
              let modeIcon = this.getMarkInfoIcon(this.drawType)
              if (modeIcon !== undefined) {
                if (this.stuAnswer.esaType == num) {
                  this.stuAnswer.esaType = 0
                  let newEsaInfoAry = this.deleteExceAndErrorMarkInfo(
                    this.stuAnswer.esaInfo
                  )
                  this.stuAnswer.esaInfo = newEsaInfoAry.join(',')
                  this.drawBtn()
                } else {
                  this.stuAnswer.esaType = num
                  let newEsaInfoAry = this.deleteExceAndErrorMarkInfo(
                    this.stuAnswer.esaInfo
                  )
                  // 固定格式  17 代表优秀试卷  18代表典型错误  这边相当于有两个标识符
                  let str =
                    num == 17 ? '17^-32^-16^32^32^^^^' : '18^-32^-16^32^32^^^^'
                  newEsaInfoAry.push(str)
                  this.stuAnswer.esaInfo = newEsaInfoAry.join(',')
                  this.drawBtn()
                }
              }
            } else if (num == 2) {
              this.canScroll = true
              this.isMourseDownStart = false
              this.canvasShow = true
              EventBus.$emit('isShow', true)
            } else if (num == 5 || num == 4) {
              this.getElement()
              this.canScroll = false
              this.isMourseDownStart = true
            } else if (num == 6) {
              this.canScroll = true
              this.isMourseDownStart = false
              let _this = this
              let isIn = false
              this.currentStudent.stuAnswers.map(item => {
                if (item.esaInfo) {
                  isIn = true
                }
              })
              if (isIn) {
                wx.showModal({
                  title: '提示',
                  content: '删除将清除所有标记，确定要删除？',
                  success(res) {
                    if (res.confirm) {
                      _this.stuAnswer.esaInfo = ''
                      _this.currentStudent.stuAnswers.map(item => {
                        item.esaInfo = '' // 批阅信息（横线折现等）
                      })
                      _this.drawBtn()
                    } else if (res.cancel) {
                      console.log('网卡了...')
                    }
                  }
                })
              } else {
                wx.showToast({
                  title: '无可删除标记',
                  icon: 'none',
                  duration: 2000
                })
              }
            } else if (num == 7) {
              this.goSinglePage()
            }
          })

          // 写字时的方法
          EventBus.$on('txt', res => {
            this.txtValue = res
            this.canvasShow = false
            if (this.txtValue != '') {
              if (this.currentIndex == -1) {
                this.currentIndex = 0
              }
              let selectedQuestion = this.currentIndex
              let ecXywh = this.curXywh
              let getExamTemplateBySeId = this.examTemp.dcExamQuestions[
                selectedQuestion
              ]
              let innerXywhAry = this.getContentXywhByAsnwer(
                ecXywh,
                getExamTemplateBySeId.eqAnswerIpxywh
              )
              let imgXywhs = ecXywh.split('#')
              let maxWidth = this.getMaxContentWidth(imgXywhs)
              let sumHeight = this.getSumContentHeight(imgXywhs)
              let lineMaxWidth = maxWidth - innerXywhAry[0]
              let linMaxHeight = sumHeight - innerXywhAry[1]
              let str =
                '16^0^' +
                innerXywhAry[3] +
                '^' +
                lineMaxWidth +
                '^' +
                linMaxHeight +
                '^' +
                this.txtValue +
                '^^^'
              if (
                this.stuAnswer.esaInfo == '' ||
                this.stuAnswer.esaInfo == undefined
              ) {
                this.stuAnswer.esaInfo = str
              } else {
                this.stuAnswer.esaInfo += ',' + str
              }
              this.drawBtn()
            }
          })
        })
      },
      // 获取 当前给分点所处批阅块的坐标信息（当前批阅块拼接好的图片）
      getContentXywhByAsnwer(ecXywh, eqAnswerIpxyh) {
        let epxywhAry = eqAnswerIpxyh.split(',')
        let eqPageId = epxywhAry[1]
        let eqX = parseFloat(epxywhAry[2])
        let eqY = parseFloat(epxywhAry[3])
        let eqW = parseFloat(epxywhAry[4])
        let eqH = parseFloat(epxywhAry[5])
        let ecXywhAry = ecXywh.split('#')
        let sumHeight = 0
        for (let i = 0; i < ecXywhAry.length; i++) {
          let xywh = ecXywhAry[i].split(',')
          let ecX = parseFloat(xywh[0])
          let ecY = parseFloat(xywh[1])
          let ecW = parseFloat(xywh[2])
          let ecH = parseFloat(xywh[3])
          let ecPageId = xywh[4]
          if (
            ecPageId == eqPageId &&
            eqX >= ecX &&
            eqY >= ecY &&
            eqX + eqW <= ecX + ecW &&
            eqY + eqH <= ecY + ecH
          ) {
            // 当前给分点坐标在当前的批阅块中
            return [eqX - ecX, eqY - ecY + sumHeight, eqW, eqH]
          } else {
            sumHeight += ecH
          }
        }
        return [0, 0, eqW, eqH]
      },
      // 获取学生的图片坐标的最大宽度
      getMaxContentWidth(imgXywhs) {
        let maxWidth = 0
        for (let i = 0; i < imgXywhs.length; i++) {
          let xywh = imgXywhs[i].split(',')
          let imageWidth = xywh[2]
          if (imageWidth > maxWidth) {
            maxWidth = imageWidth
          }
        }
        return maxWidth
      },
      // 获取学生图片坐标的高度之和，上下做拼接图片
      getSumContentHeight(imgXywhs) {
        let sumHeight = 0
        for (let i = 0; i < imgXywhs.length; i++) {
          let xywh = imgXywhs[i].split(',')
          let imageHeight = xywh[3]
          sumHeight += parseFloat(imageHeight)
        }
        return sumHeight
      },
      // 给选定的按钮赋值图片
      getMarkInfoIcon(num) {
        if (num === 5) {
          return 'https://wximg.xycxedu.com/wximg/zx.png'
          // return zx
        } else if (num === 4) {
          return 'https://wximg.xycxedu.com/wximg/qx.png'
          // return qx
        } else if (num === 17) {
          return 'https://wximg.xycxedu.com/wximg/exce_icon.png'
          // return exce_icon
        } else if (num === 18) {
          // return errorAnswerIcon
          return 'https://wximg.xycxedu.com/wximg/error_icon.png'
          // return error_icon
        }
      },
      touchStart(e) {
        if (this.isMourseDownStart) {
          // this.startDrawX = e.touches[0].x
          // this.startDrawY = e.touches[0].y
          this.startDrawX = e.touches[0].pageX - parseInt(this.moveJl.left)
          this.startDrawY = e.touches[0].pageY - parseInt(this.moveJl.top)
        }
      },
      touchEnd(e) {
        // this.canScroll = true
        if (this.isMourseDownStart) {
          if (this.drawType == 5 || this.drawType == 4) {
            let modeIcon = this.getMarkInfoIcon(this.drawType)
            if (modeIcon !== undefined) {
              // let markW = e.changedTouches[0].x - this.startDrawX
              let markW = e.changedTouches[0].pageX - this.startDrawX
              let ox = this.startDrawX
              let oy = this.startDrawY
              let ow = Math.round(markW)
              if (ow >= 3) {
                let str =
                  this.drawType + '^' + ox + '^' + oy + '^' + ow + '^6^^^^'
                if (
                  this.stuAnswer.esaInfo == '' ||
                  this.stuAnswer.esaInfo == undefined
                ) {
                  this.stuAnswer.esaInfo = str
                } else {
                  this.stuAnswer.esaInfo += ',' + str
                }
              }
              // this.isMourseDownStart = false
              // this.drawBtn()
            }
          }
        }
      },
      touchMove(e) {
        this.scorll(e.changedTouches[0].y)
        // this.canScroll = true
        if (this.isMourseDownStart) {
          if (this.drawType == 5 || this.drawType == 4) {
            let modeIcon = this.getMarkInfoIcon(this.drawType)
            if (modeIcon !== undefined) {
              // let markW = e.changedTouches[0].x - this.startDrawX
              let markW =
                e.changedTouches[0].pageX -
                parseInt(this.moveJl.left) -
                this.startDrawX
              let ox = this.startDrawX
              let oy = this.startDrawY
              let ow = Math.round(markW / (20 * scale))
              wx.downloadFile({
                url: modeIcon,
                success: function(sres) {
                  // return sres.tempFilePath
                  const ctx = Taro.createCanvasContext('Review')
                  for (let i = 0; i < ow; i++) {
                    ctx.drawImage(
                      sres.tempFilePath,
                      ox + i * 20 * scale,
                      oy,
                      20 * scale,
                      10 * scale
                    )
                  }
                  ctx.draw(true)
                },
                fail: function() {}
              })
            }
          }
        }
      },
      scorll(y) {
        //解决滚动不bug ios
        const info = wx.getSystemInfoSync()
        if (info.platform === 'android') {
          return
        }

        if (y > scollTop) {
          if (this.scrollTop > 0) {
            this.scrollTop -= 30
          }
        }
        if (y < scollTop) {
          this.scrollTop += 30
        }
        scollTop = y
      },
      touchStart1(e) {
        const info = wx.getSystemInfoSync()
        if (info.platform === 'android') {
          return
        }
        if (this.isMourseDownStart) {
          // this.canScroll = false
          this.startDrawX1 = e.touches[0].x
          this.startDrawY1 = e.touches[0].y
        }
      },
      touchEnd1(e) {
        const info = wx.getSystemInfoSync()
        if (info.platform === 'android') {
          return
        }
        // this.canScroll = true
        if (this.isMourseDownStart) {
          if (this.drawType == 5 || this.drawType == 4) {
            let modeIcon = this.getMarkInfoIcon(this.drawType)
            if (modeIcon !== undefined) {
              let markW = e.changedTouches[0].x - this.startDrawX1
              let ox = this.startDrawX1
              let oy = this.startDrawY1
              let ow = Math.round(markW)
              if (ow >= 3) {
                let str =
                  this.drawType + '^' + ox + '^' + oy + '^' + ow + '^6^^^^'
                if (
                  this.stuAnswer.esaInfo == '' ||
                  this.stuAnswer.esaInfo == undefined
                ) {
                  this.stuAnswer.esaInfo = str
                } else {
                  this.stuAnswer.esaInfo += ',' + str
                }
              }
              // this.isMourseDownStart = false
              // this.drawBtn()
            }
          }
        }
      },
      touchMove1(e) {
        this.scorll(e.changedTouches[0].y)
        const info = wx.getSystemInfoSync()
        if (info.platform === 'android') {
          return
        }
        // this.canScroll = true
        if (this.isMourseDownStart) {
          if (this.drawType == 5 || this.drawType == 4) {
            let modeIcon = this.getMarkInfoIcon(this.drawType)
            if (modeIcon !== undefined) {
              let markW = e.changedTouches[0].x - this.startDrawX1
              let ox = this.startDrawX1
              let oy = this.startDrawY1
              let ow = Math.round(markW / (20 * scale))
              wx.downloadFile({
                url: modeIcon,
                success: function(sres) {
                  // return sres.tempFilePath
                  const ctx = Taro.createCanvasContext('Review')
                  for (let i = 0; i < ow; i++) {
                    ctx.drawImage(
                      sres.tempFilePath,
                      ox + i * 20 * scale,
                      oy,
                      20 * scale,
                      10 * scale
                    )
                  }
                  ctx.draw(true)
                },
                fail: function() {}
              })
            }
          }
        }
      },
      // 实现按钮功能
      drawBtn() {
        const ctx = Taro.createCanvasContext('Review')
        let widthMax = this.$refs.canvasShow.clientWidth
        let heightMax = this.$refs.canvasShow.clientHeight
        ctx.clearRect(0, 0, widthMax, heightMax)
        ctx.draw()
        this.currentStudent.stuAnswers.map(item => {
          let esaInfo = item.esaInfo // 批阅信息（横线折现等）
          this.drawEsaAnswerMark(
            ctx,
            esaInfo,
            scale,
            parseInt(item.style.left),
            parseInt(item.style.top)
          )
        })
      },
      // base64src(base64data) {
      //   let base64 = base64data
      //     .split('')
      //     .slice(21)
      //     .join('')
      //   const fsm = wx.getFileSystemManager()
      //   const FILE_BASE_NAME = 'tmp_base64src'
      //   const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.png`
      //   const buffer = wx.base64ToArrayBuffer(base64)
      //   fsm.writeFile({
      //     filePath,
      //     data: buffer,
      //     encoding: 'binary',
      //     success(res) {
      //     },
      //     fail() {}
      //   })
      //   return filePath
      // },
      // 画批阅标记符号等信息  innerX  innerY是给分框的x,y值，已经和rate相乘过了
      drawEsaAnswerMark(ctx, esaInfo, rate, innerX, innerY) {
        if (esaInfo != undefined && esaInfo != '') {
          let _this = this
          // 存在多个联合区合并的图片
          let esaInfoAry = esaInfo.split('#')
          for (let i = 0; i < esaInfoAry.length; i++) {
            let ms = esaInfoAry[i].split(',')
            for (let j = 0; j < ms.length; j++) {
              let m = ms[j]
              let infos = m.split('^')
              if (infos.length > 6) {
                let mode = parseInt(infos[0])
                let markx = parseInt(infos[1])
                let marky = parseInt(infos[2])
                let markw = parseInt(infos[3])
                // let markh = parseInt(infos[4])
                if (mode == 16 && infos[5] != '') {
                  // 文本的评语 多行的评语  行数没做计算，设置成了默认100行
                  this.textPrewrap(
                    ctx,
                    infos[5],
                    markx * rate + innerX,
                    marky * rate + innerY + 2,
                    25,
                    markw * rate - 10,
                    100
                  )
                }
                // 只有这六种有图片信息  4 曲线   5 直线   17 优秀试卷  18 典型错误  103 分步加分    104 分步减分
                // let modeIcon = this.base64src(this.getMarkInfoIcon(mode))
                let modeIcon = this.getMarkInfoIcon(mode)
                this.controlNum = mode
                wx.downloadFile({
                  // 此处最后需要改回来
                  url: modeIcon,
                  success: function(sres) {
                    if (modeIcon != undefined) {
                      // 能找到所要话的内容
                      // 4 曲线   5 直线  16 文字评语   17 优秀试卷  18 典型错误  103 分步加分    104 分步减分
                      if (mode != 4 && mode != 5) {
                        ctx.drawImage(
                          sres.tempFilePath,
                          innerX + markx * rate,
                          innerY + marky * rate,
                          30 * rate,
                          30 * rate
                        )
                        ctx.draw(true)
                        // 等于空时 应该是优秀试卷和典型错误   不为空时应该为分步给分
                        if (infos[5] != '') {
                          _this.drawText(
                            ctx,
                            rate,
                            infos[5],
                            innerX + (markx + markw) * rate,
                            innerY + marky * rate
                          )
                        }
                      } else {
                        // 直线和折线，，直线和折线需要重叠画内容的
                        let count = Math.round(markw / 3)
                        let dx = null
                        if (mode == 4) {
                          dx = 4
                        } else {
                          dx = 3
                        }
                        for (let k = 0; k < count; k++) {
                          ctx.drawImage(
                            sres.tempFilePath,
                            markx + k * 3,
                            marky,
                            dx,
                            dx
                          )
                        }
                        ctx.draw(true)
                        _this.startDrawX = null
                        // this.canScroll = true
                      }
                    }
                    // return sres.tempFilePath
                  },
                  fail: function() {}
                })
              }
            }
          }
        }
      },
      // 多行评语的写入规则
      textPrewrap(
        ctx,
        content,
        drawX,
        drawY,
        lineHeight,
        lineMaxWidth,
        lineNum
      ) {
        let drawTxt = '' // 当前绘制的内容
        let drawLine = 1 // 第几行开始绘制
        let drawIndex = 0 // 当前绘制内容的索引
        ctx.font = '15px Times New Roman'
        ctx.fillStyle = '#ff0000'
        ctx.textBaseline = 'top'
        // 判断内容是否可以一行绘制完毕
        if (ctx.measureText(content).width <= lineMaxWidth) {
          ctx.fillText(content.substring(drawIndex, i), drawX, drawY)
          ctx.draw(true)
        } else {
          for (var i = 0; i < content.length; i++) {
            drawTxt += content[i]
            if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
              if (drawLine >= lineNum) {
                ctx.fillText(
                  content.substring(drawIndex, i) + '..',
                  drawX,
                  drawY
                )
                ctx.draw(true)
                break
              } else {
                ctx.fillText(content.substring(drawIndex, i + 1), drawX, drawY)
                drawIndex = i + 1
                drawLine += 1
                drawY += lineHeight
                drawTxt = ''
                ctx.draw(true)
              }
            } else {
              // 内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
              if (i === content.length - 1) {
                ctx.fillText(content.substring(drawIndex), drawX, drawY)
                ctx.draw(true)
              }
            }
          }
        }
      },
      // 删除优秀 典型试卷后的批阅符号信息
      deleteExceAndErrorMarkInfo(esaInfo) {
        let newAry = []
        if (esaInfo != undefined && esaInfo != '') {
          let esaInfoAry = esaInfo.split(',')
          for (let i = 0; i < esaInfoAry.length; i++) {
            let msStr = esaInfoAry[i]
            let ms = msStr.split('^')
            if (ms.length > 6) {
              if (parseInt(ms[0]) != 17 && parseInt(ms[0]) != 18) {
                newAry.push(msStr)
              }
            }
          }
        }
        return newAry
      },
      getElement() {
        const query = Taro.createSelectorQuery()
        query
          .select('.run')
          .boundingClientRect(rec => {
            this.moveJl = rec
          })
          .exec()
      },
      goSinglePage() {
        if (goPage) return
        goPage = true
        setTimeout(() => {
          goPage = false
        }, 4000) // 防止多次点击
        Taro.navigateTo({
          url: `/pagesPackage/singlePage/index?data=${JSON.stringify(
            mystudent.myInfo.pages
          )}`
        })
      },
      questionCanvasClick(item, index) {
        this.$emit('changeAnson', item)
        this.currentIndex = index
      }
    }
  }
</script>
<style lang="less">
  .canvasView {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    .swiper {
      height: 100%;
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  .cleax {
    font-size: 0;
    height: 0;
  }
  .run {
    position: relative;
    background-repeat: no-repeat;
    overflow: hidden;
    .imageView {
      position: absolute;
    }
    .click {
      position: absolute;
      overflow: visible;
      width: 65px;
      .rec {
        border: 1px #91999e solid;
      }

      .activeAnson {
        /* prettier-ignore */
        border: 1Px #ff0000 solid;
      }
      .icon {
        float: left;
        width: 100%;
        height: 100%;
      }
      .scoreText {
        position: absolute;
        top: 0;
        color: #ff0000;
      }
      z-index: 9;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .image2 {
      z-index: 5;
    }
  }
  .mT {
    top: -100000px;
  }
</style>
