<template>
	<view class="cart">
		<!-- 收货地址 -->
		<view class="address">
			<view class="msg">
				<view class="name">
					收货人： 苏
				</view>
				<view class="phone">
					1352345677 <text class="iconfont icon-enter"></text>
				</view>
			</view>
			<view class="positions">
				收货地址： 广东省广州市天河区珠吉路
			</view>
			<image class="myimg" src="../../static/cart_border@2x.png" mode=""></image>
		</view>
		<!-- 商品列表 -->
		<view class="goods">
			<view class="g-title">
				<text class="iconfont icon-haichuanyougou"></text>优购生活
			</view>
			<view class="g-list" v-for="(item, index) in goodsList" :key="index">
				<view class="check">
					<icon @click="changeCheck(item)" type="success" :color="item.goods_check ? 'red' : 'gray'"></icon>
				</view>
				<view class="itemmsg">
					<image @click="toDetail(item.goods_id)" :src="item.goods_small_logo" mode=""></image>
					<view class="word">
						<view class="top" @click="toDetail(item.goods_id)">
							{{ item.goods_name }}
						</view>
						<view class="bottom">
							<view class="price">
								<text>￥</text><text>{{ item.goods_price }}</text><text>.00</text>
							</view>
							<view class="calc">
								<mynum v-model="item.goods_num" :currentIndex="index" @lessone="lessone" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 全选区域 -->
		<view class="all">
			<view class="check">
				<icon @click="chageAll" type="success" :color="isall ? 'red': 'gray'"></icon>
			</view>
			<view class="checkall">
				全选
			</view>
			<view class="total">
				<view class="totalPrice">
					合计：<text>￥</text><text>{{ totalPrice }}</text><text>.00</text>
				</view>
				<text class="pass">包含运费</text>
			</view>
			<view class="pay" @click="pay">
				结算（{{ totalNum }}）
			</view>
		</view>
	</view>
</template>

