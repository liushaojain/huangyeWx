<template>
	<view class="container">
		<view class="flex-between title"
			:style="{paddingTop: statusBarHeight+'px',height:titleHeight+'px',background:bgColor}">
			<text class="txt">荒野</text>
			<view class="search" @tap="handleSetting">
				<image class="img" src="https://marries.oss-cn-beijing.aliyuncs.com/life_photo/AEK1PLYDwdoFb6ad46b79acd577983ed3d413c45510b.png" mode=""></image>
			</view>
		</view>
		<homeContent v-if="isLogin"></homeContent>
		<otherInfo v-if="isLogin"></otherInfo>
		<view class="footerBtn" v-if="isLogin">
			<view class="item">
				<image class="img" @tap="handleNext" :src="imgBaseUrl+'Group713@2x.png'" mode=""></image>
			</view>
			<view class="item">
				<image class="img" @tap="handleLove" :src="imgBaseUrl+'Group714@2x.png'" mode=""></image>
			</view>
		</view>
		<view class="no-login-view" v-if="!isLogin">
			<image class="img" src="../../static/img/logo.png"></image>
			<image class="img-text" src="../../static/img/loginText.png" mode="aspectFill"></image>
			<view @tap="handleLogin" class="button">前往登录</view>
		</view>
	</view>
</template>
<script>
	import homeContent from './components/homeContent.vue'
	import otherInfo from './components/otherInfo.vue'
	import { EventBus } from './components/eventBus'
	export default {
		components: {
			homeContent,
			otherInfo
		},
		data() {
			return {
				memberList: [],
				memberIndex: 0,
				statusBarHeight: '',
				titleHeight: 44,
				headHeight: '',
				bgColor: '',
				memberInfo:{}
			}
		},
		computed: {
			avartImage(){
				if(this.memberInfo.hasOwnProperty('profile')){
					return this.memberInfo.profile.user_avatar
				}else{
					return this.imgBaseUrl + 'Group1000010746@2x.png'
				}
			},
		},
		onShow() {
			uni.getSystemInfo({
				success: (info) => {
					var statusBarHeight = info.statusBarHeight;
					this.statusBarHeight = statusBarHeight;
					this.headHeight = info.statusBarHeight + this.titleHeight;
				}
			});
		},
		onLoad() {
			 EventBus.$on('laod_basic_member', (data) => {
				console.log('接收到事件传递的数据:', data);
				this.memberInfo = data;
			});
		},
		methods: {
			handleSetting() {
				if (this.isLogin) {
					this.to('/pages/home/search/index');
				} else {
					this.handleLogin();
				}
			},
			handleNext() {
				EventBus.$emit('dislike');
			},
			handleLove() {
				EventBus.$emit('like');
			},
			getmember() {
				const memberList = this.$apis.homeApi.memberIndex({
					page: '1',
					pageSize: '10'
				});
				this.memberList = memberList;
			},
		},
		onPageScroll(e) {
			if (e.scrollTop >= 35) {
				this.bgColor = 'white'
			} else {
				this.bgColor = 'transparent'
			}
		},
	}
</script>
<style lang="scss" scoped>
	@import "./index.scss";
	.no-login-view {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-top: 300rpx;
		.img {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 40rpx;
		}
		.img-text {
			width: 576rpx;
			height: 41rpx;
			margin-bottom: 160rpx;
		}
		.button {
			width: 650rpx;
			margin: auto;
			height: 88rpx;
			background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
			border-radius: 200rpx 200rpx 200rpx 200rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 88rpx;
			text-align: center;
		}
	}
</style>