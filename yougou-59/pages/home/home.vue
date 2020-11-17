<template>
	<view class="content">
		<!-- 搜索区域 -->
		<searchBar />
		<!-- 轮播图区域 -->
		<swiper class="swiper" :circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<block v-for="(item, index) in lunboList" :key="index">
				<swiper-item class="swiper-item">
					<image :src="item.image_src" mode=""></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<block v-for="(item, index) in navList" :key="index">
				<view class="nav-item">
					<image :src="item.image_src" mode=""></image>
				</view>
			</block>
		</view>
		<!-- 楼层区域 -->
		<view class="myfloor" v-for="(item, index) in floorList" :key="index">
			<view class="left">
				<image :src="item.product_list[0].image_src" mode=""></image>
			</view>
			<view class="right">
				<block v-for="(subitem, subindex) in item.product_list" :key="subindex">
					<image v-if="subindex !== 0" :src="subitem.image_src" mode=""></image>
				</block>
			</view>
		</view>
		<!-- <view>
			<view class="floor" v-for="(item, index) in floorList" :key="index">
				<view class="f-title">
					<image :src="item.floor_title.image_src" mode="widthFix"></image>
				</view>
				<view class="f-content">
					<image v-for="(subitem, subindex) in item.product_list" :key="subindex" :src="subitem.image_src" mode=""></image>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import searchBar from '../../components/searchBar.vue'
	export default {
		data() {
			return {
				// 轮播图的数据
				lunboList: [],
				// 导航数据
				navList: [],
				// 楼层数据
				floorList: []
			}
		},
		// 发送请求可以在 onLoad 事件中
		async onLoad() {
			console.log('page onLoad')
			// 得以轮播图中的数据
			let resLunbo = await this.$http({url: 'https://www.uinav.com/api/public/v1/home/swiperdata'})
			this.lunboList = resLunbo
			// 请求导航数据
			let resNav = await this.$http({url: 'https://www.uinav.com/api/public/v1/home/catitems'})
			this.navList = resNav
			// 请求楼层数据
			let resFloor = await this.$http({url: 'https://www.uinav.com/api/public/v1/home/floordata'})
			this.floorList = resFloor
		},
		onShow() {
			console.log('page onShow')
		},
		created () {
			console.log('page created')
		},
		mounted () {
			console.log('page mounted')
		},
		methods: {},
		components: {
			searchBar
		}
	}
</script>

<style lang="less">
	.content {

		.swiper {
			.swiper-item {
				image {
					width: 100%;
					height: 340rpx;
				}
			}
		}

		.nav {
			display: flex;
			height: 192rpx;
			align-items: center;

			.nav-item {
				flex: 1;
				text-align: center;

				image {
					width: 128rpx;
					height: 140rpx;
				}
			}
		}

		.floor {
			margin-top: 20rpx;

			.f-title {
				image {
					width: 100%;
					height: 88rpx;
				}
			}

			.f-content {
				padding: 0 16rpx;
				overflow: hidden;

				image {
					float: right;
					width: 232rpx;
					height: 188rpx;
					border-radius: 8rpx;
					margin-right: 8rpx;
				}

				image:first-child {
					float: left;
					width: 230rpx;
					height: 390rpx;
				}

				image:nth-child(2),
				image:nth-child(3) {
					margin-bottom: 10rpx;
				}
			}
		}

		.myfloor {
			display: flex;
			padding: 20rpx 16rpx;

			.left {
				image {

					width: 232rpx;
					height: 390rpx;
				}
			}

			.right {
				flex: 1;

				image {
					margin-left: 10rpx;
					width: 232rpx;
					height: 180rpx;

					&:nth-child(1),
					&:nth-child(2) {
						margin-bottom: 10rpx;
					}
				}
			}
		}
	}
</style>
