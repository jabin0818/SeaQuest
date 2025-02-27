<template>
	<view>
		<u-navbar
			title="课程学习"
			@rightClick="rightClick"
			:autoBack="true"
			:placeholder="true"
		>
		<view class="u-nav-slot" slot="left">
			<u-icon
				name="arrow-left"
				size="44"
				color="#1f1f39"
				bold
				class="arrow-left"
			></u-icon>
		</view>
		</u-navbar>
		<view id="courseDetail-content">
			
			<view class="courseDetail-video">
				<video id="myVideo" @ended="videoEnded" @controlstoggle="controlstoggle" @pause="pause" @play="play" @timeupdate="timeupdate" :src="course.chapter[btnIndex].mv"></video>
				
			</view>
			<view class="courseDetail-Info">
				<view class="courseDetail-title">
					<view class="courseDetail-title-left">
						<view class="title">
							{{this.course.title}}
						</view>
						<view class="info">
							{{this.course.duration}} &nbsp;· &nbsp;{{this.course.section}}课时
						</view>
					</view>
					<view class="courseDetail-title-right">
						￥{{this.course.price}}
					</view>
				</view>
				<view class="courseDetail-intro">
					<view class="courseDetail-intro-title">
						课程介绍
					</view>
					<view class="courseDetail-intro-text" :style="showMore ? 'max-height: 999px;' : 'max-height: 32px;'">
						{{this.course.description}}
					</view>
					<view class="courseDetail-intro-readMore">
						<u-icon color="rgba(31, 31, 57, 1)" size="16px" :name="showMore ? 'arrow-up' : 'arrow-down'" @tap="showMoreBtn"></u-icon>
					</view>
					
				</view>
				<view class="courseDetail-directory">
					<view class="courseDetail-directory-list">
						<view class="courseDetail-directory-item" v-for="item,index in course.chapter" :key="index">
							<view class="num">
								{{index+1 < 10 ? '0'+(index+1) : index+1}}
							</view>
							<view class="intor">
								<view class="name">
									{{item.title}}
								</view>
								<view :class="userLearning[index] === 1 ? 'time green' : 'time'">
									{{item.duration}} &nbsp; 分钟
									<u-icon  v-if="userLearning[index] === 1"  class="finsh" name="checkmark-circle-fill" color="rgba(63, 161, 98, 1);" size="14"></u-icon>
								</view>
							</view>
							<view class="btn">
								<view class="pause" @tap="index === btnIndex && !isPause ?  manualPause(index) : manualPlay(index)" v-if="isBuy">
									
									<u-icon :name="index === videoIndex ? 'pause':'play-right-fill'" color="#fff" size="44"></u-icon>
									<VideoCircleProgress :percentNum1="percentNum" :canvasId="1" class="videoCircleProgress" v-if="index === btnIndex" />
								</view>
								<view class="lock" v-else>
									<u-icon name="lock-fill" color="#fff" size="44"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="courseDetail-btn">
				<view class="courseDetail-btn-wrapper">
					<view class="courseDetail-btn-left" @tap="starCourse()">
						<u-icon class="starBtn" :name="isCollect ? 'star-fill' : 'star'" color="rgba(255, 105, 5, 1)" size="46"></u-icon>
					</view>
					<view class="courseDetail-btn-center">
						
					</view>
					<view :class="isBuy ? 'courseDetail-btn-right isBuy': 'courseDetail-btn-right'" @tap="!isBuy && showModal()">
						{{isBuy ? '已购买' : '购买学习'}}
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="show" :content='content' :showCancelButton="true" :closeOnClickOverlay="true" :asyncClose="true" @confirm="modalConfirm" @cancel="modalCancel" @close="modalClose" confirmColor="#3fa162"></u-modal>
		<u-modal :show="show2" :content='content2' :showCancelButton="true" :closeOnClickOverlay="true" :asyncClose="true" @confirm="modalConfirm2" @cancel="modalCancel2" @close="modalClose2" confirmColor="#3fa162"></u-modal>
	</view>
</template>

