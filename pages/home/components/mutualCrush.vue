<template>
    <u-popup :show="show" mode="center" @close="close" @open="open">
        <view class="popUp">
            <view class="crush-box">
                <view class="img left">
                    <image class="icon" src="https://oss.derucci-smart.com/images/upload/xindong_1734917767332.png" />
                    <image mode="aspectFill" src="https://oss.derucci-smart.com/images/upload/1_1734844642484.jpg" alt="" />
                </view>
                <view class="img right">
                    <image class="icon" src="https://oss.derucci-smart.com/images/upload/xindong_1734917767332.png" />
                    <image mode="aspectFill" src="https://oss.derucci-smart.com/images/upload/1_1734844642484.jpg" alt="" />
                </view>
            </view>
            <view class="tip-text">
                互相心动！
            </view>
            <button class="closeBtn" @click="closePopup">开始聊天</button>
        </view>
    </u-popup>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            imgBaseUrl: this.imgBaseUrl,
            infoData: {}
        }
    },
    created() {
    },
    methods: {
        showThis(data) {
            this.infoData = data;
            this.show = true;
        },
        open() {

        },
        close() {

        },
        closePopup() {
            this.show = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.popUp {
    width: 630rpx;
    height: 886rpx;
    .title {
        text-align: center;
        font-size: 36rpx;
        padding-bottom: 32rpx;
    }
}
.crush-box {
    width: 100%;
    position: relative;
    height: 686rpx;
    .img {
        position: absolute;
        width: 262rpx;
        height: 354rpx;
        background-color: #000;
        image {
            width: 100%;
            height: 100%;
        }
        .icon {
            position: absolute;
            width: 96rpx;
            height: 96rpx;
            right: -48rpx;
        }
        &.left {
            left: 100rpx;
            top: 120rpx;
            transform: rotateZ(-10deg);
            .icon {
                top: -48rpx;
            }   
        }
        &.right {
            right: 100rpx;
            bottom: 30rpx;
            transform: rotateZ(16deg);
            .icon {
                bottom: -48rpx;
            }
        }
    }
}

::v-deep .u-popup__content {
    border-radius: 28rpx;
}
.tip-text {
    font-weight: bold;
    font-size: 36rpx;
    color: #FF5C7E;
    line-height: 42rpx;
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 180rpx;
}
.closeBtn {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 60rpx;
    width: 566rpx;
    height: 76rpx;
    background: linear-gradient(271deg, #F5496D 0%, #FF7592 100%);
    border-radius: 200rpx;
    border: 0;
    color: white;
    line-height: 76rpx;
    font-size: 32rpx;
    margin-top: 24rpx;
}
</style>