// pages/05pagescroll/05pagescroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [1,2,2,3,3,4,5,6,76,8,9,1,1,1,1,1,1,14,56,6,87]
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
  // 页面滚动时会触发的事件
  onPageScroll(scroll) {
    console.log('onPageScroll')
    // scroll 当前页面滚动的距离
    console.log(scroll)
    // 需求：判断页面是否滚动了
    if (scroll.scrollTop === 0) {
      console.log('没有滚动')
    } else {
      console.log('滚动了')
    }
  }
})