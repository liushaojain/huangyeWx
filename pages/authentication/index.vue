 <template>
	 <view class="container">
		<NavBar fixed />
		 <view class="header">
		 	<image class="img" :src="baseImg+'Maskgroupwhy@2x.png'" mode=""></image>
		 </view>
	 	<view class="content">
			<view class="item">
				<view class="title">基本认证信息</view>
				<view class="childItem" v-for="item in baseIdentificationList" :key="item.title">
					<view class="itemT">
						<view class="flex itemsCenter">
							<image class="icon" :src="baseImg + item.icon" mode=""></image>
							{{item.title}}	
						</view>
						<view class="status" :class="{pending: myIdentification[item.key] === 'pending'}" @click="to(item.path)">{{formatEnum(item.map, myIdentification[item.key]) || '待认证'}}</view>
					</view>
					<view class="itemContent">{{ item.tip }}</view>
				</view>
			</view>
	 		<view class="item more">
	 			<view class="title">更多认证信息</view>
	 			<view class="childItem" v-for="item in moreIdentificationList" :key="item.title">
	 				<view class="itemT">
	 					<view class="flex itemsCenter">
							<image class="icon" :src="baseImg + item.icon" mode=""></image>
							{{item.title}}	
	 					</view>
	 					<view class="status" :class="{pending: myIdentification[item.key] === 'pending'}" @click="to(item.path)">{{formatEnum(item.map, myIdentification[item.key]) || '待认证'}}</view>
	 				</view>
					 <view class="itemContent">{{ item.tip }}</view>
	 			</view>
	 		</view>
	 	</view>
	 </view>
</template>

<script>
	import NavBar from '@/components/nav-bar/nav-bar.vue'
	export default {
		components: { NavBar },
		data(){
			return {
				baseImg: this.imgBaseUrl,
				myIdentification: {},
				baseIdentificationList: [{
					title: "实名认证",
					icon: "authentication(3).png",
					path: "/pages/authentication/user",
					key: 'real_name_status',
					map: 'Member.real_name_status',
					tip: '荒野是一个真人社交平台，我们需要确保你的真实信息，实名后匹配对象将会更精准'
				}, {
					title: "离婚认证",
					icon: "authentication(4).png",
					path: "/pages/authentication/matrimony",
					key: 'marriage_verification_status',
					map: 'Member.marriage_verification_status',
					tip: '荒野是专注离异群体的社交平台，进行婚姻认证将极大提高你的脱单效率'
				}],
				moreIdentificationList: [{
					title: "学历认证",
					icon: "authentication(5).png",
					path: "/pages/authentication/Educational",
					key: 'education_verification_status',
					map: 'Member.education_certification_status',
					tip: '完成学历认证可以增加你的信誉，匹配对象将会更精准'
				}, {
					title: "收入认证",
					icon: "authentication(5).png",
					path: "/pages/authentication/income",
					key: 'income_certification_status',
					map: 'Member.income_certification_status',
					tip: '完成学历认证可以增加你的信誉，匹配对象将会更精准'
				},{
					title: "工作认证",
					icon: "authentication(5).png",
					path: "/pages/authentication/professional",
					key: 'job_certification_status',
					map: 'Member.job_certification_status',
					tip: '完成工作认证可以增加你的信誉，匹配对象将会更精准'
				}, {
					title: "房子认证",
					icon: "authentication(1).png",
					path: "/pages/authentication/HouseProperty",
					key: 'house_certification_status',
					map: 'Member.house_certification_status',
					tip: '完成房子认证可以增加你的信誉，匹配对象将会更精准'
				}, {
					title: "车辆认证",
					icon: "authentication(2).png",
					path: "/pages/authentication/Educational",
					key: 'vehicle_certification_status',
					map: 'Member.vehicle_certification_status',
					tip: '完成车辆认证可以增加你的信誉，匹配对象将会更精准'
				}]
			}
		},
		methods:{
			async identificationMy() {
			 	const res =	await this.$apis.uesrApi.identificationMy();
				this.myIdentification = res.data;
			}
		},
		onShow() {
			this.identificationMy();
		}
	}
</script>

<style lang="scss" scoped> 
	.header{
		.img{
			height: 632rpx;
			width: 100%;
		}
	}
	.content{
		padding: 48rpx;
		background: white;
		position: relative;
		top: -100rpx;
		border-radius: 36rpx;
		.title{
			font-size: 32rpx;
			font-weight: bold;
		}
		.childItem{
			width: 654rpx;
			height: 188rpx;
			padding: 28rpx;
			background: rgba(247,80,115,0.06);
			border-radius: 12rpx;
			margin-top: 28rpx;
		}
		.itemT{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon{
				height: 48rpx;
				width: 48rpx;
				margin-right: 14rpx;
			}
			.status{
				width: 152rpx;
				height: 46rpx;
				background: #F75073;
				border-radius: 23rpx;
				color: white;
				text-align: center;
				line-height: 46rpx;
				&.pending {
					background: #FFA85B;
				}
			}
		}
		.itemContent{
			margin-top: 24rpx;
		}
	}
	.more{
		margin-top: 48rpx;
	}
	
</style>