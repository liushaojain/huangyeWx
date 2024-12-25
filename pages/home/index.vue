<template>
	<view class="container">
		<view class="flex-between title"
			:style="{paddingTop: statusBarHeight+'px',height:titleHeight+'px',background:bgColor}">
			<text class="txt">荒野</text>
			<navigator class="search" url="/pages/home/search/index" hover-class="none">
				<image class="img" src="https://marries.oss-cn-beijing.aliyuncs.com/life_photo/AEK1PLYDwdoFb6ad46b79acd577983ed3d413c45510b.png" mode=""></image>
			</navigator>
		</view>
		<homeContent></homeContent>
		<otherInfo></otherInfo>
		<view class="footerBtn">
			<view class="item">
				<image class="img" @tap="handleNext" :src="imgBaseUrl+'Group713@2x.png'" mode=""></image>
			</view>
			<view class="item">
				<image class="img" @tap="handleLove" :src="imgBaseUrl+'Group714@2x.png'" mode=""></image>
			</view>
		</view>


	</view>
</template>
<script>
	import homeContent from './components/homeContent.vue'
	import otherInfo from './components/otherInfo.vue'
	import { EventBus } from './components/eventBus'
	export default {
		components: {
			homeContent,
			otherInfo
		},
		data() {
			return {
				memberList: [],
				memberIndex: 0,
				statusBarHeight: '',
				titleHeight: 44,
				headHeight: '',
				bgColor: '',
				memberInfo:{}
			}
		},
		computed: {
			avartImage(){
				if(this.memberInfo.hasOwnProperty('profile')){
					return this.memberInfo.profile.user_avatar
				}else{
					return this.imgBaseUrl+'Group1000010746@2x.png'
				}
			},
		},
		onShow() {
			let that = this;
			uni.getSystemInfo({
				success: function(info) {
					var statusBarHeight = info.statusBarHeight;
					that.statusBarHeight = statusBarHeight;
					that.headHeight = info.statusBarHeight + that.titleHeight;
				}
			});
		},
		onLoad() {
			 EventBus.$on('laod_basic_member', (data) => {
				console.log('接收到事件传递的数据:', data);
				this.memberInfo = data;
				// 在这里可以根据接收到的数据进行相应的业务逻辑处理，比如更新组件内的数据、改变DOM显示等
			});
		},
		methods: {
			handleNext() {
				EventBus.$emit('dislike');
			},
			handleLove() {
				EventBus.$emit('like');
			},
			getmember() {
				const memberList = this.$apis.homeApi.memberIndex({
					page: '1',
					pageSize: '10'
				});
				this.memberList = memberList;
			},
		},
		onPageScroll(e) {
			if (e.scrollTop >= 35) {
				this.bgColor = 'white'
			} else {
				this.bgColor = 'transparent'
			}
		},
	}
</script>
<style lang="scss" scoped>
	@import "./index.scss";
</style>