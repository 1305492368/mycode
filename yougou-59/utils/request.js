// 将网络请求封装起来
export default function myrequest({ url, method, data, hasLoading = true }) {
	// 封装为一个 promise 对象
	return new Promise((resolve, reject) => {
		// 判断是否需要 loading
		if (hasLoading) {
			// 发送请求之前添加加载效果
			uni.showLoading({
				title: '加载中...'
			})
			uni.showNavigationBarLoading()
		}
		uni.request({
			url: url,
			method: method,
			data: data,
			success: (res) => {
				// 将返回的数据进行解构
				var {
					message,
					meta
				} = res.data
				// 判断返回的状态是否是 200
				if (meta.status === 200) {
					// 保存数据
					resolve(message)
					if (hasLoading) {
						// 关闭加载效果
						uni.hideLoading()
						uni.hideNavigationBarLoading()
					}
				} else {
					reject()
				}
			}
		})
	})
}
