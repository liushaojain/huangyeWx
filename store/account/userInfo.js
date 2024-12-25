import Vue from 'vue'
import Vuex from 'vuex'
import ImManager from '../../pages/info/utils/imManager.js'

Vue.use(Vuex)

const actions = {}
const mutations = {
    setUserInfo: (state,userInfo) => {
        state.userInfo = userInfo
		loginIM(userInfo.id);
		uni.setStorageSync("userInfo",userInfo)
    },
	setToken: (state,token) => {
	    state.token = token
		uni.setStorageSync("token",token)
	},
	setEnum: (state,Enum) => {
	    state.Enum = Enum
		uni.setStorageSync("Enum",Enum)
	}
}
const state = {
    userInfo: uni.getStorageSync("userInfo") || {},
	token:uni.getStorageSync("token") || "",
	Enum:uni.getStorageSync("Enum") || "",
	
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    userInfo: (state) => state.userInfo,
    token: (state) => state.token,
	Enum: (state) => state.Enum,
}

const userStore = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})

const loginIM = (id) => {
	console.log("初始化IM-1", id);
	console.log("初始化IM-1", state);
	const userID = id || state.userInfo.id;
	console.log("初始化IM-2", userID);
	if (!userID) return;
	ImManager.getInstance().init({
		SDKAppID: "1600067113",
		userID: `${userID}`
	});
}
loginIM();
export { userStore }