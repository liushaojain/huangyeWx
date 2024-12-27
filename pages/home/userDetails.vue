<template>
	<view class="container">
		<view class="flex-between title"
			:style="{paddingTop: statusBarHeight+'px',height:titleHeight+'px',background:bgColor}">
			<text class="txt">荒野</text>
		</view>
		<homeContent @onIdentification="onIdentification" :memberInfo="memberInfo" v-if="isLogin"></homeContent>
		<otherInfo ref="otherInfo" :memberInfo="memberInfo" v-if="isLogin"></otherInfo>
		<view class="footerBtn" v-if="isLogin">
			<view class="item">
				<image class="img" @tap="dislike" :src="imgBaseUrl+'Group713@2x.png'" mode=""></image>
			</view>
			<view class="item">
				<image class="img" @tap="like" :src="imgBaseUrl+'Group714@2x.png'" mode=""></image>
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
	
	export default {
		components: {
			homeContent,
			otherInfo,
		},
		data() {
			return {
				statusBarHeight: '',
				titleHeight: 44,
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
				}
			});
		},
		onLoad(id) {
            if(!id) {
                console.error("用户id不能为空");
                return;
            }
			this.getMemberDetail(id);
		},
		methods: {
            onIdentification(data) {
                console.log(this.$refs['otherInfo']);
                this.$refs['otherInfo'].showThis(data);
            },
			handleSetting() {
				if (this.isLogin) {
					this.to('/pages/home/search/index');
				} else {
					this.handleLogin();
				}
			},
			async getMemberDetail(id) {
				const res = await this.$apis.uesrApi.getMemberDetail({ member_id: id });
				this.memberInfo = res.data;
                this.$apis.uesrApi.setVisit({ visited_member_id: this.memberInfo.id });
			},
			async like() {
				if (!this.isLogin) {
					this.handleLogin();
					return;
				}
				uni.vibrateShort();
				await this.$apis.homeApi.like(this.memberInfo.id);
				this.showToast("已标记为喜欢");
			},
            async dislike() {
				if (!this.isLogin) {
					this.handleLogin();
					return;
				}
				uni.vibrateShort();
				await this.$apis.homeApi.dislike(this.memberInfo.id);
				this.showToast("已标记为不喜欢");
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