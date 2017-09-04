const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      items: [
          {
              icon: '../../assets/images/iconfont-order.png',
              text: '我的订单',
              path: '/pages/order/list/index'
          },
          {
              icon: '../../assets/images/iconfont-addr.png',
              text: '收货地址',
              path: '/pages/address/list/index'
          },
          {
              icon: '../../assets/images/iconfont-phone.png',
              text: '联系客服',
              path: '15601591943',
          },
          {
              icon: '../../assets/images/iconfont-faq.png',
              text: '常见问题',
              path: '/pages/help/list/index',
          },
      ],
      settings: [
          {
              icon: '../../assets/images/iconfont-clear.png',
              text: '清除缓存',
              path: '0.0KB'
          },
          {
              icon: '../../assets/images/iconfont-about.png',
              text: '关于我们',
              path: '/pages/about/index'
          },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log('onLoad')
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
          //更新数据
          that.setData({
              userInfo: userInfo
          })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onLoad() {
      this.getUserInfo()
      this.getStorageInfo()
  },
  navigateTo(e) {
      const index = e.currentTarget.dataset.index
      const path = e.currentTarget.dataset.path

      switch (index) {
          case 2:
              App.WxService.makePhoneCall({
                  phoneNumber: path
              })
              break
          default:
              App.WxService.navigateTo(path)
      }
  },
  getUserInfo() {
      const userInfo = App.globalData.userInfo

      if (userInfo) {
          this.setData({
              userInfo: userInfo
          })
          return
      }

      App.getUserInfo()
          .then(data => {
              console.log(data)
              this.setData({
                  userInfo: data
              })
          })
  },
  getStorageInfo() {
      App.WxService.getStorageInfo()
          .then(data => {
              console.log(data)
              this.setData({
                  'settings[0].path': `${data.currentSize}KB`
              })
          })
  },
  bindtap(e) {
      const index = e.currentTarget.dataset.index
      const path = e.currentTarget.dataset.path

      switch (index) {
          case 0:
              App.WxService.showModal({
                  title: '友情提示',
                  content: '确定要清除缓存吗？',
              })
                  .then(data => data.confirm == 1 && App.WxService.clearStorage())
              break
          default:
              App.WxService.navigateTo(path)
      }
  },
  logout() {
      App.WxService.showModal({
          title: '友情提示',
          content: '确定要登出吗？',
      })
          .then(data => data.confirm == 1 && this.signOut())
  },
  signOut() {
      App.HttpService.signOut()
          .then(res => {
              const data = res.data
              console.log(data)
              if (data.meta.code == 0) {
                  App.WxService.removeStorageSync('token')
                  App.WxService.redirectTo('/pages/login/index')
              }
          })
  },
})