<template>
	<view class="">
		<!-- 搜索热区 -->
		<SearchLink />
		<!-- 左右两侧 -->
		<view class="content" v-if="categoryList[activeIndex]">
			<view class="left">
				<view class="cate1" :class="{ active: activeIndex === index }" v-for="(cate1, index) in categoryList" :key="index" @click="selectCate1(index)">{{ cate1.cat_name }}</view>
			</view>
			<view class="right">
				<image src="/static/images/titleImage.png" mode=""></image>
				<!-- 二级分类 -->
				<view class="cate2" v-for="(cate2, index2) in categoryList[activeIndex].children" :key="index2">
					<view class="title">
						/
						<text>{{ cate2.cat_name }}</text>
						/
					</view>
					<!-- 三级分类 -->
					<view class="cate3-wrapper">
						<view class="cate3" v-for="(cate3, index3) in cate2.children" :key="index3"
						@click="toSearchList(cate3.cat_name)">
							<image :src="cate3.cat_icon" mode=""></image>
							<text>{{ cate3.cat_name }}</text>
						</view>
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
			// 一级分类选中的下标
			activeIndex: 0,
			// 分类列表的数据
			categoryList: []
		};
	},
	onLoad() {
		// 获取分类列表
		this.getCategoryList();
	},
	methods: {
		// 跳转到搜索列表
		toSearchList(catName){
			uni.navigateTo({
				url:'/pages/search_list/search_list?catName='+catName
			})
		},
		// 获取分类列表
		async getCategoryList() {
			this.categoryList = await this.$request({
				url: '/api/public/v1/categories'
			});
		},
		// 选择一级分类
		selectCate1(index) {
			this.activeIndex = index;
		}
	}
};
</script>

<style lang="less">
.content {
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	top: 100rpx;
	bottom: 0;
	.left {
		width: 198rpx;
		overflow: scroll;
		.cate1 {
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background-color: #f4f4f4;
			color: #333;
			border-bottom: 1rpx solid #eee;
			box-sizing: border-box;
			&.active {
				background-color: #fff;
				color: #eb4450;
				position: relative;
				&::before {
					position: absolute;
					content: '';
					width: 8rpx;
					height: 60rpx;
					background-color: #eb4450;
					left: 0;
					top: 20rpx;
				}
			}
		}
	}
	.right {
		flex: 1;
		padding: 20rpx 16rpx 0;
		overflow: scroll;
		> image {
			width: 520rpx;
			height: 180rpx;
		}
		.cate2 {
			padding-bottom: 60rpx;
			.title {
				color: #e0e0e0;
				height: 110rpx;
				text-align: center;
				line-height: 110rpx;
				text {
					color: #333;
					margin: 0 30rpx;
				}
			}
			.cate3-wrapper {
				display: flex;
				flex-wrap: wrap;
				.cate3 {
					width: 33.33%;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-bottom: 20rpx;
					image {
						width: 120rpx;
						height: 120rpx;
					}
					text {
						color: #333;
					}
				}
			}
		}
	}
}
</style>
