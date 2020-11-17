// pages/04-eventdata/04-eventdata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [
      { id: 1, name: '追命' },
      { id: 2, name: '铁手' },
      { id: 3, name: '无情' },
      { id: 4, name: '冷血' }
    ]
  },
  // 点击之后显示当前被点击元素中的内容
  // e：事件对象
  showname (e) {
    console.log('内容')
    wx.showToast({
      title: e.currentTarget.dataset.myname
    })
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