<script>
	import VideoCircleProgress from '@/component/videoCircleProgress/videoCircleProgress.vue'
	import {mapState} from 'vuex'
	const Course = require('../../js/course.json')
	
	export default {
		components: {
			VideoCircleProgress
		},
		data() {
			return {
				course: [],
				showMore: false,
				percentNum: null,
				videoContext: null,
				isPause: true,
				videoIndex: null,
				btnIndex: 0,
				show:false,
				content:'是否确定购买？',
				show2:false,
				content2:'是否确定收藏？',
				isBuy: false,//是否已购买
				isUserCourseInfo: false,//是否已有用户课程学习记录信息
				userLearning: [],//用户学习记录
				isCollect: false, //用户是否已收藏课程
				isUserCollectInfo: false, //是否已有用户已收藏课程信息
			};
		},
		mounted() {
			let userCourse = JSON.stringify(this.global)
			
			if(userCourse !== "{}") {
				if(this.global.hasOwnProperty(this.course.id)) {
					this.userLearning = this.global[this.course.id]
					
					this.isBuy = true
				} else {
					this.isBuy = false
				}
				this.isUserCourseInfo = true
			} else {
				this.isBuy = false
				this.isUserCourseInfo = false
				
			}
			
			let userCollect = JSON.stringify(this.userCollect)
			if(userCollect !== "{}") {
				let condi = this.userCollect.collects.findIndex(item => {
					return item === this.course.id
				})
				if(condi !== -1) {
					this.isCollect = true 
				} else {
					this.isCollect = false 
				}
				this.isUserCollectInfo = true
			} else {
				this.isCollect = false
				this.isUserCollectInfo = false
			}
		},
		onLoad(option) {
			var userInfo = uni.getStorageSync('sea-userInfo')
			if(userInfo === '' || userInfo === null){
				uni.redirectTo({url:'../login/login'});
			}
			this.course = Course[option.id]
			this.videoContext = uni.createVideoContext('myVideo');//创建视频实例指向video	
		},
		
		methods: {
			async videoEnded(e) {
				if(this.isUserCourseInfo) {
					let userCourse = this.global
					let courseId = this.course.id
					if(this.global.hasOwnProperty(courseId)) {
						userCourse[courseId][this.btnIndex] = 1 
						
						let result = await this.$store.dispatch('global/addUserCourse',userCourse);
						
						if(result === 'ok') {
							this.$set(this.userLearning, this.btnIndex, 1)
						}
					} else {
					}
					
				}
			},
			controlstoggle() {
			},
			backPage() {
				uni.navigateBack(-1)
			},
			load() {
				this.$refs.uReadMore.init();
			},
			showMoreBtn() {
				this.showMore = !this.showMore
			},
			timeupdate(parameter) {
				const {currentTime, duration} = parameter.detail
				this.percentNum = currentTime / duration
			},
			pause() {
				this.isPause = true
				this.videoIndex = null
			},
			play() {
				this.isPause = false
				this.videoIndex = this.btnIndex
			},
			manualPause() {
				this.videoIndex = null
				if(!this.isPause) {
					this.videoContext.pause();
				}
			},
			manualPlay(index) {
				if(index !== this.videoIndex) {
					this.videoIndex = index
					this.btnIndex = index
					this.isPause = this.isPause ? this.isPause : true
					this.percentNum = null
				}
				
				if(this.isPause) {
					this.$nextTick(() => {
						this.videoContext.play(); 
						
					})
				}
			},
			showModal() {
				this.show = true
			},
			async modalConfirm() {
				if(this.isUserCourseInfo) {
					let userCourse = this.global
					let courseId = this.course.id
					if(!(this.global.hasOwnProperty(courseId))) {
						userCourse[courseId] = [...Array(this.course.chapter.length)].map(x => 0);
						
						let result = await this.$store.dispatch('global/addUserCourse',userCourse);
						
						if(result === 'ok') {
							this.isBuy = true
							setTimeout(() => {
								this.show = false;
								this.showToast()
							}, 1600)
						}
					} else {
					}
					
				} else {
					
					let userCourse = {}
					let courseId = this.course.id
					userCourse['username'] = this.print.username
					userCourse[courseId] = [...Array(this.course.chapter.length)].map(x => 0);
					let result = await this.$store.dispatch('global/addUserCourse',userCourse);
					if(result === 'ok') {
						this.isBuy = true
						setTimeout(() => {
							this.show = false;
							this.showToast()
						}, 1600)
					}
					
				}
				
			},
			modalCancel() {
				this.show = false;
			},
			modalClose() {
				this.show = false
			},
			async modalConfirm2() {
				if(this.isUserCourseInfo) {
					let userCourse = this.global
					let courseId = this.course.id
					if(!(this.global.hasOwnProperty(courseId))) {
						userCourse[courseId] = [...Array(this.course.chapter.length)].map(x => 0);
						
						let result = await this.$store.dispatch('global/addUserCourse',userCourse);
						
						if(result === 'ok') {
							this.isBuy = true
							setTimeout(() => {
								this.show = false;
								this.showToast()
							}, 1600)
						}
					} else {
					}
					
				} else {
					
					let userCourse = {}
					let courseId = this.course.id
					userCourse['username'] = this.print.username
					userCourse[courseId] = [...Array(this.course.chapter.length)].map(x => 0);
					let result = await this.$store.dispatch('global/addUserCourse',userCourse);
					if(result === 'ok') {
						this.isBuy = true
						setTimeout(() => {
							this.show = false;
							this.showToast()
						}, 1600)
					}
					
				}
				
			},
			modalCancel2() {
				this.show = false;
			},
			modalClose2() {
				this.show = false
			},
			showToast() {
				this.$refs.uToast.show({
					type: 'success',
					title: '购买成功！',
					message: "购买成功！",
					complete() {
					}
				})
			},
			async starCourse() {
				if(this.isUserCollectInfo) {
					 if(!this.isCollect) {
						 
					 	let userCollect = {}
					 	let courseId = this.course.id
						let collects = this.userCollect.collects
						collects.push(courseId)
					 	userCollect['username'] = this.print.username
					 	userCollect['collects'] = collects
					 	let result = await this.$store.dispatch('global/addUserCollect',userCollect);
						let _that = this
						this.$refs.uToast.show({
							type: 'loading',
							title: '正在加载',
							message: "正在加载",
							duration: "1000",
							complete() {
								if(result === 'ok'){
									_that.isCollect = true
									uni.$u.toast('收藏成功！')
								}
							}
						})
						
					 } else {
						let userCollect = {}
						let courseId = this.course.id
						let collects = this.userCollect.collects
						userCollect['username'] = this.print.username
						let Splindex =this.userCollect.collects.findIndex(item => (item === courseId))
						
						collects.splice(Splindex, 1)
						userCollect['collects'] = collects
						let result = await this.$store.dispatch('global/addUserCollect',userCollect);
						let _that = this
						this.$refs.uToast.show({
							type: 'loading',
							title: '正在加载',
							message: "正在加载",
							duration: "1000",
							complete() {
								if(result === 'ok'){
									_that.isCollect = false
									uni.$u.toast('取消收藏成功！')
								}
							}
						})
					 }
				} else {
					if(!this.isCollect) {
						let userCollect = {}
						let courseId = this.course.id
						userCollect['username'] = this.print.username
						userCollect['collects'] = [courseId]
						let result = await this.$store.dispatch('global/addUserCollect',userCollect);
						let _that = this
						this.$refs.uToast.show({
							type: 'loading',
							title: '正在加载',
							message: "正在加载",
							duration: "1000",
							complete() {
								if(result === 'ok'){
									_that.isCollect = true
									uni.$u.toast('收藏成功！')
								}
							}
						})
					} 
				}
			}
		},
		computed: {
			...mapState({
				global: state => state.global.userCourse,
				print: state => state.print.userInfo,
				userCollect: state => state.global.userCollect
			})
		}
	}
