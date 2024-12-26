<template>
	<view class="container" :style="{ paddingTop: statusBarHeight + 'px' }">
		<view class="header" v-if="isLogin">
			<navigator url="/pages/user/InformationEntry/index?pageIndex=4" hover-class="none" class="edit">
				<image class="img" :src="member_profiles.user_avatar" mode="aspectFill"></image>
			</navigator>
			{{ memberInfo.nick_name }}
		</view>
		<view class="header" v-else @click="handleLogin">
			<image class="img" src="https://oss.derucci-smart.com/images/upload/logo_1735172622543.png"
				mode="aspectFill"></image>
			去登录
		</view>
		<view class="Records">
			<view class="item">
				<text class="num">{{ memberInfo.viewed_count || 0 }}</text>
				<text class="label">我的浏览</text>
			</view>
			<view class="item">
				<text class="num">{{ memberInfo.favorites_count || 0 }}</text>
				<text class="label">我心动的</text>
			</view>
			<view class="item">
				<text class="num">{{ memberInfo.recent_visitors_count || 0 }}</text>
				<text class="label">最近采访</text>
			</view>
		</view>
		<view class="contentBox">
			<view class="contentTop">
				<image class="img" :src="imgBaseUrl + 'Group694@2x.png'" mode=""></image>
				<view class="hint">
					<view class="hintTop">回复少？升级VIP更多曝光</view>
					<view class="hintBottom">搭配曝光翻倍等权益，效果翻倍</view>
				</view>
				<button class="btn" @click="goPage('/pages/user/Renew/index')">去升级</button>
			</view>
			<view class="contentBody">
				<view class="contentBodyBar">
					<view class="item">
						<view class="icon" @tap="handleUserInfo('/pages/user/userInfo/index')">
							<image class="img" :src="imgBaseUrl + 'Group1000010633@2x.png'" mode=""></image>
						</view>
						<view class="label">
							基本信息
						</view>
					</view>
					<view class="item">
						<view class="icon" @tap="handleUserInfo('/pages/authentication/index')">
							<image class="img" :src="imgBaseUrl + 'Group1000010630@2x.png'" mode=""></image>
						</view>
						<view class="label">
							认证信息
						</view>
					</view>

					<view class="item">
						<view class="icon" @tap="handleUserInfo('/pages/home/search/index')">
							<image class="img" :src="imgBaseUrl + 'Group694@2x.png'" mode=""></image>
						</view>
						<view class="label">
							匹配设置
						</view>
					</view>

				</view>
				<view class="contentList">
					<view hover-class="none" class="li">
						<view class="listLeft">
							<image class="img" :src="imgBaseUrl + 'my1.png'" mode=""></image>
							推荐给好友
						</view>
						<u-icon name="arrow-right" color="#8B8B8B" size="18"></u-icon>
					</view>
					<view hover-class="none" class="li">
						<view class="listLeft">
							<image class="img" :src="imgBaseUrl + 'my2.png'" mode=""></image>
							隐私保护政策
						</view>
						<u-icon name="arrow-right" color="#8B8B8B" size="18"></u-icon>
					</view>
					<view hover-class="none" class="li">
						<view class="listLeft">
							<image class="img" :src="imgBaseUrl + 'my3.png'" mode=""></image>
							用户服务协议
						</view>
						<u-icon name="arrow-right" color="#8B8B8B" size="18"></u-icon>
					</view>
					<view hover-class="none" class="li" @tap="to('/pages/user/contactUs/index')">
						<view class="listLeft">
							<image class="img" :src="imgBaseUrl + 'my4.png'" mode=""></image>
							联系我们
						</view>
						<u-icon name="arrow-right" color="#8B8B8B" size="18"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20,
			memberInfo: {},
			member_profiles: {}
		}
	},
	computed: {
		userAvart() {
			if (this.memberInfo && this.memberInfo.avatar) {
				return this.memberInfo.avatar;
			}
			return '../../static/img/logo.png';
		}
	},
	onLoad(e) {
	},
	onShow() {
		let that = this;
		uni.getSystemInfo({
			success: function (info) {
				var statusBarHeight = info.statusBarHeight;
				that.statusBarHeight = statusBarHeight;
			}
		});
		if (this.isLogin) {
			this.getSimple();
			this.getBasic();
		}
	},
	methods: {
		handleUserInfo(url) {
			if (!this.isLogin) {
				this.handleLogin();
				return;
			}
			uni.navigateTo({
				url: url
			})
		},
		async getSimple() {
			const simple = await this.$apis.uesrApi.simple()
			if (simple.status == 1) {
				this.memberInfo = simple.data
			}
		},
		async getBasic() {
			const data = await this.$apis.uesrApi.basic()
			if (data.status == 1) {
				this.member_profiles = data.data.profile || {};
			}
		},
		goPage(url) {
			uni.navigateTo({
				url
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
