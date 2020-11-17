<template>
	<view>
		<view class="address-wrapper" @click="getAddr">
			<view class="address" v-if="addr.userName">
				<view class="receiver">
					<view class="name">收货人：{{ addr.userName }}</view>
					<view class="phone-num">{{ addr.telNumber }}</view>
					<text class="iconfont icon-arrow-right"></text>
				</view>
				<view class="address-txt">收货地址：{{ addr.provinceName + ' ' + addr.cityName + ' ' + addr.countyName + ' ' + addr.detailInfo }}</view>
			</view>
			<!-- 选择地址 -->
			<view class="choose-address" v-else>
				<view>请选择地址</view>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			<view class="flower"><image src="/static/images/cart_border@2x.png"></image></view>
		</view>

		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="toItem(item.goodsId)">
				<image :src="item.goods_small_logo" alt=""></image>
				<view class="right">
					<text class="text-line2">{{ item.goods_name }}</text>
					<view class="btm">
						<text class="price">
							￥
							<text>{{ item.goods_price }}</text>
							.00
						</text>
						<view class="goods-num">
							<text>{{ item.num }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-fixed" @click="wxPay">微信支付({{ totalPrice }}.00)</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addr: uni.getStorageSync('addr') || {},
			// 商品列表
			goodsList: []
		};
	},
	computed: {
		// 总价
		totalPrice() {
			// 选中的商品数量*商品价格之和
			return this.goodsList.reduce((sum, item) => {
				return sum + item.num * item.goods_price;
			}, 0);
		}
	},
	onLoad(options) {
		// 如果goodsId有值,表示立即购买，优先级比购物车跳转更高
		this.goodsId = parseInt(options.goodsId);

		if (this.goodsId) {
			// 构造一个和storage cart一样的结构
			this.cart = [
				{
					goodsId: this.goodsId,
					num: 1,
					checked: true
				}
			];
		} else {
			// 取storage cart里面每一项goodsId以,分隔
			this.cart = this.$store.state.cart;
			// 返回cart数组勾选的商品
			this.cart = this.cart.filter(item => {
				return item.checked;
			});
		}

		// 如果storage cart不为空的,才发请求
		if (this.cart.length) {
			this.queryGoodsList();
		}
	},
	methods: {
		wxPay() {
			// TODO 判断商品数量
			// 如果没有token,跳转登录
			// this.token = uni.getStorageSync('token');
			// if (!this.token) {
			// 	uni.navigateTo({
			// 		url: '/pages/login/login'
			// 	});
			// 	// 如果没有return的话,跳转后下边的逻辑继续执行
			// 	return;
			// }
			// 创建订单
			this.createOrder();
		},
		async createOrder() {
			let data = await this.$request({
				url: '/api/public/v1/my/orders/create',
				method: 'post',
				// header: {
				// 	Authorization: this.token
				// },
				isAuth: true,
				data: {
					order_price: this.totalPrice,
					consignee_addr: this.getConsigneeAddr(),
					goods: this.getFilterGoodsList()
				}
			});

			// 创建订单成功后把storage cart勾选的商品去掉,如果立即跳转过来的，没有必要
			// if(!this.goodsId){
			// 	this.arrangeCart();
			// }
			!this.goodsId && this.arrangeCart();

			// console.log(data)
			this.orderNo = data.order_number;
			this.doPay();
		},
		arrangeCart() {
			this.$store.commit('arrangeCart')
		},
		// 获取支付参数并唤起微信支付
		async doPay() {
			let data = await this.$request({
				url: '/api/public/v1/my/orders/req_unifiedorder',
				method: 'post',
				isAuth: true,
				data: {
					order_number: this.orderNo
				}
			});
			console.log(data);
			// 唤起微信支付
			uni.requestPayment({
				...data.pay,
				success: res => {
					uni.showToast({
						title: '支付成功'
					});
					uni.navigateTo({
						url:'/pages/order_result/order_result'
					})
				},
				fail: res => {
					uni.showToast({
						title: '支付失败'
					});
					uni.navigateTo({
						url:'/pages/order_result/order_result?orderNumber='+this.orderNo
					})
				},
			});
		},
		getFilterGoodsList() {
			return this.goodsList.map(item => {
				return {
					goods_id: item.goods_id,
					goods_number: item.num,
					goods_price: item.goods_price
				};
			});
		},
		getConsigneeAddr() {
			let { provinceName, cityName, countyName, detailInfo, userName, telNumber } = this.addr;
			return `${provinceName}${cityName}${countyName}${detailInfo} ${userName} ${telNumber}`;
		},
		// 请求商品列表
		async queryGoodsList() {
			// goodsId数组,然后join拼接字符串
			let idArr = this.cart.map(item => {
				return item.goodsId;
			});

			// 数组元素以逗号分隔
			let idStr = idArr.join(',');

			let _goodsList = await this.$request({
				url: '/api/public/v1/goods/goodslist?goods_ids=' + idStr
			});

			console.log(_goodsList, this.cart);

			// 在请求结束后，把两个数组合并，以cart为主
			this.goodsList = this.cart.map(item => {
				//在goodsList找一项goodsId为item.goodsId
				let targetGoods = _goodsList.find(goods => {
					return goods.goods_id === item.goodsId;
				});
				// 把cart 元素和在goodsList的goodsId相等的目标元素合并
				//对象可以用...展开运算
				// 对象的合并还是对象并不是数组，注意了
				return { ...item, ...targetGoods };
				// delete TODO
			});
		},
		// 授权获取通讯址
		getAddr() {
			// 发起授权
			uni.authorize({
				scope: 'scope.address',
				success: () => {
					// 允许
					// 调接口
					uni.chooseAddress({
						success: res => {
							console.log(res);
							this.addr = res;
							uni.setStorageSync('addr', res);
						}
					});
				},
				fail: () => {
					// 拒绝
					// 提示打开
					uni.showModal({
						title: '提示',
						content: '请在设置中允许通讯地址',
						success: res => {
							if (res.confirm) {
								uni.openSetting();
							}
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="less">
.address-wrapper {
	background-color: #fff;
}

.address {
	display: flex;
	flex-direction: column;
	padding: 44rpx 30rpx 48rpx 20rpx;
	.receiver {
		display: flex;
		justify-content: space-between;
		margin-bottom: 50rpx;
		position: relative;
		.phone-num {
			margin-right: 40rpx;
		}
		.icon-arrow-right {
			position: absolute;
			top: 8rpx;
			right: 0;
			color: #999;
		}
	}
}

.choose-address {
	display: flex;
	padding: 44rpx 30rpx 48rpx 20rpx;
	justify-content: space-between;
	.icon-arrow-right {
		color: #999;
	}
}

.flower {
	image {
		height: 16rpx;
		width: 100%;
		display: block;
	}
}

.goods-item {
	height: 206rpx;
	background-color: #fff;
	border-top: 1rpx solid #ddd;
	display: flex;
	box-sizing: border-box;
	align-items: center;
	image {
		width: 160rpx;
		height: 160rpx;
		margin-left: 30rpx;
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
	top: 243rpx;
	width: 100%;
	overflow: auto;
	padding-bottom: 60rpx;
	background-color: #f4f4f4;
}

.bottom-fixed {
	position: absolute;
	height: 98rpx;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #1aad19;
	color: #fff;
	line-height: 98rpx;
	text-align: center;
}
</style>
