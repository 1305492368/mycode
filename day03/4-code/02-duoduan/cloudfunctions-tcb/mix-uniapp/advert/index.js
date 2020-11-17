/**
 * 收货地址管理
 * create by 尤涛 2020-07-05
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();
const dbCmd = db.command;
const advertDb = db.collection('mix-advert');

const modal = {
	/**
	 * 获取首页导航
	 */
	async getNavList(){
		const res= await advertDb
			.where({
				type: 'navigator',
				status: 1
			})
			.orderBy('sort', 'desc')
			.get();
		return res;
	},
	/**
	 * 获取首页广告
	 */
	async getAdvertList(){
		const res= await advertDb
			.where({
				type: 'advert',
				status: 1
			})
			.orderBy('sort', 'desc')
			.get();
		return res;
	}
}

module.exports = modal;