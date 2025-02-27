<template>
	<view id="message-content">
		<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag="true" :isEqually="false"
			@clickItem="onClickItem"></tabControl>
		<!-- 使用 swiper 配合 滑动切换 -->
		<swiper class="swiper" style="height: 100%;" @change="scollSwiper" :current="current">
			<swiper-item v-for="(item, index) in items" :key="index">
				<!-- 使用 scroll-view 来滚动内容区域 -->
				<scroll-view scroll-y="true" style="height: 100%;">{{ item }}</scroll-view>
			</swiper-item>
		</swiper>
		<view id="study-content" v-if="current === 0">
			<view class="message-list">
				<view class="message-item" v-for="value,index in messages" :key="index">
					<view class="message-user">
						<view class="message-user-avatar">
							<image :src="value.avatar"></image>
						</view>
						<view class="message-user-info">
							<view class="username">
								{{value.username}}
							</view>
							<view class="status">
								{{value.status}}
							</view>
						</view>
						<view class="message-user-time">
							{{value.time}}
						</view>
					</view>
					<view class="message-info">
						{{value.info}}
					</view>
					<view class="message-picture" v-if="value.img">
						<image :src="value.img" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view id="system-content" v-else>
			<view class="message-list">
				<view class="message-item">
					<view class="message-user">
						<view class="message-user-avatar">
							<image src="../../static/img/message/p8.png"></image>
						</view>
						<view class="message-user-info">
							<view class="username">
								系统通知
							</view>
							<view class="status">
								在线
							</view>
						</view>
						<view class="message-user-time">
							下午04:32
						</view>
					</view>
					<view class="message-info">
						您有剩余大积分未使用，可兑换大会员天数、会员购周边、滴滴打车券等好礼，点击链接兑换>  网页链接
					</view>
					<!-- <view class="message-picture">
						<image src="../../static/img/message/pic.png" mode="widthFix"></image>
					</view> -->
				</view>
				<view class="message-item">
					<view class="message-user">
						<view class="message-user-avatar">
							<image src="../../static/img/message/p8.png"></image>
						</view>
						<view class="message-user-info">
							<view class="username">
								系统通知
							</view>
							<view class="status">
								在线
							</view>
						</view>
						<view class="message-user-time">
							下午05:32
						</view>
					</view>
					<view class="message-info">
						这个520大学长宠你！~续费赠5连发抽奖机会，赢年度大会员、《90婚介所》签名照、电视大会员…刷520甜蜜片单同样可免费获赠抽奖机会，欧气buff叠满了属于是！更有6月升级电视大会员限时特惠，畅享大屏视听体验~心动不如行动 >>  网页链接
					</view>
					<view class="message-picture">
						<image src="../../static/img/message/pic.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="message-item">
					<view class="message-user">
						<view class="message-user-avatar">
							<image src="../../static/img/message/p8.png"></image>
						</view>
						<view class="message-user-info">
							<view class="username">
								虎里虎气
							</view>
							<view class="status">
								在线
							</view>
						</view>
						<view class="message-user-time">
							6月24日 上午08:20
						</view>
					</view>
					<view class="message-info">
						这个课程是3D相关的课程，赶快学习吧！
					</view>
					<view class="message-picture">
						<image src="../../static/img/message/pic.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<Tabbar :current="3"></tabbar>
	</view>
</template>

<script>
	import tabControl from '@/component/tabControl-tag/tabControl-tag.vue';
	import Tabbar from '@/component/tabbar/tabbar.vue'
	const Messages = require('../../js/message.json')
	export default {
		components: {
			tabControl,
			Tabbar
		},
		data() {
			return {
				messages: Messages,
				value1: 0,
				items: ['学习', '系统'],
				current: 0
			}
		},
		onLoad() {
			var userInfo = uni.getStorageSync('sea-userInfo')
			if(userInfo === '' || userInfo === null){
				uni.redirectTo({url:'../login/login'});
			}
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
		},
		onShow() {
			uni.hideTabBar()
		},
		methods: {
			onClickItem(val) {
				this.current = val.currentIndex;
			},
			scollSwiper(e) {
				this.current = e.target.current;
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
</style>

<style lang="scss" scoped>
	#message-content {

		#study-content,
		#system-content {

			.message-list {
				padding: 40px 20px 130px;

				.message-item {
					padding: 20px;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0px 8px 12px 0px rgba(184, 184, 210, 0.2);
					border-radius: 16px;
					margin-bottom: 24px;

					.message-user {
						display: flex;
						align-items: flex-start;
						margin-bottom: 13px;

						.message-user-avatar {
							width: 48px;
							height: 48px;
							margin-right: 12px;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.message-user-info {
							margin-right: auto;

							.username {
								font-size: 14px;
								color: rgba(31, 31, 57, 1);
								height: 20px;
								margin-top: 2px;
							}

							.status {
								font-size: 12px;
								color: rgba(132, 132, 150, 1);
							}
						}

						.message-user-time {
							font-size: 12px;
							color: rgba(132, 132, 150, 1);
							margin-top: 4px;
						}
					}

					.message-info {
						font-size: 12px;
						color: rgba(132, 132, 150, 1);
					}

					.message-picture {
						border-radius: 12px;
						margin-top: 10px;
						width: 100%;

						image {
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>
