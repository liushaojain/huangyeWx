<template>
	<view>
		<view class="uploadBox">
			<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="12">
				<view class="imgUpload">
					<view style="width: 170rpx;height: 170rpx;">
						<image style="width: 100%;height: 100%;" src="https://oss.derucci-smart.com/images/upload/ad_1735047303362.png" mode="widthFix"></image>
					</view>
				</view>
			</u-upload>
			
			<view class="footer">
				<view class="txtCenter mb10">以下照片不能通过审核</view>
				<view class="imgList">
					<image class="img" :src="imgBaseUrl+'Group1000010716@2x.png'" mode="widthFix"></image>
					<image class="img" :src="imgBaseUrl+'Group1000010715@2x.png'" mode="widthFix"></image>
					<image class="img" :src="imgBaseUrl+'Group1000010717@2x.png'" mode="widthFix"></image>
					<image class="img" :src="imgBaseUrl+'Group1000010718@2x.png'" mode="widthFix"></image>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	import {basehost,get_file_name} from "@/utils/util.js"
	export default {
		data() {
			return {
				imgBaseUrl: this.imgBaseUrl,
				fileList: []
			}
		},
		created() {
			this.getPhoto();
		},
		methods: {
			get_file_name,
			
            async getPhoto() {
				const data = await this.$apis.uesrApi.getPhoto()
				this.fileList = data.data.map(item => {
					return {
						...item,
						url: item.photo_path
					}
				});
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					console.log(result)
					if(result.success ==true){
						this.fileList.push({
							status: 'success',
							message: '',
							url: result.data
						})
					}
				}
			},
			async submit(){
				if(this.fileList.length>=1){
					const data =  this.$apis.uesrApi.uploadPhoto({
						file:this.fileList.map(function(item){
							return item.url
						})
					})
					return data
				}
			},
			async uploadFilePromise(url) {
				const sign =await this.$apis.uesrApi.getOss()
				let fileName = this.get_file_name(url)
				if(sign.status==1){
					return this.upload(sign,url,fileName)
				}
				return Promise.reject(new Error("上传失败"));
			},
			async upload(sign,url,fileName){
				return new Promise((resolve,reject)=>{
				let key='life_photo/'+fileName;
				uni.uploadFile({
					url: sign.data.host, // 仅为示例，非真实的接口地址
					filePath: url,
					name: 'file',
					formData: {
						name:fileName,
						key,
						policy:sign.data.policy,
						OSSAccessKeyId:sign.data.ossAccessKeyId,
						success_action_status: '200',
						signature:sign.data.signature
					},
					success: (res) => {
						if(res.statusCode==200){
							resolve({success: true, data: sign.data.host+'/'+key,iamgeUrl:key})
						 }else{
							  reject({success: false, data: '上传失败'})
						 }
					},
					fail: () => {
					  reject({success: false, data: '上传失败'})
					}
				});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.imgUpload {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: #666666;
		.imgList{
			display: flex;
			justify-content: space-around;
			.img{
				height: 136rpx;
				width: 136rpx;
				margin-right: 16rpx;
				&:nth-child(4){
					margin-right: 0;
				}
			}
		}
	}
	.uploadBox{
		margin: 0 36rpx;
		background: white;
		border-radius: 28rpx;
		padding: 42rpx 0;
	}
	
	.footer{
		margin-top: 124rpx;
		.imgList{
			display: flex;
			.img{
				height: 136rpx;
				width: 136rpx;
				margin-right: 16rpx;
				&:nth-child(4){
					margin-right: 0;
				}
			}
		}
	}
	.uploadBtn{
		width: 514rpx;
		height: 68rpx;
		line-height: 68rpx;
		background: rgba(255,65,105,0.08);
		border-radius: 200rpx;
		border: 2rpx solid #FF4169;
		color: #FF4169;
		font-size: 28rpx;
		margin-top: 60rpx;
	}
</style>
<style lang="scss">

</style>