/**
 * 演示用 用户自助发货模块，商用请关闭本模块
 * create by 尤涛 2020-07-30
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();

const modal = {
	/**
	 * 获取物流公司列表
	 */
	async getExpressComp(){
		const res = await db.collection('mix-express').get();
		return res;
	},
	/**
	 * 订单发货
	 * @param {Object} request
	 * @param {String} request.order_id
	 * @param {String} request.shipper_code 物流公司代码
	 * @param {String} request.shipper_name 物流公司名称
	 * @param {String} logistic_code 快递单号
	 */
	async deliveryOrder(request, ext){
		const {order_id, shipper_code, shipper_name, logistic_code} = request;
		const orderData = await db.collection('mix-order').doc(order_id).get();
		const order = orderData.data[0];
		if(order.status !== 1){
			return {
				status: 0,
				msg: '订单状态错误'
			}
		}
		const timeline = order.timeline;
		timeline.unshift({
			time: + new Date(),
			title: '订单已发货',
			tip: '您的宝贝已由' + shipper_name + '护送出发了哦',
			type: '订单发货'
		})
		const res = await db.collection('mix-order')
			.doc(order_id)
			.update({
				status: 2,
				status_tip: shipper_name + '已揽收，正在配送中..',
				shipper_code,
				logistic_code,
				timeline
			})
		return res.updated === 1 ? {
			status: 1,
			msg: '发货成功'
		}:{
			status: 0,
			msg: '发货失败'
		}
	}
}

module.exports = modal;