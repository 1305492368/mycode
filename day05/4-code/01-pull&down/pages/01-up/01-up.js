// pages/01-up/01-up.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newArr = []
    for(var i = 0; i < 20; i++){
      newArr.push(i)
    }
    this.setData({
      arr: newArr
    })
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
    // 更新数据，重新将 arr 设置为 20
    var newArr = []
    for(var i = 0; i < 20; i++){
      newArr.push(i)
    }
    this.setData({
      arr: newArr
    })
    // 关闭下拉背景
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
    // 判断：如果数组的长度大于 50,就不再执行
    if (this.data.arr.length >= 50) {
      return
    }
    // 每次执行给 arr 中添加 10 条数据
    var newArr = []
    for(var i = 0 ; i < 10 ;i ++) {
      newArr.push(i)
    }
    // 将 10 条数据追加到 arr 中
    this.setData({
      arr: [...this.data.arr, ...newArr]
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})