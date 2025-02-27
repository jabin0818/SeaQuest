<template>
	<view id="course-content" :class="{popupShow:show}">
		<view class="course-title">
			<view class="course-title-left">
				课程
			</view>
			<view class="course-title-right">
				<view class="avatar">
					<u-avatar :size="100" :src="src" mode="aspectFit"></u-avatar>
				</view>
			</view>
		</view>
		<view class="course-search">
			<u-search @change="change" @search="search" v-model="keyword" inputAlign="center" height="70" bgColor="rgba(224, 245, 231, 1)" placeholderColor="rgba(149, 185, 161, 1)" placeholder="查找课程" :showAction="false" :height="96" shape="square" :clearabled="false" :inputAlign="'left'" :searchIconSize="46" searchIconColor="rgba(139, 187, 160, 1)" :inputStyle="inputStyle"></u-search>
			<image src="../../static/img/icon/Vector.png" @tap="screenCourse"></image>
		</view>
		<view class="course-classify">
			<view class="course-classify-wrapper">
				<view class="course-classify-left">
					<image src="../../static/img/ad/ads1.png"></image>
				</view>
				<view class="course-classify-center">
					
				</view>
				<view class="course-classify-right">
					<image src="../../static/img/ad/ads2.png"></image>
				</view>
			</view>
		</view>
		
		<view class="course-container">
			<view class="course-screening">
				<view class="course-screening-title">
					选择课程
				</view>
				<view class="course-screening-main">
					<view class="course-screening-list">
						<view :class="activeItem === 1 ? 'course-screening-item selected' : 'course-screening-item'" @tap="selectItem($event,1)">
							全部
						</view>
						<view :class="activeItem === 2 ? 'course-screening-item selected' : 'course-screening-item'" @tap="selectItem($event,2)">
							流行
						</view>
						<view :class="activeItem === 3 ? 'course-screening-item selected' : 'course-screening-item'" @tap="selectItem($event,3)">
							最新
						</view>
					</view>
				</view>
			</view>
				<view class="course-list">
					<view class="course-item" v-for="(value,key,index) in couses" :key="index" @tap="toCourseDetail(index)">
						<view class="thematic">
							<image :src=value.img mode=""></image>
						</view>
						<view class="courseInfo">
							<view class="title">
								{{value.title}}
							</view>
							<view class="user">
								<image src="../../static/img/icon/Union.png"></image>
								<text>{{value.user}}</text>
							</view>
							<view class="other">
								<view class="price">{{value.price}}￥</view>
								<view class="duration">{{value.duration}}</view>
							</view>
						</view>
					</view>
				</view>
			<u-loadmore :status="status" :height="16" :fontSize="16" :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText" line/><strong></strong>
		</view>
		<ScreenPopup :showPopup="show" @popupClose="close" @changetype="init" />
		<Tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	const Course = require('../../js/course.json')
	import Tabbar from '@/component/tabbar/tabbar.vue'
	import ScreenPopup from '@/component/screenPopup/screenPopup.vue'
	export default {
		components: {
			Tabbar,
			ScreenPopup
		},
		data() {
			return {
				saveCouse: [],
				couses: [],
				src:'../../static/img/user/avatar.png',
				inputStyle: {
					paddingLeft: '6px'
				},
				activeItem: 1,
				status: 'nomore',//loadmore loading nomore
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了',
				show: false,
				keyword: ''
			}
		},
		onLoad() {
			var userInfo = uni.getStorageSync('sea-userInfo')
			if(userInfo === '' || userInfo === null){
				uni.redirectTo({url:'../login/login'});
			}
			uni.hideTabBar()
			uni.preloadPage({
				url: '../../pages/search/search'
			})
			uni.preloadPage({
				url: '../../pages/message/message'
			})
			uni.preloadPage({
				url: '../../pages/mine/mine'
			})
		},
		onShow() {
			uni.hideTabBar()
		},
		methods: {
			init(e) {
				this.couses = []
				if(e != null)
				{
					e.forEach((item,index) => {
						switch(index) {
							case 0:
								if(item === 1)	{
									Course.forEach(element => {
										if(element.type === 'design')
										this.couses.push(element)
									})
								}
								break;
							case 1: 
								if(item === 1)	{
									Course.forEach(element => {
										if(element.type === 'painting')
										this.couses.push(element)
									})
								}
								break;
							case 2:
								if(item === 1)	{
									Course.forEach(element => {
										if(element.type === 'architecture')
										this.couses.push(element)
									})
								}
								break;
							case 3:
								if(item === 1)	{
									Course.forEach(element => {
										if(element.type === 'history')
										this.couses.push(element)
									})
								}
								break;
							case 4:
								if(item === 1)	{
									Course.forEach(element => {
										if(element.type === 'English')
										this.couses.push(element)
									})
								}
								break;
							case 5:
								if(item === 1)	{
									Course.forEach(element => {
										if(element.type === 'music')
										this.couses.push(element)
									})
								}
								break;
							case 6:
								if(item === 1)	{
									Course.forEach(element => {
										if(element.type === 'program')
										this.couses.push(element)
									})
								}	
						}
					})
				}
				this.saveCouse = this.couses
			}
			,
			selectItem(e,index) {
				this.activeItem = index
				let cc = this.couses.reverse()
				if(index === 2) {
					this.couses = cc
				}
				else
					this.couses = this.couses
			},
			screenCourse() {
				uni.navigateTo({
					url:`/pages/search/search?keyword=${this.keyword}`
				})
			},
			close() {
				this.show = false
			},
			toCourseDetail(id){
				uni.navigateTo({
					url:`/pages/courseDetail/courseDetail?id=${id}`,
					
				})
			},
			change(e) {
			},
			search(e) {
				if(e) {
					uni.navigateTo({
						url:`/pages/search/search?keyword=${e}`
					})
				} else {
					uni.$u.toast('不能为空！')
				}
			}
		},
		onReady() {
			this.saveCouse = Course
			this.couses = Course
		}
	}
