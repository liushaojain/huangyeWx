<template>
    <view class="mutual-crush-page">
        <NavBar title="互相心动" />
        <AuthTip authType="ws" v-if="false" />
        <TextTip />
        <view class="swiper-content">
            <MutualCrushSwiper />
            <view v-if="false" class="empty-text">没有更多记录了</view>
        </view>
        <view class="match-tip">
            <view class="title">匹配成功！</view>
            <view class="text">你们俩来自同一个城市深圳。她身高168cm，她在你打招呼的39分钟就对你心动了，抓住机会，不要错过缘分</view>
        </view>
        <view class="button" @tap="test">
            开始聊天
        </view>
    </view>
</template>

<script>
import NavBar from './components/nav-bar.vue'
import AuthTip from './components/auth-tip.vue'
import TextTip from './components/text-tip.vue'
import Card from './components/card.vue'
import MutualCrushSwiper from './components/mutual-crush-swiper.vue'

export default {
    components: {
		NavBar,
        AuthTip,
        TextTip,
        Card,
        MutualCrushSwiper
	},
    data() {
        return {
        };
    },
    onLoad(options) {
      
    },
    methods: {
        test() {
            wx.openSetting({
                withSubscriptions: true,
                success (res) {
                    console.log(res.authSetting)
                }
            })
        }
        
    },
};
</script>

<style lang="scss">

.mutual-crush-page {
	padding-bottom: 48rpx;
	background-image: url("https://oss.derucci-smart.com/images/upload/info-bg_1734751826957.png");
	background-position: top;
	background-repeat: no-repeat;
    background-size: 100% 107px;
    .col {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    
    .button {
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
        margin-top: 40rpx;
    }
    .swiper-content {
        width: 100%;
        height: 800rpx;
    }
    .match-tip {
        text-align: center;
        .title {
            font-weight: bold;
            font-size: 36rpx;
            color: #FF5C7E;
            line-height: 42rpx;
            text-align: center;
            padding-bottom: 20rpx;
        }
        .text {
            padding: 0 68rpx;
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            font-size: 28rpx;
            color: #999999;
            line-height: 40rpx;
            text-align: center;
        }
    }
}
</style>