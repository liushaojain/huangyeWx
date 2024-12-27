import http from '../utils/ajax.js';
const uesrApi = {
	login(data){
		return http({
			url: 'api/login',
			data,
			method: 'POST',
			loadType: 2
		});
	},
	updateProfile(data){
		return http({
			url: 'api/member/updateProfile',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	updateDatingRequirements(data){
		return http({
			url: 'api/member/updateDatingRequirements',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	enum(data){
		return http({
			url: 'api/enum',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	setMarryInfo(data){
		return http({
			url: 'api/member/setMarryInfo',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	expectedHim(data){
		return http({
			url: 'api/member/expectedHim',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	setMemberHobbies(data){
		return http({
			url: 'api/member/setMemberHobbies',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	uploadPhoto(data){
		return http({
			url: 'api/member/uploadPhoto',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	updAvatar(data){
		return http({
			url: 'api/member/updAvatar',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	getOss(){
		return http({
			url: 'api/config/getOss',
			method: 'POST',
			loadType: 1
		});
	},
	basic(){
		return http({
			url: 'api/my/basic',
			method: 'POST',
			loadType: 1
		});
	},
	simple(){
		return http({
			url: 'api/my/simple',
			method: 'POST',
			loadType: 1
		});
	},

	getPhoto() {
		return http({
			url: 'api/member/getPhoto',
			method: 'POST',
			loadType: 1
		});
	},

	// 学历认证
	identificationEducation(files_list){
		return http({
			url: 'api/identification/education',
			data: { files_list },
			method: 'POST',
			loadType: 1
		});
	},
	// 房产认证
	identificationHourse(files_list){
		return http({
			url: 'api/identification/hourse',
			data: { files_list },
			method: 'POST',
			loadType: 1
		});
	},
	// 车辆认证
	identificationCar(files_list){
		return http({
			url: 'api/identification/car',
			data: { files_list },
			method: 'POST',
			loadType: 1
		});
	},
	// 婚姻认证
	identificationMarriage(files_list){
		return http({
			url: 'api/identification/marriage',
			data: { files_list },
			method: 'POST',
			loadType: 1
		});
	},
	// 工作认证
	identificationWork(files_list){
		return http({
			url: 'api/identification/work',
			data: { files_list },
			method: 'POST',
			loadType: 1
		});
	},

	// 收入认证
	identificationIncome(files_list){
		return http({
			url: 'api/identification/income',
			data: { files_list },
			method: 'POST',
			loadType: 1
		});
	},


	// 人脸验证
	getFaceSign(data){
		return http({
			url: 'api/config/getFaceSign',
			data,
			method: 'POST',
			loadType: 1
		});
	},


	
	// 人脸验证
	getFaceResult(data){
		return http({
			url: 'api/config/getFaceResult',
			data,
			method: 'POST',
			loadType: 1
		});
	},

	// 获取具体用户信息
	getMemberDetail(data) {
		return http({
			url: 'api/member/memberDetail',
			data,
			method: 'POST',
			loadType: 1
		});
	}
	
}
export default uesrApi
