const app = getApp()
const serverUrl = app.globalData.serverUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: "115.29.33.118",
    style:{
      marginTop: "0rpx"
    },
    resp: {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  
  //focus on field
  onIpFieldFoucs: function(e) {
    this.setData({
      style: {
        "marginTop": "0rpx"
      }
    });
  },

  //输入框的值改变
  onIpFieldChange: function(e) {
    this.setData({
      ip: e.detail.detail.value
    });
  },

  //ip查询
  ipSearch: function(e) {
    var _this = this
    var ip =  e.currentTarget.dataset['ip']
    this.setData({
      style: {
        "marginTop": "0rpx"
      }
    });
    wx.showLoading({
      title: '正在查询，请稍后',
    })
    wx.request({
      url: serverUrl + "/freeController/ipSearch?ip=" + this.data.ip,
      success: function (res) {
        //console.log(res)
        var data = res.data
        if (data["code"] == "200") {
          console.log(data)
          _this.setData({
            resp: data.data
          })
        } else {
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
  }
})