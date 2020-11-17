<template>
	<view>
		<view class="header">
			<view class="inner">
				<icon type="search" size="16">
				</icon>
				<text>搜索</text>
			</view>
		</view>
		<view class="content">
			<view class="left">
				<view class="active">大家电</view>
				<view v-for="item in 20">大家电</view>
			</view>
			<view class="right">
				<image src="/static/images/titleImage.png" />
				<view>
					<view class="cate2" v-for="(cate2, index2) in 4" :key="index2">
						<view class="title">/<text>彩电</text>/</view>
						<view>
							<view class="cate3" v-for="(cate3, index3) in 16" :key="index3">
								<image src="http://157.122.54.189:9090/full/e2459762678fe83b75b10dab705d9be2570d014c.jpg" alt=""/>
								<text>小米手机</text>
							</view>
						</view>
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

	.content {
		display: flex;
		position: absolute;
		top: 100rpx;
		// left:0;
		// right:0;
		width: 100%;
		bottom: 0;

		.left {
			width: 198rpx;
			overflow: scroll;

			view {
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				border: 1rpx solid #eee;
				box-sizing: border-box;
				background-color: #f4f4f4;

				&.active {
					color: #eb4450;
					background-color: #fff;
					position: relative;

					&::before {
						position: absolute;
						content: "";
						width: 8rpx;
						height: 60rpx;
						background-color: #eb4450;
						left: 0;
						top: 20rpx;
					}
				}
			}
		}

		.right {
			flex: 1;
		}
	}

	.right {
		padding: 20rpx 16rpx 0;
		overflow: scroll;

		image {
			width: 520rpx;
			height: 180rpx;
		}

		.title {
			height: 110rpx;
			line-height: 110rpx;
			color: #e0e0e0;
			display: flex;
			justify-content: center;

			text {
				margin: 0 30rpx;
				color: #333;
			}
		}
	}

	.cate2 {
		view {
			display: flex;
			flex-wrap: wrap;
		}
	}

	.cate3 {
		width: 33.33%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;

		image {
			width: 120rpx;
			height: 120rpx;
		}
	}
</style>
