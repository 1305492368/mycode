<template>
	<view><button open-type="getUserInfo" @getuserinfo="wxLogin">点我登录</button></view>
</template>

<script>
export default {
	methods: {
		wxLogin(userInfoRes) {
			console.log(userInfoRes)
			// 获取用户信息
			let { encryptedData, signature, iv, rawData } = userInfoRes.detail;
			// 获取code
			uni.login({
				success: async loginRes => {
					let code = loginRes.code;
					// 发请求
					let data = await this.$request({
						url: '/api/public/v1/users/wxlogin',
						method: 'POST',
						data: {
							encryptedData,
							signature,
							iv,
							rawData,
							code
						}
					});

					// 存token，并且提示
					uni.setStorageSync('token', data.token);
					// 存储用户信息
					uni.setStorageSync('userInfo', userInfoRes.detail.userInfo);
					uni.showToast({
						title: '登录成功',
						success: () => {
							// 表示toast显示成功
							setTimeout(() => {
								uni.navigateBack();
							}, 1500);
						}
					});
				}
			});
		}
	}
};
</script>

<style></style>
