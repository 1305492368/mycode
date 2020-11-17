// pages/detail/detail.js
// 导入英雄数据
import detailList from '../../utils/lol_details_duowan.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    // 英雄的数据源
    detailList: detailList,
    // 当前的英雄
    currentHero: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收 id
    // this.setData({
    //   id: options.id
    // })
    // 根据 id 得到对应的对象
    detailList.forEach(item => {
      if (item.id == options.id) {
        this.setData({
          currentHero: item
        })
      } 
    })
    // 动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: this.data.currentHero.title + '-' + this.data.currentHero.name,
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