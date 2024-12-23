<template>
	<view class="message-list">
		<NavBar :showArrow="false" title="消息" />
		<view class="group-list">
			<view class="group-item" @tap="handleToPath(item.path)" v-for="item in groupList" :key="item.text">
				<image :src="item.img" class="img"></image>
				<view class="tex">{{ item.text }}</view>
				<view class="unread-count" v-if="totalUnreadCount > 0 && item.text == '私信'">
					{{ totalUnreadCount }}
				</view>
			</view>
		</view>
		<view class="msg-list" v-if="isLogin">
			<view class="msg-item" @tap="handlerConversation(item)" v-for="item in conversationList" :key="item.lastMessage.lastTime">
				<view class="img">
					<image :src="getAvatar(item.userProfile.userID)"></image>
				</view>
				<view class="info">
					<view class="info-name">{{ getNickName(item.userProfile.userID) }}</view>
					<view class="info-msg">{{item.lastMessage.messageForShow}}</view>
				</view>
				<view class="ext">
					<view class="ext-time">{{ formatTimeStamp(item.lastMessage.lastTime) }}</view>
					<view v-if="item.unreadCount > 0" class="ext-noread">{{ item.unreadCount }}</view>
				</view>
			</view>
			<view @tap="chatTest" class="empty-text">没有更多聊天记录</view>
		</view>
		<button v-else class="button" @click="handleLogin">去登录</button>
	</view>
</template>

<script>
import ImManager from './utils/imManager.js'
import NavBar from './components/nav-bar.vue'
import { userStore } from "@/store/account/userInfo.js"

export default {
	components: {
		NavBar
	},
	data() {
		return {
			groupList: [{
				img: "https://oss.derucci-smart.com/images/upload/1000010536_1734760669796.png",
				text: "私信",
				path: "/pages/info/private-chat"
			}, {
				img: "https://oss.derucci-smart.com/images/upload/1000010540_1734760721639.png",
				text: "对我心动",
				path: "/pages/info/crush-on-me"
			}, {
				img: "https://oss.derucci-smart.com/images/upload/1000010537_1734760680670.png",
				text: "我心动的",
				path: "/pages/info/my-crush"
			}, {
				img: "https://oss.derucci-smart.com/images/upload/1000010538_1734760714551.png",
				text: "互相心动",
				path: "/pages/info/mutual-crush"
			}, {
				img: "https://oss.derucci-smart.com/images/upload/1000010539_1734760692039.png",
				text: "访客",
				path: "/pages/info/visitor-record"
			}],
			conversationList: [],
			userID2UserInfoMap: {}
		}
	},
	computed: {
		totalUnreadCount() {
			return this.conversationList.reduce((accumulator, item) => accumulator + item.unreadCount, 0);
		},
		isLogin() {
			return !!userStore.state.token;
		},
	},
	async onShow() {
		if (!this.isLogin) return;
		this.conversationList = await ImManager.getInstance().getConversationList();
		this.userID2UserInfoMap = await ImManager.getInstance().setUserID2UserInfoMap((this.conversationList || []).map(item => item.userProfile.userID));
	},
	methods: {
		getAvatar(userID) {
			return (this.userID2UserInfoMap[userID] || {}).user_avatar;
		},
		getNickName(userID) {
			return (this.userID2UserInfoMap[userID] || {}).nick_name;
		},
		chatTest() {
			uni.navigateTo({
				url: "/pages/info/message?conversationID=C2C9"
			})
		},
		handlerConversation(item) {
			uni.navigateTo({
				url: "/pages/info/message?conversationID=" + item.conversationID
			})
		},
		handleLogin() {
			uni.navigateTo({
				url: "/pages/user/login/index"
			})
		},
		handleToPath(url) {
			if(!this.isLogin) {
				this.showToast("您未登录，请先完成登录");
				return;
			}
			uni.navigateTo({
				url
			})
		},
		async onConversationList(e) {
			this.conversationList = e.data;
			this.userID2UserInfoMap = await ImManager.getInstance().setUserID2UserInfoMap((this.conversationList || []).map(item => item.userProfile.userID));
		},
		formatTimeStamp(timestamp) {
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			const targetDate = new Date(timestamp * 1000);
			const oneDayMs = 24 * 60 * 60 * 1000;
			if (targetDate >= today && targetDate < new Date(today.getTime() + oneDayMs)) {
				const hours = targetDate.getHours().toString().padStart(2, '0');
				const minutes = targetDate.getMinutes().toString().padStart(2, '0');
				return `${hours}:${minutes}`;
			} else if (targetDate >= new Date(today.getTime() - oneDayMs) && targetDate < today) {
				return "昨天";
			} else {
				const year = targetDate.getFullYear();
				const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
				const day = targetDate.getDate().toString().padStart(2, '0');
				return `${year}/${month}/${day}`;
			}
		}
	},
	created() {
		ImManager.getInstance().addObserver(this);
	},
	beforeDestroy() {
		ImManager.getInstance().removeObserver(this);
	}
};
</script>
<style lang="scss">
.message-list {
	padding-left: 48rpx;
	padding-right: 48rpx;
	padding-bottom: 48rpx;
	background-image: url("https://oss.derucci-smart.com/images/upload/info-bg_1734751826957.png");
	background-position: top;
	background-repeat: no-repeat;
    background-size: 100% 107px;
	
    .button {
        position: fixed;
        bottom: 130rpx;
        left: 0;
        right: 0;
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
	.status-bar {
		width: 100%;
	}

	.nav-bar {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.group-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 28rpx;

		.group-item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			position: relative;
			.unread-count {
				position: absolute;
				right: 0;
				top: 0;
				width: 34rpx;
				height: 34rpx;
				background-color: #e2483c;
				border-radius: 50%;
				font-size: 22rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ffffff;
			}
			.img {
				width: 96rpx;
				height: 96rpx;
				margin-bottom: 26rpx;
				background-color: #ffffff;
				border-radius: 50%;
			}

			.text {
				font-weight: bold;
				font-size: 24rpx;
				color: #333333;
			}
		}
	}

	.msg-list {
		.msg-item {
			margin-top: 48rpx;
			display: flex;

			.img {
				width: 98rpx;
				height: 98rpx;
				background-color: #999;
				border-radius: 50%;
				margin-right: 16rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.info-name {
					margin-bottom: 8rpx;
					font-weight: bold;
					font-size: 28rpx;
					color: #333333;
				}

				.info-msg {
					font-weight: 500;
					font-size: 24rpx;
					color: #999999;
				}
			}

			.ext {
				width: 120rpx;
				margin-left: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-end;

				.ext-time {
					font-weight: bold;
					font-size: 22rpx;
					color: #999999;
					margin-bottom: 8rpx;
				}

				.ext-noread {
					width: 34rpx;
					height: 34rpx;
					font-size: 22rpx;
					background-color: #dd483c;
					border-radius: 50%;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
}
</style>
