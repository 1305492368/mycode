/**
 * 产品
 * create by 尤涛 2020-07-06
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

const productDb = db.collection('mix-product');

const modal = {
	/**
	 * 分类页 获取产品详情
	 * @param {Object} request
	 * @param {String} request.id 产品id
	 */
	async getDetail(request, ext){
		const res = await productDb.aggregate()
			.match({
				_id: request.id,
				is_del: 0
			})
			.limit(1)
			.lookup({
				from: "mix-sku",
				localField: "_id",
				foreignField: "product_id",
				as: 'sku'
			})
			.end();
		//限制产品处理
		if(res.data.length === 0){
			return {
				status: 0,
				msg: '没有找到相关产品'
			}
		}
		if(res.data[0].is_del === 1){
			return {
				status: 0,
				msg: '产品已经下架，去看看其他产品吧~'
			}
		}
		//浏览量+1
		await productDb.where({_id: request.id}).update({look_num: dbCmd.inc(1)})
		//登录用户获取收藏信息
		if(ext.uid){
			const fav = await db.collection('mix-favorite')
				.where({
					uid: ext.uid,
					product_id: request.id
				})
				.limit(1)
				.get()
			if(fav.data.length === 1){
				res.data[0].fav = 1;
			}
		}
		return {
			status: 1,
			data: res.data[0]
		}
	},
	/**
	 * 分类页 获取产品列表
	 * @param {Object} request
	 * @param {Number} request.offset
	 * @param {Number} request.limit
	 * @param {sort_type} request.sort_type 排序类型 1默认 2销量优先 3价格升序 4价格降序 5好评优先
	 * @param {cate_id} request.first_cate_id 产品一级分类id
	 * @param {cate_id} request.cate_id 产品二级分类id
	 * @param {keyword} request.keyword 搜索关键字
	 */
	async getList(request){
		const {offset, limit, sort_type, first_cate_id, cate_id, keyword, is_hot} = request;
		
		//排序
		const orderBy = [
			{field: 'add_time', type: 'desc'},
			{field: 'sales', type: 'desc'},
			{field: 'price', type: 'asc'},
			{field: 'price', type: 'desc'},
			{field: 'rating', type: 'desc'},
		][(sort_type || 1) - 1]
		//筛选
		const map = {
			is_sales: 1,
			is_del: 0
		}
		if(first_cate_id) map.first_cate_id = first_cate_id;
		if(cate_id) map.cate_id = cate_id;
		if(keyword) map.title = new RegExp(keyword);
		if(is_hot == 1) map.is_hot = 1;
		
		const res = await productDb
			.skip(offset)
			.limit(limit)
			.orderBy(orderBy.field, orderBy.type)
			.where(map)
			.field({
				thumb: 1,
				title: 1,
				price: 1,
				market_price: 1,
				freight_template: 1
			})
			.get();
			
		return res;
	},
	/**
	 * 获取首页热门推荐列表
	 * @param {Number} request.offset
	 * @param {Number} request.limit
	 */
	async getHotList(request){
		const res = await productDb
			.skip(request.offset)
			.limit(request.limit)
			.orderBy('add_time', 'desc')
			.where({
				is_sales: 1,
				is_del: 0,
				is_hot: 1
			})
			.field({
				thumb: 1,
				title: 1,
				price: 1,
				market_price: 1,
				freight_template: 1
			})
			.get();
			
		return res;
	},
	/**
	 * 获取分类
	 */
	async getCategory(){
		const res= await db.collection('mix-product-category')
			.where({
				status: 1
			})
			.orderBy('sort', 'desc')
			.get();
		const resList = res.data;
		const list = resList.filter(item=> !item.parent_id);
		list.forEach(item=> {
			item.child = resList.filter(val=> val.parent_id === item._id);
		})
		return list;
	},
	/**
	 * 根据一级分类获取二级分类
	 * @param {Object} request
	 * @param {String} id 一级分类id
	 */
	async getSecondCategory(request){
		const res= await db.collection('mix-product-category')
			.where({
				status: 1,
				parent_id: request.id
			})
			.orderBy('sort', 'desc')
			.get();
		return res;
	}
}

module.exports = modal;