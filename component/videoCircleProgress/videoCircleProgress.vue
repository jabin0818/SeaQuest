<template>
	<view class="progress">
		<view class="echart-box">
			<view class="content">
				<canvas :canvas-id="'chartBox'+ this.canvasId" id="chartBox1" class="chart"></canvas>
				<!-- <view class="btn-box">
					<button type="default" class="btn" @click="mulEvent()">减小</button>
					<button type="default" class="btn" @click="addEvent">增加</button>
				</view> -->
			</view>
		</view>
	</view>
</template>
 
<script>
	import { VideoCircleBox } from '../../js/chart.js';
	export default {
		props: {
			percentNum1: {
				type: Number,
				default: 0,
			},
			canvasId: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				cbox1: null,       //画布实例对象
				percent1: .5,        //当前进度值
				step: .1           //每次修改递增或递减值
			}
		},
		mounted() {
			this.initCircle1();
		},
		methods: {
			initCircle1(){
				//实例对象
				if(this.percentNum1) {
					 
					this.cbox1 = new VideoCircleBox(uni.createCanvasContext(`chartBox1`));
					this.percent1 = this.percentNum1
					this.cbox1.percent = this.percent1;
					this.cbox1.drawCircle();
					
				} 
			},
			mulEvent(){
				//递减
				this.percent = this.percent - this.step <= 0 ? 0 : this.percent - this.step;
				//修改进度值
				this.cbox1.percent = this.percent;
				//重新绘制
				this.cbox1.drawCircle();
			},
			addEvent(){
				//递增
				this.percent = this.percent + this.step >= 1 ? 1 : this.percent + this.step;
				//修改进度值
				this.cbox1.percent = this.percent;
				//重新绘制
				this.cbox1.drawCircle();
			}
		},
		watch : {
			percentNum1(newvalue) {
				this.initCircle1();
			}
		}
	}
</script>
 
<style lang="scss" scoped>

.progress{ 
	width: 44px;
	height: 44px;

	.echart-box{ 
		
		.content{ 
			
			.chart{ 
				width: 100rpx; 
				height: 100rpx; 
				margin: 0 auto; 
			}
		}
		.btn-box{ 
			text-align: center; 
			
			.btn{ 
				display: inline-block; 
				vertical-align: middle; 
				margin: 0 20rpx;
				font-size: 30rpx; 
				background-color: #297DFE; 
				color: #fff; 
			}
		}
	}
}
</style>