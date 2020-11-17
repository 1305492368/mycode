<template>
	<view class="content">
		<view class="title">
			<text class="iconfont icon-shop"></text>
			<text>优购生活馆</text>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in 3" :key="index">
				<text class="iconfont icon-checked"></text>
				<image src="http://image1.suning.cn/uimg/b2c/newcatentries/0070134290-000000000149003877_1_400x400.jpg" alt="" />
				<view class="right">
					<text class="text-line2">spike 经典武士大马士革直刀(微型) 户外野营直刀 收藏礼品刀 饰品刀具</text>
					<view class="btm">
						<text class="price">
							￥
							<text>100</text>
							.00
						</text>
						<view class="goods-num">
							<button>-</button>
							<text>100</text>
							<button>+</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="account">
			<view class="select-all">
				<text class="iconfont icon-unchecked"></text>
				<text>全选</text>
			</view>
			<view class="price-wrapper">
				<view class="price">
					<view>
						合计:
						<text class="num">￥100.00</text>
					</view>
					<text class="info">包含运费</text>
				</view>
			</view>
			<view class="account-btn">结算(3)</view>
		</view>
	</view>
</template>

<style lang="less">
.iconfont {
	font-size: 44rpx;
}

.title {
	height: 88rpx;
	display: flex;
	align-items: center;

	.iconfont {
		color: #999;
		margin: 6rpx 12rpx 0 32rpx;
	}
}

.goods-item {
	height: 206rpx;
	background-color: #fff;
	border-top: 1rpx solid #ddd;
	display: flex;
	box-sizing: border-box;
	align-items: center;

	.iconfont {
		color: #eb4450;
		margin: 0 30rpx;
	}

	image {
		width: 160rpx;
		height: 160rpx;
	}

	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin: 0 20rpx 0 18rpx;

		.btm {
			display: flex;
			margin-top: 40rpx;
			justify-content: space-between;

			.price {
				color: #eb4450;
				display: flex;

				> text {
					font-size: 24px;
				}
			}

			.goods-num {
				display: flex;
				align-items: center;

				button {
					width: 60rpx;
					height: 50rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 4rpx solid #666;
				}

				text {
					margin: 0 30rpx;
				}
			}
		}
	}
}

.goods-list {
	position: absolute;
	bottom: 98rpx;
	top: 88rpx;
	width: 100%;
	overflow: auto;
	padding-bottom: 60rpx;
	background-color: #f4f4f4;
}

.account {
	height: 98rpx;
	border-bottom: 1rpx solid #ddd;
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	align-items: center;

	.iconfont {
		color: #eb4450;
		margin: 0 30rpx;
	}

	.account-btn {
		width: 230rpx;
		height: 98rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		background-color: #eb4450;
	}

	.select-all {
		flex: 1;
		display: flex;
		align-items: center;
		.price-wrapper {
			display: flex;
			flex: 1;
			justify-content: flex-end;
			align-items: center;
		}
	}

	.price {
		margin-right: 20rpx;

		.num {
			color: #eb4450;
		}

		.info {
			color: #999;
		}
	}
}
</style>
