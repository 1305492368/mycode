<template>
	<view class="search">
		<!-- 搜索框 -->
		<SearchCom :kkey="search" @input="thinkList" @search="toSearchList" />
		<!-- 联想区域 -->
		<view class="think" v-if="tinkList.length > 0">
			<view class="item" @click="toSearchList(item.oldItem)" v-for="(item, index) in tinkList" :key="index">
				<rich-text :nodes="item.newItem"></rich-text>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="searchList">
			<view class="top">
				<view class="word">
					历史搜索
				</view>
				<icon @click="delAll" class="myicon" type="cancel" size="14px"></icon>
			</view>
			<view class="bottom">
				<view @click="toSearchList(item)" class="item" v-for="(item, index) in historyList" :key="index">
					{{ item }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 导入搜索框
	import SearchCom from '../../components/SearchCom.vue'
	export default {
		data() {
			return {
				// 给输入框设置默认值
				search: '',
				// 搜索历史
				historyList: [],
				// 联想数据
				tinkList: [],
				// 定义一个定时器
				timer: null
			}
		},
		methods: {
			// 删除所有的历史数据
			delAll() {
				// this
				// 弹框
				uni.showModal({
					title: '警告',
					content: '您确定要清空数据吗？',
					success: res => {
						if (res.confirm) {
							// 清空历史数据
							this.historyList = []
							// 清除 storeage
							uni.removeStorageSync('history')
						} else {
							console.log('取消')
						}
					}
				})
			},
			// 每次输入内容都会触发这个事件，并且得到输入的内容
			thinkList(value) {
				// 设置一个防抖
				clearTimeout(this.timer)
				this.timer = setTimeout(async () => {
					// console.log(value) // value 输入框中的内容
					// 根据 value 关键字，得到服务器中对应的商品数据
					var res = await this.$http({
						url: 'https://www.uinav.com/api/public/v1/goods/search',
						data: {
							query: value,
							pagenum: 1,
							pagesize: 10
						}
					})
					this.tinkList = res.goods.map(item => {
						return {
							newItem: item.goods_name.replace(value, `<span style="color: red">${value}</span>`),
							oldItem: item.goods_name
						}
					})
				}, 500)
			},
			// 在输入框中输入内容之后，点击回车，会跳转到搜索列表页面，并且携带搜索的关键字
			toSearchList(value) {
				// 得到当前输入框中的内容： value
				// 将内容保存到 historyList, 
				this.historyList.unshift(value)
				// 去重
				this.historyList = [...new Set(this.historyList)]
				// 存入到 storage 中
				uni.setStorageSync('history', this.historyList)
				// 跳转到搜索列表，携带输入框中的关键字
				uni.navigateTo({
					url: `/pages/searchList/searchList?key=${value}`
				})
			}
		},
		onLoad() {
			// 1.0 得到storeage 中的数据 & 2.0 保存数据 // 刚打开页面时，storeage 中有可能没有数据
			this.historyList = uni.getStorageSync('history') || []

			// 3.0 渲染到页面上
		},
		onShow() {
			// 清除将联想数据
			this.tinkList = []
		},
		components: {
			SearchCom
		}
	}
</script>

<style lang="less">
	.search {
		position: relative;

		.think {
			position: absolute;
			padding: 20rpx;
			width: 100%;
			box-sizing: border-box;
			top: 120rpx;
			left: 0px;
			background-color: #ddd;
			line-height: 50rpx;
			color: #999;
			font-size: 12px;

			.item {
				rich-text {
					display: -webkit-box;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					/*! autoprefixer: off */
					-webkit-box-orient: vertical;
					/* autoprefixer: on */
				}
			}
		}

		.searchList {
			padding: 0 16rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 88rpx;

				.word {
					font-size: 18px;
				}
			}

			.bottom {
				display: flex;
				flex-wrap: wrap;

				.item {
					padding: 20rpx;
					background-color: #dddddd;
					margin-right: 30rpx;
					margin-bottom: 30rpx;
				}
			}
		}

	}
</style>
