//获取配置文件信息
const reqImgListUrl = require('../../common/config').reqImgListUrl
const duration = 2000

Page({

  /**
   * 页面的初始数据
   */
  data: {
      goods: {
          items:[],
          paginate:{
              total:1
          }
      },
      prompt: {
          hidden: !0,
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    self.setData({
        goods:{
            items:null,
            paginate:{
                total:null
            }
        }
    })
    // wx.setNavigationBarTitle('')
    wx.request({
        url: reqImgListUrl,
        data:{},//请求参数，若请求接口无需参数则为空
        success: function (result) {
            wx.showToast({
                title: 'loading',
                icon: 'loading',
                mask: true,
                duration: duration
            })
            if(result.data.length>0){
                self.setData({
                    goods:{
                        items:result.data,
                        paginate:{
                            total:result.data.length
                        }
                    }
                }) 
            }else{
                self.setData({
                    goods:{
                        items: [
                            {
                                'combineContent': '透镜/安定器/总成',
                                'combineId': 1,
                                'combineImg': 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG',
                                'combineName': '欧司朗海拉5套装',
                                'combineParams': '36W',
                                'combinePrice': 1400,
                                'memo': ''
                            }
                        ],
                        paginate:{
                            total:1
                        }
                    } 
                })
            }  
            console.log('request success', result)
        },

        fail: function ({ errMsg }) {
            console.log('request fail, set default data')
            self.setData({
                goods: {
                    items: [
                        {
                            'combineContent': '透镜/安定器/总成',
                            'combineId': 1,
                            'combineImg': 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG',
                            'combineName': '欧司朗海拉5套装',
                            'combineParams': '36W',
                            'combinePrice': 1400,
                            'memo': ''
                        }
                    ],
                    paginate: {
                        total: 1
                    }
                } 
            })
        }
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
    
  }
})