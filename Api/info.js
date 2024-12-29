import http from '../utils/ajax.js';
const infoApi = {
    // 我心动的
	myLove(data){
		return http({
			url: 'api/msg/myLove',
			data,
			method: 'POST',
			loadType: 1
		});
	},
    // 对我心动的
	loveMe(data){
		return http({
			url: 'api/msg/loveMe',
			data,
			method: 'POST',
			loadType: 1
		});
	},
    // 互相心动的
	likeEachOther(data){
		return http({
			url: 'api/msg/likeEachOther',
			data,
			method: 'POST',
			loadType: 1
		});
	},
    // 访客记录
	visitLog(data){
		return http({
			url: 'api/msg/visitLog',
			data,
			method: 'POST',
			loadType: 1
		});
	},
    // 访客记录
	// visitLog(data){
	// 	return http({
	// 		url: 'api/msg/visitLog',
	// 		data,
	// 		method: 'POST',
	// 		loadType: 1
	// 	});
	// },

    // 获取用户头像信息
	getUserList(id_list){
		return http({
			url: 'api/member/getUserList',
			data: { id_list },
			method: 'POST',
			loadType: 1
		});
	},
    // 用户消息签名
	getUserSig(member_id){
		return http({
			url: 'api/config/getUserSig',
			data: {
                member_id
            },
			method: 'POST',
			loadType: 1
		});
    },
	// 是否相互心动
	isLike(guest_id){
		return http({
			url: 'api/msg/isLike',
			data: {
                guest_id
            },
			method: 'POST',
			loadType: 1
		});
    },
	
}
export default infoApi