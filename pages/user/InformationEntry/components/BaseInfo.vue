<template>
	<view class="form">
		<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="forms" label-width="80">
			<u-form-item label="昵称" prop="nick_name" borderBottom ref="item1">
				<u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请输入" v-model="userInfo.nick_name" border="none"></u--input>
			</u-form-item>
			<u-form-item label="身高" prop="height" borderBottom ref="item1">
				 <u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请输入" v-model="userInfo.height" border="none"></u--input>
			</u-form-item>
			<u-form-item label="性别" prop="gender" borderBottom @click="showSex = true; hideKeyboard()" ref="item1">
				<u--input suffixIcon="arrow-right" inputAlign="right" v-model="userInfo.gender" disabled disabledColor="transparent" placeholder="请选择" border="none"></u--input>			
			</u-form-item>
			<u-form-item label="生日" prop="birth_date" borderBottom ref="item1"  @click="datetimeShow = true">
				 <u--input suffixIcon="arrow-right" inputAlign="right" v-model="userInfo.birth_date" disabled disabledColor="transparent" placeholder="请选择" border="none"></u--input>
			</u-form-item>
			<u-form-item label="居住地" prop="place" borderBottom ref="item1" @click="openPlace">
				 <u--input suffixIcon="arrow-right" inputAlign="right" disabled disabledColor="transparent" placeholder="请选择" border="none" v-model="userInfo.place"></u--input>
			</u-form-item>
			<u-form-item label="家乡" prop="hometown" borderBottom ref="item1" @click="openHometown">
				 <u--input suffixIcon="arrow-right" inputAlign="right" disabled  disabledColor="transparent" placeholder="请选择" border="none" v-model="userInfo.hometown"></u--input>
			</u-form-item>
			<u-form-item label="职业" prop="work" borderBottom ref="item1">
				 <u--input suffixIcon="arrow-right" inputAlign="right" border="none" v-model="userInfo.work" placeholder="请输入"></u--input>
			</u-form-item>
			<u-form-item label="居住状态" prop="living_status" borderBottom ref="item1" @click="showLivingStatus = true">
				 <u--input suffixIcon="arrow-right" inputAlign="right" disabled  disabledColor="transparent" placeholder="请选择" border="none" v-model="userInfo.living_status"></u--input>
			</u-form-item>
			<u-form-item label="体重" prop="weight" borderBottom ref="item1">
				 <u--input suffixIcon="arrow-right" inputAlign="right" border="none" v-model="userInfo.weight" placeholder="请输入"></u--input>
			</u-form-item>
			<u-form-item label="学历" prop="education" borderBottom ref="item1"  @click="showEducation = true">
				 <u--input suffixIcon="arrow-right" inputAlign="right" border="none" v-model="userInfo.education" disabled disabledColor="transparent" placeholder="请选择" ></u--input>
			</u-form-item>
			
		</u--form>
		<u-action-sheet :show="showEducation" :actions="education" title="请选择" @close="showEducation = false" @select="educationSelect"></u-action-sheet>
		<u-action-sheet :show="showSex" :actions="gender" title="请选择" @close="showSex = false" @select="sexSelect"></u-action-sheet>
		<u-action-sheet :show="showLivingStatus" :actions="livingStatus" title="请选择" @close="showLivingStatus = false" @select="livingStatusSelect"></u-action-sheet>
		<u-datetime-picker :show="datetimeShow" v-model="datetimeValue" mode="date" @confirm="Dateconfirm" @cancel="datetimeShow = false" ></u-datetime-picker>
		
		<barry-picker ref="placeDialog" @get-address="getPlace"></barry-picker>
		<barry-picker ref="hometownDialog" @get-address="getHometown"></barry-picker>
	</view>
</template>

