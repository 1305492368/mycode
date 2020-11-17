<template>
	<view class="wrapper">
		<SearchBar @search="toSearchList" />
		<view class="history-search">
			<view class="title">
				<text class="title">历史搜索</text>
				<icon type="clear" size="18" @click="clearHistory"></icon>
			</view>
			<view>
				<view v-for="(item, index) in keywordList" :key="index" @click="toSearchList(item)">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import SearchBar from '../../components/SearchBar';

const HISTORY_KEY = 'history';

export default {
	data() {
		return {
			keywordList: [] //一定要给默认值
		};
	},
	components: {
		SearchBar
	},
	onHide() {
		// 页面隐藏时storage=>data属性
		// onHide执行时机，跳转动画开始之前
		// this.keywordList = uni.getStorageSync(HISTORY_KEY) || [];
	},
	onShow() {
		// 页面初始化时，返回到此页面时也会执行
		this.keywordList = uni.getStorageSync(HISTORY_KEY) || [];
	},
	methods: {
		// 清空历史搜索
		clearHistory() {
			uni.showModal({
				title: '提示',
				content: '你确认要清空历史搜索吗？',
				success: res => {
					console.log(res);
					if (res.confirm) {
						// 用户确定了
						uni.removeStorageSync(HISTORY_KEY); //清空storage
						this.keywordList = []; //改变界面
					}
				}
			});
		},
		// 跳转到搜索列表
		toSearchList(inputVal) {
			// // 插入到头部并去重
			// let _keywordList = [...new Set([inputVal, ...this.keywordList])];
			// //存到storage
			// uni.setStorageSync(HISTORY_KEY, _keywordList);
			uni.navigateTo({
				url: '/pages/search_list/search_list?catName=' + inputVal
			});
		}
	}
};
</script>

<style lang="less">
.search {
	background-color: #eee;
	padding: 30rpx 15rpx;
	display: flex;
	justify-content: space-between;
	font-size: 28rpx;
	position: relative;
	icon {
		position: absolute;
		top: 50rpx;
		left: 38rpx;
	}
	input {
		height: 60rpx;
		flex: 1;
		background-color: #fff;
		padding-left: 70rpx;
		box-sizing: border-box;
		border-radius: 4rpx;
	}
	button {
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
		border: 1rpx solid #bfbfbf;
		background-color: #eee;
		margin-left: 20rpx;
	}
}

.history-search {
	color: #333;
	font-size: 28rpx;
	padding: 30rpx 30rpx 30rpx 15rpx;
	.title {
		display: flex;
		justify-content: space-between;
	}

	view {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30rpx;
		view {
			height: 64rpx;
			line-height: 64rpx;
			padding: 0 26rpx;
			background-color: #ddd;
			margin: 0 30rpx 16rpx 0;
		}
	}
}
</style>
