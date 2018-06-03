const app = getApp()
const serverUrl = app.globalData.serverUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mnc: "0",
    lac: "",
    ci: "",
    index: 0,
    isps: ["移动", "联通", "电信"],
    resp: {},
    markers: []
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
  
  //listenPickerSelected
  listenPickerSelected: function(e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index)
    switch(this.data.index) {
      case "0":
        this.data.mnc = "0";
        break
      case "1":
        this.data.mnc = "1";
        break
      case "2":
        this.data.mnc = "11"
        break
    }
  },

  //LAC输入框的值改变
  onLacFieldChange: function(e) {
    this.setData({
      lac: e.detail.detail.value
    });
  },

  //CI输入框的值改变
  onCiFieldChange: function (e) {
    this.setData({
      ci: e.detail.detail.value
    });
    
  },

  //ip查询
  ipSearch: function(e) {
    var _this = this
    wx.showLoading({
      title: '正在查询，请稍后',
    })
    wx.request({
      url: serverUrl + "/freeController/cellSearch?mnc=" + this.data.mnc
          + "&lac=" + this.data.lac + "&ci=" + this.data.ci,
      success: function (res) {
        var data = res.data
        if (data["code"] == "200") {
          _this.setData({
            resp: data.data
          }),
          _this.setData({
            markers:[{
                iconPath: "./../../src/pic/location.png",
                id: 0,
                latitude: data.data.lat,
                longitude: data.data.lon,
                width: 48,
                height: 48
              }]
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