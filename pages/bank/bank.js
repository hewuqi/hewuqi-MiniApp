const app = getApp()
const serverUrl = app.globalData.serverUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNo: "",
    resp: {},
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
  
  //CI输入框的值改变
  onCardNoFieldChange: function (e) {
    this.setData({
      cardNo: e.detail.detail.value
    });
    
  },

  //ip查询
  ipSearch: function(e) {
    var _this = this
    wx.showLoading({
      title: '正在查询，请稍后',
    })
    wx.request({
      url: serverUrl + "/freeController/bankCardSearch?cardNo=" + _this.data.cardNo,
      success: function (res) {
        var data = res.data
        if (data["code"] == "200") {
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