<template>
	<view class="header">
		<input type="text" confirm-type="search" v-model="inputVal" @confirm="confirmHandler" />
		<icon class="search-icon" type="search" size="16"></icon>
		<cover-view class="clear-icon" @click="clearInput">x</cover-view>
		<view class="clear-icon">
			<icon class="" type="clear" size="16" color="#ccc" v-if="inputVal" @click="clearInput"></icon>
		</view>
		
	</view>
</template>

<script>
export default {
	props: ['keyword'],
	data() {
		return {
			// 输入框的内容
			// 把prop作为inputVal的初始值
			inputVal: ''
		};
	},
	watch: {
		keyword(newValue) {
			this.inputVal = newValue;
		}
	},
	methods: {
		// 点击键盘右下角按钮触发的事件
		confirmHandler() {
			if (this.inputVal) {
				// 子传父
				this.$emit('search', this.inputVal);
			}
		},
		// 清空内容
		clearInput() {
			wx.showToast({
				title:'ok'
			})
			wx.hideKeyboard({
			  complete: res => {
			    this.inputVal = '';
			  }
			})
			
		}
	}
};
</script>

<style lang="less" scoped>
.header {
	height: 120rpx;
	background-color: #eee;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	input {
		background-color: #fff;
		height: 60rpx;
		width: 720rpx;
		padding-left: 74rpx;
		box-sizing: border-box;
	}
	.search-icon {
		position: absolute;
		left: 44rpx;
	}

	.clear-icon {
		position: absolute;
		right: 44rpx;
		z-index: 100;
		left: auto;
	}
}
</style>
