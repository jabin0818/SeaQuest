<template>
	<view id="index-content">
		<view class="title-container">
			<view class="title-container-left">
				<view class="title">
					嗨～{{userInfo.username}}
				</view>
				<view class="desc">
					让我们一起学习吧！
				</view>
			</view>
			<view class="title-container-right">
				<view class="avatar-wrapper">
					<u-avatar :size="100" :src="src" mode="aspectFit"></u-avatar>
				</view>
			</view>
		</view>
		<view class="panel-list">
			<view class="panel-item panel-today">
				<view class="panel-today-title">
					<view class="today-title-left">
						今日学习
					</view>
					<view class="today-title-right" @tap="toMycourse">
						我的课程
					</view>
				</view>
				<view class="panel-today-body">
					<view class="study-progress">
						<text class="study-progress-strong">46分钟</text>
						<text>/60分钟</text>
					</view>
					<view class="study-progressBar">
						<u-line-progress :percentage="30" activeColor="" :showText="false"></u-line-progress>
					</view>
				</view>
			</view>
			<view class="panel-item panel-ad">
				<u-swiper
					:list="list3"
					previousMargin="0"
					nextMargin="150"
					circular
					:autoplay="false"
					radius="16"
					bgColor="#ffffff"
					:height="310"
				></u-swiper>
			</view>
			<view class="panel-item panel-plan">
				<view class="plan-title">
					学习计划
				</view>
				<view class="plan-body">
					<view class="plan-course-list">
						<view class="plan-course-item" v-for="item,index in courses" :key="index">
							<view class="plan-course-left">
								<CircleProgress v-if="index === 0" :percentNumOne="schedule(item)" :canvasId="1" class="circleProgress" />
								<CircleProgress v-if="index === 1" :percentNumTwo="schedule(item)" :canvasId="2" class="circleProgress" />
								<CircleProgress v-if="index === 2" :percentNumThree="schedule(item)" :canvasId="3" class="circleProgress" />
								<text>{{item.title}}</text>
							</view>
							<view class="plan-course-right">
								<text class="strong">{{finishedNum(item)}}</text>
								<text>/{{userCourse[item.id].length}}</text>
							</view>
						</view>
						<view class="plan-course-item">
							<view class="plan-course-left">
								<CircleProgress :percentNumOne="0.3" :canvasId="1" class="circleProgress" />
								<text>产品设计课程</text>
							</view>
							<view class="plan-course-right">
								<text class="strong">6</text>
								<text>/28</text>
							</view>
						</view>
						<view class="plan-course-item">
							<view class="plan-course-left">
								<CircleProgress :percentNumTwo="0.3" :canvasId="2" class="circleProgress" />
								<text>色彩理论课程</text>
							</view>
							<view class="plan-course-right">
								<text class="strong">5</text>
								<text>/24</text>
							</view>
						</view>
						<view class="plan-course-item">
							<view class="plan-course-left">
								<CircleProgress :percentNumThree="0.7" :canvasId="3" class="circleProgress" />
								<text>英语语法精讲</text>
							</view>
							<view class="plan-course-right">
								<text class="strong">1</text>
								<text>/16</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="panel-item panel-posters">
				<image src="../../static/img/ad/Meetup.png"></image>
			</view>
		</view>
		<Tabbar :current="0"></tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/component/tabbar/tabbar.vue'
	import CircleProgress from '@/component/circleProgress/circleProgress.vue'
	import {mapState} from 'vuex'
	const Course = require('../../js/course.json')
	export default {
		components: {
			Tabbar,
			CircleProgress
		},
		data() {
			return {
				src:'../../static/img/user/avatar.png',
				list3: [
					'../../static/img/ad/ad1.png',
					'../../static/img/ad/ad2.png',
					'../../static/img/ad/ad3.png',
				],
				courses:[],
			}
		},
		onLoad() {
			var userInfo = uni.getStorageSync('sea-userInfo')
			if(userInfo === '' || userInfo === null){
				uni.redirectTo({url:'../login/login'});
			}
			uni.hideTabBar(),
			// 预加载导界面，避免导航栏出现抖动
			uni.preloadPage({
				url: '/pages/course/course'
			})
			uni.preloadPage({
				url: '/pages/search/search'
			})
			uni.preloadPage({
				url: '/pages/message/message'
			})
			uni.preloadPage({
				url: '/pages/mine/mine'
			})
			this.courses = Course.filter((item) => {
				return this.userCourse.hasOwnProperty(item.id)
			})
			if(this.courses.length > 3) {
				this.courses.splice(3)
			} else {
			}
		},
		onShow() {
			uni.hideTabBar()
		},
		methods: {
			toMycourse() {
				uni.navigateTo({
					url:`/pages/my-course/my-course`
				})
			},
			finishedNum(item) {
				let num = 0
				this.userCourse[item.id].forEach((item1) => {
					if(item1 === 1) {
						num ++ 
					}
				})
				return num 
			},
			schedule(item) {
				let fin = this.finishedNum(item)
				let all = this.userCourse[item.id].length
				return Number((fin / all).toFixed(1))
			}
		},
		computed: {
			...mapState('print', ['userInfo']),
			...mapState('global', ['userCourse'])
		}
	}
