'use strict';
/**
 * 小程序直播管理模块
 * 
 */

const uniID = require('uni-id');
const modules = {
	live: require('./live'),
}

exports.main = async (event, context) => {
	const {module, operation, data, uniIdToken} = event;
	
	//token检查
	const payload = await uniID.checkToken(uniIdToken);
	/* if (payload.code && payload.code > 0) {
		return {
			op: 'token 检查失败',
			...payload
		}
	} */
	const ext = {
		event,
		context,
		uid: payload.uid
	}
	
	return modules[module][operation](data, ext);
};