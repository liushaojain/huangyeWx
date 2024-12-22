<template>
	<view class="message-list">
		<!-- <u-navbar :is-fixed="false" back-icon-color="transparent" title="消息" bgColor='transparent'></u-navbar> -->
		<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		<view class="nav-bar" :style="[navbarInnerStyle]">消息{{totalUnreadCount}}</view>
		<view class="group-list">
			<view class="group-item" v-for="item in groupList" :key="item.text">
				<image :src="item.img" class="img"></image>
				<view class="tex">{{ item.text }}</view>
				<view class="unread-count" v-if="totalUnreadCount > 0 && item.text == '私信'">
					{{ totalUnreadCount }}
				</view>
			</view>
		</view>
		<view class="msg-list">
			<view class="msg-item" @tap="handlerConversation(item)" v-for="item in conversationList" :key="item.lastMessage.lastTime">
				<view class="img"></view>
				<view class="info">
					<view class="info-name">{{ item.userProfile.userID }}</view>
					<view class="info-msg">{{item.lastMessage.messageForShow}}</view>
				</view>
				<view class="ext">
					<view class="ext-time">{{ formatTimeStamp(item.lastMessage.lastTime) }}</view>
					<view v-if="item.unreadCount > 0" class="ext-noread">{{ item.unreadCount }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
let systemInfo = uni.getSystemInfoSync();
let menuButtonInfo = {};
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif
import ImManager from './imManager.js'
export default {
	components: {
	},
	data() {
		return {
			menuButtonInfo: menuButtonInfo,
			statusBarHeight: systemInfo.statusBarHeight,
			groupList: [{
				img: "https://oss.derucci-smart.com/images/upload/1000010536_1734760669796.png",
				text: "私信"
			}, {
				img: "https://oss.derucci-smart.com/images/upload/1000010540_1734760721639.png",
				text: "对我心动"
			}, {
				img: "https://oss.derucci-smart.com/images/upload/1000010537_1734760680670.png",
				text: "我心动的"
			}, {
				img: "https://oss.derucci-smart.com/images/upload/1000010538_1734760714551.png",
				text: "互相心动"
			}, {
				img: "https://oss.derucci-smart.com/images/upload/1000010539_1734760692039.png",
				text: "访客"
			}],
			conversationList: []
		}
	},
	computed: {
		navbarInnerStyle() {
			let style = {};
			style.height = this.navbarHeight + 'px';
			console.log(style);
			return style;
		},
		navbarHeight() {
			// #ifdef APP-PLUS || H5
			return this.height ? this.height : 44;
			// #endif
			// #ifdef MP
			let height = systemInfo.platform == 'ios' ? 44 : 48;
			return this.height ? this.height : height;
			// #endif
		},
		totalUnreadCount() {
			return this.conversationList.reduce((accumulator, item) => accumulator + item.unreadCount, 0);
		}
	},
	methods: {
		handlerConversation(item) {
			uni.navigateTo({
				url: "/pages/info/message?conversationID=" + item.conversationID
			})
		},
		onConversationList(e) {
			this.conversationList = e.data;
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
		ImManager.getInstance().init({
			SDKAppID: "1600067113",
			userID: "lxj2"
		});
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
				background-color: #333333;
				border-radius: 50%;
				margin-right: 16rpx;
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
