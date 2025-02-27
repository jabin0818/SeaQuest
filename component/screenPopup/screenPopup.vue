<template>
	<u-popup :show="show" :round="56" mode="bottom" @close="close" @open="open">
		<view class="screenPopup">
			<view class="screenPopup-title">
				<view class="left-cloneBtn" @tap="close">
					<image src="../../static/img/icon/close.png"></image>
				</view>
				<view class="popup-title">
					筛选
				</view>
			</view>
			<view class="screenPopup-classify">
				<view class="title">
					分类
				</view>
				<view class="main">
					<view class="tag-list" v-if="classifyBtn.length">
						<view :class="classifyBtn[0] === 1 ? 'tag-item selected' : 'tag-item'" @tap="classifySelect(0)">
							设计
						</view>
						<view :class="classifyBtn[1] === 1 ? 'tag-item selected' : 'tag-item'" @tap="classifySelect(1)">
							绘画
						</view>
						<view :class="classifyBtn[2] === 1 ? 'tag-item selected' : 'tag-item'" @tap="classifySelect(2)">
							建筑
						</view>
						<view :class="classifyBtn[3] === 1 ? 'tag-item selected' : 'tag-item'" @tap="classifySelect(3)">
							历史
						</view>
						<view :class="classifyBtn[4] === 1 ? 'tag-item selected' : 'tag-item'" @tap="classifySelect(4)">
							英语
						</view>
						<view :class="classifyBtn[5] === 1 ? 'tag-item selected' : 'tag-item'" @tap="classifySelect(5)">
							音乐
						</view>
						<view :class="classifyBtn[6] === 1 ? 'tag-item selected' : 'tag-item'" @tap="classifySelect(6)">
							编程
						</view>
					</view>
				</view>
			</view>
			<view class="screenPopup-price">
				<view class="title">
					价格
				</view>
				<view class="main">
					<vue-region-slider :minValue="minValue" :maxValue="maxValue" :step="40" @up="up"  @down="down"  @move="move" />
				</view>
			</view>
			<view class="screenPopup-duration">
				<view class="title">
					时长
				</view>
				<view class="duration-main">
					<view class="tag-list">
						<view :class="durationBtn[0] === 1 ? 'tag-item selected' : 'tag-item'" @tap="durationSelect(0)">
							3-8 小时
						</view>
						<view :class="durationBtn[1] === 1 ? 'tag-item selected' : 'tag-item'" @tap="durationSelect(1)">
							8-14 小时
						</view>
						<view :class="durationBtn[2] === 1 ? 'tag-item selected' : 'tag-item'" @tap="durationSelect(2)">
							14-20 小时
						</view>
						<view :class="durationBtn[3] === 1 ? 'tag-item selected' : 'tag-item'" @tap="durationSelect(3)">
							20-24 小时
						</view>
						<view :class="durationBtn[4] === 1 ? 'tag-item selected' : 'tag-item'" @tap="durationSelect(4)">
							24-28 小时
						</view>
						<view :class="durationBtn[5] === 1 ? 'tag-item selected' : 'tag-item'" @tap="durationSelect(5)">
							28及以上
						</view>
					</view>
				</view>
			</view>
			<view class="screenPopup-btn">
				<view class="screenPopup-btn-wrapper">
					<view class="reset-btn" @tap="resetBtn">
						重置
					</view>
					<view class="confirm-btn" @tap="confirmBtn()">
						确定
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
export default {
	name: 'ScreenPopup',
	props: {
		showPopup: {
			type: Boolean,
			default: false,
		}
	},
	data() {
	  return {
		show: this.showPopup,
		classifyBtn: [1, 0, 0, 0, 0, 0, 0],
		durationBtn: [0, 0, 0, 0, 0],
		minValue: 0,
		maxValue: 1000,
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
		down(e){
			const minValue = e.custom.minValue;
			const maxValue = e.custom.maxValue;
			this.minValue = minValue
			this.maxValue = maxValue
		},
		up(e){
			const minValue = e.custom.minValue;
			const maxValue = e.custom.maxValue ;		
			this.minValue = minValue
			this.maxValue = maxValue
		},
		move(e){
			const minValue = e.custom.minValue;
			const maxValue = e.custom.maxValue ;
			this.minValue = minValue
			this.maxValue = maxValue
		},
		classifySelect(index) {
			if(this.classifyBtn[index]) {
				this.$set(this.classifyBtn,index, 0);
			} else {
				this.$set(this.classifyBtn,index, 1);
			}
		},
		durationSelect(index) {
			if(this.durationBtn[index]) {
				this.$set(this.durationBtn,index, 0);
			} else {
				this.$set(this.durationBtn,index, 1);
			}
		},
		resetBtn() {
			this.classifyBtn = [0, 0, 0, 0, 0, 0, 0]
			this.durationBtn = [0, 0, 0, 0, 0]
			this.minValue = 0
			this.maxValue = 1000
			
		},
		confirmBtn() {
			if(!(this.classifyBtn.find(i => i ===1))) {
				uni.$u.toast('请选择一个分类!')
				return
			}
			this.close()
			uni.$u.toast('查询成功!')
			let price = {
				max: this.maxValue,
				min: this.minValue
			}
			this.$emit('selecCouses',this.classifyBtn,price,this.durationBtn)
		}
	},
	watch: {
		showPopup(newvalue) {
			this.show = newvalue
		}
	}
  }
</script>

<style lang="scss" scoped>


.screenPopup{
	padding: 12px 20px 32px;
	
	.screenPopup-title{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		margin-bottom: 16px;
		
		.left-cloneBtn{
			position: absolute;
			top: 11px;
			left: 4px;
			// margin-right: auto;
			width: 14px;
			height: 14px;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		.popup-title{
			font-size: 24px;
			color: rgba(31, 31, 57, 1);
		}
	}
	
	.screenPopup-classify{
		margin-bottom: 22px;
		
		.title{
			height: 48px;
			font-size: 20px;
			color: rgba(31, 31, 57, 1);
		}
		
		.main{
			
			.tag-list{
				display: flex;
				flex-wrap: wrap;
				.tag-item{
					padding: 7px 20px;
					background: rgba(224, 245, 231, 1);
					color: rgba(132, 132, 150, 1);
					font-size: 12px;
					margin-right: 12px;
					margin-bottom: 11px;
					border-radius: 8px;
					&.selected{
						background: rgba(63, 161, 98, 1);
						color: #fff;
					}
				}
			}
		}
	}
	
	.screenPopup-price{
		margin-bottom: 36px;
		
		.title{
			height: 48px;
			font-size: 20px;
			color: rgba(31, 31, 57, 1);
		}
		
		.main{
			
			/deep/ .fj-line{
				height: 2px;
				background: rgba(184, 184, 210, 1);	
			}
			
			/deep/ .fj-slider .fj-line-pull{
				height: 2px;
				background-color: rgba(63, 161, 98, 1);
			}
			
			/deep/ .fj-slider .fj-touch-left{
				height: 22px;
				width: 22px;
				background: #ffffff;
				border: 3px solid rgba(63, 161, 98, 1);
				opacity: 1;
			}
			/deep/ .fj-slider .fj-touch-right{
				height: 22px;
				width: 22px;
				background: #ffffff;
				border: 3px solid rgba(63, 161, 98, 1);
				opacity: 1;
			}
		}
		
	}
	
	.screenPopup-duration{
		margin-bottom: 35px;
		
		.title{
			height: 48px;
			font-size: 20px;
			color: rgba(31, 31, 57, 1);
		}
		
		.duration-main{
			
			.tag-list{
				display: flex;
				flex-wrap: wrap;
				.tag-item{
					padding: 7px 12px;
					background: rgba(224, 245, 231, 1);
					color: rgba(132, 132, 150, 1);
					font-size: 12px;
					margin-right: 12px;
					margin-bottom: 11px;
					border-radius: 8px;
					&.selected{
						background: rgba(63, 161, 98, 1);
						color: #fff;
					}
				}
			}
		}
		
	}

	.screenPopup-btn{
		
		.screenPopup-btn-wrapper{
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.reset-btn{
				border: 1px solid rgba(63, 161, 98, 1);
				padding: 14px 28px;
				color: rgba(63, 161, 98, 1);
				font-size: 16px;
				margin-right: 10px;
				border-radius: 10px;
			}
			
			.confirm-btn{
				padding: 14px 100px;
				border-radius: 10px;
				background: rgba(63, 161, 98, 1);
				color: #fff;
				font-size: 16px;
					
			}
		}
	}

}	
</style>