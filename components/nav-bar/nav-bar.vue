<template>
    <view class="info-nav-bar" :class="{ fixed: fixed }">
        <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		<view class="nav-bar" :style="[navbarInnerStyle]">
			<view v-if="showArrow" class="arrow-left" @tap="goBack">
                <u-icon name="arrow-left" color="#8B8B8B" size="18"></u-icon>
            </view>
            <view class="title-box" @click="onClick">
				<image class="img" v-if="img" :src="img" mode="aspectFill" />
				{{title}}
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

export default {
    props: {
        title: {
            type: String,
            default: ""
        },
		showArrow: {
			type: Boolean,
			default: true
		},
		fixed: {
			type: Boolean,
			default: false
		},
		img: {
			type: String,
            default: ""
		}
    },
    data() {
        return {
            menuButtonInfo: menuButtonInfo,
			statusBarHeight: systemInfo.statusBarHeight,
        };
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
	},
    methods: {
        onClick() {
			this.$emit("click");
		}
    },
};
</script>

<style lang="scss">
.info-nav-bar {
	.title-box {
		display: flex;
		justify-content: center;
		align-items: center;
		.img {
			margin-right: 10rpx;
		}
	}
	&.fixed {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
	}
    .status-bar {
		width: 100%;
	}

	.nav-bar {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		.img {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
		}
		.arrow-left {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx;
			padding-right: 40rpx;
			padding-left: 30rpx;
		}
	}
}
</style>