<template>
	<view class="search-box">
		<input type="text" :value="mykey" confirm-type="search" @input="myinput" @confirm="search" />
		<icon class="look" type="search" size="16"></icon>
		<icon @click="fn" v-show="mykey.trim().length > 0" class="cross" type="cancel" size="16"></icon>
	</view>
</template>

<script>
	export default {
		props: ['kkey'],
		data() {
			return {
				mykey: this.kkey
			}
		},
		watch: {
			kkey() {
				this.mykey = this.kkey
			}
		},
		methods: {
			search () {
				// 调用父组件中的 search 方法
				this.$emit('search', this.mykey)
			},
			fn () {
				this.mykey = ''
			},
			// 每次在输入框中输入内容都会触发
			myinput (e) {
				this.mykey = e.target.value
				this.$emit('input', this.mykey)
			}
		}
	}
</script>

<style lang="less" scoped>
	.search-box {
		padding: 30rpx 16rpx;
		background-color: #eee;
		position: relative;

		input {
			padding-left: 80rpx;
			padding-right: 80rpx;
			height: 60rpx;
			background-color: #fff;
		}

		.look {
			position: absolute;
			top: 50%;
			left: 50rpx;
			transform: translateY(-50%);
		}
		.cross {
			position: absolute;
			top: 50%;
			right: 50rpx;
			transform: translateY(-50%);
		}
	}
</style>
