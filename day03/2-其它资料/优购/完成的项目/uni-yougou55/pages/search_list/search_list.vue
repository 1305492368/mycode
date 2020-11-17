<template>
	<view>
		<view class="top-header" :style="{ position: isFixed ? 'fixed' : 'static' }">
			<!-- 头部 -->
			<!-- <view class="header">
				<icon type="search" size="16" color="#bbb"></icon>
				<input type="text" v-model="keyword" confirm-type="search" @confirm="search" />
			</view> -->
			<SearchBar @search="searchHandler" :keyword="keyword"/>

			<!-- 过滤菜单 -->
			<view class="filter-menu">
				<view :class="{ active: activeIndex === index }" v-for="(item, index) in menuList" :key="index" @click="selectMenu(index)">{{ item }}</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="goods-list" :style="{ marginTop: isFixed ? '220rpx' : '0' }">
			<view class="goods" v-for="(item, index) in goodsList" :key="index" @click="toItem(item.goods_id)">
				<image :src="item.goods_small_logo" alt=""></image>
				<view class="right">
					<view class="goods-name text-line2">{{ item.goods_name }}</view>
					<view class="price">
						￥
						<text>{{ item.goods_price }}</text>
						.00
					</view>
				</view>
			</view>
		</view>
		<!-- 添加提示 -->
		<view class="btm-line" v-if="isLastPage">-- 我是有底线的 --</view>
	</view>
</template>

<script>
// 引入组件
import SearchBar from '@/components/SearchBar.vue';

// 页容量
const PAGE_SIZE = 6;
const HISTORY_KEY = 'history';

export default {
	// 注册组件
	components: {
		SearchBar
	},
	data() {
		return {
			menuList: ['综合', '销量', '价格'],
			// 当前选中的过滤栏的下标
			activeIndex: 0,
			// 输入框的关键字
			keyword: '',
			// 商品列表
			goodsList: [],
			// 页码
			// pageNum: 1,
			// 是否是最后一页
			isLastPage: false,
			// 是否有请求在请求中，默认为false
			// isRequesting: false,
			// top-header是否固定
			isFixed: true
		};
	},
	onLoad(options) {
		// pageNum并没有在data里面声明,直接赋值了
		//页码
		this.pageNum = 1;
		// 是否有请求在请求中，默认为false
		this.isRequesting = false;

		this.keyword = options.catName;
		// 把当前页面keyword加到storage 
		this.addHistory()
		this.queryGoodsList();
	},
	// 下拉时会触发
	onPullDownRefresh() {
		// 清空列表,加载第一页数据,页码重置为1
		// this.pageNum = 1;
		// this.goodsList = [];
		// this.queryGoodsList();
		// 下拉时,需要显示顶部的Loading动画,无须头部固定
		this.isFixed = false;
		this.search();
	},
	// 页面滚动时,设置头部固定
	onPageScroll() {
		this.isFixed = true;
	},
	// 上拉触发
	onReachBottom() {
		// 如果是最后一页就不再发请求了
		if (!this.isLastPage) {
			// 请求下一页数据
			this.pageNum++;
			this.queryGoodsList();
		}
	},
	methods: {
		// 把keyword插入storage头部并去重
		addHistory(){
			// 取
			let historyList = uni.getStorageSync(HISTORY_KEY)
			// 插入到头部并去重
			let _historyList = [...new Set([this.keyword, ...historyList])];
			//存到storage
			uni.setStorageSync(HISTORY_KEY, _historyList);
		},
		// 子传父,触发搜索
		searchHandler(inputVal){
			this.keyword= inputVal
			this.addHistory()
			this.search()
		},
		// 跳转商详
		toItem(goodsId) {
			uni.navigateTo({
				url: '/pages/item/item?goodsId=' + goodsId
			});
		},
		// 输入框输入触发搜索
		search() {
			// 按输入框的内容，pageNum:1进行搜索，清空列表展示列表
			this.isLastPage = false; //重新搜索时，需要把isLastPage设置为false
			this.pageNum = 1;
			this.goodsList = [];
			this.queryGoodsList();
		},
		// 根据关键字查询获取到商品列表
		async queryGoodsList() {
			// 判断是否在有其他请求在请求中
			if (this.isRequesting) {
				return;
			}

			// 请求前设置状态为true
			this.isRequesting = true;

			let data = await this.$request({
				url: '/api/public/v1/goods/search',
				data: {
					query: this.keyword,
					pagenum: this.pageNum,
					pagesize: PAGE_SIZE
				},
				// 这个请求不需要loading动画
				showLoading: false
			});

			// 请求结束后,设置请求状态为false
			this.isRequesting = false;
			// 请求到数据后，手动停止动画
			uni.stopPullDownRefresh();
			// 追加数据
			this.goodsList = [...this.goodsList, ...data.goods];
			// 如果列表长度等于total,就是最后一页了
			if (data.total <= this.goodsList.length) {
				this.isLastPage = true;
			}
		},
		// 选过滤栏菜单
		selectMenu(index) {
			this.activeIndex = index;
		}
	}
};
</script>

<style lang="less">
.top-header {
	position: fixed;
	top: 0;
	// left:0;
	width: 100%;
	background-color: #fff;
	z-index:100;
}

.filter-menu {
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 100rpx;

	view.active {
		color: #eb4450;
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
