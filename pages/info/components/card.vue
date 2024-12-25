<template>
    <view class="info-card" @tap="click">
        <div class="bg">
            <image mode="aspectFill" src="https://oss.derucci-smart.com/images/upload/1_1734844642484.jpg" alt="" />
        </div>
        <div class="bg2">

        </div>
        <div class="cover"></div>
        <div class="tag-1" v-if="false">
            新访问
        </div>
        <div class="tag-2">
            访问了你 X 次
        </div>
        <div class="info">
            <div class="name">{{data.guest.nick_name}}</div>
            <div class="age">{{data.guest.age || ''}}</div>
            <div class="state"></div>
        </div>
        <div class="address">
            地区
        </div>
        <div class="label" v-if="type === 'record'">
            互相心动
        </div>
        <div class="send-smg" v-if="type === 'private'" v-show="true">发私信</div>
        <div class="no-send-smg" v-if="type === 'private'" v-show="true">今日私信额度已使用</div>
    </view>
</template>

<script>
export default {
    props: {
        path: {
            type: String,
            default: "https://oss.derucci-smart.com/images/upload/tip_1734845490766.png",
        },
        height: {
            type: String,
            default: '32rpx'
        },
        width: {
            type: String,
            default: '500rpx'
        },
        type: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data() {
        return {
        };
    },
    
	
    methods: {
        click() {
            this.$emit("click", this.data)
        }
    },
};
</script>

<style lang="scss">
.info-card {
    margin-top: 30rpx;
    width: 296rpx;
    height: 400rpx;
    border-radius: 12rpx;
    position: relative;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .bg2 {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background: linear-gradient( 180deg, rgba(255,115,144,0) 0%, #FF7390 100%);
    }
    .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        image {
            width: 100%;
            height: 100%;
        }
    }
    .cover {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.2);
    }
    .tag-1 {
        position: absolute;
        background: #f43530;
        width: 96rpx;
        height: 44rpx;
        border-radius: 8rpx;
        line-height: 44rpx;
        text-align: center;
        top: 16rpx;
        left: 16rpx;
        color: #FFFFFF;
    }
    .tag-2 {
        position: absolute;
        height: 44rpx;
        border-radius: 8rpx;
        line-height: 38rpx;
        padding: 0 16rpx;
        background-color: #fff;
        color: #FFFFFF;
        top: 16rpx;
        left: 16rpx;
        backdrop-filter: blur(5px);
        background-color: rgba(255, 255, 255, 0.5);
        border: 1px solid #ccc;

    }

    .send-smg {
        position: absolute;
        bottom: 16rpx;
        left: 0;
        right: 0;
        margin: auto;
        width: 158rpx;
        height: 40rpx;
        background: #FFFFFF;
        border-radius: 107rpx 107rpx 107rpx 107rpx;
        width: 72rpx;
        font-size: 24rpx;
        color: #F64C70;
        line-height: 40rpx;
        text-align: center;
    }
    .no-send-smg {
        position: absolute;
        bottom: 16rpx;
        left: 0;
        right: 0;
        margin: auto;
        width: 258rpx;
        height: 40rpx;
        background: #C9C9C9;
        border-radius: 107rpx 107rpx 107rpx 107rpx;
        font-weight: bold;
        font-size: 24rpx;
        color: #FFFFFF;
        line-height: 40rpx;
        text-align: center;
    }

    .address {
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 32rpx;
        color: #FFFFFF;
        position: relative;
        z-index: 1000;
        text-align: center;
    }
    .info {
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 32rpx;
        color: #FFFFFF;
        position: relative;
        z-index: 1000;
        display: flex;
        align-items: center;
        .name {
            color: #FFFFFF;
        }
        .age {
            color: #FFFFFF;
            padding: 0 20rpx;
        }
        .state {
            width: 12rpx;
            height: 12rpx;
            background: #78E57C;
            border-radius: 50%;
        }
    }

    .label {
        height: 44rpx;
        background: #F43530;
        position: absolute;
        bottom: 0;
        font-size: 22rpx;
        color: #FFFFFF;
        line-height: 44rpx;
        text-align: center;
        width: 100%;
        left: 0;
    }

    
}
</style>