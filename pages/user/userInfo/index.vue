<template>
	<view class="container" :style="{paddingTop: statusBarHeight+'px'}">
		<view class="header">
			<image class="img" :src="member_profiles.user_avatar" mode="aspectFill"></image>
			<text class="txt">{{member_profiles.nick_name}}</text>
			<button class="bnt">预览</button>
		</view>
		<view class="tabList">
			<u-tabs :list="tabList" @click="tabChange" lineColor="#FF7390" lineWidth="25" :current='current'></u-tabs>
		</view>
		<view class="contentBox">
			<view class="content">
				<view class="baseInfo" v-if="!current">
					<view class="item">
						<view class="titleBox">
							<text class="title">基本信息</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=0" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text class="tag">{{member_profiles.nick_name}}</text>
							<text class="tag">{{member_profiles.height}}</text>
							<text class="tag">{{member_profiles.gender}}</text>
							<text class="tag">{{member_profiles.birth_date}}</text>
							<text class="tag">{{member_profiles.place}}</text>
							<text class="tag">{{member_profiles.hometown}}</text>
							<text class="tag">{{member_profiles.work}}</text>
							<text class="tag">{{member_profiles.living_status}}</text>
							<text class="tag">{{member_profiles.weight}}</text>
							<text class="tag">{{member_profiles.education}}</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">婚姻资料</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=1" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text class="tag">一周健身一次</text>
							<text class="tag">偶尔喝酒</text>
							<text class="tag">有猫有狗</text>
							<text class="tag">不抽烟</text>
							<text class="tag">期望一年内结婚</text>
							<text class="tag">吸猫人</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">生活爱好</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=2" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text class="tag">一周健身一次</text>
							<text class="tag">偶尔喝酒</text>
							<text class="tag">有猫有狗</text>
							<text class="tag">不抽烟</text>
							<text class="tag">期望一年内结婚</text>
							<text class="tag">吸猫人</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">我理想中的TA</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=3" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text class="tag">一周健身一次</text>
							<text class="tag">偶尔喝酒</text>
							<text class="tag">有猫有狗</text>
							<text class="tag">不抽烟</text>
							<text class="tag">期望一年内结婚</text>
							<text class="tag">吸猫人</text>
						</view>
						<view class="Description">这个是文本，这个是文本这个是文本，这个是文本这个是文本，这个是文本</view>
					</view>
					
					
					<view class="item">
						<view class="titleBox">
							<text class="title">关于我</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=4" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="aboutMe">这个是文本，这个是文本这个是文本，这个是文本这个是文本，这个是文本</view>
					</view>
				</view>
				<view class="imgBox" v-else>
					<view class="imgList">
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						
						
					</view>
					
					<view class="imgFooter">
						<button class="bnt">上传照片</button>
						<view class="delete">
							<u-icon label="删除" label-size="12" size="26" name="trash"></u-icon>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				statusBarHeight: 20,
				current: 0,
				tabList:[
					{name: '基本信息'},
					{name: '生活照'}
				],
				member_profiles:{
					user_avatar:'../../../static/img/logo.png',
					nick_name:'',
				},
				member_hobbies: {},
				members: {},
				member_marriage_infos: {},
				expected_hims: {}
			}
		},
		computed:{
			
		},
		onLoad(e) {
			this.getBasic()
		},
		onShow() {
			let that = this;
			uni.getSystemInfo({
				success: function(info) {
					var statusBarHeight = info.statusBarHeight;
					that.statusBarHeight = statusBarHeight;
				}
			});
		},
		methods:{
			tabChange(item){
				this.current = item.index;
			},
			async getBasic(){
				const data = await this.$apis.uesrApi.basic()
				if(data.status==1){
					this.member_hobbies = data.data.member_hobbies;
					this.members = data.data.members;
					this.member_profiles = data.data.member_profiles;
					this.member_marriage_infos = data.data.member_marriage_infos;
					this.expected_hims = data.data.expected_hims;
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>