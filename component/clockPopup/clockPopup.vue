<template>
	<u-popup :show="show" :round="56" mode="center" @close="close" @open="open" :overlayStyle="overlayStyle">
		<view class="clockPopup">
			<view class="clockPopup-header">
				<view class="clockPopup-header-left">
					<u-avatar :size="100" :src="src" mode="aspectFit"></u-avatar>
				</view>
				<view class="clockPopup-header-right">
					<view class="title">
						打卡成功!
					</view>
					<view class="desc">
						连续打卡领好礼
					</view>
				</view>
			</view>
			<view class="clockPopup-main">
				<view class="clockPopup-info-list">
					<view class="clockPopup-info-item">
						<view class="title">
							今天学习
						</view>
						<view class="content">
							<text class="bigNum">46</text>
							<text class="minutes">分钟</text>
						</view>
					</view>
					<view class="clockPopup-info-item">
						<view class="title">
							学习时长
						</view>
						<view class="content">
							<text class="bigNum">468</text>
							<text class="minutes">分钟</text>
						</view>
					</view>
					<view class="clockPopup-info-item">
						<view class="title">
							学习天数
						</view>
						<view class="content">
							<text class="bigNum">554</text>
							<text class="minutes">天数</text>
						</view>
					</view>
				</view>
				<view class="clockPopup-record">
					<view class="clockPopup-record-title">
						本周打卡记录
					</view>
					<view class="clockPopup-record-list">
						<view :class="isSing(1) ? 'clockPopup-record-item clock' : 'clockPopup-record-item'">
							1
						</view>
						<view :class="isSing(2) ?'clockPopup-record-item clock' : 'clockPopup-record-item'">
							2
						</view>
						<view :class="isSing(3) ?'clockPopup-record-item clock' : 'clockPopup-record-item'">
							3
						</view>
						<view :class="isSing(4) ?'clockPopup-record-item clock' : 'clockPopup-record-item'">
							4
						</view>
						<view :class="isSing(5) ?'clockPopup-record-item clock' : 'clockPopup-record-item'">
							5
						</view>
						<view :class="isSing(6) ?'clockPopup-record-item clock' : 'clockPopup-record-item'">
							6
						</view>
						<view :class="isSing(0) ?'clockPopup-record-item clock' : 'clockPopup-record-item'">
							7
						</view>
					</view>
				</view>
			</view>
			<view class="clockPopup-btn" @tap="shareFriend">
				分享给其他朋友
			</view>
			<view class="clockPopup-close" @tap="close">
				<!-- <u-icon name="close" size="42px" color="#fff"></u-icon> -->
				<u-icon name="close" color="#fff" size="24px"></u-icon>
			</view>
		</view>
	<u-notify ref="uNotify" message="Hi uView"></u-notify>
	</u-popup>
</template>

<script>
	import {mapState} from 'vuex'
export default {
	name: 'ClockPopup',
	props: {
		showPopup: {
			type: Boolean,
			default: false,
		}
	},
	data() {
	  return {
		show: this.showPopup,
		src:'../../static/img/user/avatar.png',
		overlayStyle: {
			'backgroundColor': 'rgba(102, 102, 102, 0.9)',
			'filter': 'blur(1px)'
		},
	  }
	},
	mounted() {
	},
	methods: {
		open() {
		},
		close() {
			this.show = false
			this.$emit("popupClose")
		},
		shareFriend() {
			this.$refs.uNotify.show({
				top: 10,
				type: 'success',
				color: '#000',
				bgColor: '#e8e8e8',
				message: '分享成功!',
				duration: 1000 * 3,
				fontSize: 20,
				safeAreaInsetTop:true
			})
		},
		isSing(id) {
			if(JSON.stringify(this.userSingIn) !== "{}") {
				let res = this.userSingIn.day.findIndex(item => {
					return item === id
				})
				return res !== -1
			}
		},
	},
	computed: {
		...mapState('global', ['userSingIn']),
	},
	watch: {
		showPopup(newvalue) {
			this.show = newvalue
		}
	}
}
</script>

<style lang="scss" scoped>
.clockPopup{
	position: relative;
	padding: 34px 20px 20px;

	.clockPopup-header{
		display: flex;
		align-items: flex-start;
		margin-bottom: 36px;

		.clockPopup-header-left{
			width: 60px;
			height: 60px;
			margin-right: 6px;

			.avatar-wrapper{
				width: 100%;
				height: 100%;
				
			}
		}
		
		.clockPopup-header-right{
			
			.title{
				height: 29px;
				font-size: 22px;
				color: rgba(31, 31, 57, 1);
				margin-bottom: 2px;
			}
			
			.desc{
				font-size: 12px;
				color: rgba(132, 132, 150, 1);	
			}
		}
	}
	
	.clockPopup-main{
		margin-bottom: 40px;

		.clockPopup-info-list{
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			margin-bottom: 2px;

			.clockPopup-info-item{
				width: 50%;
				margin-bottom: 24px;

				.title{
					margin-bottom: 16px;
					font-size: 12px;
					color: rgba(132, 132, 150, 1);
					margin-left: 10px;
				}
				
				.content{
					display: flex;
					align-items: flex-start;
					
					.bigNum{
						font-size: 20px;
						color: rgba(31, 31, 57, 1);
						margin-right: 5px;
						margin-left: 10px;
					}
					
					.minutes{
						font-size: 12px;
						color: rgba(132, 132, 150, 1);
					}
				}
			}
		}
	
		.clockPopup-record{
			
			.clockPopup-record-title{
				text-align: center;
				font-size: 14px;
				color: rgba(31, 31, 57, 1);
				margin-bottom: 20px;
			}
			
			.clockPopup-record-list{
				display: flex;
				justify-content: center;
				align-items: center;
				
				.clockPopup-record-item{
					width: 28px;
					height: 28px;
					border-radius: 50%;
					margin-right: 11px;
					line-height: 28px;
					text-align: center;
					color: #fff;
					font-size: 12px;
					background: rgba(224, 245, 231, 1);;
					
					&.clock{
						background: rgba(63, 161, 98, 1);
					}
				}
			}
		}
	
	}
	
	.clockPopup-btn{
		padding: 12px 74px;
		background: rgba(63, 161, 98, 1);
		font-size: 16px;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		border-radius: 14px;
	}
	
	.clockPopup-close{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: -60px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.2);
		border: 0.5px solid rgba(255, 255, 255, 0.5);      
	}
}
</style>