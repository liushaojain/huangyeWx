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
	import { multipleUpload } from "@/utils/util.js"
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
				this.fileList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				multipleUpload(event.file, this.fileList);
			},
			async submit(){
				if(this.fileList.length>=1){
					const data = this.$apis.uesrApi.uploadPhoto({
						file:this.fileList.map(function(item){
							return item.url
						})
					})
					return data
				}
			},
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