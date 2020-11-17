// 抽取基地址
// const BASE_URL = 'https://www.uinav.com'
const BASE_URL = 'https://api-ugo-dev.itheima.net'

// 公共请求方法
function request({
	url,
	data,
	method,
	isAuth,
	showLoading = true
}) {
	return new Promise((resolve) => {
		// 默认header={}
		let header = {}

		// 如果需要登录态,就传token
		if (isAuth) {
			// 取token
			let token = uni.getStorageSync('token')
			if (!token) {
				// 登录态,但是没有token,就跳转登录页面
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return
			}
			header.Authorization = token
		}

		if (showLoading) {
			// 请求前开启loading
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
		}

		uni.request({
			url: BASE_URL + url,
			data: data,
			method,
			// header
			header,
			// 尽量使用箭头函数
			success: res => {
				let {
					meta,
					message
				} = res.data;
				if (meta.status === 200) {
					//成功的数据
					resolve(message)
				}
			},
			complete: () => {
				if (showLoading) {
					// 关闭Loading
					uni.hideLoading()
				}
			}
		});
	})
}

export default request
