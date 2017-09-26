const reqCombineDetailUrl = require('../../../common/config').reqCombineDetailUrl

const App = getApp()

Page({
    data: {
        indicatorDots: !0,
        vertical: !1,
        autoplay: !1,
        interval: 3000,
        duration: 1000,
        current: 0,
        total:0,
        goods: {
            item: {}
        }
    },
    swiperchange(e) {
        this.setData({
            current: e.detail.current,
        })
    },
    onLoad(option) {
        // this.goods = App.HttpResource('/goods/:id', { id: '@id' })
        var self = this
        this.setData({
            id: option.id
        })
        console.log(reqCombineDetailUrl + '/' + option.id)
        wx.request({
          url: reqCombineDetailUrl+'/'+option.id,
          data: {},//请求参数，若请求接口无需参数则为空
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (result) {
            wx.showToast({
              title: 'loading',
              icon: 'loading',
              mask: true,
              duration: 10
            })
            console.log(result.data)
            if (result.data) {
              console.log(result.data)
              self.setData({
                goods: {
                  items: result.data,
                  paginate: {
                    total: result.data.length
                  }
                },
                total :result.data.images.length
              })
            }
          },

          fail: function ({ errMsg }) {
            console.log('request fail, set default data')
            self.setData({
              goods: {
                items: {
                  'content': '透镜/安定器/总成',
                  'id': 1,
                  'thumbUrl': 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG',
                  'images': ['https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG'],
                  'name': '欧司朗海拉5套装',
                  'params': '36W',
                  'price': 1400,
                  'memo': ''
                },
                paginate: {
                  total: 1
                }
              },
              total:3
            })
          }
        })
    },
    onShow() {
        this.getDetail(this.data.id)
    },
    addCart(e) {
        const goods = this.data.goods.item._id
        App.HttpService.addCartByUser(goods)
            .then(res => {
                const data = res.data
                console.log(data)
                if (data.meta.code == 0) {
                    this.showToast(data.meta.message)
                }
            })
    },
    previewImage(e) {
        const urls = this.data.goods && this.data.goods.item.images.map(n => n.path)
        const index = e.currentTarget.dataset.index
        const current = urls[Number(index)]

        App.WxService.previewImage({
            current: current,
            urls: urls,
        })
    },
    showToast(message) {
        App.WxService.showToast({
            title: message,
            icon: 'success',
            duration: 1500,
        })
    },
    getDetail(id) {
        // App.HttpService.getDetail(id)
        var self = this
      wx.request({
        url: reqCombineDetailUrl + '/' + id,
        data: {},//请求参数，若请求接口无需参数则为空
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (result) {
          wx.showToast({
            title: 'loading',
            icon: 'loading',
            mask: true,
            duration: 10
          })
          if (result.data) {
            console.log(result.data)
            self.setData({
              goods: {
                items: result.data,
                paginate: {
                  total: result.data.length
                }
              },
              total: result.data.images.length
            })
          }
        },

        fail: function ({ errMsg }) {
          console.log('request fail, set default data')
          self.setData({
            goods: {
              items: {
                'content': '透镜/安定器/总成',
                'id': 1,
                'thumbUrl': 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG',
                'images': ['https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=742403562,3167647441&fm=173&s=0910EC121AFC7FAF672870C30300A0A1&w=640&h=397&img.JPEG'],
                'name': '欧司朗海拉5套装',
                'params': '36W',
                'price': 1400,
                'memo': ''
              },
              paginate: {
                total: 1
              }
            },
            total:3
          })
        }
      })
    },
    getGoodsByType(url) {
        var self = this
        wx.request({
            url: url,
            data: {},//请求参数，若请求接口无需参数则为空
            method: "POST",
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