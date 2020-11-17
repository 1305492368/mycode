<template>
	<view class="wrapper">
		<swiper class="swiper" indicator-dots autoplay circular indicator-color="#ccc" indicator-active-color="#fff">
			<block v-for="(item, index) in goods.pics" :key="index">
				<swiper-item @click="prevImg(index)"><image class="swiper-img" :src="item.pics_big"></image></swiper-item>
			</block>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info">
			<view class="price">￥{{ goods.goods_price }}</view>
			<view class="name-favo">
				<view class="name">{{ goods.goods_name }}</view>
				<view class="favo">
					<text class="iconfont icon-share"></text>
					<text>分享</text>
					<button open-type="share">分享</button>
				</view>
			</view>
			<view class="express">快递: 免运费</view>
		</view>
		<view class="promote">
			<view>
				<text class="name">促销</text>
				<text class="detail">满300减30元</text>
			</view>
			<view class="brother">
				<text class="name">已选</text>
				<text class="detail gray">黑色/S/1件</text>
			</view>
		</view>
		<!-- 图文介绍 -->
		<view class="goods-detail">
			<view class="tabs">
				<text :class="{ active: activeIndex === index }" v-for="(item, index) in menuList" @click="selectMenu(index)" :key="index">{{ item }}</text>
			</view>
			<view class="main">
				<!-- <view v-if="!activeIndex" v-html="goods.goods_introduce"></view> -->
				<rich-text v-if="!activeIndex" :nodes="goods.goods_introduce"></rich-text>
				<view v-else>商品参数</view>
			</view>
		</view>
		<view class="fixed-bottom">
			<view class="icon-text">
				<text class="iconfont icon-kefu"></text>
				<text>联系客服</text>
				<button open-type="contact">客服</button>
			</view>
			<view class="icon-text" @click="toCart">
				<text class="iconfont icon-cart"></text>
				<text>购物车</text>
			</view>
			<view class="btn add-cart-btn" @click="add2Cart">加入购物车</view>
			<view class="btn buy-btn" @click="toPay">立即购买</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goods: {},
			menuList: ['图文介绍', '规格参数'],
			// tab选中的下标
			activeIndex: 0
		};
	},
	onLoad(options) {
		// 把goodsId声明为Vue实例的属性
		this.goodsId = options.goodsId;
		this.queryGoodsDetail();
	},
	onShareAppMessage() {
		// 定制弹窗
		return {
			title: this.goods.goods_name, //弹窗标题
			// path: '/pages/test/test?id=123', //分享后，别人打开时的页面路径。默认是当前页面路径,
			imageUrl: this.goods.pics[0].pics_big //弹窗的图片
		};
	},
	methods: {
		// 跳转支付页面,传递goodsId
		toPay() {
			uni.navigateTo({
				url: '/pages/pay/pay?goodsId=' + this.goods.goods_id
			});
		},
		// 加入购物车
		// add2Cart() {
		// 	// 取storage
		// 	let cart = uni.getStorageSync('cart') || {};
		// 	// 更新
		// 	let goodsId = this.goods.goods_id;
		// 	// 判断cart对象有没有一项goodsId和当前goodsId相等
		// 	// if (cart[goodsId]) {
		// 	// 	// 非首次,num++,checked:true
		// 	// 	cart[goodsId] = {
		// 	// 		num: cart[goodsId].num + 1,
		// 	// 		checked: true
		// 	// 	};
		// 	// } else {
		// 	// 	//首次,num:1,checked:true
		// 	// 	cart[goodsId] = {
		// 	// 		num: 1,
		// 	// 		checked: true
		// 	// 	};
		// 	// }
		// 	// 无论是否是首次添加,直接更新.差别在num,首次:1,非首次++
		// 	cart[goodsId] = {
		// 		num: cart[goodsId] ? cart[goodsId].num + 1 : 1,
		// 		checked: true
		// 	};
		// 	// 存storage
		// 	uni.setStorageSync('cart', cart);
		// },
		// 直接使用state.cart
		add2Cart2() {
			// 数组的方式
			// 取storage
			let cart = this.$store.state.cart;
			// 当前商品的goodsId
			let goodsId = this.goods.goods_id;
			// 更新
			// 判断是否是首次添加
			// let targetGoods = {}
			// cart.forEach(item=>{
			// 	// 判断每一项goodsid是否和当前商品id一致
			// 	if(item.goodsId===goodsId){
			// 		targetGoods = item
			// 	}
			// })
			// console.log(targetGoods)

			// 去cart找一项goodsid和当前商品的goodsid相等的那一项
			// let targetGoods = cart.find(item => {
			// 	return item.goodsId === goodsId;
			// });
			// if (targetGoods) {
			// 	// 非首次
			// 	targetGoods.checked = true;
			// 	targetGoods.num = targetGoods.num + 1;

			// 	cart = [...new Set([targetGoods, ...cart])];
			// } else {
			// 	// 首次
			// 	let newGoods = {
			// 		// goodsId:goodsId
			// 		goodsId,
			// 		num: 1,
			// 		checked: true
			// 	};
			// 	// 插入到头部
			// 	cart.unshift(newGoods);
			// }

			//在数组中找一个符合条件元素下标,如果没有找到的话，返回为-1
			let targetIndex = cart.findIndex(item => {
				return item.goodsId === goodsId;
			});

			if (targetIndex !== -1) {
				// 目标元素
				let targetGoods = cart[targetIndex];
				// 非首次
				targetGoods.checked = true;
				targetGoods.num = targetGoods.num + 1;

				//把目标元素在数组里面移到最前面，先删除，再插入到最前面
				cart.splice(targetIndex, 1);
				cart.unshift(targetGoods);
			} else {
				// 首次
				let newGoods = {
					// goodsId:goodsId
					goodsId,
					num: 1,
					checked: true
				};
				// 插入到头部
				cart.unshift(newGoods);
			}
			// 存
			// uni.setStorageSync('cart', cart);
			uni.showToast({
				title: '加入购物车成功'
			});
		},

		// 不直接使用state.cart
		add2Cart() {
			let goodsId = this.goods.goods_id;
			this.$store.commit('add2Cart', goodsId);

			uni.showToast({
				title: '加入购物车成功'
			});
		},
		// 跳购物车页面
		toCart() {
			uni.switchTab({
				url: '/pages/cart/cart'
			});
		},
		// tab菜单点击
		selectMenu(index) {
			this.activeIndex = index;
		},
		// 预览图片
		prevImg(index) {
			let urls = this.goods.pics.map(item => {
				return item.pics_big;
			});
			console.log(urls);
			uni.previewImage({
				// urls:urls
				urls,
				// current:urls[index]
				current: index //下标的这个API更好些
			});
		},
		// 查询商品详情
		async queryGoodsDetail() {
			this.goods = await this.$request({
				url: '/api/public/v1/goods/detail?goods_id=' + this.goodsId
			});
		}
	}
};
</script>
<style lang="less">
.iconfont {
	font-size: 40rpx;
}
.wrapper {
	background-color: #f4f4f4;
	padding-bottom: 98rpx;
}

