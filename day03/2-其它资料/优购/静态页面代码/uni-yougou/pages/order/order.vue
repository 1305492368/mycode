<template>
	<view class="container">
		<view class="header">
			<view>
				<view class="active">全部</view>
				<view class="active">待付款</view>
				<view class="active">待收货</view>
				<view class="active">退款/退货</view>
			</view>
		</view>

		<view class="content">
			<view>
				<view>
					<view class="goods-info">
						<image src="https://api.zbztb.cn/full/b0fef388cd035694eac75d7b53e4a1eebf041cf3.jpg" alt="" />
						<view class="right">
							<view>asfafaf</view>
							<view class="price-num" <text class="price">￥1000</text>
								<text class="num">x10</text>
							</view>
						</view>
					</view>
					<view class="total-price">
						共2件商品 总计：&yen;1000(含运费0.00)
					</view>
					<view class="order">
						<text>订单号:xxx</text>
						<button type="primary">
							支付
						</button>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<style lang="less">
	.container {
		background-color: #f4f4f4;
	}

	.header {
		background-color: #fff;

		view {
			display: flex;
			align-items: center;

			view {
				flex: 1;
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
				box-sizing: border-box;

				&.active {
					border-bottom: 12rpx solid #eb4450;
				}
			}
		}
	}

	.content {
		view {
			background-color: #fff;
			margin-top: 30rpx;
			padding: 0 20rpx;

			.goods-info {
				height: 260rpx;
				border-bottom: 1rpx solid #ddd;
				display: flex;
				align-items: center;

				image {
					width: 200rpx;
					height: 200rpx;
					margin-right: 26rpx;
					flex-shrink: 0;
				}

				.right {
					view {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2; // 控制多行的行数
						-webkit-box-orient: vertical;
					}

					.price-num {
						margin-top: 84rpx;
						display: flex;
						justify-content: space-between;

						.price {
							color: #eb4450;
						}
					}
				}
			}

			.total-price {
				height: 90rpx;
				line-height: 90rpx;
				border-bottom: 1rpx solid #ddd;
				text-align: right;
				color: #999;
			}

			.order {
				height: 88rpx;
				color: #999;
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					flex: 1;
					font-size: 14px;
				}

				button {
					width: 160rpx;
					height: 60rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
