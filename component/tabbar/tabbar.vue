<template>
	<view id="customTabbar-content">
		<u-tabbar
			:value="current?current:0"
			@change="tabbarChange"
			:fixed="true"
			:placeholder="false"
			:border="false"
			:safeAreaInsetBottom="true"
			inactiveColor="rgba(170, 170, 170, 1)"
			activeColor="rgba(63, 161, 98, 1)"
			class="customTabbar">
			<u-tabbar-item class="customTabbar-item" text="首页">
				<image
					class="u-page__item__slot-icon"
					slot="active-icon"
					src="../../static/img/tabbar/index_active.png"
				></image>
				<image
					class="u-page__item__slot-icon"
					slot="inactive-icon"
					src="../../static/img/tabbar/index.png"
				></image>
			</u-tabbar-item>
			<u-tabbar-item class="customTabbar-item" text="课程">
				<image
					class="u-page__item__slot-icon"
					slot="active-icon"
					src="../../static/img/tabbar/course_active.png"
				></image>
				<image
					class="u-page__item__slot-icon"
					slot="inactive-icon"
					src="../../static/img/tabbar/course.png"
				></image>
			</u-tabbar-item>
			<u-tabbar-item class="customTabbar-item customTabbar-item-search" text="查找">
				<view slot="active-icon" class="customTabbar-item-searchWarpper">
					<image
						class="u-page__item__slot-icon"
						src="../../static/img/tabbar/search.png"
					></image>
				</view>
				<view slot="inactive-icon" class="customTabbar-item-searchWarpper">
					<image
						class="u-page__item__slot-icon"
						src="../../static/img/tabbar/search.png"
					></image>
				</view>
			</u-tabbar-item>
			<u-tabbar-item class="customTabbar-item" text="消息">
				<image
					class="u-page__item__slot-icon"
					slot="active-icon"
					src="../../static/img/tabbar/message_active.png"
				></image>
				<image
					class="u-page__item__slot-icon"
					slot="inactive-icon"
					src="../../static/img/tabbar/message.png"
				></image>
			</u-tabbar-item>
			<u-tabbar-item class="customTabbar-item" text="我的">
				<image
					class="u-page__item__slot-icon"
					slot="active-icon"
					src="../../static/img/tabbar/mine_active.png"
				></image>
				<image
					class="u-page__item__slot-icon"
					slot="inactive-icon"
					src="../../static/img/tabbar/mine.png"
				></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name: 'Tabbar',
			props:{
				current:Number
			},
			data() {
				return {
					list: [
						{
							path: "pages/index/index",
							icon: "../../static/img/tabbar/index.png",
							icon_active: "../../static/img/tabbar/index_active.png"
						},
						{
							path: "pages/course/course",
							icon: "../../static/img/tabbar/course.png",
							icon_active: "../../static/img/tabbar/course_active.png"
						},
						{
							path: 'pages/search/search',
							icon: "../../static/img/tabbar/search.png",
							icon_active: "../../static/img/tabbar/search.png"
						},
						{
							path: "pages/message/message",
							icon: "../../static/img/tabbar/message.png",
							icon_active: "../../static/img/tabbar/message_active.png"
						},
						{
							path: "pages/mine/mine",
							icon: "../../static/img/tabbar/mine.png",
							icon_active: "../../static/img/tabbar/mine_active.png"
						},
					]
				};
			},
			methods:{
				tabbarChange(e) {
					if(e === 2) {
						uni.navigateTo({
							url: '/'+this.list[e].path
						})
					} else {
						uni.switchTab({
							url: '/'+this.list[e].path
						})
					}
					
				}
			}
		}
</script>

<style lang="scss" scoped>
	
#customTabbar-content{
	.customTabbar{
			
		/deep/ .u-tabbar--fixed{
			height: 160rpx;
			border-radius: 10px 10px 0 0;
		}
		
		/deep/ .u-tabbar__content__item-wrapper{
			height: 160rpx;
		}
		
		.customTabbar-item{
			position: relative;
			
			.u-page__item__slot-icon{
				width: 44rpx;
				height: 44rpx;
				margin-bottom: 8px;
			}
			
			.customTabbar-item-searchWarpper{
				position: absolute;
				top: -56px;
				width: 104rpx;
				height: 104rpx;
				border-radius: 50%;
				border: 4px solid #fff;
				text-align: center;
				line-height: 120rpx;
				background-color: rgba(224, 245, 231, 1);
			
				.u-page__item__slot-icon{
					margin-bottom: 0;
				}
			}
		}
		
		.customTabbar-item-search{
			
			/deep/ .u-tabbar-item__text{
				position: absolute;
				top: 46px;
			}
		}
	}
}
	
	
</style>