//index.js
const reqBannerListUrl = require('../../common/config').reqBannerListUrl
const reqNavListUrl = require('../../common/config').reqNavListUrl
const reqCombineListUrl = require('../../common/config').reqCombineListUrl
const duration = 2000

//获取应用实例
const App = getApp()
Page({
    data: {
        activeIndex: 0,
        bannerList: [],
        navList: [],
        goods: {
            items: [],
            paginate: {
                total: {}
            }
        },
        prompt: {
            hidden: !0,
        },
        interval: 5000,
        duration: 1000,
        indicatorDots: !0,
        autoplay: !1,
        current: 0,
        circular: !0
    },

    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    onLoad: function () {
        console.log('onLoad')
        this.getBanners()
        this.getNavList()
        this.getCombineList()
    },

    //获取轮播图列表
    getBanners() {
        var self = this
        self.setData({
            bannerList: []
        })
        wx.request({
            url: reqBannerListUrl,
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
                        bannerList: result.data
                    })
                }
            },
            fail: function ({ errMsg }) {
                console.log('request fail, set default data')
                self.setData({
                    bannerList:[
                        {
                            'id':1,
                            'thumbUrl':'image/banner/banner2.png'
                        },
                        {
                            'id': 2,
                            'thumbUrl': 'image/banner/banner3.png'
                        }
                    ]
                })
            }
        })
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
                    navList:[
                        {
                            'navId':1,
                            'navName':'默认显示全部套餐',
                            'navShortName':'全部'
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
                            total:1
                        }
                    }
                })
            }
        })
    },
    navigateTo(e) {
        console.info("进来了")
        App.WxService.navigateTo('../combine/detail/combineDetail', {
            id: e.currentTarget.dataset.id
        })

    },
    search() {
        App.WxService.navigateTo('/pages/index/index')
    },

    getClassify() {
        const activeIndex = this.data.activeIndex

        // App.HttpService.getClassify({
        //     page: 1, 
        //     limit: 4, 
        // })
        this.classify.queryAsync({
            page: 1,
            limit: 4,
        }).then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                this.setData({
                    navList: data.data.items,
                    'goods.params.type': data.data.items[activeIndex].id
                })
                this.onPullDownRefresh()
            }
        })
    },

    onPullDownRefresh() {
        console.log('onPullDownRefresh')
        this.initData()
    },
    onReachBottom() {
        console.log('onReachBottom')
        if (!this.data.goods.paginate.hasNext) return
    },
    onTapTag(e) {
        const type = e.currentTarget.dataset.type
        const index = e.currentTarget.dataset.index
        const url = reqCombineListUrl+"/"+type
        console.log("请求url:",url)
        this.getGoodsByType(url),
        this.setData({
            activeIndex: index,
        })
    },
    getGoodsByType(url){
        var self = this
        wx.request({
            url: url,
            data: {},//请求参数，若请求接口无需参数则为空
            method: 'POST',
            header: {
              'content-type':'application/json'
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
                }else{
                    self.setData({
                        prompt: {
                            hidden: 0,
                        },
                    })
                }
            },
            fail: function(){
                self.setData({
                    prompt: {
                        hidden: 0,
                    },
                })
            }
        })
    }
})
