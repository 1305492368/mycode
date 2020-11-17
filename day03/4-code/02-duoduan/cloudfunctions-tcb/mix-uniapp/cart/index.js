/**
 * 购物车
 * create by 尤涛 2020-07-13
 * qq 472045067
 */
'use strict';

const publicLib = require('../public/public');

const db = uniCloud.database();
const dbCmd = db.command;

const cartDb = db.collection('mix-cart');

const modal = {
	/**
	 * 加入购物车
	 * @param {Object} request
	 * @param {String} request.product_id 产品id
	 * @param {Object} request.sku 规格
	 * @param {Number} request.number 数量
	 */
	async add(request, ext){
		const {product_id, sku, number} = request;
		//检查商品状态
		const product = await publicLib.getProduct({
			product_id, sku, number
		});
		if(product.status === 0){
			return product;
		}
		const data = {
			uid: ext.uid,
			product_id,
			sku_id: sku._id
		}
		//已存在修改数量
		let res = await cartDb
			.where(data)
			.update({
				add_time: + new Date(),
				number
			})
		if(res.updated === 1){
			return {
				status: 1,
				msg: '购物车数量已更新'
			}
		}
		const countData = await cartDb.where({
			uid: ext.uid,
		}).count();
		if(countData.total >= 50){
			return {
				status: 0,
				msg: '购物车已经满了哦，去清理一下吧'
			}
		}
		//新增购物车
		res = await cartDb.add({
			add_time: + new Date(),
			number,
			checked: true,
			sku,
			...data
		})
		return res.id ? {
			status: 1,
			msg: '加入购物车成功'
		}: {
			status: 0,
			msg: '加入购物车失败'
		}
	},
	/**
	 * 删除购物车
	 * @param {Object} request 
	 * @param {Array} request.ids 购物车id数组
	 */
	async remove(request){
		const res =  await cartDb
			.where({
				_id: dbCmd.in(request.ids)
			})
			.remove()
		
		return res.deleted > 0 ? {
			status: 1,
			msg: '删除成功'
		}:{
			status: 0,
			msg: '购物车删除失败'
		}
	},
	/**
	 * 清空购物车
	 */
	async removeAll(request, ext){
		const res = await cartDb
			.where({
				uid: ext.uid
			})
			.remove()
		return res.deleted > 0 ? {
			status: 1,
			msg: '购物车已清空'
		}: {
			status: 0,
			msg: '购物车清除失败'
		}
	},
	/**
	 * 更新购物车数量
	 * @param {Object} request 
	 * @param {String} request.id 购物车id 
	 */
	async updateNumber(request){
		const res = await cartDb
			.doc(request.id)
			.update({
				number: request.number
			})
		return res.updated === 1 ? {
			status: 1
		}: {
			status: 0
		}
	},
	/**
	 * 更新购物车选中
	 * @param {Object} request 
	 * @param {Array} request.ids 购物车id数组
	 * @param {Boolean} request.checked 是否选中 
	 */
	async updateCheck(request){
		const res = await cartDb
			.where({
				_id: dbCmd.in(request.ids)
			})
			.update({
				checked: request.checked
			})
		return res.updated > 0 ? {
			status: 1
		}: {
			status: 0
		}
	},
	/**
	 * 获取购物车列表
	 */
	async get(request, ext){
		if(!ext.uid){
			return [];
		}
		const res = await cartDb
			.aggregate()
			.match({
				uid: ext.uid
			})
			.sort({
				add_time: -1
			})
			.lookup({
				from: "mix-product",
				localField: "product_id",
				foreignField: "_id",
				as: 'product'
			})
			.unwind('$product')
			.end();
			
		return publicLib.renderCartList(res.data);
	},
	/**
	 * 查询购物车数量
	 */
	async count(request, ext){
		const res = await cartDb
			.where({
				uid: ext.uid
			})
			.count();
		return res;
	},
	
	
}

module.exports = modal;