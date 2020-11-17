/**
 * 产品收藏
 * create by 尤涛 2020-07-13
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

const ratingDb = db.collection('mix-rating');

const modal = {
	/**
	 * 获取评价列表
	 * @param {Object} request
	 * @param {String} request.product_id 产品id
	 * @param {Number} request.offset
	 * @param {Number} request.limit
	 * @param {Number} request.type 排序
	 */
	async get(request){
		const {product_id, offset, limit, type} = request;
		const map = {
			product_id,
			is_disabled: dbCmd.neq(1)
		}
		switch(type){
			case 1:
				map.rating = dbCmd.gte(4);
				break;
			case 2:
				map.rating = dbCmd.eq(3);
				break;
			case 3:
				map.rating = dbCmd.lte(2);
				break;
			case 4:
				map.imageSize = dbCmd.gt(0)
				break;
		}
		const $ = db.command.aggregate
		const res = await ratingDb.aggregate()
			.addFields({
				imageSize: $.size('$images')
			})
			.match(map)
			.sort({
				add_time: -1
			})
			.skip(offset)
			.limit(limit)
			.lookup({
				from: "mix-uni-id-users",
				localField: "uid",
				foreignField: "_id",
				as: 'user'
			})
			.unwind('$user')
			.end();
		return res;
	},
	/**
	 * 获取评价数量
	 * @param {Object} request
	 * @param {String} request.product_id 产品id
	 */
	async count(request, ext){
		const res = await ratingDb
			.where({
				product_id: request.product_id
			})
			.field({
				rating: 1,
				images: 1
			})
			.get()
		const data = res.data;
		return [
			0,
			data.filter(item=> item.rating >= 4).length,
			data.filter(item=> item.rating == 3).length,
			data.filter(item=> item.rating <= 2).length,
			data.filter(item=> item.images && item.images.length > 0).length,
		]
	},
	/**
	 * 获取详情评价信息
	 * @param {Object} request
	 * @param {String} request.product_id 产品id
	 */
	async getDetailRating(request){
		const ratingData = await ratingDb.aggregate()
			.match({
				product_id: request.product_id
			})
			.sort({
				rating: -1,
				add_time: -1
			})
			.limit(1)
			.lookup({
				from: "mix-uni-id-users",
				localField: "uid",
				foreignField: "_id",
				as: 'user'
			})
			.unwind('$user')
			.end();
		if(ratingData.data.length === 0){
			return {
				data: null,
				count: 0,
			}
		}
		const countData = await ratingDb.where({
			product_id: request.product_id
		}).count();
		
		return {
			data: ratingData.data[0],
			count: countData.total
		};
	},
	
}

module.exports = modal;