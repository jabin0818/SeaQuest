<template>
	<view>
		<u-navbar title="查找" @rightClick="rightClick" :autoBack="true" :placeholder="true">
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="44" color="#1f1f39" bold class="arrow-left"></u-icon>
			</view>
		</u-navbar>
		<view id="search-content">

			<view class="search-container">
				<u-search @change="change" @search="search" v-model="keyWord" inputAlign="center" height="70" bgColor="rgba(224, 245, 231, 1)"
					placeholderColor="rgba(149, 185, 161, 1)" placeholder="查找课程" :showAction="false" :height="96"
					shape="square" :clearabled="true" :inputAlign="'left'" :searchIconSize="46"
					searchIconColor="rgba(139, 187, 160, 1)" :inputStyle="inputStyle"></u-search>
				<image src="../../static/img/icon/Vector.png" @tap="screenCourse"></image>
			</view>
			<view class="classify-container">
				<view class="classify-container-wrapper">
					<view class="screening-tag-list">
						<view :class="activeItem === 1 ? 'screening-tag-item selected' : 'screening-tag-item'"
							@tap="selectItem($event,1)">
							特色渲染课程
						</view>
						<view :class="activeItem === 2 ? 'screening-tag-item selected' : 'screening-tag-item'"
							@tap="selectItem($event,2)">
							建筑历史课程
						</view>
						<view :class="activeItem === 3 ? 'screening-tag-item selected' : 'screening-tag-item'"
							@tap="selectItem($event,3)">
							产品设计
						</view>
					</view>
				</view>
			</view>
			<view class="result-container" v-if="couses.length">
				<view class="result-container-title">
					搜索结果
				</view>
				<view class="result-container-main">
					<view v-for="(value,key,index) in couses" :key="index">
						<view class="result-container-list">
							<view class="result-container-item" @tap="toCourseDetail(index)">
								<view class="thematic">
									<image :src="value.img" mode=""></image>
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
					</view>
					<u-loadmore :status="status" :height="20" :fontSize="27" :loading-text="loadingText"
						:loadmore-text="loadmoreText" :nomore-text="nomoreText" line />
				</view>
			</view>
			<u-empty
				v-else
				mode="search"
				iconSize="118"
				marginTop="200"
			>
			</u-empty>
		</view>
		<ScreenPopup :showPopup="show" @popupClose="close" @selecCouses="init" />
	</view>

</template>

