<template>
	<view>
		<!-- 头部 -->
		<view class="header">
			<icon type="search" size="16" color="#bbb">
			</icon>
			<input type="text" value="小米">
		</view>

		<!-- 过滤菜单 -->
		<view class="filter-menu">
			<view class="active" v-for="(item, index) in 3" :key="index">销量
			</view>
		</view>


		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods" v-for="(item, index) in 10" :key="index">
				<image src="http://image1.suning.cn/uimg/b2c/newcatentries/0070134290-000000000149003877_1_400x400.jpg" alt="">
					<view class="right">
						<view class="goods-name text-line2">spike 经典武士大马士革直刀(微型) 户外野营直刀 收藏礼品刀 饰品刀具</view>
						<view class="price">￥<text>100</text>.00</view>
					</view>
			</view>
		</view>
	</view>
</template>

<style lang="less">
	.header {
		height: 120rpx;
		padding: 30rpx 16rpx;
		box-sizing: border-box;
		background-color: #eee;
		position: relative;

		icon {
			position: absolute;
			top: 48rpx;
			left: 44rpx;
		}

		input {
			height: 60rpx;
			width: 100%;
			border-radius: 4rpx;
			background-color: #fff;
			padding-left: 80rpx;
			box-sizing: border-box;
		}
	}

	.top-header {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff;
	}

	.header {
		height: 120rpx;
		padding: 30rpx 16rpx;
		box-sizing: border-box;
		background-color: #eee;
		position: relative;

		icon {
			position: absolute;
			top: 48rpx;
			left: 44rpx;
		}

		input {
			height: 60rpx;
			width: 100%;
			border-radius: 4rpx;
			background-color: #fff;
			padding-left: 80rpx;
			box-sizing: border-box;
		}
	}

	.filter-menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;

		view.active {
			color: #EB4450;
		}
	}

	.goods {
		border-top: 1rpx solid #ddd;
		height: 260rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		display: flex;
		align-items: center;

		image {
			width: 200rpx;
			height: 200rpx;
		}

		.right {
			flex: 1;
			margin-left: 26rpx;

			.price {
				color: #eb4450;
				font-size: 24rpx;
				margin-top: 80rpx;

				text {
					font-size: 36rpx;
				}
			}
		}
	}

	.btm-line {
		text-align: center;
	}
</style>
