// pages/compare/index.js
//index.js
//获取应用实例
const app = getApp()
const qiniuUploader = require("../../utils/qiniuUploader")
const base64 = require("../../utils/base64.js")
const accessKey = "kMXZldZ8vQ4WFw2Oujn0d9QAAUJtyVBgBmVNmEM_"
const secretKey = "R9Usc3pOZQWRMorEVVxZ6lTe0W0y1odojVF_iDWn"
//const serverUrl = "https://127.0.0.1"
const serverUrl = app.globalData.serverUrl

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    comparePic1:'',
    comparePic2: '',
    imageURL_1: '',
    imageURL_2: '',
    compareResult: ''

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        comparePic1: app.globalData.userInfo.avatarUrl,
        comparePic2: app.globalData.userInfo.avatarUrl,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  uploadPic1: function (e) {
    var _this = this
    var tempFile = ''
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        tempFile = tempFilePaths[0]
        _this.uploadToQiniu(1, tempFile)
        _this.setPic(1, tempFile)
        wx.showLoading({
          title: '正在保存人脸1',
        })
      }
    })
  },

  uploadPic2: function (e) {
    var _this = this
    var tempFile = ''
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        tempFile = tempFilePaths[0]
        _this.uploadToQiniu(2, tempFile)
        _this.setPic(2, tempFile)
        wx.showLoading({
          title: '正在保存人脸2',
        })
      }
    })
  },

  setPic: function(index, path) {
    switch (index){
      case 1:
        this.setData({
          comparePic1: path
        })
        break
      case 2:
        this.setData({
          comparePic2: path
        })
        break
    }
  },

  getCompareResult: function (e) {
    var _this = this
    wx.showLoading({
      title: '正在比对,请稍后',
    })
    wx.request({
      url: serverUrl + '/compare/getCompareResult',
      method: 'POST',
      data: {
        'appid': '1251925447',
        'urlA': _this.data.imageURL_1,
        'urlB': _this.data.imageURL_2
      },
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + e
      },
      success: function (res) {
        //console.log(res)
        var data = res.data
        if(data["code"] == "200") {
          var similarity = data["data"]["similarity"];
          _this.setData({
            'compareResult': similarity + "%"
          })
        }else {
          _this.setData({
            'compareResult': "比对失败"
          })
        }
        wx.hideLoading()
      },
      error: function (res) {
        var data = res.data
        wx.hideLoading()
      },
      complete: function (res) {
        var data = res.data
        wx.hideLoading()
      }
    })
  },

  

  uploadToQiniu: function (index, filePath) {  
    var _this = this
    qiniuUploader.upload(filePath, (res) => {
      if (index == 1){
        _this.setData({
          'imageURL_1': res.imageURL,
        })
      }else {
        _this.setData({
          'imageURL_2': res.imageURL,
        })
      }
      
      wx.hideLoading();
    }, (error) => {
      wx.hideLoading()
      //console.log('error: ' + error);
    }, {
        region: 'ECN',
        domain: 'p8ocpvt3n.bkt.clouddn.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
        uptoken: this.genUpToken, // 由其他程序生成七牛 uptoken
        uptokenURL: serverUrl + '/compare/getUpToken', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
        uptokenFunc: function () { return uptoken }
      }, (res) => {
        //console.log('上传进度', res.progress)
        //console.log('已经上传的数据长度', res.totalBytesSent)
        //console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      });
  }
})

  
