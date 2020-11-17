// pages/01-swiper/01-swiper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 每个元素对应的背景颜色
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    myname: '',
    myage: ''
  },

  /**
   * 生命周期函数--监听页面加载 // 相当于 vue 中的 created
   */
  onLoad: function (options) {
    // options: 可以用来接收传入的参数
    console.log(options)
    this.setData({
      myname: options.name,
      myage: options.age
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