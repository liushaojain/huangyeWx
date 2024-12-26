<template>
	<view class="container">
		<view class="content">
			<view class="item logo">
				<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
				荒野
			</view>
			<view class="item loginText">
				<image class="img" src="../../../static/img/loginText.png" mode="aspectFill"></image>
			</view>
            <view class="qr-code">
                <image></image>
            </view>
			<view class="text">
                <view class="t">我们希望你的体验是友好的，如果你有</view>
                <view class="t">什么不适可以通过二维码联系到我们</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Text: "weixin",
			}
		},
		onShow() {
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	$bg-image-url: 'http://47.119.182.138:89/images/';
	page {
		.container{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background-image: url($bg-image-url+'loginBg.png');
			background-size: cover;
		}
		.loginBg{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			height: 100%;
			width: 100%;
		}
		.content{
            padding-top: 100rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding-bottom: 100rpx;
            .text {
                padding-top: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .t {
                    color: #666666;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 16px;
                    text-align: center;
                }
            }
            .qr-code {
                width: 193px;
                height: 193px;
                background-color: #999;
            }
			.logo{
				font-size: 64rpx;
				.img{
					width: 110rpx;
					height: 110rpx;
					vertical-align: middle;
					margin-right: 28rpx;
				}
			}
			.loginText{
				margin: 48rpx 0 66rpx 0;
				.img{
					width: 576rpx;
					height: 41rpx;
				}
			}
			.text{
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.icon{
					margin: 0 8rpx;
					background: #666666;
					display: inline-block;
					width: 8rpx;
					height: 8rpx;
					border-radius: 50%;
				}
			}
		}
		.weChat {
			position: absolute;
			left: 60rpx;
			right: 60rpx;
			bottom: 90rpx;
			width: 630rpx;
			height: 88rpx;
			border-radius: 44rpx;
			font-size: 32rpx;
			text-align: center;
			line-height: 88rpx;
			margin: auto;
			background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
			color: white;
			margin-top: 80rpx;
		}
	}

</style>