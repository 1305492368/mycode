<template>
  <view class="search-hotspot">
    <view>
      <icon type="search"
            size="18"
            color="#bbb">
      </icon>搜索
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less">
.search-hotspot {
  height: 100rpx;
  padding: 20rpx 16rpx;
  background-color: #eb4450;
  box-sizing: border-box;
  font-size: 14px;
  > view {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60rpx;
    border-radius: 4rpx;
    color: #bbb;
    icon {
      margin: 8rpx 16rpx 0 0;
    }
  }
}
</style>