<template>
    <view class="mutual-crush-swiper">
        <view class="indicator">
            {{ current + 1 }} / {{ length }}
        </view>
        <swiper class="swiper" circular :autoplay="false" @change="change" :current="current">
            <swiper-item v-for="item in length" :key="item">
                <view class="swiper-item">
                    <view class="img left">
                        <image class="icon" src="https://oss.derucci-smart.com/images/upload/xindong_1734917767332.png" />
                        <image mode="aspectFill" src="https://oss.derucci-smart.com/images/upload/1_1734844642484.jpg" alt="" />
                    </view>
                    <view class="img right">
                        <image class="icon" src="https://oss.derucci-smart.com/images/upload/xindong_1734917767332.png" />
                        <image mode="aspectFill" src="https://oss.derucci-smart.com/images/upload/1_1734844642484.jpg" alt="" />
                    </view>
                </view>
            </swiper-item>
        </swiper>
        <view @tap="preItem" class="arrow left">
            <image src="https://oss.derucci-smart.com/images/upload/left_1734961671209.png" />
        </view>
        <view @tap="nextItem" class="arrow right">
            <image src="https://oss.derucci-smart.com/images/upload/right_1734961713931.png" />
        </view>
    </view>
</template>

<script>
export default {
    props: {
        path: {
            type: String,
            default: "https://oss.derucci-smart.com/images/upload/tip_1734845490766.png",
        },
    },
    data() {
        return {
            current: 0
        };
    },
    computed: {
        length() {
            return 10;
        },
    },
    methods: {
        change(event) {
            const current = event.detail.current;
            this.current = current;
            console.log("当前轮播到第", current, "个索引");
        },
        nextItem() {
            this.current += 1;
            if(this.current >= this.length - 1) {
                this.current = this.length - 1;
            }
        },
        preItem() {
            this.current -= 1;
            if(this.current <= 0) {
                this.current = 0;
            }
        },

    },
};
</script>

<style lang="scss">
.mutual-crush-swiper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .indicator {
        position: absolute;
        height: 52rpx;
        width: 134rpx;
        line-height: 50rpx;
        text-align: center;
        color: #fff;
        background-color: #e96880;
        border-radius: 100rpx;
        left: 0;
        right: 0;
        margin: auto;
    }
    .swiper {
        margin-top: 60rpx;
        width: 100%;
        height: 100%;
        .swiper-item {
            position: relative;
            height: 100%;
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
                    left: 156rpx;
                    top: 80rpx;
                    transform: rotateZ(-10deg);
                    .icon {
                        top: -48rpx;
                    }   
                }
                &.right {
                    right: 156rpx;
                    bottom: 140rpx;
                    transform: rotateZ(16deg);
                    .icon {
                        bottom: -48rpx;
                    }
                }
            }
        }
    }
    .arrow {
        position: absolute;
        width: 60rpx;
        height: 60rpx;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 1000;
        padding: 32rpx;
        box-sizing: content-box;
        image {
            width: 100%;
            height: 100%;
        }
        &.left {
            left: 0;
        }
        &.right {
            right: 0;
        }
    }
}
</style>