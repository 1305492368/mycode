<template>
  <view class="container">
    <view class="header">
      <view class="portrait-wrapper">
        <view class="portrait">
          <image src="http://www.sucaijishi.com/uploadfile/2018/0508/20180508023717621.png"
               alt=""/>
        </view>
      </view>
      <view>荞叶</view>
      <view>登录</view>
    </view>
    <!-- 主要内容部分 -->
    <view class="content">
      <view class="favo">
        <view>
          <text class="num">0</text>
          <text>收藏的店铺</text>
        </view>
        <view>
          <text class="num">0</text>
          <text>收藏的商品</text>
        </view>
        <view>
          <text class="num">0</text>
          <text>关注的商品</text>
        </view>
        <view>
          <text class="num">0</text>
          <text>我的足迹</text>
        </view>
      </view>
      <view class="order-detail">
        <view class="title">我的订单</view>
        <view>
          <view>
            <text class="iconfont"></text>
            <text>待付款</text>
          </view>
					<view>
					  <text class="iconfont"></text>
					  <text>待收货</text>
					</view>
					<view>
					  <text class="iconfont"></text>
					  <text>退款/退货</text>
					</view>
					<view>
					  <text class="iconfont"></text>
					  <text>全部订单</text>
					</view>
        </view>
      </view>
      <view class="address">
        <view>收货地址管理</view>
      </view>

      <view class="others">
        <view>
          <view>
            <text>联系客服</text>
            <text class="right">400-618-4000</text>
          </view>
          <view>
            <text>意见反馈</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="less">
.iconfont{
  font-size: 40rpx;
}
.container {
  background-color: #f4f4f4;
  padding-bottom: 40rpx;
  font-size: 14px;
}
.header {
  height: 410rpx;
  background-color: #eb4450;
  padding-top: 110rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  .portrait {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 68rpx;
    image {
      width: 130rpx;
      height: 130rpx;
      border-radius: 50%;
    }
  }
  view {
    color: #fff;
    margin-top: 20rpx;
  }
}
.content {
  margin: -28rpx 18rpx 0;
  color: #333;
  .favo {
    display: flex;
    color: #666;
    background-color: #fff;
    height: 120rpx;
    padding: 0 32rpx;
    align-items: center;
    justify-content: space-evenly;

    view {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .num {
      color: #999;
      margin-bottom: 4rpx;
    }
  }
  .order-detail {
    margin-top: 20rpx;
    background-color: #fff;
    .title {
      height: 88rpx;
      line-height: 88rpx;
      padding-left: 30rpx;
      border-bottom: 1rpx solid #ddd;
      font-size: 20px;
			justify-content: flex-start;
    }
    view {
      display: flex;
      justify-content: space-evenly;
      height: 166rpx;
      align-items: center;
      view {
        display: flex;
        flex-direction: column;
        align-items: center;
        .iconfont {
          color: #eb4450;
          margin-bottom: 20rpx;
          font-size: 48rpx;
        }
      }
    }
  }
  .address {
    margin-top: 20rpx;
    background-color: #fff;
    padding-left: 30rpx;
    height: 88rpx;
    line-height: 88rpx;
  }
  .others {
    margin-top: 20rpx;
    background-color: #fff;
    view {
      view {
        height: 86rpx;
        line-height: 86rpx;
        border-bottom: 1rpx solid #ddd;
        margin: 0 30rpx;
        display: flex;
        justify-content: space-between;
        .right {
          color: #999;
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
}
</style>