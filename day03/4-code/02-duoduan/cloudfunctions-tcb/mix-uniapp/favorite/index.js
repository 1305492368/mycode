/**
 * 产品收藏
 * create by 尤涛 2020-07-13
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

const favoriteDb = db.collection('mix-favorite');

const modal = {
	/**
	 * 获取收藏列表
	 * @param {Object} request
	 * @param {Number} request.offset
	 * @param {Number} request.limit
	 * @param {String} request.date 日期 2020-07-20
	 */
	async get(request, ext){
		const {offset, limit} = request;
		const res = await favoriteDb.aggregate()
			.match({
				uid: ext.uid
			})
			.sort({
				add_time: -1
			})
			.skip(offset)
			.limit(limit)
			.lookup({
				from: "mix-product",
				localField: "product_id",
				foreignField: "_id",
				as: 'product'
			})
			.unwind('$product')
			.end();
		return res;
	},
	/**
	 * 添加收藏
	 * @param {Object} request
	 * @param {String} request.id 产品id
	 */
	async add(request, ext){
		const has = await favoriteDb
			.where({
				product_id: request.product_id,
				uid: ext.uid
			})
			.limit(1)
			.get();
		if(has.data.length > 0){
			return {
				status: 1
			}
		}
		const res = await favoriteDb
			.add({
				add_time: + new Date(),
				product_id: request.product_id,
				uid: ext.uid
			})
		return res.id ? {
			status: 1
		}: {
			status: 0
		}
	},
	/**
	 * 取消收藏
	 * @param {Object} request
	 * @param {String} request.id 产品id
	 */
	async remove(request, ext){
		const res = await favoriteDb
			.where({
				product_id: request.product_id,
				uid: ext.uid
			})
			.remove()
		return res.deleted === 1 ? {
			status: 1
		}: {
			status: 0
		}
	}
}

module.exports = modal;