<script>
	const Course = require('../../js/course.json')
	import ScreenPopup from '@/component/screenPopup/screenPopup.vue'
	export default {
		components: {
			ScreenPopup
		},
		data() {
			return {
				saveCouse: [],
				couses: [],
				keyWord: '',
				inputStyle: {
					paddingLeft: '6px',
					paddingRight: '10px'
				},
				activeItem: 1,
				status: 'nomore', //loadmore loading nomore
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了',
				show: false,
			}
		},
		onLoad(options) {
			var userInfo = uni.getStorageSync('sea-userInfo')
			if(userInfo === '' || userInfo === null){
				uni.redirectTo({url:'../login/login'});
			}
			this.saveCouse = Course
			if(options.keyword !== "") {
				this.keyWord = options.keyword
				this.search(this.keyWord)
			}
		},
		onShow() {},
		methods: {
			rightClick() {
			},
			leftClick() {
			},
			selectItem(e, index) {
				this.activeItem = index
				switch(index) {
					case 1: 
						this.couses = this.saveCouse
						break;
					case 2:
						this.couses = []
						this.saveCouse.forEach(item => {
							if(item.type === 'architecture')
								this.couses.push(item)
						})
						break;
					case 3:
						this.couses = []
						this.saveCouse.forEach(item => {
							if(item.type === 'design' || item.type === 'painting')
								this.couses.push(item)
						})
				}
			},
			screenCourse() {
				this.show = true
			},
			close() {
				this.show = false
			},
			toCourseDetail(id) {
				uni.navigateTo({
					url: `/pages/courseDetail/courseDetail?id=${id}`,

				})
			},
			init(e, price, duration) {
				this.couses = []
				if(e != null && e.find(i => i === 1)){
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
				
				if(price) {
					this.couses = this.couses.filter(item => {
						return Number(item.price) > price.min && Number(item.price) < price.max
					})
				}
				
				if(duration && duration.find(i => i === 1)) {
					let conditions = []
					duration.forEach((item,index) => {
						
						switch(index) {
							case 0:
								if(item === 1)	{
									conditions.push('3-8')
								}
								break;
							case 1: 
								if(item === 1)	{
									conditions.push('8-14')
								}
								break;
							case 2:
								if(item === 1)	{
									conditions.push('14-20')
								}
								break;
							case 3:
								if(item === 1)	{
									conditions.push('20-24')
								}
								break;
							case 4:
								if(item === 1)	{
									conditions.push('24-28')
								}
								break;
							case 5:
								if(item === 1)	{
									conditions.push('28-1000')
								}
								break;
						}
					})
					this.couses = this.couses.filter(item => {
						return conditions.some((f)=>{
							return this.isScope(item.duration,f)
						})
					})
				}
				
				this.saveCouse = this.couses
			},
			change(e) {
			},
			//判断时长是否在指定范围内 格式3小时20分钟
			isScope(current, target) {
				
				let curList = current.replace(/分/g, '').split('小时')
				let tarList = target.split('-')
				let hour = Number(curList[0])
				let min = Number(tarList[0])
				let max = Number(tarList[1])
				if(hour >= min && hour < max) {
					return true
				} else {
					return false
				}
				
			},
			search(e) {
				if(e != '') {
					this.couses = []
					this.saveCouse.forEach(item => {
						if(item.title.includes(e)){
							this.couses.push(item)
						}
					})
				}
				else {
					this.couses = this.saveCouse
				}
			}
		},
		onReady() {
			this.saveCouse = Course
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
</style>

<style lang="scss" scoped>
	.u-nav-slot {

		.arrow-left {
			font-weight: 600;
		}
	}

	#search-content {

		padding: 20px 20px 85px;

		.search-container {
			position: relative;

			/deep/ .u-search__content {
				border-radius: 15px !important;
			}

			/deep/ .u-search__content__close {
				position: relative;
				right: 40px;
			}

			image {
				position: absolute;
				top: 15px;
				right: 21px;
				width: 20px;
				height: 20px;
			}
		}

		.classify-container {
			margin: 15px 0;

			.classify-container-wrapper {

				.screening-tag-list {
					display: flex;

					.screening-tag-item {
						padding: 5px 12px;
						border-radius: 8px;
						margin-right: 8px;
						background-color: rgba(224, 245, 231, 1);
						color: rgba(132, 132, 150, 1);
						font-size: 12px;

						&.selected {
							color: #fff;
							background-color: rgba(102, 181, 129, 1);
							;
						}
					}
				}
			}
		}

		.result-container {

			.result-container-title {
				font-size: 20px;
				color: rgba(31, 31, 57, 1);
				height: 48px;
				line-height: 48px;
				margin-bottom: 10px;
			}

			.result-container-main {

				.result-container-list {

					.result-container-item {
						display: flex;
						padding: 14px;
						border: 1px solid rgba(242, 242, 242, 1);
						box-shadow: 0px 8px 12px 0px rgba(184, 210, 188, 0.2);
						border-radius: 12px;
						margin-bottom: 18px;

						.thematic {
							width: 68px;
							height: 68px;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.courseInfo {
							margin-left: 35px;

							.title {
								height: 20px;
								color: rgba(31, 31, 57, 1);
								font-size: 14px;
								margin-bottom: 3px;
							}

							.user {
								display: flex;
								align-items: center;
								height: 17px;
								margin-bottom: 5px;

								image {
									width: 8.5px;
									height: 10px;
									margin-right: 6px;
								}

								text {
									font-size: 12px;
									color: rgba(184, 184, 210, 1);
								}
							}

							.other {
								display: flex;
								align-items: flex-end;

								.price {
									font-size: 16px;
									color: rgba(63, 161, 98, 1);
									margin-right: 5px;
								}

								.duration {
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

					/deep/ .u-loadmore__content__text {
						line-height: 16px !important;
					}
				}
			}
		}
	}
</style>
