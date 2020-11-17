'use strict';

const uniID = require('uni-id');

const modules = {
	article: require('./article'),
	advert: require('./advert'),
	product: require('./product'),
	cart: require('./cart'),
	search: require('./search'),
	favorite: require('./favorite'),
	feedback: require('./feedback'),
	rating: require('./rating'),
	notice: require('./notice'),
	version: require('./version'), 
	express: require('./express'), //演示用用户模拟发货，商用请关闭本模块
}

const tokenGroup = {
	cart: [
		'add',
		'remove',
		'removeAll',
		'updateNumber',
		'updateCheck',
		'count'
	],
	favorite: [
		'add',
		'remove',
		'get'
	],
	feedback: [
		'add'
	]
}
const userGroup = {
	product: [
		'getDetail'
	],
	cart: [
		'get'
	],
}
exports.main = async (event, context) => {
	const ext = {
		event,
		context
	}
	const {
		module, 
		operation, 
		data, 
		uniIdToken
	} = event;
	if(tokenGroup[module] && tokenGroup[module].includes(operation)){
		//token检查
		let payload = await uniID.checkToken(uniIdToken);
		if (payload.code && payload.code > 0) {
			return {
				op: 'token 检查失败',
				...payload
			}
		}
		ext.uid = payload.uid;
		ext.userInfo = payload.userInfo;
	}else if(userGroup[module] && userGroup[module].includes(operation)){
		//追加用户信息
		let payload = await uniID.checkToken(uniIdToken);
		ext.uid = payload.uid;
		ext.userInfo = payload.userInfo;
	}
	
	return modules[module][operation](data, ext);
};