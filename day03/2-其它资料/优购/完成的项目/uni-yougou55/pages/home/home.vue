<template>
	<view class="">
		<!-- 搜索热区 -->
		<SearchLink></SearchLink>

		<!-- 轮播图 -->
		<swiper autoplay circular indicator-dots indicator-active-color="#fff" indicator-color="rgba(255,255,255,0.3)">
			<swiper-item v-for="(item, index) in swiperdata" :key="index"><image :src="item.image_src" mode=""></image></swiper-item>
		</swiper>
		<!-- 导航栏 -->
		<view class="nav"><image v-for="(item, index) in catitems" :key="index" :src="item.image_src" mode=""></image></view>
		<!-- 楼层 -->
		<view class="floor">
			<view class="floor-item" v-for="(item, index) in floordata" :key="index">
				<image :src="item.floor_title.image_src" mode=""></image>
				<view class="product-list">
					<image :src="item.product_list[0].image_src" mode=""></image>
					<view class="right">
						<block v-for="(subItem, subIndex) in item.product_list" :key="subIndex"><image v-if="subIndex" :src="subItem.image_src"></image></block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// 引入SearchLink.vue
import SearchLink from '@/components/SearchLink';

export default {
	components: {
		// SearchLink:SearchLink
		SearchLink
	},
	data() {
		return {
			// 轮播图数据
			swiperdata: [],
			// 导航栏图片数据
			catitems: [],
			floordata: []
		};
	},
	onLoad() {
		this.getSwiperData();
		this.getCatitems();
		this.getFloorData();
	},
	methods: {
		// 请求轮播图数据
		async getSwiperData() {
			// uni.request({
			// 	url: 'https://www.uinav.com/api/public/v1/home/swiperdata',
			// 	// 尽量使用箭头函数
			// 	success: res => {
			// 		// 如果status为200时,数据才是正确
			// 		// if (res.data.meta.status === 200) {
			// 		// 	// 这里无须setData
			// 		// 	this.swiperdata = res.data.message;
			// 		// }
			// 		let { meta, message } = res.data;
			// 		if (meta.status === 200) {
			// 			this.swiperdata = message;
			// 		}
			// 	}
			// });
			this.swiperdata = await this.$request({
				url: '/api/public/v1/home/swiperdata'
			});
		},
		// 请求导航数据
		async getCatitems() {
			// uni.request({
			// 	url: 'https://www.uinav.com/api/public/v1/home/catitems',
			// 	// 尽量使用箭头函数
			// 	success: res => {
			// 		let { meta, message } = res.data;
			// 		if (meta.status === 200) {
			// 			this.catitems = message;
			// 		}
			// 	}
			// });
			this.catitems = await this.$request({
				url: '/api/public/v1/home/catitems'
			});
		},
		// 请求楼层数据
		async getFloorData() {
			// this.request().then(data=>{
			// 	this.floordata = data
			// })
			// await会返回promise.then里面数据
			this.floordata = await this.$request({
				url: '/api/public/v1/home/floordata'
			});
		}
		// // 公共请求方法
		// request(options){
		// 	return new Promise((resolve)=>{
		// 		uni.request({
		// 			url: options.url,
		// 			// 尽量使用箭头函数
		// 			success: res => {
		// 				let { meta, message } = res.data;
		// 				if (meta.status === 200) {
		// 					//成功的数据
		// 					resolve(message)
		// 				}
		// 			}
		// 		});
		// 	})
		// }
	}
};
</script>

<style lang="less">
swiper {
	height: 340rpx;
	image {
		height: 340rpx;
		width: 100%;
	}
}
.nav {
	display: flex;
	height: 194rpx;
	align-items: center;
	justify-content: space-around;
	image {
		width: 128rpx;
		height: 140rpx;
	}
}

.floor-item {
	padding: 20rpx 17rpx;
	// >子元素
	> image {
		height: 88rpx;
	}
	.product-list {
		display: flex;
		> image {
			width: 232rpx;
			height: 386rpx;
		}
		.right {
			flex: 1;
			image {
				width: 232rpx;
				height: 188rpx;
				margin: 0 0 10rpx 10rpx;
			}
		}
	}
}
</style>
