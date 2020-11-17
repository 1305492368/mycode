'use strict';
/**
 * 手机验证码核验
 * @param {String} code 验证码
 * @param {String} mobile 手机号码
 * @return {Boolean}
 * create by 尤涛 2020-07-08
 * qq 472045067
 */
module.exports = async (code, mobile) => {
	if(code === '888888'){
		//测试用 888888
		return true;
	}
	const res = await uniCloud.database()
		.collection('mix-ali-mobile-code')
		.where({
			mobile
		})
		.limit(1)
		.get();
		
	if(res.data.length === 1 && res.data[0].code === code && res.data[0].expires_time > + new Date()){
		return true;
	}
	return false;
}