<template>
	<view class="category">
		<!-- 搜索区域 -->
		<searchBar />
		<!-- 商品区域 -->
		<view class="goods">
			<view class="g-left">
				<view class="nav1" @click="changeIndex(index)" :class="{ active: index === currentIndex }" v-for="(item, index) in goodsList"
				 :key="index">
					{{ item.cat_name }}
				</view>
			</view>
			<view class="g-right">
				<view class="r-box">
					<image class="imgtitle" src="../../static/titleImage.png" mode=""></image>
					<view class="nav2" v-for="(item, index) in twiceList" :key="index">
						<view class="title">
							<text>/</text>{{ item.cat_name }}<text>/</text>
						</view>
						<view class="nav3">
							<view @click="toSearchList(subitem.cat_name)" class="nav3-item" v-for="(subitem, subindex) in item.children" :key="subindex">
								<image :src="subitem.cat_icon" mode=""></image>
								<text>{{subitem.cat_name}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchBar from '../../components/searchBar.vue'
	export default {
		data() {
			return {
				// 定义当前选中的分类
				currentIndex: 0,
				// 商品列表
				goodsList: [],
				// 定义二级分类
				twiceList: []
			}
		},
		methods: {
			// 跳转到搜索列表页面
			toSearchList (key) {
				uni.navigateTo({
					url: `../searchList/searchList?key=${key}`
				})
			},
			// 切换当前选中的一级导航
			changeIndex(index) {
				this.currentIndex = index
				// 修改二级分类的数据
				this.twiceList = this.goodsList[this.currentIndex].children
			},
			// 得到商品数据
			async getGoodsList() {
				const res = await this.$http({url: 'https://www.uinav.com/api/public/v1/categories'})
				// 得到所有的商品数据
				this.goodsList = res
				// 根据当前选中的一级分类得到它下面的二级分类数据
				this.twiceList = this.goodsList[this.currentIndex].children
			}
		},
		onLoad() {
			// 请求接口得到服务器返回的数据
			this.getGoodsList()
		},
		components: {
			// searchBar: import('../../components/searchBar.vue')
			searchBar
		}
	}
</script>

<style lang="less">
	.category {
		.goods {
			.g-left {
				background-color: #f4f4f4;
				width: 200rpx;
				position: fixed;
				left: 0;
				top: 100rpx;
				bottom: 0;
				overflow: scroll;

				.nav1 {
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
				}

				.active {
					background-color: #fff;
					color: #eb4450;
					position: relative;

					&::before {
						content: '';
						display: inline-block;
						width: 8rpx;
						height: 60rpx;
						background-color: #eb4450;
						position: absolute;
						top: 50%;
						left: 0rpx;
						transform: translateY(-50%);
					}
				}
			}

			.g-right {
				position: fixed;
				right: 0;
				left: 200rpx;
				top: 100rpx;
				bottom: 0;
				overflow: scroll;

				.r-box {
					padding: 20rpx 16rpx;

					.imgtitle {
						width: 100%;
						height: 180rpx;
					}


					.nav2 {
						.title {
							text-align: center;
							line-height: 110rpx;

							text {
								color: #999;
								margin: 0 20rpx;
							}
						}

						.nav3 {
							display: flex;
							flex-wrap: wrap;

							.nav3-item {
								width: 33.33%;
								text-align: center;

								image {
									width: 120rpx;
									height: 120rpx;
								}

								text {
									display: block;
									margin-bottom: 20rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
