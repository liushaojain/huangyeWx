<template>
    <view class="auth-tip">
        <view class="imgs">
            <image class="img" src="https://oss.derucci-smart.com/images/upload/1_1734844642484.jpg" style="transform: translateX(40rpx);" />
            <image class="img" src="https://oss.derucci-smart.com/images/upload/2_1734844677659.jpg" style="transform: translateX(0rpx);" />
            <image class="img" src="https://oss.derucci-smart.com/images/upload/3_1734844688797.jpg" style="transform: translateX(-40rpx);" />
        </view>
        <view class="tip">
            {{map[authType].tip}}
        </view>
        <view class="button" @tap="to(map[authType].path)">
            {{map[authType].button}}
        </view>
    </view>
</template>

<script>
const map = {
    'ws': {
        tip: "完善资料认证后可查看访客记录",
        button: "立刻完善",
        path: '/pages/user/userInfo/index'
    },
    'rz': {
        tip: "Ta 们设置了仅允许已认证用户发送心动快去认证，让对方看到你的消息",
        button: "立刻认证",
        path: '/pages/authentication/index'
    }
}
export default {
    props: {
        authType: {
            type: String,
            default: "ws"
        }
    },
    data() {
        return {
            map
        }
    },
    onLoad(options) {
        
    },
    methods: {
        
    },
};
</script>

<style lang="scss">
.auth-tip {
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .imgs {
        margin-bottom: 108rpx;
        display: flex;
        .img {
            width: 154rpx;
            height: 154rpx;
            background-color: #ccc;
            border-radius: 50%;
            
        }
    }
    .tip {

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