<template>
	<view class="homeContent">
		<view class="hreader mt94">
			<uni-swiper-dot :info="memberInfo.photo" :current="current" field="content" mode="round" :dotsStyles='dotsStyles'>
				<swiper :style="{paddingTop: headHeight + 'px'}" class="swiper" circular :autoplay="true"
					:interval="2000" @change="change" :indicator-dots="false" :duration="500">
					<swiper-item v-for="(item,index) in memberInfo.photo" :key="index">
						<view class="swiper-item uni-bg-red">
							<view class="bg">
								<image class="img" :src="item.photo_path" mode="aspectFill"></image>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="content">
			<view class="cHead">
				<view class="cHeadLine1">
					<view class="name">{{memberInfo.nick_name}}</view>
					<image class="img" 
						:src="memberInfo.profile.gender === 'female' ? 'https://oss.derucci-smart.com/images/upload/w_1735117411126.png' : 'https://oss.derucci-smart.com/images/upload/m_1735117399439.png'"
					 	mode=""
					></image>
					<view class="msg" @click="openOtherInfo">已认证信息</view>
				</view>
				<view class="cHeadLine2">
					<view class="txt">
						<view v-if="memberInfo.profile" class="txtItem">{{ memberInfo.profile.age || '' }}岁</view>
						<view v-if="memberInfo.profile" class="txtItem">{{ getGeneration(memberInfo.profile.birth_date) }}</view>
						<view v-if="memberInfo.profile" class="txtItem">{{ getZodiacFromDate(memberInfo.profile.birth_date) }}</view>
					</view>
					<view class="txt">
						<view v-if="memberInfo.profile" class="txtItem">{{memberInfo.profile.height || ''}}cm</view>
						<view v-if="memberInfo.profile" class="txtItem">{{memberInfo.profile.weight || ''}}kg</view>
					</view>
				</view>
				<view class="cHeadLine3" v-if="memberInfo.profile">
					<view class="item">
						<image class="img1" :src="imgBaseUrl+'Group@2x(2).png'" mode=""></image>
						{{memberInfo.profile.work}}
					</view>
					<view class="item">
						<image class="img2" :src="imgBaseUrl+'Group@2x.png'" mode=""></image>
						{{memberInfo.profile.province || ''}}-{{memberInfo.profile.city || ''}}
					</view>
				</view>
			</view>

			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
					婚姻状况
				</view>
				<view class="li">
					<text class="label">婚姻情况:</text>
					<text
						class="txt">{{MemberMarriageInfo.marital_status[memberInfo.marriage_info.marital_status]}}</text>
				</view>
				<view class="li">
					<text class="label">是否有孩子:</text>
					<text class="txt">{{MemberMarriageInfo.child_status[memberInfo.marriage_info.child_status]}}</text>
				</view>
				<view class="li">
					<text class="label">抚养费支出:</text>
					<text
						class="txt">{{MemberMarriageInfo.alimony_payment[memberInfo.marriage_info.alimony_payment]}}</text>
				</view>
				<view class="li">
					<text class="label">家庭背景:</text>
					<text
						class="txt">{{MemberMarriageInfo.family_background[memberInfo.marriage_info.family_background]}}</text>
				</view>
				<!-- 	<view class="li">
					<text class="label">探望子女周期:</text>
					<text class="txt">{{MemberMarriageInfo.family_background[memberInfo.marriage_info.family_background]}}</text>
				</view> -->
				<view class="li">
					<text class="label">离异时间:</text>
					<text class="txt">{{memberInfo.marriage_info.divorce_time}}</text>
				</view>
				<view class="li">
					<text class="label">是否有要孩子的打算:</text>
					<text
						class="txt">{{MemberMarriageInfo.intention_to_have_children[memberInfo.marriage_info.intention_to_have_children]}}</text>
				</view>
			</view>
			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group695@2x.png'" mode=""></image>
					我为什么离异
				</view>
				<view class="texts">
					{{memberInfo.marriage_info.divorce_reason}}
				</view>
			</view>
			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group696@2x.png'" mode=""></image>
					个人资料
				</view>
				<view class="li">
					<text class="label">家乡:</text>
					<text
						class="txt">{{memberInfo.profile.hometown_province}}/{{memberInfo.profile.hometown_city}}/{{memberInfo.profile.hometown_region}}</text>
				</view>
				<view class="li">
					<text class="label">学历:</text>
					<text class="txt">{{profile.education[memberInfo.profile.education]}}</text>
				</view>
				<view class="li">
					<text class="label">居住地:</text>
					<text class="txt">{{memberInfo.profile.province}}/{{memberInfo.profile.city}}/{{memberInfo.profile.region}} </text>
				</view>
				<view class="li">
					<text class="label">居住情况:</text>
					<text class="txt">{{profile.living_status[memberInfo.profile.living_status]}}</text>
				</view>
				<view class="li">
					<text class="label">房产情况:</text>
					<text class="txt">{{profile.living_status[memberInfo.profile.living_status]}}</text>
				</view>
				<view class="li">
					<text class="label">生日:</text>
					<text class="txt">{{birthDay}}</text>
				</view>
				<view class="li">
					<text class="label">收入情况:</text>
					<text class="txt">{{profile.living_status[memberInfo.profile.living_status]}}</text>
				</view>

				<view class="tagbox">
					<text class="tag" v-if="memberInfo.member_hobbies.exercise_frequency">
						{{ memberInfo.member_hobbies.exercise_frequency ==='several_times_a_week'? '每周健身' : memberHobbiesEnum.exercise_frequency[memberInfo.member_hobbies.exercise_frequency] + '健身' }}
					</text>
					<text class="tag">{{memberHobbiesEnum.drinking[memberInfo.member_hobbies.drinking]}}喝酒</text>
					<text class="tag"
						v-if="memberInfo.member_hobbies.pet">有{{memberHobbiesEnum.pet[memberInfo.member_hobbies.pet]}}</text>
					<text class="tag"
						v-if="memberInfo.member_hobbies.smoking">{{memberHobbiesEnum.smoking[memberInfo.member_hobbies.smoking]}}抽烟</text>
					<text class="tag" v-if="memberInfo.member_hobbies.travel_frequency">
						{{memberHobbiesEnum.travel_frequency[memberInfo.member_hobbies.travel_frequency]}}旅游
					</text>
					<text class="tag" v-if="memberInfo.member_hobbies.can_cook">
						{{memberHobbiesEnum.can_cook[memberInfo.member_hobbies.can_cook]}}做饭
					</text>
				</view>
			</view>
			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group697@2x.png'" mode=""></image>
					关于我
				</view>
				<view class="texts">
					{{memberInfo.profile.about_me}}
				</view>
			</view>
			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group697@2x.png'" mode=""></image>
					理想的 TA
				</view>
				<view class="itemContent">
					<view class="centerBox">
						<view class="txt">
							<view class="txt">期望中的</view>
							TA
						</view>
					</view>
					<view class="tagList">
						<view class="tag tag1" v-if="memberInfo.expected_him.drinking">
							{{expectedHimEnum.drinking[memberInfo.expected_him.drinking]}}喝酒
						</view>
						<view class="tag tag2" v-if="memberInfo.expected_him.pet">
							{{expectedHimEnum.pet[memberInfo.expected_him.pet]}}
						</view>
						<view class="tag tag3" v-if="memberInfo.expected_him.exercise_frequency">
							{{expectedHimEnum.exercise_frequency[memberInfo.expected_him.exercise_frequency]}}健身
						</view>
						<view class="tag tag4" v-if="memberInfo.expected_him.living_status">
							{{expectedHimEnum.living_status[memberInfo.expected_him.living_status]}}
						</view>
						<view class="tag tag5" v-if="memberInfo.expected_him.travel_frequency">
							{{expectedHimEnum.travel_frequency[memberInfo.expected_him.travel_frequency]}}
						</view>
						<view class="tag tag6" v-if="memberInfo.expected_him.can_cook">
							{{expectedHimEnum.can_cook[memberInfo.expected_him.can_cook]}}做饭
						</view>
					</view>
				</view>
				<view class="texts">
					{{memberInfo.expected_him.description || ''}}
				</view>
				<view class="imgs" v-if="memberInfo.photo">
					<image class="img" v-for="(item,index) in memberInfo.photo" :key="index" :src="item.photo_path" mode="aspectFill"></image>
				</view>
				<view v-else>
					<image class="img" :src="imgBaseUrl+'Group718@2x.png'" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { userStore } from "@/store/account/userInfo.js"
	import { getZodiacFromDate, getGeneration } from '../../../utils/util.js';
	export default {
		props: {
			memberInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				imgBaseUrl: this.imgBaseUrl,
				current: 0,
				dotsStyles: {
					backgroundColor: 'rgba(255,255,255,0.35)',
					border: 'none',
					selectedBackgroundColor: 'white',
					selectedBorder: 'none',
					paddingTop: this.headHeight + 'px'
				},
				titleHeight: 44,
				headHeight: '',
				memberList: [],
				memberIndex: 0
			}
		},
		computed: {
			profile() {
				const Enum = userStore.state.Enum;
				return Enum.MemberProfile;
			},

			MemberMarriageInfo() {
				const Enum = userStore.state.Enum;
				return Enum.MemberMarriageInfo;
			},

			memberHobbiesEnum() {
				const Enum = userStore.state.Enum;
				return Enum.MemberHobbie;
			},

			expectedHimEnum() {
				const Enum = userStore.state.Enum;
				return Enum.ExpectedHim;
			},

			birthDay() {
				if (this.memberInfo.hasOwnProperty('profile')) {
					return this.formatBirthday((this.memberInfo.profile || {}).birth_date)
				}
				return '';
			}
		},
		created() {
			uni.getSystemInfo({
				success: (info) => {
					this.headHeight = info.statusBarHeight + this.titleHeight;
				}
			});
		},
		methods: {
			getZodiacFromDate,
			getGeneration,
			change(e) {
				this.current = e.detail.current;
			},
			formatBirthday(dateStr) {
				if (!dateStr) return '';
				const parts = dateStr.split('-');
				const month = parts[1];
				const day = parts[2];
				return `${month}月${day}日`;
			},
			openOtherInfo() {
				this.$emit("onIdentification", this.memberInfo);
			},

		}
	}
</script>

<style lang="scss">
	@import "../index.scss";
</style>