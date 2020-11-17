/**
 * 文章 协议
 * create by 尤涛 2020-07-06
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

const modal = {
	/**
	 * 获取协议
	 * @param {Object} request
	 * @param {Number} request.type 1用户服务协议 2隐私权政策
	 */
	async getAgreement(request){
		const types = [
			'用户服务协议', 
			'隐私权政策'
		]
		const res = await db.collection('mix-article')
			.where({
				name: types[request.type - 1]
			})
			.limit(1)
			.get();
		return res.data.length > 0 ? {
			status: 1,
			data: res.data[0]
		}: {
			status: 0
		}
		
	},
}

module.exports = modal;