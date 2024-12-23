import http from '../utils/ajax.js';
const homeApi = {
	memberIndex(data){
		return http({
			url: 'api/member/index',
			data,
			method: 'POST',
			loadType: 2
		});
	},
	matchSet(data){
		return http({
			url: 'api/member/matchSet',
			data,
			method: 'POST',
			loadType: 2
		});
	},
	getMatchSet(){
		return http({
			url: 'api/member/getMatchSet',
			method: 'POST',
			loadType: 2
		});
	},
	like(guest_id) {
		return http({
			url: 'api/member/like',
			data: { guest_id },
			method: 'POST',
			loadType: 2
		});
	},
	dislike(guest_id) {
		return http({
			url: 'api/member/dislike',
			data: { guest_id },
			method: 'POST',
			loadType: 2
		});
	}
}
export default homeApi