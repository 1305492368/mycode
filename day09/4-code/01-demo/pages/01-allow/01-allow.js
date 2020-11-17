// pages/01-allow/01-allow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 由于我们需要得到当前用户的地址，所以需要进行授权操作
  allow() {

    // 开启授权
    wx.authorize({
      scope: 'scope.address',
      success: res => {
        // 得到用户的地址
        wx.chooseAddress({
          success: (result) => {
            console.log(result)
          }
        })
      }
    })
  },
  // 得到当前用户的信息
  getUserInfo (e) {
    console.log(e)
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

  }
})