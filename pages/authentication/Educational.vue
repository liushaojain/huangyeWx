 <template>
	 <view class="container">
		<NavBar fixed />
		 <view class="header">
		 	<image class="img" :src="baseImg+'Maskgroupwhy@2x.png'" mode=""></image>
		 </view>
	 	<view class="content">
			<view class="title">学历认证</view>
			<view class="txt">
				荒野是一个真人社交平台，我们需要确保你的真实信息，实名后匹配对象将会更精准
			</view>
			<view class="mt10">
				<u-upload :fileList="fileList" :disabled="status === 'pending'" @afterRead="afterRead" @delete="deletePic" multiple :maxCount="4"></u-upload>
			</view>
			<view class="txt">
				可上传毕业证、学生证、学信网最高学历验证报告、教育部留学服务中心《国外学历学位认证书》等其他证明
			</view>
		</view>
		<view class="footer">
			<view class="btnSubmit" @click="onSubmit">
				{{status === 'pending' ? '认证审核中': '立即认证'}}
			</view>
			<view class="text1">
				百分百隐私安全
			</view>
			<view class="text2">
				认证信息仅用于官方审核，无需担心信息泄露
			</view>
		</view>
	 </view>
</template>

<script>
	import { multipleUpload } from "@/utils/util.js"
	import NavBar from '@/components/nav-bar/nav-bar.vue'
	export default {
		components: { NavBar },
		data(){
			return {
				baseImg: this.imgBaseUrl,
				fileList: [],
				status: ''

			}
		},
		methods:{
			async identificationMy() {
			 	const res =	await this.$apis.uesrApi.identificationMy();
				this.fileList = res.data.education.map(item => ({url: item.url}));
				this.status = res.data.education_verification_status;
			},
			async onSubmit() {
				const res = await this.$apis.uesrApi.identificationEducation(this.fileList.map(item => item.url));
				if (res.status) {
					this.showToast('认证资料提交成果，请耐心等待系统审核');
					this.identificationMy();
				}
			},
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				multipleUpload(event.file, this.fileList);
			},
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
		.txt{
			color: #999999;
			margin-top: 12rpx;
			line-height: 36rpx;
		}
	}
	
	.footer{
		// margin-top: 232rpx;
		padding: 48rpx;
		text-align: center;
		
		position: fixed;
		height: 302rpx;
		left: 0;
		right: 0;
		bottom: 0;
		.text1{
			font-size: 28rpx;
			color: #999999;
		}
		.text2{
			font-size: 24rpx;
			color: #999999;
		}
	}
</style>