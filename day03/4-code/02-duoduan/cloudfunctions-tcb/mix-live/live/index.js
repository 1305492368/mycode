/**
 * 小程序直播模块
 * create by 尤涛 2020-07-30
 * qq 472045067
 */
'use strict';

const wxAuth = require('wx-auth');

const db = uniCloud.database();

const modal = {
	/**
	 * 获取直播列表
	 * @param {String} code 小程序code 
	 */
	async get(request, ext){
		const access_token = await wxAuth.getAccessToken();
		const url = 'https://api.weixin.qq.com/wxa/business/getliveinfo?access_token='+access_token;
		const res = await uniCloud.httpclient.request(url, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			data: {
				start: 0,
				limit: 10
			},
			dataType: 'json'
		})
		
		return res;
	}
}

module.exports = modal;