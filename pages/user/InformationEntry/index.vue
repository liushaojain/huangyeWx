<template>
	<view class="container" :style="{'padding-top': statusBarHeight+'px'}">
		<view class="header">
			<u-navbar class="uNavbar" :autoBack="true" :title="pageList[pageIndex].title" :bgColor='bgColor' :height="titleHeight"></u-navbar>
		</view>
		<template v-if="!isFinished">
			<view class="hintImg">
				<image class="img" :src="imgBaseUrl+'loginText.png'" mode=""></image>
			</view>
			<view class="content" v-if="isLoaded">
				<BaseInfo :infoData="infoData" ref="BaseInfo" v-if="pageIndex===0"></BaseInfo>
				<MaritalStatus :infoData="infoData" ref="MaritalStatus" v-if="pageIndex===1"></MaritalStatus>
				<BeFondOf :infoData="infoData" ref="BeFondOf" v-if="pageIndex===2"></BeFondOf>			
				<Expects :infoData="infoData" ref="Expects" v-if="pageIndex===3"></Expects>
				<Avatar :infoData="infoData" ref="Avatar" v-if="pageIndex===4"></Avatar>
				<LifePhoto ref="LifePhoto" v-if="pageIndex===5"></LifePhoto>
				<AboutMe :infoData="infoData" ref="AboutMe" v-if="pageIndex===6"></AboutMe>
			</view>
			<view class="footer">
				<view class="infoListPage" v-if="type === 1">
					<text v-for="(item, index) in pageList" :key="index" class="item" @click="pageIndex = index" :class="{'active':index===pageIndex}"></text>
				</view>
				<button class="confirmBtn" @click="formSubmit">确定</button>
			</view>
		</template>
		<template v-else>
			<view class="finished-content">
				<view class="title">
					<view class="lobo-box">
						<image src="../../../static/img/logo.png" class="logo"></image>
						<view class="logo-text">
							荒野
						</view>
					</view>
					<image class="img" :src="imgBaseUrl+'loginText.png'" mode=""></image>
				</view>
				<view class="content">
					<image src="https://oss.derucci-smart.com/images/upload/success_1735357709088.png" class="img"></image>
					<view>资料已完善</view>
				</view>
				<view class="buttons">
					<view class="button" @tap="redirectTo('/pages/authentication/index')">
						去完成认证
					</view>
					<view class="button-text" @tap="back">
						先不认证
					</view>
				</view>
			</view>
		</template>

	</view>
</template>

<script>
	import BaseInfo from "./components/BaseInfo.vue"
	import MaritalStatus from "./components/MaritalStatus.vue"
	import BeFondOf from "./components/BeFondOf.vue"
	import Expects from "./components/Expect.vue"
	import Avatar from "./components/Avatar.vue"
	import LifePhoto from "./components/LifePhoto.vue"
	import AboutMe from "./components/AboutMe.vue"
	
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl,
				bgColor: 'transparent',
				statusBarHeight: '',
				titleHeight: 44,
				pageList: [
					{title: '基础信息', ref: 'BaseInfo'},
					{title: '婚姻信息', ref: 'MaritalStatus'},
					{title: '生活爱好', ref: 'BeFondOf'},
					{title: '期望中的他（她）', ref: 'Expects'},
					{title: '头像上传', ref:'Avatar'},
					{title: '上传生活照', ref:'LifePhoto'},
					{title: '关于我', ref:'AboutMe'},
					{title: '', ref:''},
				],
				pageIndex: 2,
				type: 1,
				infoData: {},
				isLoaded: false,
				isFinished: false
			}
		},
		components:{
			BaseInfo,
			MaritalStatus,
			BeFondOf,
			Expects,
			Avatar,
			LifePhoto,
			AboutMe
		},
		onShow() {
			
		},
		onLoad(e) {
			// if(e.pageIndex){
			//   this.type = 2
            // }

			this.pageIndex = parseInt(e.pageIndex);
			uni.getSystemInfo({
			  success: (info) => {
				this.statusBarHeight = info.statusBarHeight + this.titleHeight;
			  }
			});
			uni.setNavigationBarTitle({
				title: this.pageList[this.pageIndex]
			})
			if(this.isLogin) {
				this.getBasic();
			}
		},
		onPageScroll(e) {
			if(e.scrollTop >= 35){
				this.bgColor = 'white'
			}else{
				this.bgColor = 'transparent'
			}
		},
		methods:{
			async getBasic(){
				const data = await this.getBasicInfoData();
				this.isLoaded = true;
				this.infoData = data;
			},
			redirectTo(url) {
				uni.redirectTo({
					url
				})
			},
			back() {
				uni.navigateBack();
			},
			async formSubmit(){
				const activePage = this.pageList[this.pageIndex];
				const ref = activePage.ref;
				const data = await this.$refs[ref].submit();
				console.log(this.pageIndex)
				if(this.type === 1){
					if(data && data.status==1 && this.pageIndex < 6){
						this.pageIndex++;
					}else if(this.pageIndex >= 6){
						this.pageIndex++;
						this.isFinished = true;
					}	
				}else{
					uni.navigateBack()
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>