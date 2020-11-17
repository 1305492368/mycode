<template>
	<view class="search">
		<view class="s-box" @click="toSearch">
			<icon type="search" size="14"></icon> 搜索
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toSearch () {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	// scoped： 让这个 style 中的样式只在当前组件中起作用
	//	原理：
	//		1.0 设置过 scoped 组件，会给组件中的每个元素添加一个单独的类名： data-v-xxxx
	//		2.0 将 style 中所有的样式也添加上这个类名
	.search {
		height: 60rpx;
		padding: 20rpx 16rpx;
		background-color: #eb4450;

		.s-box {
			width: 100%;
			height: 60rpx;
			background-color: #fff;
			color: #999;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			border-radius: 8rpx;

			icon {
				margin-right: 10rpx;
			}
		}
	}
</style>
