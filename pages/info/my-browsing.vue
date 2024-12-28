<template>
    <view class="my-browsing-page">
        <NavBar title="我的浏览" />
        <view class="container">
            <AuthTip authType="ws" v-if="isProfileCmpletion === false" />
            <AuthTip authType="rz" v-else-if="isCertificationCmpletion === false" />
            <template v-else>
                <TextTip />
                <view class="col">
                    <Card type="record" v-for="item in visitLogList" :key="item.id" />
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
import NavBar from '@/components/nav-bar/nav-bar.vue'
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
            visitLogList: []
        };
    },
    onLoad(options) {
        this.getVisitLog();
    },
    methods: {
        async getVisitLog() {
            const res = await this.$apis.infoApi.visitLog({
                page: '1',
                pageSize: '10'
            });
            this.visitLogList = res.data.data || [];
            console.log("visitLogList", res);
        }
    },
};
</script>

<style lang="scss">

.my-browsing-page {

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
    }
}
</style>