</script>
	
<style lang="scss">
page {
	background-color: #fff;
}
</style>

<style lang="scss" scoped>
.popupShow {
	overflow: hidden;
	position: fixed;
	width: 100%;
	box-sizing: border-box;
}
#course-content{
	padding: 0 20px 130px;
	.course-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 62px;
		margin-top: 17px;
		margin-bottom: 9px;
		
		.course-title-left{
			font-size: 28px;
			color: rgba(31, 31, 57, 1);
		}
		
		.course-title-right{
			
			.avatar{
				width: 50px;
				height: 50px;
				
				u-avatar{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.course-search{
		position: relative;
		/deep/ .u-search__content{
			border-radius: 15px!important;
		}
		image{
			position: absolute;
			top: 15px;
			right: 21px;
			width: 20px;
			height: 20px;
		}
	}
	
	.course-classify{
		margin-bottom: 16px;
		.course-classify-wrapper{
			display: flex;
			justify-content: space-between;
			height: 108px;
			
			.course-classify-left{
				width: 50%;
				height: 108px;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
			.course-classify-center{
				width: 15px;
			}
			
			.course-classify-right{
				width: 50%;
				height: 108px;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.course-container{
		
		
		.course-screening{
			
			.course-screening-title{
				height: 48px;
				line-height: 48px;
				font-size: 18px;
				color: rgba(31, 31, 57, 1);
				margin-bottom: 8px;
			}
			.course-screening-main{
				
				.course-screening-list{
					display: flex;
					
					.course-screening-item{
						padding: 5px 22px;
						border-radius: 16px;
						margin-right: 17px;
						background-color: rgba(239, 239, 239, 1);
						color: rgba(132, 132, 150, 1);
						font-size: 14px;
						&.selected{
							color: #fff;
							background-color: rgba(102, 181, 129, 1);;
						}
					}
				}
			}
		}
	
		.course-list{
			padding-top: 22px;
			
			.course-item{
				display: flex;
				padding: 14px;
				border: 1px solid rgba(242, 242, 242, 1);         
				box-shadow: 0px 8px 12px 0px rgba(184, 210, 188, 0.2);
				border-radius: 12px;
				margin-bottom: 18px;
				
				.thematic{
					width: 68px;
					height: 68px;
						
					image{
						width: 100%;
						height: 100%;
					}
				}
				
				.courseInfo{
					margin-left: 35px;
					.title{
						height: 20px;
						color: rgba(31, 31, 57, 1);
						font-size: 14px;
						margin-bottom: 3px;
					}
					
					.user{
						display: flex;
						align-items: center;
						height: 17px;
						margin-bottom: 5px;
						
						image{
							width: 8.5px;
							height: 10px;
							margin-right: 6px;
						}
						
						text{
							font-size: 12px;
							color: rgba(184, 184, 210, 1);
						}
					}
					
					.other{
						display: flex;
						align-items: flex-end;
						
						.price{
							font-size: 16px;
							color: rgba(63, 161, 98, 1);
							margin-right: 5px;
						}
						
						.duration{
							padding: 0 12px;
							background: rgba(254, 242, 224, 1);
							font-size: 10px;
							line-height: 20px;
							transform: scale(.9);
							color: rgba(254, 161, 100, 1);
							border-radius: 14px;
						}
					}
				}
			}
		}
		
		/deep/ .u-loadmore__content__text {
			line-height: 16px!important;
		}
	}
}

</style>

