<template>
	<view class="mynum">
		<text @click="sub">-</text>
		<text>{{ value }}</text>
		<text @click="add">+</text>
	</view>
</template>

<script>
	export default {
		props: ['value', 'currentIndex'],
		methods: {
			// 减
			sub () {
				// 判断：this.value - 1 如果小于 1，则需要提示用户是否要删除
				if (this.value - 1 < 1) {
					// 触发一个事件，来执行父组件中的方法
					this.$emit('lessone', this.currentIndex)
					return
				}
				this.$emit('input', this.value - 1)
			},
			// 加
			add () {
				this.$emit('input', this.value + 1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.mynum {
		display: flex;
		text {
			width: 52rpx;
			height: 42rpx;
			border: 4rpx solid #666666;
			text-align: center;
			&:nth-child(2) {
				width: 80rpx;
				border: none;
			}
		}
	}
</style>
