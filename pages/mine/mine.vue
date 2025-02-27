<template>
	<view id="mine-content">
		<view class="top-container">
			<view class="personal-information">
				<view class="personal-information-left">
					<view class="avatar-wrapper">
						<u-avatar :size="200" :src="src"  mode="aspectFit" @click="login"></u-avatar>
					</view>
				</view>
				<view class="personal-information-mid">
					<view class="name">{{userInfo.username}}</view>
					<view class="title">好好学习，天天向上</view>
				</view>
				<view class="personal-information-right">
					<u-button class="custom-style" type="success" @tap="showClockPopup">签到</u-button>
				</view>
			</view>
		</view>
		<view class="navig-list">
			<view class="navig-item" v-for="item,index in navigs" :key="index">
				<navigator v-if="index !== 4" :url="item.url" @tap="index === 4 && logout()">
					<image class="navig-image" :src="item.image" ></image>
					<text class="navig-name">{{item.name}}</text>
					<image class="navig-right" src="../../static/img/icon/right.png"></image>
				</navigator>
				<view v-else @tap="logout()">
					<image class="navig-image" :src="item.image" ></image>
					<text class="navig-name">{{item.name}}</text>
					<image class="navig-right" src="../../static/img/icon/right.png"></image>
				</view>
			</view> 
		</view>
		<ClockPopup :showPopup="show" @popupClose="close"/>
		<Tabbar :current="4"></tabbar>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="modalShow" :content='content' :showCancelButton="true" :closeOnClickOverlay="true" :asyncClose="true" @confirm="modalConfirm" @cancel="modalCancel" @close="modalClose" confirmColor="#3fa162"></u-modal>
	</view>
</template>

