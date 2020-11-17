/**
 * 版本管理
 * create by 尤涛 2020-09-03
 * qq 472045067
 */
'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

const modal = {
	/**
	 * 检查新版本
	 * @param {Object} request
	 * @param {String} request.version 当前版本 1.0.0
	 */
	async check(request){
		const {
			platform,
			version
		} = request;
		const res = await db.collection('mix-version')
			.where({
				platform: platform || 'android',
				version: dbCmd.gt(+version.replace(/\./g, ''))
			})
			.orderBy('version', 'desc')
			.limit(1)
			.get()
		
		console.log('---000-----------');
		console.log(version.replace(/\./g, ''));
		console.log('---1111-----------');
		console.log(res);
		console.log('---2222-----------');
		
		
		if(res.data.length === 0){
			return {
				status: 0,
				msg: '当前已是最新版本'
			}
		}
		return {
			status: 1,
			data: {
				...res.data[0],
				version: (''+res.data[0].version).split('').join('.')
			}
		}
	},
}

module.exports = modal;