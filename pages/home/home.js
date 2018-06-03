const app = getApp()

Page({
  data: {
    menus:[
      {
        "page": "./../compare/index",
        "name": "人脸比对",
        "url": "./../../src/menu/compare.png"
      },
      {
        "page": "./../ip/ip",
        "name": "IP查询",
        "url": "./../../src/menu/ip.png"
      },
      {
        "page": "./../cell/cell",
        "name": "基站查询",
        "url": "./../../src/menu/station.png"
      },
      // {
      //   "name": "快递查询",
      //   "url": "./../../src/menu/express.png"
      // },
      // {
      //   "name": "车辆违章",
      //   "url": "./../../src/menu/weizhang.png"
      // },
      {
        "page": "./../bank/bank",
        "name": "银行卡查询",
        "url": "./../../src/menu/payCard.png"
      }
    ]
  },
  toCompareIndex: function (e) {
    var toUrl = e.currentTarget.dataset['url']
    wx.navigateTo({
      url: toUrl,
    })
  }
})