</script>
	
<style lang="scss">
page {
	background-color: #fff;
	padding: 0px;
}


</style>

<style lang="scss" scoped>
	
#index-content{
	
	.title-container{
		display: flex;
		justify-content: space-between;
		height: 114px;
		padding: 23px 20px 20px;
		background: rgba(105, 201, 139, 1);
			
		.title-container-left{
			
			.title{
				width: 200px;
				height: 35px;
				font-size: 24px;
				font-weight: 400;
				color: #fff;
				margin-top: 2px;
				margin-bottom: 5px;
			}
			
			.desc{
				font-size: 14px;
				color: #fff;
			}
		}
		
		.title-container-right{
			width: 50px;
			height: 50px;
			
			.avatar-wrapper{
				width: 100%;
				height: 100%;
				
			}
		}
	}

	.panel-list{
		position: relative;
		top: -45px;
		padding: 0 20px 85px;
		
		.panel-item{
			margin-bottom: 22px;
		}
		
		.panel-today{
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 8px 12px 0px rgba(184, 184, 210, 0.2);
			border-radius: 12px;
			padding: 14px;
			height: 68px;
			.panel-today-title{
				display: flex;
				justify-content: space-between;
				height: 20px;
				margin-bottom: 5px;
				.today-title-left{
					font-size: 12px;
					font-weight: 400;
					letter-spacing: 0px;
					line-height: 20px;
					color: rgba(132, 132, 150, 1);
					text-align: left;
					vertical-align: top;
				}
				.today-title-right{
					font-size: 12px;
					font-weight: 400;
					letter-spacing: 0px;
					line-height: 20px;
					color: rgba(63, 161, 98, 1);
					text-align: right;
					vertical-align: top;
				}
			}
			
			.panel-today-body{
				
				.study-progress{
					margin-bottom: 8px;
					.study-progress-strong{
						font-size: 20px;
						color: rgba(9, 35, 15, 1);
					}
					
					text{
						font-size: 10px;
						color: rgba(132, 132, 150, 1);
					}
				}
				
				.study-progressBar{
					
					/deep/ .u-line-progress__line{
						background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(254, 161, 100, 1) 100%)!important;
					}
				}
			}
		}
	
		.panel-ad{
			height: 150px;
		}
		
		.panel-plan{
			
			.plan-title{
				height: 26px;
				font-size: 18px;
				color: rgba(31, 31, 57, 1);
				margin-bottom: 14px;
			}
			
			.plan-body{
				height: 106px;
				border: 1px solid rgba(242, 242, 242, 1);            
				border-radius: 10px;
				box-shadow: 0px 8px 12px 0px rgba(184, 210, 188, 0.2);
				padding: 15px;
				
				.plan-course-list{
					
					.plan-course-item{
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 8px;
						
						.plan-course-left{
							display: flex;
							justify-content: space-between;
							align-items: center;
							
							.circleProgress{
								margin-right: 10px;
							}
							
							text{
								font-size: 14px;
								color: rgba(50, 52, 51, 1);
							}
						}
						.plan-course-right{
							font-size: 14px;
							
							.strong{
								font-weight: 600;
								color: rgba(31, 31, 57, 1);
							}
							
							text{
								color: rgba(170, 170, 170, 1);
							}
						}
					}
				}
			}
		}
		
		.panel-posters{
			height: 120px;
			image{
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}
		}
	}
}

</style>
