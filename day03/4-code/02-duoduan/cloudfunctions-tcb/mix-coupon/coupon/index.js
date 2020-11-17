/**
 * 优惠券
 * create by 尤涛 2020-08-26
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 处理领券列表优惠券状态
 * @param {Array} receiveIds 用户已领取id数组
 * @param {Object} data
 * @param {Number} status 1有效 2无效(后台禁用)
 * @param {timeStamp} end_time 
 * @return {Number} 1可领取 2已领取 3已过期 4已失效 5已领完
 */ 
const calcCouponStatus = (receiveIds, data)=>{
	const {
		_id,
		status,
		end_time,
		remain_number
	} = data;
	let state = 1,
		state_text = '立即领取';
	if(receiveIds.includes(_id)){
		state = 2;
		state_text = '已领取'
	}
	if(+ new Date > end_time){
		state = 3;
		state_text = '已过期'
	}
	if(status !== 1){
		state = 4;
		state_text = '已失效'
	}
	if(remain_number <= 0){
		state = 5;
		state_text = '已领完'
	}
	return {
		state,
		state_text
	}
}

const modal = {
	/**
	 * 获取用户优惠券列表
	 * @param {Object} request
	 * @param {Number} request.state 0全部 1已使用 2已过期
	 * @param {Number} request.offset
	 * @param {Number} request.limit
	 */
	async getUserCouponList(request, ext){
		const {
			offset,
			limit,
			state
		} = request;
		let map = {
			uid: ext.uid
		}
		if(state === 1){
			map.is_use = 1; //已使用
		}else if(state === 2){
			map.end_time = dbCmd.lte(+ new Date());
		}
		const res = await db.collection('mix-user-coupon')
			.where(map)
			.orderBy('add_time', 'desc')			.skip(offset)			.limit(limit)			.get();
			
		res.data.forEach(item=> {
			if(item.is_use === 1){
				item.state_text = '已使用'
			}else if(item.end_time <= + new Date){
				item.state_text = '已过期'
			}else{
				item.state = 1;
			}
		})	
		return res;
	},
	/**
	 * 获取用户可用优惠券数量
	 */
	async getUserCouponCount(request, ext){
		const res = await db.collection('mix-user-coupon')
			.where({
				uid: ext.uid,
				end_time: dbCmd.gt(+ new Date()),
				is_use: dbCmd.neq(1)
			})
			.count();
		return res;
	},
	/**
	 * 获取领券列表
	 * @param {Object} request
	 * @param {Number} request.offset
	 * @param {Number} request.limit
	 */
	async getList(request, ext){
		const {
			offset,
			limit
		} = request;
		const res = await db.collection('mix-coupon')
			.orderBy('add_time', 'desc')
			.skip(offset)
			.limit(limit)
			.get();
		
		//查询用户已领取
		let receiveIds = [];
		if(ext.uid){
			const userCouponData = await db.collection('mix-user-coupon')
				.where({
					uid: ext.uid
				})
				.field({
					coupon_id: true
				})
				.get();
			if(userCouponData.data.length > 0){
				receiveIds = userCouponData.data.map(item=> item.coupon_id);
			}
		}
		const list = res.data;
		list.forEach(item=> {
			let stateData = calcCouponStatus(receiveIds, item);
			item.state = stateData.state;
			item.state_text = stateData.state_text;
		})
		return {
			status: 1,
			data: list,
			receiveIds
		}
	},
	/**
	 * 领券
	 * @param {Object} request
	 * @param {Number} request.id 优惠券id
	 */
	async receiveCoupon(request, ext){
		const couponData = await db.collection('mix-coupon')
			.doc(request.id)
			.get();
		if(couponData.data.length === 0){
			return {
				status: 0,
				msg: '优惠券已失效'
			}
		}
		const coupon = couponData.data[0];
		if(coupon.status != 1){
			return {
				status: 0,
				msg: '优惠券已失效'
			}
		}
		if(coupon.remain_number <= 0){
			return {
				status: 0,
				msg: '剩余数量不足'
			}
		}
		const nowTime = + new Date();
		if(nowTime < coupon.start_time || nowTime > coupon.end_time){
			return {
				status: 0,
				msg: '不在可领取时间内'
			}
		}
		const userCoupon = await db.collection('mix-user-coupon')
			.where({
				uid: ext.uid,
				coupon_id: request.id
			})
			.get();
		if(userCoupon.data.length > 0){
			return {
				status: 0,
				msg: '您已领取该优惠券'
			}
		}
		//添加到用户优惠券表
		const transaction = await db.startTransaction();
		const {
			title,
			coupon_money,
			total_money,
			start_time,
			end_time,
		} = coupon;
		let res = await transaction.collection('mix-user-coupon').add({
			add_time: nowTime,
			uid: ext.uid,
			coupon_id: request.id,
			title,
			coupon_money,
			total_money,
			start_time,
			end_time
		});
		if(!res.id){
			await transaction.rollback();
			return {
				status: 0,
				msg: '更新用户优惠券信息失败'
			}
		}
		//减少优惠券剩余数量
		res = await transaction.collection('mix-coupon')
			.doc(request.id)
			.update({
				remain_number: dbCmd.inc(-1)
			})
		if(res.updated !== 1){
			await transaction.rollback()
			return {
				status: 0,
				msg: '优惠券数量更新失败'
			}
		}
		await transaction.commit()
		return {
			status: 1,
			msg: '优惠券领取成功'
		}
	}
}

module.exports = modal;