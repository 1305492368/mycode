/**
 * 搜索
 * create by 尤涛 2020-07-08
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

const modal = {
	/**
	 * 获取热搜关键词
	 */
	async get(){
		const res = await db.collection('mix-search-keyword')
			.where({
				status: 1
			})
			.orderBy('count', 'desc')
			.get();
		return res;
		
	},
	/**
	 * 更新热搜关键词
	 */
	async update(request){
		const name = request.keyword;
		let res = await db.collection('mix-search-keyword')
			.where({
				name
			})
			.limit(1)
			.get();
		if(res.data.length === 1){
			res = await db.collection('mix-search-keyword').where({
				name
			}).update({
				count: dbCmd.inc(1)
			})
		}else{
			res = await db.collection('mix-search-keyword').add({
				name,
				status: 1,
				count: 1
			})
		}
	},
}

module.exports = modal;