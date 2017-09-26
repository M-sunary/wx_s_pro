//获取配置文件信息
const reqNavListUrl = require('../../common/config').reqNavListUrl
const reqCombineListUrl = require('../../common/config').reqCombineListUrl
const duration = 2000
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goods: {
          items:[],
          paginate:{
              total:{}
          }
      },
      prompt: {
          hidden: !0,
      },
      navList: [],
      activeIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList()
    this.getCombineList()
  },
  //获取菜单导航列表
  getNavList() {
    var self = this
    self.setData({
      navList: []
    })

    wx.request({
      url: reqNavListUrl,
      data: {},//请求参数，若请求接口无需参数则为空
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (result) {
        wx.showToast({
          title: 'loading',
          icon: 'loading',
          mask: true,
          duration: duration
        })
        if (result.data.length > 0) {
          console.log(result.data)
          self.setData({
            navList: result.data
          })
        }
      },
      fail: function ({ errMsg }) {
        console.log('request fail, set default data')
        self.setData({
          navList: [
            {
              'navId': 1,
              'navName': '默认显示全部套餐',
              'navShortName': '全部'
            },
            {
              'navId': 2,
              'navName': '欧司朗海拉五套装',
              'navShortName': '欧司朗套装'
            },
            {
              'navId': 3,
              'navName': '七度英雄海拉5定制套餐',
              'navShortName': '七度英雄'
            },
            {
              'navId': 4,
              'navName': '恒威LED大灯透镜系列',
              'navShortName': '恒威LED'
            }
          ]
        })
      }
    })
  },
  //获取套餐列表
  getCombineList() {
    var self = this
    self.setData({
      goods: {
        items: null,
        paginate: {
          total: null
        }
      }
    })

    wx.request({
      url: reqCombineListUrl,
      data: {},//请求参数，若请求接口无需参数则为空
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (result) {
        wx.showToast({
          title: 'loading',
          icon: 'loading',
          mask: true,
          duration: duration
        })
        if (result.data.length > 0) {
          console.log(result.data)
          self.setData({
            goods: {
              items: result.data,
              paginate: {
                total: result.data.length
              }
            }
          })
        }
      },

      fail: function ({ errMsg }) {
        console.log('request fail, set default data')
        self.setData({
          goods: {
            items: [{
              'content': '透镜/安定器/总成',
              'id': 1,
              'thumbUrl': 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG',
              'name': '欧司朗海拉5套装',
              'params': '36W',
              'price': 1400,
              'memo': ''
            }],
            paginate: {
              total: 1
            }
          }
        })
      }
    })
  },
  navigateTo(e) {
    console.info("进来了")
    App.WxService.navigateTo('./detail/combineDetail', {
      id: e.currentTarget.dataset.id
    })

  },
  onTapTag(e) {
    const type = e.currentTarget.dataset.type
    const index = e.currentTarget.dataset.index
    const url = reqCombineListUrl + "/" + type
    console.log("请求url:", url)
    this.getGoodsByType(url),
      this.setData({
        activeIndex: index,
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

  //顶部下拉刷新页面
  onPullDownRefresh: function () {
    //   wx.showToast({
    //       title: '努力加载中...',
    //       icon: 'loading'
    //   })
    //   wx.back
    //   console.log('onPullDownRefresh', new Date())
    //   wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    //   wx.showToast({
    //       title: '已经到底啦~',
    //       icon: ""
    //   })
    //   wx.back
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  getGoodsByType(url) {
    var self = this
    wx.request({
      url: url,
      data: {},//请求参数，若请求接口无需参数则为空
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (result) {
        console.log(result.data.length)
        if (result.data.length > 0) {
          self.setData({
            goods: {
              items: result.data,
              paginate: {
                total: result.data.length
              }
            }
          })
        } else {
          self.setData({
            prompt: {
              hidden: 0,
            },
          })
        }
      },
      fail: function () {
        self.setData({
          prompt: {
            hidden: 0,
          },
        })
      }
    })
  }
})