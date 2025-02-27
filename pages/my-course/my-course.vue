<template>
	<view>
		<u-navbar
			title="我的课程"
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
		<view id="my-course-context">
			<!-- <u-navbar back-text="返回" title="我的课程"></u-navbar> -->
			<view class="panel-list">
				<view class="panel-item panel-today">
					<view class="panel-today-title">
						<view class="today-title-left">
							今日学习
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
			</view>
			<view class="course-card-list">
				<view class="course-card" v-for="item,index in courses" :key="index" :class="randColor(index)">
					<view class="course-name">
						<text class="u-line-2">{{item.title}}</text>
					</view>
					<view class="panel-today-body">
						<view class="study-progressBar">
							<u-line-progress :percentage="progressNum(item)" inactive-color="#fff" activeColor="" :showText="false"></u-line-progress>
						</view>
						<view class="already-over">
							<text v-if="isFinish(item)">已完成</text>
						</view>
					</view>
					<view class="course-card-bottom">
						<view class="course-number">
							<text class="denominator">{{finishedNum(item)}}</text>
							<text class="numerator">/{{global[item.id].length}}</text>
						</view>
						
						<view class="course-button-context">
							<view class="course-button" @tap="toCourseDetail(index)">
								<u-icon class="playCourse" name="arrow-down-fill" size="24px" color="#fff"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	const Course = require('../../js/course.json')
	export default {
		data() {
			return {
				courses:[],
				
			}
		},
		onLoad() {
			var userInfo = uni.getStorageSync('sea-userInfo')
			if(userInfo === '' || userInfo === null){
				uni.redirectTo({url:'../login/login'});
			}
			this.courses = Course.filter((item) => {
				return this.global.hasOwnProperty(item.id)
			})
		},
		methods: {
			randColor() {
				const num = Math.floor(Math.random()*(4-1)+1)
				if(num === 1) {
					return 'colorOne'
				} else if(num === 2) {
					return 'colorTwo'
				} else if(num === 3) {
					return 'colorThree'
				}
			},
			isFinish(item) {
				let flag = this.global[item.id].find((item) => {
					return item === 0
				})
				if(flag === undefined) {
					return true
				} else {
					return false 
				}
			},
			finishedNum(item) {
				let num = 0
				this.global[item.id].forEach((item1) => {
					if(item1 === 1) {
						num ++ 
					}
				})
				return num 
			},
			progressNum(item) {
				
				let num = this.finishedNum(item)
				let all = this.global[item.id].length
				let progress = Math.floor((num / all) * 100)
				
				return progress
			},
			toCourseDetail(id){
				uni.navigateTo({
					url:`/pages/courseDetail/courseDetail?id=${id}`,
				})
			},
		},
		computed: {
			...mapState({
				global: state => state.global.userCourse,
			})
		},
	}
</script>

<style lang="scss" scoped>
#my-course-context{
	
	.panel-list{
		position: relative;
		padding: 0 20px 0;
		margin-top: 20px;
		height: 100px;
		.panel-item{
			margin-bottom: 22px;
		}
		
		.panel-today{			
			border: 1px solid rgba(242, 242, 242, 1);            			
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
	}

	.course-card-list{		
		//card背景颜色
		$color-theme1:rgba(224, 245, 231, 1); /* 浅青色 */
		$color-theme2:rgba(254, 242, 224, 1); /* 浅橙色 */
		$color-theme3:rgba(178, 232, 196, 1); /* 中青色 */
		//进度条颜色
		$color-line1-begin:rgba(224, 245, 231, 1);
		$color-line2-begin:rgba(254, 242, 224, 1);
		$color-line3-begin:rgba(199, 232, 210, 1);
		
		$color-line1-end: rgba(64, 162, 98, 1);
		$color-line2-end:rgba(254, 161, 100, 1);
		$color-line3-end:rgba(53, 136, 83, 1);
		//按钮颜色
		$color-button1: rgba(63, 161, 98, 1);
		$color-button2:rgba(254, 161, 100, 1);
		$color-button3: rgba(53, 136, 82, 1);
		
		display: flex;
		flex-wrap: wrap;
		padding: 0 20px;
		justify-content: space-between;
		
		.course-card{
			position: relative;
			width: 48%;
			height: 186px;
			margin-top: 20px;
			border-radius:5%;
			vertical-align:top;
			background: $color-theme2;
			box-shadow: 0px 8px 12px 0px rgba(184, 184, 210, 0.2);
			padding: 14px;
			box-sizing: border-box;
			&.colorOne{
				background: $color-theme1;
				.panel-today-body{
						
					.study-progressBar{
						
						/deep/ .u-line-progress__line{
							background: linear-gradient(90deg, $color-line1-begin 0%, $color-line1-end 100%)!important;
						}
					}
				}
				
				.course-card-bottom{
								
					.course-button-context{
						.course-button{
							background-color: $color-button1;
						}
					}
				}
			}
			&.colorTwo{
				background: $color-theme2;
				.panel-today-body{
						
					.study-progressBar{
						
						/deep/ .u-line-progress__line{
							background: linear-gradient(90deg, $color-line2-begin 0%, $color-line2-end 100%)!important;
						}
					}
				}
				
				.course-card-bottom{
								
					.course-button-context{
						.course-button{
							background-color: $color-button2;
						}
					}
				}
			}
			&.colorThree{
				background: $color-theme3;
				.panel-today-body{
						
					.study-progressBar{
						
						/deep/ .u-line-progress__line{
							background: linear-gradient(90deg, $color-line3-begin 0%, $color-line3-end 100%)!important;
						}
					}
				}
				
				.course-card-bottom{
								
					.course-button-context{
						.course-button{
							background-color: $color-button3;
						}
					}
				}
			}
			.course-name{
				margin-top: 2px;
				font-size: 17.6px;
				font-weight: 400;
				font-family: "Noto Sans SC";
				letter-spacing: 0px;
				line-height: 20px;
				height: 43px;
				color: rgba(31, 31, 57, 1);
				vertical-align: top;
			}
			
			.panel-today-body{
				margin:38px 0 0 0;
				height: 34px;
				.study-progressBar{
					
					/deep/ .u-line-progress__line{
						background: linear-gradient(90deg, $color-line2-begin 0%, $color-line2-end 100%)!important;
					}
				}
				
				.already-over{
					font-size: 14px;
					font-weight: 400;
					letter-spacing: 0px;
					line-height: 35px;
					text-align: center;
					font-family: "Noto Sans SC";
					color: rgba(31, 31, 57, 1);
					text-align: left;
					vertical-align: top;
				}
			}
						
			.course-card-bottom{
				display: flex;
				.course-number{
					padding-top:15px ;
					padding-left: 20px;
					.denominator{
						font-size: 20px;
						font-weight: 400;
						letter-spacing: 0px;
						font-family: "Noto Sans SC";
						line-height: 20px;
						color: rgba(31, 31, 57, 1);
					}
					.numerator{
						font-size: 12px;
						font-weight: 400;
						letter-spacing: 0px;
						line-height: 18px;
						font-family: "Noto Sans SC";
						color: rgba(31, 31, 57, 1);
						text-align: left;
						vertical-align: bottom;
					}
				}
							
				.course-button-context{
					padding-left:40px ;
					.course-button{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 44px;
						height: 44px;
						border-radius: 50%;
						background-color: $color-button2;
						box-sizing:border-box;
						
						.playCourse{
							transform: rotate(31deg);
							position: relative;
							top: 2px;
							left: -1px;
						}
						
					}
				}
			}
			
		}
		
	}
	
}
</style>