.swiper {
	height: 720rpx;
}

.swiper-img {
	width: 100%;
	height: 720rpx;
}

.goods-info {
	padding: 40rpx 0 30rpx 20rpx;
	background-color: #fff;

	.price {
		color: #eb4450;
		font-size: 40rpx;
	}

	.name-favo {
		display: flex;
		height: 78rpx;
		margin-top: 14rpx;

		.name {
			color: #333;
			flex: 1;
			font-size: 28rpx;
			padding-right: 78rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2; // 控制多行的行数
			-webkit-box-orient: vertical;
		}

		.favo {
			border-left: 1px solid #ddd;
			width: 144rpx;
			color: #999;
			font-size: 24rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			button {
				// 覆盖,并且透明
				position: absolute;
				opacity: 0;
			}
		}
	}

	.express {
		color: #999;
		font-size: 24rpx;
		margin-top: 20rpx;
	}
}

.promote {
	margin-top: 20rpx;

	view {
		background-color: #fff;
		height: 96rpx;
		line-height: 96rpx;
		font-size: 28rpx;
		margin-top: 20rpx;
		padding-left: 20rpx;

		&.brother {
			margin-top: 0;
		}

		.name {
			color: #404040;
		}

		.detail {
			color: #ff4055;
			margin-left: 40rpx;

			&.gray {
				color: #dfdfdf;
			}
		}
	}
}

.goods-detail {
	margin-top: 20rpx;
	background-color: #fff;

	.tabs {
		display: flex;

		text {
			flex: 1;
			text-align: center;
			color: #404040;
			font-size: 22rpx;
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;

			&.active {
				color: #ff4055;
				border-bottom: 10rpx solid #ff2644;
			}
		}
	}
}

.fixed-bottom {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 98rpx;
	display: flex;
	background-color: #fff;

	.icon-text {
		flex: 2;
		font-size: 20rpx;
		color: #404040;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		button {
			position: absolute;
			opacity: 0;
		}
	}

	.btn {
		flex: 3;
		color: #fff;
		text-align: center;
		line-height: 98rpx;

		&.add-cart-btn {
			background-color: #ffb400;
		}

		&.buy-btn {
			background-color: #ff2d4a;
		}
	}
}
</style>
