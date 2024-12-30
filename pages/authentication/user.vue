 <template>
	 <view class="container">
		<NavBar fixed />
		 <view class="header">
		 	<image class="img" :src="baseImg+'Maskgroupwhy@2x.png'" mode=""></image>
		 </view>
	 	<view class="content">
			<view class="title">实名认证</view>
			<view class="txt">
				荒野是一个真人社交平台，我们需要确保你的真实信息，实名后匹配对象将会更精准，实名配对成功率提高50%
			</view>
			<view class="mt10" v-if="status !== 'pending'">
				<u--form labelPosition="top" :model="formData" ref="forms" label-width="80">
					<u-form-item label="姓名" prop="name" ref="item1" border-bottom>
						<u--input placeholder="请输入" v-model="formData.name" border="none"></u--input>
					</u-form-item>
					<u-form-item label="身份证号码" prop="name" ref="item1" border-bottom>
						<u--input placeholder="请输入" v-model="formData.id_card" border="none"></u--input>
					</u-form-item>
				</u--form>	
			</view>
			<view class="mt10" v-else>
				<u--form labelPosition="top" :model="formData" ref="forms" label-width="80">
					<u-form-item label="姓名" prop="name" ref="item1" border-bottom>
						<u--input placeholder="请输入" disabled value="******" border="none"></u--input>
					</u-form-item>
					<u-form-item label="身份证号码" prop="name" ref="item1" border-bottom>
						<u--input placeholder="请输入" disabled value="******" border="none"></u--input>
					</u-form-item>
				</u--form>	
			</view>
		</view>
		<view class="footer">
			<view class="btnSubmit" :class="{ disabled: status === 'pending' }" @tap="getFaceSign">
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
	import { faceRedirectUrl } from "@/config.js";
	import NavBar from '@/components/nav-bar/nav-bar.vue'
	export default {
		components: { NavBar },
		data(){
			return {
				baseImg: this.imgBaseUrl,
				formData:{
					name: '',
					id_card: ''
				},
				biz_token: "",
				status: ""
			}
		},
		methods:{
			async identificationMy() {
			 	const res = await this.$apis.uesrApi.identificationMy();
				this.status = res.data.real_name_status;
			},
			async getFaceSign(){
				if (this.status === 'pending') {
					this.showToast("认证审核中");
					return;
				}
				const { name, id_card } = this.formData;
				if (!name) {
					this.showToast("姓名不能为空");
					return;
				}
				if (!id_card) {
					this.showToast("身份证不能为空");
					return;
				}
				const reg = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/;
				if (!reg.test(id_card)) {
					this.showToast("身份证格式错误");
					return;
				}
			 	const res = await this.$apis.uesrApi.getFaceSign({
					id_card,
					name,
					redirect_url: faceRedirectUrl
				});
				this.biz_token = res.data.biz_token;
				this.to(`/pages/common/web-view?url=${encodeURIComponent(res.data.url)}`);
			},

		    async getFaceResult(biz_token) {
				const res = await this.$apis.uesrApi.getFaceResult({ biz_token });
				if (res.status === 1) {
					this.showToast("认证成功");
					this.identificationMy();
				}
			}
		},
		async onShow() {
			if (this.biz_token) {
				await this.getFaceResult(this.biz_token);
			} else {
				this.identificationMy();
			}
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