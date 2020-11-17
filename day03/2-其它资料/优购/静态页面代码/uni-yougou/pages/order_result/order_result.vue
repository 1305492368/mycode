<template>
  <view>
    <button @click="toIndex">首页</button>
    <button @click="toOrderDetail" v-if="orderNumber">查看订单详情</button>
    <view>一些广告。。。</view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      orderNumber: ''
    }
  },
  onLoad (options) {
    this.orderNumber = options.orderNumber
    // 设置标题
    uni.setNavigationBarTitle({ title: this.orderNumber ? '支付失败' : '支付成功' })
  },
  methods: {
    toIndex () {
      // 跳转到首页
      uni.switchTab({ url: '/pages/home/main' })
    },
    toOrderDetail () {
    // 跳转订单详情，传递orderNubmer
      uni.navigateTo({ url: '/pages/order_detail/main?orderNumber=' + this.orderNumber })
    }
  }
}
</script>
<style>
</style>