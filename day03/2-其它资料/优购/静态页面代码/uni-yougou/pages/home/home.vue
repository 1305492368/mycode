<template>
  <view>
    <view class="header">
    	<view class="inner">
    		<icon type="search" size="16">
    		</icon>
    		<text>搜索</text>
    	</view>
    </view>
    <!-- 轮播图 -->
    <swiper indicator-dots
            circular autoplay indicator-color="rgba(255,255,255,0.3)" indicator-active-color="#fff">
      <block v-for="(item,index) in 3" :key="index">
        <swiper-item>
          <image src="http://157.122.54.189:9090/pyg/banner1.png"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 导航 -->
    <view class="nav">
      <image v-for="(item, index) in 4"
           :key="index"
           src="http://157.122.54.189:9090/pyg/icon_index_nav_4@2x.png"
           alt=""></image>
    </view>
    <!-- 楼层 -->
    <view>
      <view class="floor"
          v-for="(floor, i) in 3"
          :key="i">
        <image src="http://157.122.54.189:9090/pyg/pic_floor01_title.png"
             alt=""></image>
        <view class="product_list">
          <image src="http://157.122.54.189:9090/pyg/pic_floor01_1@2x.png"
               alt=""></image>
          <view class="right">
               <image v-for="(item, index) in 4" 
                 :key="index"
                 src="http://157.122.54.189:9090/pyg/pic_floor01_2@2x.png"
                 alt=""></image>
           
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="less">
	
	.header {
	  height: 100rpx;
	  background-color: #eb4450;
	  padding: 20rpx 16rpx;
	  box-sizing: border-box;
	  .inner {
	    background-color: #fff;
	    border-radius: 4rpx;
	    height: 60rpx;
	    color: #bbb;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    icon {
	      margin: 6rpx 16rpx 0 0;
	    }
	  }
	}
swiper {
  height: 340rpx;
  image {
    width: 100%;
    height: 340rpx;
  }
}

.nav {
  display: flex;
  height: 194rpx;
  justify-content: space-around;
  align-items: center;
  image {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor {
  padding:20rpx 17rpx 0;
  > image {
    height: 88rpx;
    width: 100%;
  }
}

.product_list {
  display: flex;
  > image {
    width: 232rpx;
    height: 386rpx;
  }
  .right {
    flex:1;
    font-size: 0;
    > image {
      width: 232rpx;
      height: 188rpx;
      margin:0 0 10rpx 10rpx;
    }
  }
}
</style>