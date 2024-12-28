<template>
	<view class="zero-privacy" :class="[{'zero-bottom':position=='bottom'}]" v-if="showPrivacy">
		<view class="zero-privacy-container" :style="{'--color':color,'--bgcolor':bgcolor,'--contenth':contentHeight}">
			<view class="title">
				{{title}}
			</view>
			<view class="content" >{{predesc}}</view>
			<view class="footer">
				<view class="btn disagree-btn" @click="handleRefuse">{{disagreeBtnText}}
				</view>
				<button id="agree-btn" class="btn agree-btn" @tap="handleAgree">
					{{agreeBtnText}}
				</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "zero-privacy",
		emits: ['agree', 'disagree', 'needAuthorization'],
		props: {
			position: {
				type: String,
				default: 'center'
			},
			color: {
				type: String,
				default: '#0396FF'
			},
			bgcolor: {
				type: String,
				default: '#ffffff'
			},
			title: {
				type: String,
				default: '确定返回吗？'
			},
			predesc: {
				type: String,
				default: '你已经录入的信息我们将会为你自动保存'
			},
			agreeBtnText: {
				type: String,
				default: '确定'
			},
			disagreeBtnText: {
				type: String,
				default: '取消'
			},
			contentHeight:{
				type: String,
				default: '30vh'
			}
		},
		data() {
			return {
				showPrivacy: false,
			};
		},
		methods: {
			open(name) {
				this.showPrivacy = true;
			},
			close() {
				this.showPrivacy = false;
			},
			// 点击同意
			handleAgree() {
				// 需要用户同意隐私授权时
				this.close();
				this.$emit('agree')
			},
			// 点击取消
			handleRefuse() {
				this.close();
			},
		},
		created() {
		},
	};
</script>

<style lang="scss">
	.zero-privacy {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		-webkit-justify-content: center;
		animation: fadeIn 0.2s linear both;
	}


	.zero-privacy-container {
		width: 580rpx;
		min-height: 400rpx;
		background: var(--bgcolor);
		border-radius: 16px;
		padding: 50rpx;
		font-size: 14px;
		animation: fadeInBig 0.2s 0.2s linear both;
		backdrop-filter: blur(10rpx); //毛玻璃属性

		.title {
			color: #333333;
			font-size: 36rpx;
			text-align: center;
			color: #F74F72;
		}

		.content {
			color: #595959;
			margin-top: 36rpx;
			margin-bottom: 36rpx;
			line-height: 50rpx;
			white-space: pre-wrap;
			max-height: var(--contenth);
			overflow: auto;
			font-size: 28rpx;
			text {
				color: var(--color);
			}
		}

		.footer {
			display: flex;
			justify-content: space-between;

			// 重置微信小程序的按钮样式
			button:after {
				border: none;
			}

			.btn {
				line-height: 80rpx;
				border-radius: 24px;
				text-align: center;
				font-size: 28rpx;
				white-space: nowrap;
				word-break: break-all;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 220rpx;
				height: 80rpx;
			}

			.disagree-btn {
				color: #666666;
				border-radius: 200rpx 200rpx 200rpx 200rpx;
				border: 2rpx solid #EA365B;
				color: #EA365B;
			}

			.agree-btn {
				background-color: var(--color);
				color: #fff;
				margin: 0;
				background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
			}
		}
	}

	.zero-bottom {
		align-items: flex-end;

		.zero-privacy-container {
			width: 100%;
			animation: fadeIn 0.2s linear both;
			animation: fadeInUp 0.2s 0.2s linear both;
			padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
			border-radius: 24px 24px 0 0;
		}

		.footer {
			padding: 0 40rpx;

			.btn {
				min-width: 250rpx;
			}
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0.5;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes fadeInBig {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}

		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}

		100% {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}
</style>