import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 小程序启时,storage=>vuex
		cart: uni.getStorageSync('cart') || []
	},
	mutations: {
		// 订单创建成功后,把勾选的商品删除
		arrangeCart(state){
			// 更新
			// 把storage cart勾选的商品去掉
			state.cart = state.cart.filter(item => {
				return !item.checked;
			});
		},
		// cart改变界面,同步给state.cart
		updateCart(state, goodsList) {
			// 构造一个cart,然后存storage
			state.cart = goodsList.map(item => {
				return {
					goodsId: item.goodsId,
					num: item.num,
					checked: item.checked
				};
			});
		},
		// 加入购物车
		add2Cart(state, goodsId) {
			let cart = state.cart;
			// 当前商品的goodsId

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
		}
	},
	plugins: [createLogger()]
})

export default store
