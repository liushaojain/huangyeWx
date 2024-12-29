import {userStore} from "@/store/account/userInfo.js"
import {basehost} from "@/utils/util.js"
var fag4=false;
let reuqestcont=0;
const request = ({url , data , method , ContentType, loadType,iscomplete})=>{
	if(loadType){
		reuqestcont++;		
	}
	if(reuqestcont==1){
		uni.showLoading({
		    title: loadType==2?'登录中':'加载中',
			mask: true
		});
	}
	let header={miniApp:"new_diy",businessId:uni.getStorageSync('businessId')||''}
	if(userStore.state.token){
		header['Authorization']="Bearer "+userStore.state.token
	}
	if(ContentType){
		header['Content-Type']='application/x-www-form-urlencoded'
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: basehost + url,
			data: data,
			method:method,
			header: header,
			success: (res) => {
				console.log(`请求地址：${url}`);
				console.log(`请求头：`, header);
				console.log(`请求数据：`, data);
				console.log(`响应数据：`, res.data);
				if(loadType){
					reuqestcont--;
					if(reuqestcont==0){
						uni.hideLoading();
					}	
				}
				if(iscomplete){
					return resolve(res.data);
				}
				if(res.data.status === 1){
					return resolve(res.data);
				} else {
					if(res.data.message){
						uni.showToast({
							title: res.data.message || '出现了问题，请稍后重试。',
							icon: 'none'
						});
					}
					return reject(res.data);
				}
			},
			fail:(res)=>{
				console.log(`请求地址：${url}`);
				console.log(`请求头：`, header);
				console.log(`请求数据：`, data);
				console.log(`响应错误：`, res);
				reuqestcont--;
				if(reuqestcont==0){
					uni.hideLoading();
				}
			}
		});	
	})	
}
export default request