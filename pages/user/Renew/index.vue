<template>
	<view class="container">
		<view class="header" :style="{'padding-top': statusBarHeight+'px'}">
			<u-navbar class="uNavbar" :autoBack="true" title="升级VIP提升聊天效率" :bgColor='bgColor'
				></u-navbar>
		</view>
		<view class="vip-header" v-if="isVip">
			<image class="img" :src="basicInfoData.profile.user_avatar" mode="aspectFill"></image>
			{{ basicInfoData.member.nick_name || '' }}
			<div class="vip-tag">
				<div class="label">VIP 会员</div>
				<div class="time">会员有效期 9.12</div>
			</div>
		</view>
		<view class="content">
			<view class="contentBox">
				<view class="contentTop">
					<image class='img' :src="imgBaseUrl+'Maskgroup10000000@2x.png'" mode=""></image>
					<view class="hint">
						<view class="hintTop">回复少？升级VIP更多曝光</view>
						<view class="hintBottom">搭配曝光翻倍等权益，效果翻倍</view>
					</view>
				</view>
				<view class="contentMain">
					<view class="list">
						<view class="item" @tap="selectedVipItem = item" :class="{selected: item.id === selectedVipItem.id}" v-for="item in vipList" :key="item.id">
							<view class="month">{{item.title}}</view>
							<view class="money">￥<text class="num">{{item.price}}</text></view>
							<view class="hint">日均1.06元</view>
						</view>
					</view>
					<view @tap="activateVIP" class="btn">立即开通</view>
					<view @tap="readProtocol" class="txt">开通前请阅读《会员服务协议》</view>
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
				vipList: [],
				selectedVipItem: {}
			}
		},
		onShow() {
			uni.getSystemInfo({
				success: (info) => {
					this.statusBarHeight = info.statusBarHeight;
				}
			});
			this.getVipList();
			this.getBasicInfoData();
		},
		methods: {
			async activateVIP() {
				if (this.isVip) {
					this.showToast("您已经是VIP啦，无需再开通了");
					return;
				}
				const id = this.selectedVipItem.id;
				if (!id) {
					this.showToast("请选择您要购买的VIP套餐");
					return;
				}
				const res = await this.$apis.uesrApi.buyVip({
					vip_price_id: id
				});
				if (res.status) {
					const data = res.data.pay_sign;
					const payParams = {
						provider: "wxpay",
						timeStamp: data.timeStamp,
						nonceStr: data.nonceStr,
						package: data.package,
						signType: data.signType,
						paySign: data.paySign,
						success: (e) => {
							this.showToast("恭喜您成为VIP");
							setTimeout(() => {
								this.getVipList();
							}, 600)
						},
						fail: (err) => {
							console.log(err);
							this.showToast(err);
						},
					};
					uni.requestPayment(payParams);
				}
			},
			readProtocol() {
				let url = 'https://www.baidu.com/'
				this.to(`/pages/common/web-view?url=${encodeURIComponent(url)}`);
			},
			async getVipList() {
				const res = await this.$apis.uesrApi.getVipList();
				this.vipList = res.data;
				if (this.vipList && this.vipList.length) {
					this.selectedVipItem = this.vipList[0];
				}
			},
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