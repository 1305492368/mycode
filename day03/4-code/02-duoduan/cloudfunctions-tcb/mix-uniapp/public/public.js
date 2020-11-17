/**
 * 多模块共享函数
 * create by 尤涛 2020-07-14
 * qq 472045067
 */

'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 获取产品信息 检查商品状态
 * @param {Object} param
 * @param {String} param.product_id 产品id
 * @param {Object} param.sku 规格
 * @param {Number} param.number 数量
 */
const getProduct = async param=>{
	const {product_id, sku, number} = param;
	const res = await db.collection('mix-product')
		.where({
			_id: product_id
		})
		.get();
	if(res.data.length === 0){
		return {
			status: 0,
			msg: '没有找到相关产品'
		}
	}
	const product = res.data[0];
	if(product.is_del === 1 || product.is_sales != 1){
		return {
			status: 0,
			msg: '产品已下架'
		}
	}
	if(product.stock < number){
		return {
			status: 0,
			msg: '产品库存不足'
		}
	}
	const skuRes = await db.collection('mix-sku').doc(sku._id).get();
	if(skuRes.data.length === 0){
		return {
			status: 0,
			msg: '所选规格不存在',
			skuRes,
			sku_id: sku._id + '--'
		}
	}
	if(skuRes.data[0].stock < number){
		return {
			status: 0,
			msg: '规格库存不足'
		}
	}
	return product;
}
/**
 * 处理购物车商品规格 检查商品状态
 * @param {Array} cartList 购物车数组
 * @return {Array} 用于渲染的数组
 */
const renderCartList = async cartList=>{
	const list = [];
	const skuRes = await db.collection('mix-sku').where({
		_id: dbCmd.in(cartList.map(item=> item.sku._id))
	}).get();
	const skuList = skuRes.data;
	for(let item of cartList){
		const product = item.product;
		let newCurSku = {};
		let invalid = false;
		//检查商品状态
		if(product.is_del === 1 || product.is_sales !== 1){
			invalid = '商品已下架'; //已下架或删除
		}else if(!skuList.some(sku=> sku.product_id === item.product_id)){
			invalid = '商品已更新'; //规则不存在
		}else{
			newCurSku = skuList.filter(sku=> sku.product_id === item.product_id)[0];
			if(newCurSku.stock < item.number){
				invalid = '库存不足';
			}
		}
		list.push({
			...item,
			checked: !!item.checked,
			title: product.title,
			image: product.thumb,
			price: item.sku.price || product.price,
			stock: newCurSku.stock,
			invalid
		});
	}
	return list;
}


/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
const date = (format, timeStamp) => {
	if('' + timeStamp.length <= 10){
		timeStamp = + timeStamp * 1000;
	}else{
		timeStamp = + timeStamp;
	}
	let _date = new Date(timeStamp),
		Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();
	
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key=>{
		return {Y,m,d,H,i,s}[key];
	});
}


module.exports = {
	getProduct,
	renderCartList,
}