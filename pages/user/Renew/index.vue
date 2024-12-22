<template>
	<view class="container">
		<view class="header" :style="{'padding-top': statusBarHeight+'px'}">
			<u-navbar class="uNavbar" @leftClick="leftClick" :autoBack="true" title="升级VIP提升聊天效率" :bgColor='bgColor'
				></u-navbar>
		</view>
		<view class="content">
			<view class="contentBox">
				<view class="contentTop">
					<image class='img' :src="imgBaseUrl+'Maskgroup10000000@2x.png'" mode=""></image>
					<view class="hint">
						<view class="hintTop">回复少？升级VIP更多曝光</view>
						<view class="hintBottom">搭配曝光翻倍等权益，效果翻倍</view>
					</view>
					<!-- <button class="btn">去升级</button> -->
				</view>
				<view class="contentMain">
					<view class="list">
						<view class="item selected">
							<view class="month">12个月</view>
							<view class="money">￥<text class="num">388</text></view>
							<view class="hint">日均1.06元</view>
						</view>
						<view class="item">
							<view class="month">3个月</view>
							<view class="money">￥<text class="num">348</text></view>
							<view class="hint">日均3.8元</view>
						</view>
						<view class="item">
							<view class="month">1个月</view>
							<view class="money">￥<text class="num">248</text></view>
							<view class="hint">日均8.2元</view>
						</view>
					</view>
					<view class="btn">立即开通</view>
					<view class="txt">开通前请阅读《会员服务协议》</view>
				</view>
			</view>

			<view class="tabList">
				<view class="title">荒野 VIP 尊贵权益</view>
				<view class="list">
					<view class="item">
						<image class='img' :src="imgBaseUrl+'Group1000010628@2x.png'" mode=""></image>
						<text>更多筛选</text>
					</view>
					<view class="item">
						<image class='img' :src="imgBaseUrl+'Group1000010633@2x.png'" mode=""></image>
						<text>更多嘉宾</text>
					</view>
					<view class="item">
						<image class='img' :src="imgBaseUrl+'Group1000010630@2x.png'" mode=""></image>
						<text>更多曝光</text>
					</view>
					<view class="item">
						<image class='img' :src="imgBaseUrl+'Group1000010633@2x.png'" mode=""></image>
						<text>访问特权</text>
					</view>
					<view class="item">
						<image class='img' :src="imgBaseUrl+'Group1000010632@2x.png'" mode=""></image>
						<text>私信特权</text>
					</view>
					<view class="item">
						<image class='img' :src="imgBaseUrl+'Group1000010631@2x.png'" mode=""></image>
						<text>回看特权</text>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgBaseUrl: this.imgBaseUrl,
				bgColor: 'transparent',
				statusBarHeight: 0,
			}
		},
		onShow() {
			let that = this;
			uni.getSystemInfo({
				success: function(info) {
					that.statusBarHeight = info.statusBarHeight;
				}
			});
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>