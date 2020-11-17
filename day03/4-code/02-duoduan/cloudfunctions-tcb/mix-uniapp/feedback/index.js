/**
 * 收货地址管理
 * create by 尤涛 2020-07-05
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();

const modal = {
	/**
	 * 获取首页导航
	 * @param {Object} request
	 * @param {String} content 反馈内容
	 * @param {String} mobile 手机号 
	 * @param {String} name 姓名
	 * @param {Array} images 图片数组
	 */
	async add(request, ext){
		const res = await db.collection('mix-feedback').add({
			uid: ext.uid,
			username: ext.userInfo.username,
			add_time: +new Date(),
			...request
		})
		return res.id ? {
			status: 1,
			msg: '感谢您的反馈，确认后我们会及时与您取得联系'
		}: {
			status: 0,
			msg: '提交失败，请稍候再试'
		}
	}
	
}

module.exports = modal;