<template>
    <view class="my-crush-page">
        <NavBar title="我心动的" />
        <view class="container">
            <AuthTip authType="ws" v-if="isProfileCmpletion === false" />
            <AuthTip authType="rz" v-else-if="isCertificationCmpletion === false" />
            <template v-else>
                <TextTip path="https://oss.derucci-smart.com/images/upload/tip2_1734851238472.png" height="69rpx" width="586rpx" />
                <view class="col">
                    <Card @click="onClick" :data="item" v-for="item in myCrushList" :key="item.id" />
                </view>
                <view class="empty-text">没有更多记录了</view>
                <view @tap="to('/pages/user/Renew/index')" v-if="!isVip" class="button">
                    开通荒野会员，解锁嘉宾资料
                </view>
            </template>
        </view>
    </view>
</template>

<script>
import NavBar from './components/nav-bar.vue'
import AuthTip from './components/auth-tip.vue'
import TextTip from './components/text-tip.vue'
import Card from './components/card.vue'

export default {
    components: {
		NavBar,
        AuthTip,
        TextTip,
        Card
	},
    data() {
        return {
            myCrushList: []
        };
    },
    onLoad(options) {
        this.getMyCrush();
    },
    methods: {
        async getMyCrush() {
            const res = await this.$apis.infoApi.myLove({
                page: '1',
                pageSize: '10'
            });
            this.myCrushList = res.data.data;
            console.log("getMyCrush", res);
        },
        onClick(item) {
            console.log(item);
			// uni.navigateTo({
			// 	url: `/pages/info/message?conversationID=C2C${item.guest.id}`
			// })
        }
    },
};
</script>

<style lang="scss">

.my-crush-page {
	background-image: url("https://oss.derucci-smart.com/images/upload/info-bg_1734751826957.png");
	background-position: top;
	background-repeat: no-repeat;
    background-size: 100% 107px;
    .container {
        padding-left: 48rpx;
        padding-right: 48rpx;
        padding-bottom: 248rpx;
    }
    .col {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    
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
        z-index: 1000;
    }
}
</style>