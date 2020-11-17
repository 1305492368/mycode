<template>
	<!-- 搜索热区 -->
	<view class="search-link" @click="toSearch">
		<view class="inner">
			<icon type="search" size="16" color="#bbb" />
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		// 跳转搜索页面
		toSearch() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		}
	}
};
</script>

<style scoped lang="less">
.search-link {
	height: 100rpx;
	background-color: #eb4450;
	padding: 20rpx 16rpx;
	box-sizing: border-box;
	.inner {
		height: 60rpx;
		background-color: #fff;
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		icon {
			margin-top: 4rpx;
		}
		text {
			color: #bbb;
			margin-left: 16rpx;
		}
	}
}
</style>
