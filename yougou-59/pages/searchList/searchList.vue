<template>
	<view class="search">
		<view class="myhead" :style="{ position: position }">
			<!-- 搜索框  -->
			<SearchCom :kkey="key" @search="search" />
			<!-- 过滤栏 -->
			<view class="filter">
				<view class="f-item" @click="changeIndex(index)" v-for="(item, index) in filterList" :key="index" :class="{ active: currentIndex === index }">
					{{ item }}
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="list" :style="{ marginTop: marginTop }">
			<view @click="toDetail(item.goods_id)" class="l-item" v-for="(item, index) in goodsList" :key="index">
				<view class="i-left">
					<image :src="item.goods_small_logo" mode=""></image>
				</view>
				<view class="i-right">
					<view class="word">
						{{ item.goods_name }}
					</view>
					<view class="price">
						<text>￥</text><text class="num">{{ item.goods_price }}</text><text>.00</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 导入搜索组件
	import SearchCom from '../../components/SearchCom.vue'
	export default {
		data() {
			return {
				filterList: ['综合', '销量', '价格'],
				// 设置激活元素的下标
				currentIndex: 0,
				// 搜索的关键字
				key: '',
				// 页码
				pagenum: 1,
				// 页容量
				pagesize: 10,
				// 得到搜索列表
				goodsList: [],
				// 数据的总条数
				total: undefined,
				// 是否请求完毕
				finished: true, // true 请求完毕  false 正在请求
				// 设置搜索框&过滤栏的定位方式：
				position: 'static',
				// 设置 list 距离顶部的距离
				marginTop: '0rpx'
			}
		},
		methods: {
			// 跳转到详情页面
			toDetail(goodsid) {
				uni.navigateTo({
					url: `/pages/detail/detail?goodsid=${goodsid}`
				})
			},
			// 搜索数据
			search(value) {
				// 得到输入的内容
				// this.key = e.detail.value
				this.key = value
				// 重置数据
				this.pagenum = 1
				this.goodsList = []
				this.total = undefined
				// 重新发送请求到服务器得到新的列表数据
				this.getGoodsList()
			},
			// 修改选中的下标
			changeIndex(index) {
				this.currentIndex = index
			},
			// 得到商品列表
			async getGoodsList() {
				// 判断所有的数据是否已经加载完毕
				if (this.goodsList.length >= this.total) {
					uni.showToast({
						title: '到底了'
					})
					return
				}
				// 判断请求请求正在发送
				if (this.finished === false) {
					// 结束后续的代码，不再需要发送请求
					return
				}
				// 将状态改为正在发送
				this.finished = false
				var res = await this.$http({
					url: 'https://www.uinav.com/api/public/v1/goods/search',
					method: 'GET',
					data: {
						query: this.key,
						pagenum: this.pagenum,
						pagesize: this.pagesize
					},
					hasLoading: false // 进行网络请求时，不要添加加载效果
				})
				// 发送完毕：将状态改为 true
				this.finished = true
				// res: total pagenum  goods
				this.goodsList = [...this.goodsList, ...res.goods]
				this.total = res.total
			}
		},
		// 接收参数
		onLoad(options) {
			// 接收参数
			this.key = options.key
			// 根据关键字发送请求到服务器
			this.getGoodsList()
		},
		// 上拉触底时触发
		onReachBottom() {
			// 执行加载更多的逻辑：
			// pagenum ++
			this.pagenum++
			// 发送下一页数据的请求到服务器
			this.getGoodsList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 重置所有的数据：
			this.pagenum = 1
			this.goodsList = []
			this.total = undefined
			// 重新请求第一页的数据
			this.getGoodsList()
		},
		// 当页面滚动时触发
		onPageScroll(scroll) {
			// 判断是否处于最上方
			if (scroll.scrollTop === 0) {
				this.position = 'static'
				this.marginTop = '0rpx'
			} else {
				this.position = 'fixed'
				this.marginTop = '220rpx'
			}
		},

		components: {
			SearchCom
		}
	}
</script>

<style lang="less">
	.myhead {
		// position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
	}

	.search {
		.filter {
			display: flex;
			border-bottom: 1px solid #ccc;

			.f-item {
				flex: 1;
				text-align: center;
				line-height: 100rpx;
				height: 100rpx;
			}

			.active {
				color: red;
			}
		}

		.list {
			.l-item {
				display: flex;
				padding: 30rpx 20rpx;
				border-bottom: 1px solid #ccc;

				.i-left {
					image {
						width: 200rpx;
						height: 200rpx;
						margin-right: 24rpx;
					}
				}

				.i-right {
					flex: 1;

					.word {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.price {
						margin-top: 70rpx;
						color: #eb4552;
						font-size: 14px;

						.num {
							font-size: 20px;
						}
					}
				}
			}
		}
	}
</style>
