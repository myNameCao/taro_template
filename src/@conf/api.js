export const api = {
  privatePath: {
    examTasks: '/api/exam/tasks', //任务列表
    getTemplate: '/api/Exam/getExamTemplateBySeId',
    getPackageByEcId: '/api/ExamPackage/GetPackageByEcId',
    CommitStuGroup: '/api/SubmitScores/CommitStuGroup',
    FeedBack: '/api/FeedBack/CommitOpinion', //意见反馈,
    UserInfo: '/api/UserInfo/getUserInfo', //获取用户信息
    UpdateExamPackageStatus: '/api/ExamPackage/UpdateExamPackageStatus', //获取用户信息
    GetExamPackage: '/api/ExamPackage/GetExamPackage',
    pullDown: '/api/ExamPackage/GetPackages',
    listPackage: '/api/ExamPackage/GetFinishedPackageIds'
  },
  publicPath: {
    login: '/api/User/Login'
  },
  webHM: {}
}