</script>

<style lang="scss">
#courseDetail-content {
	
	.courseDetail-video{
		position: relative;
		width: 100%;
		
		video{
			width: 100%;
		}
		
		.backBox{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 40px;
			background: linear-gradient(to bottom, rgba(0, 0, 0, .6), transparent);
			display: flex;
			align-items: center;
			
			
			.backBtn{
				margin-left: 20px;
			}
		}
	}
	
	.courseDetail-Info{
		padding: 32px 20px 130px;
		.courseDetail-title{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 20px;
			.courseDetail-title-left{
				
				.title{
					font-size: 20px;
					color: rgba(31, 31, 57, 1);
					margin-bottom: 4px;
				}
				
				.info{
					font-size: 12px;
					color: rgba(170, 170, 170, 1);
				}
			}
			
			.courseDetail-title-right{
				font-size: 20px;
				color: rgba(63, 161, 98, 1);
			}
		}
		
		.courseDetail-intro{
			
			.courseDetail-intro-title{
				height: 30px;
				font-size: 16px;
				color: rgba(31, 31, 57, 1);
			}
			
			.courseDetail-intro-text{
				font-size: 12px;
				color: rgba(146, 146, 162, 1);
				overflow: hidden;
			}
			
			.courseDetail-intro-readMore{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 48px;
				
				u-icon{
					font-size: 16px;
					color: rgba(31, 31, 57, 1);
				}
			}
		}
		
		.courseDetail-directory{
			padding-top: 10px;
			.courseDetail-directory-list{
				
				.courseDetail-directory-item{
					display: flex;
					align-items: center;
					margin-bottom: 24px;
					
					.num{
						width: 33px;
						height: 35px;
						font-size: 24px;
						color: rgba(170, 170, 170, 1);
						margin-right: 23px;
					}
					
					.intor{
						margin-right: auto;
						.name{
							height: 20px;
							font-size: 14px;
							color: rgba(31, 31, 57, 1);
							margin-bottom: 2px;
						}
						.time{
							display: flex;
							align-items: center;
							font-size: 12px;
							color: rgba(170, 170, 170, 1);
							
							.finsh{
								position: relative;
								top: 2px;
								margin-left: 10px;
							}
							
							&.green{
								color: rgba(63, 161, 98, 1);
							}
						}
					}
					
					.btn{
						
						.play{
							display: flex;
							justify-content: center;
							align-items: center;
							width: 44px;
							height: 44px;
							background: rgba(63, 161, 98, 1);
							border-radius: 50%;
						}
						
						.pause{
							position: relative;
							display: flex;
							justify-content: center;
							align-items: center;
							width: 44px;
							height: 44px;
							background: rgba(63, 161, 98, 1);
							border-radius: 50%;
							
							.videoCircleProgress{
								position: absolute;
								top: -3px;
								left: -3px;
							}
						}
						
						.lock{
							display: flex;
							justify-content: center;
							align-items: center;
							width: 44px;
							height: 44px;
							background: rgba(144, 202, 163, 1);
							border-radius: 50%;
						}
					}
				}
			}
		}
	}

	.courseDetail-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-radius: 20px 20px 0 0;
		box-shadow: 0px 2px 15px 0px rgba(184, 184, 210, 0.5);
		height: 98px;
		padding: 14px 20px 0;
		box-sizing: border-box;
		background-color: #fff;
		.courseDetail-btn-wrapper{
			display: flex;
			align-items: center;
			.courseDetail-btn-left{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30%;
				height: 50px;
				line-height: 50px;
				text-align: center;
				background: rgba(254, 242, 224, 1);
				border-radius: 12px;
				
			}
			
			.courseDetail-btn-center{
				width: 14px;
			}
			
			.courseDetail-btn-right{
				width: 67%;
				height: 50px;
				line-height: 50px;
				font-size: 18px;
				color: #fff;
				text-align: center;
				background: rgba(63, 161, 98, 1);
				border-radius: 12px;
				
				&.isBuy{
					background: #757575;
				}
			
			}
		}
	}

}
</style>
