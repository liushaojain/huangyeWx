<template>
	<view class="container" :style="{paddingTop: statusBarHeight+'px'}">
		<NavBar fixed />
		<view class="header">
			<view @tap="to('/pages/user/InformationEntry/index?pageIndex=4')" hover-class="none" class="edit">
				<image class="img" :src="member_profiles.user_avatar" mode="aspectFill"></image>
			</view>
			<text class="txt">{{member.nick_name}}</text>
			<button @click="onPreview" class="bnt">预览</button>
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
							<view @tap="to('/pages/user/InformationEntry/index?pageIndex=0')" hover-class="none" class="edit">编辑</view>
						</view>
						<view class="tagList">
							<text v-if="member_profiles.nick_name" class="tag">{{member_profiles.nick_name}}</text>
							<text v-if="member_profiles.height" class="tag">身高{{member_profiles.height}}cm</text>
							<text v-if="member_profiles.gender" class="tag">{{formatEnum('MemberProfile.gender', member_profiles.gender)}}</text>
							<text v-if="member_profiles.birth_date" class="tag">生日{{member_profiles.birth_date}}</text>
							<text v-if="member_profiles.province" class="tag">现居住{{member_profiles.province}}/{{member_profiles.city}}/{{member_profiles.region}}</text>
							<text v-if="member_profiles.province" class="tag">家乡是{{member_profiles.hometown_province}}/{{member_profiles.hometown_city}}/{{member_profiles.hometown_region}}</text>
							<text v-if="member_profiles.work" class="tag">{{member_profiles.work}}</text>
							<text v-if="member_profiles.living_status" class="tag">{{formatEnum('MemberProfile.living_status', member_profiles.living_status)}}</text>
							<text v-if="member_profiles.weight" class="tag">体重{{member_profiles.weight}}kg</text>
							<text v-if="member_profiles.education" class="tag">{{formatEnum('MemberProfile.education', member_profiles.education)}}</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">婚姻资料</text>
							<view @tap="to('/pages/user/InformationEntry/index?pageIndex=1')" hover-class="none" class="edit">编辑</view>
						</view>
						<view class="tagList">
							<text v-if="marriage_info.marital_status" class="tag">{{formatEnum("MemberMarriageInfo.marital_status", marriage_info.marital_status)}}</text>
							<text v-if="marriage_info.child_status" class="tag">{{formatEnum("MemberMarriageInfo.child_status", marriage_info.child_status)}}</text>
							<text v-if="marriage_info.alimony_payment" class="tag">抚养费支出{{formatEnum("MemberMarriageInfo.alimony_payment", marriage_info.alimony_payment)}}</text>
							<text v-if="marriage_info.family_background" class="tag">{{formatEnum("MemberMarriageInfo.family_background", marriage_info.family_background)}}</text>
							<text v-if="marriage_info.divorce_time" class="tag">离婚时间{{marriage_info.divorce_time}}</text>
							<text v-if="marriage_info.dating_purpose" class="tag">交友目的是{{formatEnum("MemberMarriageInfo.dating_purpose", marriage_info.dating_purpose)}}</text>
							<text v-if="marriage_info.expected_marriage_time" class="tag">期望结婚时间{{formatEnum("MemberMarriageInfo.expected_marriage_time", marriage_info.expected_marriage_time)}}</text>
							<text v-if="marriage_info.intention_to_have_children" class="tag">{{formatEnum("MemberMarriageInfo.intention_to_have_children", marriage_info.intention_to_have_children)}}</text>
						</view>
						<view class="Description">{{ marriage_info.divorce_reason }}</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">生活爱好</text>
							<view @tap="to('/pages/user/InformationEntry/index?pageIndex=2')" hover-class="none" class="edit">编辑</view>
						</view>
						<view class="tagList">
							<text v-if="member_hobbies.exercise_frequency" class="tag">健身频率{{formatEnum('MemberHobbie.exercise_frequency', member_hobbies.exercise_frequency)}}</text>
							<text v-if="member_hobbies.pet" class="tag">抚养宠物：{{formatEnum('MemberHobbie.pet', member_hobbies.pet)}}</text>
							<text v-if="member_hobbies.smoking" class="tag">{{formatEnum('MemberHobbie.smoking', member_hobbies.smoking)}}抽烟</text>
							<text v-if="member_hobbies.drinking" class="tag">{{formatEnum('MemberHobbie.drinking', member_hobbies.drinking)}}喝酒</text>
							<text v-if="member_hobbies.travel_frequency" class="tag">旅游频率{{formatEnum('MemberHobbie.travel_frequency', member_hobbies.travel_frequency)}}</text>
							<text v-if="member_hobbies.income_distribution" class="tag">收入分配{{formatEnum('MemberHobbie.income_distribution', member_hobbies.income_distribution)}}</text>
							<text v-if="member_hobbies.housework_division" class="tag">家务分工{{formatEnum('MemberHobbie.housework_division', member_hobbies.housework_division)}}</text>
							<text v-if="member_hobbies.can_cook" class="tag">{{formatEnum('MemberHobbie.can_cook', member_hobbies.can_cook)}}做饭</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">我理想中的TA</text>
							<view @tap="to('/pages/user/InformationEntry/index?pageIndex=3')" hover-class="none" class="edit">编辑</view>
						</view>
						<view class="tagList">
							<text v-if="expected_him.drinking" class="tag">{{formatEnum("ExpectedHim.drinking", expected_him.drinking)}}喝酒</text>
							<text v-if="expected_him.pet" class="tag">抚养宠物：{{formatEnum("ExpectedHim.pet", expected_him.pet)}}</text>
							<text v-if="expected_him.smoking" class="tag">{{formatEnum("ExpectedHim.smoking", expected_him.smoking)}}抽烟</text>
							<text v-if="expected_him.exercise_frequency" class="tag">健身频率{{formatEnum("ExpectedHim.exercise_frequency", expected_him.exercise_frequency)}}</text>
							<text v-if="expected_him.travel_frequency" class="tag">旅游频率{{formatEnum("ExpectedHim.travel_frequency", expected_him.travel_frequency)}}</text>
							<text v-if="expected_him.can_cook" class="tag">{{formatEnum("ExpectedHim.can_cook", expected_him.can_cook)}}做饭</text>
						</view>
						<view class="Description">{{ expected_him.description }}</view>
					</view>
					<view class="item">
						<view class="titleBox">
							<text class="title">关于我</text>
							<view @tap="to('/pages/user/InformationEntry/index?pageIndex=6')" hover-class="none" class="edit">编辑</view>
						</view>
						<view class="aboutMe">{{ member_profiles.about_me || '未填写' }}</view>
					</view>
				</view>
				<view class="imgBox" v-else>
					<view class="imgList">
						<view class="item" v-for="item in photoList" :key="item.id">
							<view @tap="onSelectItem(item)" class="img-container" :class="{ active: item.id === selectedPhoto.id }">
								<image class="img" :src="item.photo_path" mode="aspectFill"></image>
							</view>
						</view>
						<view v-if="photoList.length === 0" class="empty-text">暂无生活照，请上传</view>
					</view>
					<view class="imgFooter">
						<view @tap="to('/pages/user/InformationEntry/index?pageIndex=5')" hover-class="none" class="edit">
							<button class="bnt">上传照片</button>
						</view>
						<view class="delete" @tap="delPhone">
							<u-icon label="删除" label-size="12" size="26" name="trash"></u-icon>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/nav-bar.vue'
	export default{
		components: { NavBar },
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
				photoList: [],
				selectedPhoto: {}
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
			if(this.isLogin) {
				this.getBasic();
				this.getPhoto();
			}
		},
		methods:{
			onPreview() {
				this.to(`/pages/home/userDetails?id=${this.basicInfoData.member.id}&isSelf=true`)
			},
			async delPhone() {
				if (this.selectedPhoto.id) {
					console.log("删除");
					await this.$apis.uesrApi.deletePhoto({
						id: this.selectedPhoto.id
					});
					this.getPhoto();
				} else {
					this.showToast("请选择要删除的照片");
				}
			},
			onSelectItem(item) {
				if (this.selectedPhoto.id && this.selectedPhoto.id === item.id) {
					this.selectedPhoto = {};
				} else {
					this.selectedPhoto = item;
				}
			},
			test() {
				// console.log(222);
				// wx.startFacialRecognitionVerify({
				// 	name: "林雄军",
				// 	idCardNumber: "441522199202223050"
				// })
			},
            async getPhoto() {
				const data = await this.$apis.uesrApi.getPhoto()
				console.log(data.data);
				this.photoList = data.data;
			},
			tabChange(item){
				this.current = item.index;
			},
			async getBasic(){
				const data = await this.getBasicInfoData();
				this.member_hobbies = data.member_hobbies || {};
				this.member = data.member || {};
				this.member_profiles = data.profile || {};
				this.marriage_info = data.marriage_info || {};
				this.expected_him = data.expected_him || {};
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>