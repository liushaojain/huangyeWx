<template>
	<view class="container">
		<view class="flex-between title"
			:style="{paddingTop: statusBarHeight+'px',height:titleHeight+'px',background:bgColor}">
			<text class="txt">荒野</text>
			<view class="search" @tap="handleSetting">
				<image class="img" src="https://marries.oss-cn-beijing.aliyuncs.com/life_photo/AEK1PLYDwdoFb6ad46b79acd577983ed3d413c45510b.png" mode=""></image>
			</view>
		</view>
		<homeContent @onIdentification="onIdentification" :memberInfo="memberInfo" v-if="isLogin"></homeContent>
		<otherInfo ref="otherInfo" :memberInfo="memberInfo" v-if="isLogin"></otherInfo>
		<mutualCrush ref="mutualCrush" :memberInfo="memberInfo" v-if="isLogin"> </mutualCrush>
		<view class="footerBtn" v-if="isLogin">
			<view class="item">
				<image class="img" @tap="dislike" :src="imgBaseUrl + 'Group713@2x.png'" mode=""></image>
			</view>
			<view class="item">
				<image class="img" @tap="like" :src="imgBaseUrl + 'Group714@2x.png'" mode=""></image>
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
	import mutualCrush from './components/mutualCrush.vue'
	
	export default {
		components: {
			homeContent,
			otherInfo,
			mutualCrush
		},
		data() {
			return {
				memberList: [],
				memberIndex: 0,
				statusBarHeight: '',
				titleHeight: 44,
				headHeight: '',
				bgColor: '',
				memberInfo: {}
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
			if (this.isLogin && this.memberList.length === 0) {
				this.getMember();
			}
		},
		onLoad() {
		},
		methods: {
            onIdentification(data) {
                this.$refs['otherInfo'].showThis(data);
            },
			handleSetting() {
				if (this.isLogin) {
					this.to('/pages/home/search/index');
				} else {
					this.handleLogin();
				}
			},
			async getMember() {
				const memberList = await this.$apis.homeApi.memberIndex({
					page: '1',
					pageSize: '100'
				});
				this.memberList = memberList.data.data;
				this.nextMember();
			},
			nextMember() {
				this.memberInfo = this.memberList[this.memberIndex];
				this.$apis.uesrApi.setVisit({ visited_member_id: this.memberInfo.id });
				this.memberIndex += 1;
				if (this.memberIndex >= this.memberList.length) {
					this.showToast("没有更多嘉宾啦~~");
				}
			},
			async like() {
				if (!this.isLogin) {
					this.handleLogin();
					return;
				}
				uni.vibrateShort();
				await this.$apis.homeApi.like(this.memberInfo.id);
				this.showToast("已标记为喜欢");
				this.nextMember();
			},
            async dislike() {
				if (!this.isLogin) {
					this.handleLogin();
					return;
				}
				console.log("dislike");
				uni.vibrateShort();
				await this.$apis.homeApi.dislike(this.memberInfo.id);
				this.showToast("已标记为不喜欢");
				this.nextMember();
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