<script>
	import {dateFormat} from '@/utils/util.js'
	export default {
		data() {
			return {
				showSex: false,
				showEducation: false,
				showLivingStatus: false,
				userInfo: {
					nick_name: '',
					height: '',
					gender: '',
					birth_date: '',
					place: '',
					hometown: '',
					education: '',
					work: '',
					occupation: '',
					living_status: '',
					weight: ''
				},
				gender: [],
				education:[],
				livingStatus: [],
				rules: {
					'nick_name': [{
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					}],
					'height': [{
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					}],
					'gender': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'birth_date': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'place': [{
						type: 'string',
						required: false,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'hometown': [{
						type: 'string', 
						required: false,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'work': [{
						type: 'string',
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					'living_status': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'weight': [{
						type: 'string',
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}]
				},
				radio: '',
				switchVal: false,
				Enum: {},
				datetimeShow: false,
				datetimeValue: Number(new Date()),
			};
		},
		methods: {
			dateFormat,
			sexSelect(e) {
				this.userInfo.gender = e.name;
				this.$refs.forms.validateField('gender')
			},
			educationSelect(e){
				this.userInfo.education = e.name;
				this.$refs.forms.validateField('education')
			},
			livingStatusSelect(e){
				this.userInfo.living_status = e.name;
				this.$refs.forms.validateField('living_status')
			},
			getselectData(Enum,index){
				let data = [];
				for(let key in Enum.MemberProfile[index]){
					data.push({
						name: Enum.MemberProfile[index][key],
						key
					})
				}
				return data;
			},
			Dateconfirm(date){
				const birth_date = this.dateFormat(date.value)
				this.userInfo.birth_date = birth_date;
				this.$refs.forms.validateField('birth_date')
				this.datetimeShow = false;
			},
			DateCancel(e){
				this.datetimeShow = false;
			},
			async submit(){
				try{
					await this.$refs.forms.validate()
					let update = Object.assign({},this.userInfo)
					// 根据选择的name查找对应的key，这里假设你的livingStatus数据是一个数组，每个元素有name和key属性，需要根据实际情况调整查找逻辑
					const selectedLivingStatus = this.livingStatus.find(item => item.name === this.userInfo.living_status);
					if (selectedLivingStatus) {
						update.living_status = selectedLivingStatus.key;
					}
					const gender = this.gender.find(item => item.name === this.userInfo.gender);
					if (gender) {
						update.gender = gender.key;
					}
					const education = this.education.find(item => item.name === this.userInfo.education);
					if (education) {
						update.education = education.key;
					}
					const data =  this.$apis.uesrApi.updateProfile(update)
					return data;
				}catch(errors){
					 throw errors
				}
			},
			hideKeyboard(){
				uni.hideKeyboard()
			},
			getHometown(e){
				console.log(e)
				this.userInfo.hometown = e.value.join('-');
				this.$nextTick(()=>{
					this.$refs.forms.validateField('hometown');
				})
			},
			getPlace(e){
				
				console.log(e)
				this.userInfo.place = e.value.join('-')
				this.$nextTick(()=>{
					this.$refs.forms.validateField('place');
				})
			},
			openHometown(){
				console.log(this.$refs.hometownDialog)
				this.$refs.hometownDialog.show = true;
			},
			openPlace(){
				this.$refs.placeDialog.show = true;
			},
		},
		mounted() {
			let Enum = uni.getStorageSync('Enum');
			if(typeof(Enum)!=='object'){
				Enum = JSON.parse(Enum)
			}
			this.gender = this.getselectData(Enum,'gender');
			this.education = this.getselectData(Enum,'education');
			this.livingStatus = this.getselectData(Enum,'living_status');
			this.userInfo = {
					nick_name: 'baby',
					height: '170',
					gender: 'femal',
					birth_date: '2014-10-01',
					place: '',
					hometown: '',
					education: '高中',
					work: '护士',
					occupation: '',
					living_status: '',
					weight: '170'
				}
			this.$nextTick(()=>{
				this.$refs.forms.setRules(this.rules)
			})
		},
	};
</script>
<style lang="scss" scoped>
	.form{
		padding: 32rpx;
		background: white;
		border-radius: 28rpx;
	}
</style>