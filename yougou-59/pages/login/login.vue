<template>
	<view>
		<button @click="login">点我登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 登录的接口需要
				encryptedData: '',
				rawData: '',
				iv: '',
				signature: '',
				code: ''
			}
		},
		methods: {
			login() {
				// 先得到登录接口需要的数据
				// 1.0 先得到 code
				wx.login({
					success: res => {
						this.code = res.code
						// 2.0 得到其它参数
						wx.getUserInfo({
							success: res2 => {
								this.encryptedData = res2.encryptedData
								this.rawData = res2.rawData
								this.iv = res2.iv
								this.signature = res2.signature
								// 完成登录操作：
								this.$http({
									url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
									method: 'POST',
									data: {
										encryptedData: this.encryptedData,
										rawData: this.rawData,
										iv: this.iv,
										signature: this.signature,
										code: this.code
									}
								}).then(res3 => {
									// 将 token 保存到服务器中
									wx.setStorageSync('token', res3.token)
									// 回到上一个页面
									wx.navigateBack()
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
