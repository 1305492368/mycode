/**
 * 收货地址管理
 * create by 尤涛 2020-07-05
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();

const noticeDb = db.collection('mix-notice');

const modal = {
	/**
	 * 获取通知列表
	 * @param {Object} request
	 * @param {Number} request.offset
	 * @param {Number} request.limit
	 */
	async getList(request, ext){
		const {offset, limit} = request;
		const res = await noticeDb
			.where({
				status: 1
			})
			.orderBy('add_time', 'desc')
			.skip(offset)
			.limit(limit)
			.get();
		
		return {
			status: 1,
			data: res.data.map(item=> {
				item.content = item.content.replace(/<\/?.+?>/g, '');
				item.content = item.content.replace(/ /g, '');
				item.content = item.content.replace(/&nbsp;/g, '');
				item.content = item.content.replace(/\n/g, '');
				return item;
			})
		};
	},
	/**
	 * 获取通知详情
	 * @param {Object} request
	 * @param {String} request.id
	 */
	async getDetail(request){
		const res = await noticeDb.doc(request.id).get();
		if(res.data.length === 0){
			return {
				status: 0,
				msg: '通知不存在'
			}
		}
		const noticeDetail = res.data[0];
		return {
			status: 1,
			data: {
				title: noticeDetail.name,
				...noticeDetail
			}
		}
	}
	
}

module.exports = modal;