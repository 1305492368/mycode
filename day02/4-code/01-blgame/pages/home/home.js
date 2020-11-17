// 导入英雄数据
import heroList from '../../utils/heroList.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heroList: heroList
  },
  toDetail (e) {
    // 判断数据是否存在
    var name = e.currentTarget.dataset.name
    var icon = e.currentTarget.dataset.icon
    var skill = e.currentTarget.dataset.skill
    wx.navigateTo({
      url: `/pages/detail/detail?name=${name}&img=${icon}&skill=${skill}`,
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