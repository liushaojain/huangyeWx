<template>
    <view class="visitor-record-page">
        <NavBar title="访客记录" />
        <AuthTip authType="ws" v-if="false" />
        <TextTip />
        <div class="col">
            <Card type="record" />
            <Card type="record" />
            <Card type="record" />
        </div>
        <div class="button">
            开通荒野会员，解锁嘉宾资料
        </div>
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
        };
    },
    onLoad(options) {
        
    },
    methods: {
        
    },
};
</script>

<style lang="scss">

.visitor-record-page {
    padding-left: 48rpx;
	padding-right: 48rpx;
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