<template>
	<view class="wrap-box">
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
	import { CircleBox } from '../../js/chart.js';
	export default {
		props: {
			percentNumOne: {
				type: Number,
				default: 0,
			},
			percentNumTwo: {
				type: Number,
				default: 0,
			},
			percentNumThree: {
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
				cbox2: null,       //画布实例对象
				cbox3: null,       //画布实例对象
				percent1: .5,        //当前进度值
				percent2: .5,        //当前进度值
				percent3: .5,        //当前进度值
				step: .1           //每次修改递增或递减值
			}
		},
		mounted() {
			this.initCircle1();
		},
		methods: {
			initCircle1(){
				//实例对象
				if(this.percentNumOne) {
					
					this.cbox1 = new CircleBox(uni.createCanvasContext(`chartBox1`));
					this.percent1 = this.percentNumOne
					this.cbox1.percent = this.percent1;
					this.cbox1.drawCircle();
					
				} else if(this.percentNumTwo) {
					
					this.cbox2 = new CircleBox(uni.createCanvasContext(`chartBox2`));
					this.percent2 = this.percentNumTwo
					this.cbox2.percent = this.percent2;
					this.cbox2.drawCircle();
					
				} else if(this.percentNumThree) {
					
					this.cbox3 = new CircleBox(uni.createCanvasContext(`chartBox3`));
					this.percent3 = this.percentNumThree
					//修改进度值
					this.cbox3.percent = this.percent3;
					//开始绘制
					this.cbox3.drawCircle();
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
		}
	}
</script>
 
<style lang="scss" scoped>

.wrap-box{ 
	width: 30px;
	height: 30px;
	
	.echart-box{ 

		.content{ 

			.chart{ 
				width: 58rpx; 
				height: 58rpx; 
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