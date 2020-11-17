// pages/03pagelife/03pagelife.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 跳转到 tab 页面
  //  注意点：navigateTo 不能跳转到 tabBar 页面
  //         如果要跳转请求认准： switchTab()
  to04tab1 () {
    wx.switchTab({
      url: '/pages/04tab1/04tab1',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('page-onLoad')
    // options：可以接收传递过来的参数
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('page-onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('page-onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('page-hide')
  },

  /**
   * 生命周期函数--监听页面卸载:等我们讲完页面栈再回来分析
   */
  onUnload: function () {
    console.log('onUnload')
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