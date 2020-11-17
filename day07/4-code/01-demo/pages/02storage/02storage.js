// pages/02storage/02storage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 存入 storage
  savefn () {
    // 存：方式一：异步操作
    // wx.setStorage({
    //   data: {
    //     name: 'xjj',
    //     age: 18
    //   },
    //   key: 'obj',
    //   success () {
    //     console.log('存入成功')
    //   }
    // })
    // console.log('11111111')
    // 存：方式二：同步操作
    wx.setStorageSync('bf', {
      name: '彭于宴',
      age: 20
    })
  },
  getfn () {
    // 取：异步
    // wx.getStorage({
    //   key: 'bf',
    //   success (res) {
    //     console.log(res.data)
    //   }
    // })
    // 取：同步
    var value = wx.getStorageSync('bf')
    console.log(value)
  },
  delfn () {
    // 删：异步
    // wx.removeStorage({
    //   key: 'bf',
    //   success (res) {
    //     console.log(res)
    //   }
    // })
    // 删：同步
    wx.removeStorageSync('bf')
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