<script>
	import mynum from '../../components/mynum.vue'
	export default {
		data() {
			return {
				// 购物车中的数据：数组
				cartList2: [],
				// 商品列表
				goodsList: []
			}
		},
		watch: {
			// 只要 goodsList 中的数据发生改变都会重新将数据保存到 storage 中
			goodsList: {
				// 改变时触发的函数
				handler() {
					// 得到数据源
					var newArr = this.goodsList.map(item => {
						return {
							goods_id: item.goods_id,
							goods_check: item.goods_check,
							goods_num: item.goods_num
						}
					})
					// 保存到 storage 中
					uni.setStorageSync('cart2', newArr)
				},
				// 开启深度监听
				deep: true
			}
		},
		computed: {
			// 设置全选的状态
			isall: {
				get() {
					return this.goodsList.every(item => {
						return item.goods_check
					})
				},
				set(value) {
					// 将所有商品的状态都设置为 value
					this.goodsList.forEach(item => {
						item.goods_check = value
					})
				}
			},
			// 选中商品的总数
			totalNum() {
				return this.goodsList.reduce((sum, item) => {
					return sum + (item.goods_check ? item.goods_num : 0)
				}, 0)
				// var sum = 0
				// this.goodsList.forEach(item => {
				// 	sum += (item.goods_check ? item.goods_num : 0)
				// })
				// return sum
			},
			totalPrice() {
				return this.goodsList.reduce((sum, item) => {
					return sum + item.goods_price * (item.goods_check ? item.goods_num : 0)
				}, 0)
				// var price = 0
				// this.goodsList.forEach(item => {
				// 	price += item.goods_price * (item.goods_check ? item.goods_num : 0)
				// })
				// return price 
			}
		},
		methods: {
			// 结算：
			pay() {
				// 判断 storage 中是否存在 token, 如果不存在跳转到登录页面
				var token = uni.getStorageSync('token')
				if (!token) {
					// 跳转到登录页面
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			// 改变全选的状态
			chageAll() {
				this.isall = !this.isall
			},
			// 当计算组件中的值小于 1 时会触发
			lessone(index) {
				// 提示
				uni.showModal({
					title: '提示',
					content: '是否删除当前商品',
					success: res => {
						if (res.confirm) {
							// 删除当前商品
							this.goodsList.splice(index, 1)
						} else {
							console.log('取消')
						}
					}
				})
			},
			// 跳转到详情页面
			toDetail(goodsid) {
				uni.navigateTo({
					url: `/pages/detail/detail?goodsid=${goodsid}`
				})
			},
			// 修改商品的状态
			changeCheck(item) {
				item.goods_check = !item.goods_check
			},
			// 得到所有的商品数据源
			async getAllCartList() {
				// 根据数据源得到所有的 id 集合
				var ids = this.cartList2.map(item => {
					return item.goods_id
				})
				var idStr = ids.join(',')
				// 判断： idStr是否为空
				if (idStr === '') {
					// 不需要继续请求
					return
				}
				// 发送请求到服务器得到所有的商品信息
				var res = await this.$http({
					url: `https://www.uinav.com/api/public/v1/goods/goodslist?goods_ids=${idStr}`
				})
				// 保存数据源
				this.goodsList = res
				// 将两个数组中的内容进行合并： cartList2 goodsList
				// 遍历 goodsList 再从 cartList2 中找到对应的元素，将元素中的属性添加到 goodsList 中
				this.goodsList = this.goodsList.map(item => {
					// 打得到 item.goods_id 在 cartList2 中对应的元素
					var obj = this.cartList2.find(subitem => {
						return subitem.goods_id == item.goods_id
					})
					// 将 item 与 obj 组合起来
					return { ...item,
						...obj
					}
				})
			}
		},
		onShow() {
			// 先得到购物车中的数据：storage 中
			this.cartList2 = uni.getStorageSync('cart2') || []
			// 得到商品的数据源
			this.getAllCartList()
		},
		components: {
			mynum
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f4f4f4;
	}

	.cart {
		margin-bottom: 120rpx;

		.address {
			background-color: #fff;

			.msg {
				padding: 20rpx 20rpx 0px;
				display: flex;
				justify-content: space-between;
				line-height: 86rpx;

				.phone {
					text {
						margin-left: 40rpx;
					}
				}
			}

			.positions {
				padding: 0rpx 20rpx 10px;
				line-height: 86rpx;
			}

			.myimg {
				width: 100%;
				height: 14rpx;
			}
		}

		.goods {
			background-color: #fff;
			margin-top: 20rpx;

			.g-title {
				height: 88rpx;
				line-height: 88rpx;
				padding-left: 34rpx;
				border-bottom: 2rpx solid #dddddd;
			}

			.g-list {
				display: flex;
				align-items: center;

				.check {
					width: 88rpx;
					text-align: center;
				}

				.itemmsg {
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					border-bottom: 1px solid #ddd;
					padding: 24rpx 0;

					image {
						width: 160rpx;
						height: 160rpx;
						margin-right: 24rpx;
					}

					.word {
						flex: 1;
						padding-right: 24rpx;

						.top {
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.bottom {
							display: flex;
							justify-content: space-between;
							margin-top: 30rpx;

							.price {
								color: red;

								text:nth-child(2) {
									font-size: 20px;
								}
							}
						}
					}
				}
			}
		}

		.all {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			display: flex;
			height: 98rpx;
			background-color: #fff;
			align-items: center;

			.check {
				width: 88rpx;
				text-align: center;
			}

			.checkall {
				flex: 2;
			}

			.total {
				flex: 3;

				.totalPrice {
					text {
						color: #eb4450;

						&:nth-child(1),
						&:nth-child(3) {
							font-size: 12px;
						}
					}
				}

				.pass {
					font-size: 12px;
					color: #a3a3a3;
				}
			}

			.pay {
				flex: 3;
				text-align: center;
				height: 98rpx;
				line-height: 98rpx;
				background-color: #eb4450;
				color: #fff;
			}
		}
	}
</style>
