<template>
	<view class="content">
		<view class="title">
			<text class="iconfont icon-shop"></text>
			<text>优购生活馆</text>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="toItem(item.goodsId)">
				<text class="iconfont" :class="item.checked ? 'icon-checked' : 'icon-unchecked'" @click.stop="toggleCheck(item)"></text>
				<image :src="item.goods_small_logo" alt="" />
				<view class="right">
					<text class="text-line2">{{ item.goods_name }}</text>
					<view class="btm">
						<text class="price">
							￥
							<text>{{ item.goods_price }}</text>
							.00
						</text>
						<view class="goods-num">
							<button @click.stop="subNum(item, index)">-</button>
							<text>{{ item.num }}</text>
							<button @click.stop="addNum(item)">+</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="account">
			<view class="select-all" @click="toggleAll">
				<text class="iconfont" :class="isAll ? 'icon-checked' : 'icon-unchecked'"></text>
				<text>全选</text>
			</view>

			<view class="price-wrapper">
				<view class="price">
					<view>
						合计:
						<text class="num">￥{{ totalPrice }}.00</text>
					</view>
					<text class="info">包含运费</text>
				</view>
			</view>
			<view class="account-btn" @click="toPay">结算({{ totalNum }})</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goodsList: []
		};
	},
	computed: {
		// 总数量
		totalNum() {
			// 选中的商品数量之和
			// let sum = 0;
			// this.goodsList.forEach(item => {
			// 	if (item.checked) {
			// 		sum += item.num;
			// 	}
			// });
			// return sum;
			return this.goodsList.reduce((sum, item) => {
				return sum + (item.checked ? item.num : 0);
			}, 0);
		},
		// 总价
		totalPrice() {
			// 选中的商品数量*商品价格之和
			return this.goodsList.reduce((sum, item) => {
				return sum + (item.checked ? item.num * item.goods_price : 0);
			}, 0);
		},
		isAll: {
			get() {
				// 所有的商品都选中,全选勾选,也就是说返回true
				// 1. 勾选的商品的数量和goodslist长度对比
				// let sum =0
				// this.goodsList.forEach(item=>{
				// 	// item.checked&&(sum++)
				// 	if(item.checked){
				// 		sum++
				// 	}
				// })
				// if(sum===this.goodsList.length){
				// 	return true
				// }
				// return false

				// 2. 只要有一个不勾选，中断遍历，返回false,否则true
				// forEach不能中断
				// this.goodsList.forEach(item => {
				// 	if (!item.checked) {
				// 		return false;
				// 	}
				// });
				// for(let item of this.goodsList){
				// 	if(!item.checked){
				// 		return false
				// 	}
				// }
				// return true;

				// 3.所有商品都勾选,返回true,否则返回false
				return this.goodsList.every(item => {
					return item.checked;
				});
			},
			// 并不能直接改变isAll,而是isAll设置的值有变化时,会触发set方法,新的值作为形参传过来
			set(status) {
				//一般在set方法,把新值设置给它的依赖
				this.goodsList.forEach(item => {
					item.checked = status;
				});
			}
		}
	},
	// 初始化会执行,再切切换购物车页面也会执行
	onShow() {
		// 取storage cart里面每一项goodsId以,分隔
		this.cart = this.$store.state.cart;

	 // 如果storage cart不为空的,才发请求
		if (this.cart.length) {
			this.queryGoodsList();
		}
	},
	watch: {
		// 侦听goodsList的改变
		goodsList: {
			handler() {
				this.$store.commit('updateCart',this.goodsList)
			},
			deep: true
		}
	},
	methods: {
		toPay(){
			// 判断如果商品数量为0,提示
			if(!this.totalNum){
				uni.showToast({
					title:'请选择商品进入结算',
					icon:'none'
				})
				return 
			}
			
			uni.navigateTo({
				url:'/pages/pay/pay'
			})
		},
		// 全选状态的切换
		toggleAll() {
			this.isAll = !this.isAll;
		},
		// 商品数量++
		addNum(item) {
			item.num++;
		},
		subNum(item, index) {
			// 如果item.num为1,删除这一项
			if (item.num === 1) {
				uni.showModal({
					title: '提示',
					content: '你确定要删除商品吗？',
					success: res => {
						if (res.confirm) {
							this.goodsList.splice(index, 1);
						}
					}
				});
				return;
			}
			item.num--;
		},
		// 跳转商详
		toItem(goodsId) {
			uni.navigateTo({
				url: '/pages/item/item?goodsId=' + goodsId
			});
		},
		// 点击商品勾选/不勾选
		toggleCheck(item) {
			// this.goodsList[index].checked = !this.goodsList[index].checked
			item.checked = !item.checked;
		},
		// 请求商品列表
		async queryGoodsList() {
			// let idStr =''
			// cart.forEach(item=>{
			// 	idStr+=item.goodsId+','
			// })
			// TODO把最后这个逗号去掉

			// goodsId数组,然后join拼接字符串
			let idArr = this.cart.map(item => {
				return item.goodsId;
			});

			// 数组元素以逗号分隔
			let idStr = idArr.join(',');

			let _goodsList = await this.$request({
				url: '/api/public/v1/goods/goodslist?goods_ids=' + idStr
			});

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
		}
	}
};
</script>

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