<script>
	import Tabbar from '@/component/tabbar/tabbar.vue'
	import ClockPopup from '@/component/clockPopup/clockPopup.vue'
	import {mapState} from 'vuex'
	export default {
		components: {
			Tabbar,
			ClockPopup
		},
		data() {
			return {
				show: false,
				src: '../../static/img/user/avatar.png',
				navigs: [{
						url:"/pages/my-course/my-course",
						image: "../../static/img/mine/petname.png",
						name: "我的课程"
					},
					{
						url:"/pages/my-collect/my-collect",
						image: "../../static/img/mine/star.png",
						name: "我的收藏"
					},
					{
						url:"/pages/my-course/my-course",
						image: "../../static/img/mine/buy.png",
						name: "购买记录"
					},
					{
						url:"/pages/mine/mine",
						image: "../../static/img/mine/recommend.png",
						name: "推荐给好友"
					},
					{
						url:"/pages/login/login",
						image: "../../static/img/mine/logout.png",
						name: "退出登录"
					},
				],
				isUserSingInInfo: false,//是否有用户打卡信息
				isSingIn: false,//用户今天是否已打卡
				modalShow: false,
				content:'是否确定退出登录？',
			}
		},
		onLoad() {
			uni.hideTabBar()
			uni.preloadPage({
				url: '../../pages/course/course'
			})
			uni.preloadPage({
				url: '../../pages/search/search'
			})
			uni.preloadPage({
				url: '../../pages/message/message'
			})
			uni.preloadPage({
				url: '../../pages/mine/mine'
			})
			
			if(JSON.stringify(this.userSingIn) === "{}") {
				this.isUserSingInInfo = false
				
			} else {
				let today = new Date().getDay()
				let flag = this.userSingIn.day.findIndex(item => {
					return item === today
				})
				if(flag !== -1) {
					//今天未打卡
					this.isSingIn = true
				} else {
					//今天已打卡
					this.isSingIn = false
				}
				this.isUserSingInInfo = true
			}
		},
		onShow() {
			uni.hideTabBar()
			var userInfo = uni.getStorageSync('sea-userInfo')
			if(userInfo === '' || userInfo === null){
				uni.redirectTo({url:'../login/login'});
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			async showClockPopup() {
				
				if(this.isSingIn) {
					uni.$u.toast('今日已打卡！')
					return
				}
				
				let userSingInfo = JSON.parse(JSON.stringify(this.userSingIn))
				
				if(this.isUserSingInInfo) {
					let singIn = userSingInfo
					let today = new Date().getDay()
					
					singIn['day'].push(today)
					
					let result = await this.$store.dispatch('global/addUserSingIn',singIn);
					
					let _that = this
					this.$refs.uToast.show({
						type: 'loading',
						title: '正在加载',
						message: "正在加载",
						duration: "1000",
						complete() {
							if(result === 'ok') {
								_that.show = true
								_that.isSingIn = true
							}
						}
					})
				} else {
					let singIn = {}
					
					let today = new Date().getDay()
					singIn['username'] = this.userInfo.username
					singIn['day'] = [today]
					
					let result = await this.$store.dispatch('global/addUserSingIn',singIn);
					
					let _that = this
					this.$refs.uToast.show({
						type: 'loading',
						title: '正在加载',
						message: "正在加载",
						duration: "1000",
						complete() {
							if(result === 'ok') {
								_that.show = true
								_that.isSingIn = true
							}
						}
					})
				}
			},
			close() {
				this.show = false
			},
			logout() {
				this.modalShow = true
			},
			async modalConfirm() {
				
				let result = await this.$store.dispatch('print/userLogout');
				if(result === 'ok') {
					this.modalShow = false
					uni.navigateTo({
						url:`/pages/login/login`
					})
				}
			},
			modalCancel() {
				this.modalShow = false;
			},
			modalClose() {
				this.modalShow = false
			},
		},
		computed: {
			...mapState('print', ['userInfo']),
			...mapState('global', ['userSingIn']),
			
		}
	}
</script>
	
<style lang="scss">
page {
	background-color: #fff;
}
</style>

<style lang="scss" scoped>
	
#mine-content{
	.top-container {
		display: flex;
		justify-content: space-between;
		width: 200%;
		height: 330rpx;
		background: rgba(105, 201, 139, 1);
	
		position: relative;
		left: -50%;
		top: 0;
		border-radius: 0 0 50% 50%;
	
		.personal-information {
			
			display: flex;
			justify-content: space-between;
			
			position: absolute;
			left: 400rpx;
			top: 30px;
			
			.personal-information-left {
				width: 200rpx;
	
				.avatar-wrapper {
					width: 100%;
					height: 100%;					
				}
			}
	
			.personal-information-mid {
				width: 340rpx;
				height: 188rpx;
				
				.name{
					font-size: 60rpx;
					font-weight: 400;
					letter-spacing: 0px;
					line-height: 80rpx;
					color: rgba(255, 255, 255, 1);
					margin-top: 4rpx;
					margin-bottom: 30rpx;
				}
				.title{
					font-size: 35rpx;
					font-weight: 400;
					letter-spacing: 0px;
					line-height: 37rpx;
					color: rgba(255, 255, 255, 1);
				}
			}
	
			.personal-information-right {
				width: 160rpx;
				height: 188rpx;
				.custom-style{
					margin-top: 50rpx;
					border-radius: 30px;
					background: rgba(224, 245, 231, 1);	
					border: 1px solid rgba(63, 161, 98, 1);    
					color: rgba(63, 161, 98, 1);
				}
			}
		}
	
	}
	
	.navig-list {
		padding-top: 40px;
	
		.navig-item {
			padding-top: 12px;
			height: 48px;
			position: relative;
	
			.navig-image {
				position: relative;
				left: 17px;
				top: 0px;
				width: 22px;
				height: 22px;
			}
	
			.navig-name {
				position: relative;
				left: 33px;
				top: 10px;
				width: 64px;
				height: 23px;
				opacity: 1;
				font-size: 16px;
				font-weight: 400;
				letter-spacing: 0px;
				line-height: 0px;
				color: rgba(31, 31, 57, 1);
				text-align: left;
				vertical-align: top;
			}
	
			.navig-right {
				position: absolute;
				right: 18px;
				top: 17px;
				width: 4.8px;
				height: 9.6px;
				opacity: 1;
			}
		}
	}
}

</style>
