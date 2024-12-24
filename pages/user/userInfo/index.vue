<template>
	<view class="container" :style="{paddingTop: statusBarHeight+'px'}">
		<view class="header">
			<navigator url="/pages/user/InformationEntry/index?pageIndex=4" hover-class="none" class="edit">
				<image class="img" :src="member_profiles.user_avatar" mode="aspectFill"></image>
			</navigator>
			<text class="txt">{{member.nick_name}}</text>
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
							<text v-if="member_profiles.nick_name" class="tag">{{member_profiles.nick_name}}</text>
							<text v-if="member_profiles.height" class="tag">{{member_profiles.height}}</text>
							<text v-if="member_profiles.gender" class="tag">{{formatEnum('MemberProfile.gender', member_profiles.gender)}}</text>
							<text v-if="member_profiles.birth_date" class="tag">{{member_profiles.birth_date}}</text>
							<text v-if="member_profiles.province" class="tag">{{member_profiles.province}}/{{member_profiles.city}}</text>
							<text v-if="member_profiles.work" class="tag">{{member_profiles.work}}</text>
							<text v-if="member_profiles.living_status" class="tag">{{formatEnum('MemberProfile.living_status', member_profiles.living_status)}}</text>
							<text v-if="member_profiles.weight" class="tag">{{member_profiles.weight}}kg</text>
							<text v-if="member_profiles.education" class="tag">{{formatEnum('MemberProfile.education', member_profiles.education)}}</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">婚姻资料</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=1" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text v-if="marriage_info.marital_status" class="tag">{{formatEnum("MemberMarriageInfo.marital_status", marriage_info.marital_status)}}</text>
							<text v-if="marriage_info.child_status" class="tag">{{formatEnum("MemberMarriageInfo.child_status", marriage_info.child_status)}}</text>
							<text v-if="marriage_info.alimony_payment" class="tag">{{formatEnum("MemberMarriageInfo.alimony_payment", marriage_info.alimony_payment)}}</text>
							<text v-if="marriage_info.family_background" class="tag">{{formatEnum("MemberMarriageInfo.family_background", marriage_info.family_background)}}</text>
							<text v-if="marriage_info.divorce_time" class="tag">{{marriage_info.divorce_time}}</text>
							<text v-if="marriage_info.dating_purpose" class="tag">{{formatEnum("MemberMarriageInfo.dating_purpose", marriage_info.dating_purpose)}}</text>
							<text v-if="marriage_info.expected_marriage_time" class="tag">{{formatEnum("MemberMarriageInfo.expected_marriage_time", marriage_info.expected_marriage_time)}}</text>
							<text v-if="marriage_info.intention_to_have_children" class="tag">{{formatEnum("MemberMarriageInfo.intention_to_have_children", marriage_info.intention_to_have_children)}}</text>
						</view>
						<view class="Description">{{ marriage_info.divorce_reason }}</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">生活爱好</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=2" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text v-if="member_hobbies.exercise_frequency" class="tag">{{formatEnum('MemberHobbie.exercise_frequency', member_hobbies.exercise_frequency)}}</text>
							<text v-if="member_hobbies.pet" class="tag">{{formatEnum('MemberHobbie.pet', member_hobbies.pet)}}</text>
							<text v-if="member_hobbies.smoking" class="tag">{{formatEnum('MemberHobbie.smoking', member_hobbies.smoking)}}</text>
							<text v-if="member_hobbies.drinking" class="tag">{{formatEnum('MemberHobbie.drinking', member_hobbies.drinking)}}</text>
							<text v-if="member_hobbies.travel_frequency" class="tag">{{formatEnum('MemberHobbie.travel_frequency', member_hobbies.travel_frequency)}}</text>
							<text v-if="member_hobbies.income_distribution" class="tag">{{formatEnum('MemberHobbie.income_distribution', member_hobbies.income_distribution)}}</text>
							<text v-if="member_hobbies.housework_division" class="tag">{{formatEnum('MemberHobbie.housework_division', member_hobbies.housework_division)}}</text>
							<text v-if="member_hobbies.can_cook" class="tag">{{formatEnum('MemberHobbie.can_cook', member_hobbies.can_cook)}}</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">我理想中的TA</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=3" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text class="tag">{{formatEnum("ExpectedHim.drinking", expected_him.drinking)}}</text>
							<text class="tag">{{formatEnum("ExpectedHim.pet", expected_him.pet)}}</text>
							<text class="tag">{{formatEnum("ExpectedHim.smoking", expected_him.smoking)}}</text>
							<text class="tag">{{formatEnum("ExpectedHim.exercise_frequency", expected_him.exercise_frequency)}}</text>
							<text class="tag">{{formatEnum("ExpectedHim.travel_frequency", expected_him.travel_frequency)}}</text>
							<text class="tag">{{formatEnum("ExpectedHim.can_cook", expected_him.can_cook)}}</text>
							<text class="tag">{{formatEnum("ExpectedHim.living_status", expected_him.living_status)}}</text>
							<text class="tag">{{formatEnum("ExpectedHim.drinking", expected_him.drinking)}}</text>
						</view>
						<view class="Description">{{ expected_him.description }}</view>
					</view>
					
					
					<view class="item">
						<view class="titleBox">
							<text class="title">关于我</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=6" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="aboutMe">{{ member_profiles.about_me || '' }}</view>
					</view>
				</view>
				<view class="imgBox" v-else>
					<view class="imgList">
						<view class="item" v-for="item in photoList" :key="item.id">
							<image class="img" :src="item.photo_path" mode="aspectFill"></image>
						</view>
					</view>
					<view class="imgFooter">
						<navigator url="/pages/user/InformationEntry/index?pageIndex=5" hover-class="none" class="edit">
							<button class="bnt">上传照片</button>
						</navigator>
						<!-- <view class="delete">
							<u-icon label="删除" label-size="12" size="26" name="trash"></u-icon>
						</view> -->
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
				member: {},
				marriage_info: {},
				expected_him: {},
				photoList: []
			}
		},
		computed:{
			
		},
		onLoad(e) {
		},
		onShow() {
			let that = this;
			uni.getSystemInfo({
				success: function(info) {
					var statusBarHeight = info.statusBarHeight;
					that.statusBarHeight = statusBarHeight;
				}
			});
			this.getBasic();
			this.getPhoto();
		},
		methods:{
            async getPhoto() {
				const data = await this.$apis.uesrApi.getPhoto()
				console.log(data.data);
				this.photoList = data.data;
			},
			tabChange(item){
				this.current = item.index;
			},
			async getBasic(){
				const data = await this.$apis.uesrApi.basic()
				if(data.status==1){
					this.member_hobbies = data.data.member_hobbies || {};
					this.member = data.data.member || {};
					this.member_profiles = data.data.profile || {};
					this.marriage_info = data.data.marriage_info || {};
					this.expected_him = data.data.expected_him || {};
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>