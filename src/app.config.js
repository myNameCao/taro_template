export default {
  pages: [
    'pages/login/index',
    'pages/OlineMarking/index',
    'pages/PersonalCenter/index',
    'pages/StudentAnalysis/index'
  ],
  window: {
    pageOrientation: 'auto',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#a9b7b7',
    selectedColor: '#40a9ff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/OlineMarking/index',
        iconPath: 'assets/imgs/zxyj.png',
        text: '在线阅卷',
        selectedIconPath: 'assets/imgs/zxyjs.png'
      },
      {
        pagePath: 'pages/StudentAnalysis/index',
        iconPath: 'assets/imgs/fenxi.png',
        text: '学情分析',
        selectedIconPath: 'assets/imgs/fenxis.png'
      },
      {
        pagePath: 'pages/PersonalCenter/index',
        iconPath: 'assets/imgs/user.png',
        text: '个人中心',
        selectedIconPath: 'assets/imgs/users.png'
      }
    ]
  },
  useExtendedLib: {
    kbone: true,
    weui: true
  }
}
