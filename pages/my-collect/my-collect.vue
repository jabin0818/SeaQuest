<template>
	<view>
		<u-navbar
			title="我的收藏"
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
		<view id="course-content" :class="{popupShow:show}">
			<view class="course-search">
				<u-search @change="change" @search="search" v-model="keyword" inputAlign="center" height="70" bgColor="rgba(224, 245, 231, 1)" placeholderColor="rgba(149, 185, 161, 1)" placeholder="查找课程" :showAction="false" :height="96" shape="square" :clearabled="false" :inputAlign="'left'" :searchIconSize="46" searchIconColor="rgba(139, 187, 160, 1)" :inputStyle="inputStyle"></u-search>
			</view>
			
			<view class="course-container">
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
		</view>
	</view>
</template>

<script>
	const Course = require('../../js/course.json')
	import Tabbar from '@/component/tabbar/tabbar.vue'
	import ScreenPopup from '@/component/screenPopup/screenPopup.vue'
	import {mapState} from 'vuex'
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
		},
		onShow() {
		},
		methods: {
			screenCourse() {
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
					this.couses = []
					this.saveCouse.forEach(item => {
						if(item.title.includes(e)){
							this.couses.push(item)
						}
					})
				} else {
					this.couses = this.saveCouse
				}
			}
		},
		onReady() {
			if(this.userCollect.collects.length) {
				this.userCollect.collects.forEach(item => {
					let course = Course.find(item2 => {
						return item2.id === item
					})
					this.couses.push(course)
				})
			}
			
			this.saveCouse = this.couses
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

