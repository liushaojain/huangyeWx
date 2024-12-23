<template>
    <view class="text-tip">
        <image :style="{height: height, width: width}" :src="path" />
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
        }
    },
    data() {
        return {
        };
    },
    
	
    methods: {
        
    },
};
</script>

<style lang="scss">
.text-tip {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 36rpx;
    margin-bottom: 36rpx;
}
</style>