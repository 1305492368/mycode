// pages/04-this/04-this.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: 'red' // 小程序也是响应式：数据发生改变，视图也会跟着改变
    // 如果要小程序中 data 中的数据有响应式的特点千万不要直接修改属性：
    // 应用使用 this.setData 方法来进行修改
  },
  fn () {
    console.log('fn')
  },
  // 改变背景颜色
  changecolor () {
    // this.fn()
    // 点击之后需要修改背景颜色
    //  红色 --> 白色
    //  白色 --> 红色
    // 判断
    if (this.data.color == 'red') {
      // this.data.color=""
      this.setData({
        color: 'white'
      })
    } else {
      this.setData({
        color: 'red'
      })
    }
    console.log(this.data.color)
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