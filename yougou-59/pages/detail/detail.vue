<template>
	<view class="detail">
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<block v-for="(item, index) in goodsDetail.pics" :key="index">
				<swiper-item @click="prevImg(index)">
					<image class="img" :src="item.pics_big" mode=""></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods">
			<view class="price">
				￥{{ goodsDetail.goods_price }}
			</view>
			<view class="msg">
				<view class="m-left">
					{{ goodsDetail.goods_name }}
				</view>
				<view class="m-center">
				</view>
				<view class="m-right">
					<text class="iconfont icon-starmarkhighligh"></text>
					分享
					<button class="mybtn" open-type="share">分享</button>
				</view>
			</view>
			<view class="pass">
				快递：免运费
			</view>
		</view>
		<!-- 物流信息 -->
		<view class="passmsg">
			<view class="p-item">
				<text>促销</text><text class="colorRed">满300减30</text>
			</view>
			<view class="p-item">
				<text>已选</text><text class="colorHui">黑马/s/1件</text>
			</view>
		</view>
		<view class="address">
			<text>送至</text><text class="colorHui">广东省广州市海珠区</text>
		</view>
		<!-- 其它说明 -->
		<view class="other">
			<view class="o-head">
				<view class="item" :class="{active: currentIndex === 0}" @click="currentIndex = 0">
					图文介绍
				</view>
				<view class="item" :class="{active: currentIndex === 1}" @click="currentIndex = 1">
					规格参数
				</view>
			</view>
			<view class="o-content">
				<view class="c-one" v-if="currentIndex === 0">
					<!-- <view v-html="goodsDetail.goods_introduce"></view> -->
					<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
				</view>
				<view class="c-two" v-if="currentIndex === 1">
					<view class="box">
						<view class="item" v-for="(item, index) in goodsDetail.attrs" :key="index">
							<view class="left">
								{{ item.attr_name }}
							</view>
							<view class="right">
								{{ item.attr_value }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 立即购买 -->
		<view class="bottom">
			<view class="b-item1">
				<text class="iconfont icon-lianxikefu"></text>
				联系客服
				<button class="contact" open-type="contact">客服</button>
			</view>
			<view class="b-item1" @click="toCart">
				<text class="iconfont icon-cart"></text>
				购物车
			</view>
			<!-- 对象的方式 -->
			<!-- <view @click="addToCart" class="b-item2 bgc1"> -->
			<!-- 数组的方式 -->
			<view @click="addToCart2" class="b-item2 bgc1">
				加入购物车
			</view>
			<view class="b-item2 bgc2">
				立即购买
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				// 商品 id
				goodsid: '',
				// 商品详情
				goodsDetail: {},
				// 购物车中的原始数据：以对象的方式
				cartList: {},
				// 购物车中的原始数据：以数组的方式
				cartList2: []
			}
		},
		onLoad(options) {
			// 保存商品 id
			this.goodsid = options.goodsid
			// 根据商品 id 得到商品详情
			this.getGoodsDetail()
			// 打开页面时得到原始的购物车中的数据
			// this.cartList = uni.getStorageSync('cart') || {}
			this.cartList2 = uni.getStorageSync('cart2') || []
		},
		// 分享方法
		onShareAppMessage() {
			return {
				title: this.goodsDetail.goods_name,
				imageUrl: this.goodsDetail.pics[0].pics_big
			}
		},
		methods: {
			// 添加到购物车中，：以数组的方式
			addToCart2() {
				// 判断：商品是否已经存在
				var index = this.cartList2.findIndex(item => {
					return item.goods_id === this.goodsid
				})
				if (index === -1) {
					this.cartList2.unshift({
						goods_id: this.goodsid,
						goods_check: true,
						goods_num: 1
					})
				} else {
					var oldObj = this.cartList2[index]
					oldObj.goods_num += 1
					// 将老的元素从原位置删除，添加到第一个位置
					this.cartList2.splice(index, 1)
					this.cartList2.unshift(oldObj)
				}
				// 保存到 storeage 中
				uni.setStorageSync('cart2', this.cartList2)
				uni.showToast({
					title: '添加成功'
				})
			},
			// 添加到购物车中：以对象的方法
			addToCart() {
				// 添加一个新的对象： 商品 id 商品状态 商品数量
				// 判断 id 对应的数据在 cartList 中是否存在
				if (this.cartList[this.goodsid]) {
					// 存在：num + 1
					this.cartList[this.goodsid].goods_num += 1
				} else {
					// 不存在：添加
					this.cartList[this.goodsid] = {
						goods_id: this.goodsid,
						goods_check: true,
						goods_num: 1
					}
				}
				// 把商品信息保存到 storeage 中
				uni.setStorageSync('cart', this.cartList)
				uni.showToast({
					title: '添加商品成功'
				})
			},
			// 跳转到购物车中
			toCart() {
				// 跳转到购物车中
				uni.switchTab({
					url: '/pages/car/car'
				})
			},
			// 点击轮播图进入预览
			prevImg(index) {
				// 得到所有的轮播图片
				var urls = this.goodsDetail.pics.map(item => {
					return item.pics_big
				})
				// 预览图片
				uni.previewImage({
					urls: urls,
					current: index
				})
			},
			// 得到商品详情
			async getGoodsDetail() {
				const res = await this.$http({
					url: `https://www.uinav.com/api/public/v1/goods/detail?goods_id=${this.goodsid}`
				})
				this.goodsDetail = res
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f4f4f4;
	}

	.colorRed {
		color: #ff4055;
	}

	.colorHui {
		color: #9ea3b0;
	}

	.bgc1 {
		background-color: #ffb400;
	}

	.bgc2 {
		background-color: #ff2d4a;
	}

	.detail {
		padding-bottom: 400rpx;

		.swiper {
			width: 100%;
			height: 720rpx;

			.img {
				width: 100%;
				height: 720rpx;
			}
		}

		.goods {
			padding: 40rpx 20rpx;
			background-color: #fff;
			overflow: hidden;

			.price {
				font-size: 30px;
				color: #eb4450;
			}

			.msg {
				margin-top: 40rpx;
				display: flex;
				align-items: center;

				.m-left {
					flex: 1;
					padding-right: 80rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.m-center {
					width: 2rpx;
					height: 80rpx;
					background-color: red;
				}

				.m-right {
					width: 160rpx;
					display: flex;
					flex-direction: column;
					text-align: center;
					position: relative;

					.mybtn {
						width: 160rpx;
						height: 80rpx;
						position: absolute;
						top: 0;
						left: 0;
						opacity: 0;
					}
				}
			}

			.pass {
				margin-top: 40rpx;
				color: #a3a3a3;
				font-size: 14px;
			}
		}

		.passmsg {
			background-color: #fff;
			margin-top: 20rpx;
			padding: 0 20rpx;

			.p-item {
				line-height: 96rpx;

				text:nth-child(1) {
					margin-right: 40rpx;
				}
			}
		}

		.address {
			padding: 0 20rpx;
			background-color: #fff;
			margin-top: 20rpx;
			line-height: 96rpx;

			text {
				margin-right: 40rpx;
			}
		}

		.other {
			margin-top: 20rpx;
			padding: 0 20rpx;
			background-color: #fff;

			.o-head {
				display: flex;
				height: 100rpx;
				line-height: 90rpx;
				text-align: center;

				.item {
					flex: 1;
				}

				.active {
					color: #ff4055;
					border-bottom: 10rpx solid #ff4055;
				}
			}

			.o-content {
				.box {
					margin-top: 10rpx;
					border-top: 2px solid #ccc;
					border-left: 2px solid #ccc;

					.item {
						display: flex;

						.left,
						.right {
							flex: 1;
							border-right: 2px solid #ccc;
							border-bottom: 2px solid #ccc;
							line-height: 84rpx;
							text-align: center;
						}
					}
				}
			}
		}

		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #fff;
			display: flex;
			height: 96rpx;
			text-align: center;

			.b-item1 {
				display: flex;
				flex-direction: column;
				flex: 2;
				font-size: 14px;
				justify-content: center;
				position: relative;

				.contact {
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
				}
			}

			.b-item2 {
				flex: 3;
				line-height: 96rpx;
				color: #fff;
			}
		}
	}
</style>
