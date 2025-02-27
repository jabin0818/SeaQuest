<template>
	<view id="login-content">
		<view class="login-title">
			<view class="login-text">
				登录
			</view>
			<view class="login-desc">
				立即登录!享受多种学习体验
			</view>
		</view>
		<view class="login-form">
			<view class="login-form-wrapper">
				<u-form :model="form" ref="loginForm">
					
				<view class="login-form-item login-username" >
					<u-form-item prop="username">
					<u-input placeholder="请输入你的用户名" maxlength="30" v-model="form.username" :placeholderStyle="'color: rgba(111, 117, 130, .8)'" :customStyle="inputStyle">
						<u-icon class="input-icon" name="account-fill" color="#6c727f" size="24px" slot="prefix"></u-icon>
					</u-input>
					</u-form-item>
				</view>
				<view class="login-form-item login-password">
					<u-form-item  prop="password">
					<u-input placeholder="请输入你的密码" maxlength="30"  v-model="form.password" password :placeholderStyle="'color: rgba(111, 117, 130, .8)'" :customStyle="inputStyle">
						<u-icon class="input-icon" name="lock-fill" color="#6c727f" size="24px" slot="prefix"></u-icon>
					</u-input>
					</u-form-item>
				</view>
				
				<view class="login-form-checkbox">
					<u-form-item prop="checked">
					<u-checkbox-group v-model="form.checked" iconSize="24">
						<u-checkbox activeColor="#69c98b" labelColor="#bcbcbc" :size="34" :labelSize="30" label="我已经阅读并同意服务条款"></u-checkbox>
					</u-checkbox-group>
					</u-form-item>
				</view>
			</u-form>
				<u-button class="login-btn" @click="submit">
					<view class="text" >登录</view>
					<view class="btn">
						<u-icon name="arrow-rightward" color="#69c98b" size="30px" bold></u-icon>
					</view>
				</u-button>
			</view>
		</view>
		<view class="login-tip">
			没有账号?<text @tap="toRegister">点击前往注册</text>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					checked: [],
				},
				inputStyle: {
					'backgroundColor': '#f4f4f6',
					'height': '50px',
					'borderRadius': '16px',
				},
				rules: {
					username: [
						{
							required: true, 
							message: '请输入登录名', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码', 
							trigger: ['change','blur'],
						}
					],
					checked: {
							type: 'array',
							min: 1,
							max: 2,
							required: true,
							message: '请同意协议',
							trigger: ['change']
						}
				},
				show: false,
			}
		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url:`/pages/register/register`
				})
			},
			submit() {
				this.$refs.loginForm.validate().then(async res => {
					if(res === true) {
						let result = await this.$store.dispatch('print/userLogin',{username: this.form.username,password: this.form.password});
						if(result === 'ok') {
							this.$refs.uToast.show({
								type: 'loading',
								title: '正在加载',
								message: "正在加载",
								complete() {
									uni.$u.toast('登录成功！')
									setTimeout(() => {
										uni.switchTab({
											url: '../index/index'
										})
									},1000)
								}
							})
							
						} else {
							uni.$u.toast('用户名或密码错误！')
						}
					}
					
				}).catch(errors => {
					uni.$u.toast('不能为空~')
				})
			}
		},
		onReady() {
			this.$refs.loginForm.setRules(this.rules)
		},
		computed: {
			...mapState({
				print: state => state.print.all
			})
		}
	}
</script>

<style lang="scss">
#login-content{
	padding: 0 20px;
	
	.login-title{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		
		height: 160px;
		
		
		.login-text{
			font-size: 32px;
			color: #121826;
			margin-bottom: 10px;
		}
		
		.login-desc{
			font-size: 14px;
			color: #6c727f;
		}
	}
	
	.login-form{
		
		.login-form-wrapper{
			
			.login-form-item{
				margin-bottom: 24px;
				
				.label{
					color: #121826;
					font-size: 14px;
					margin-bottom: 6px;
				}
				
				.input-icon{
					margin-right: 8px;
				}
			}
			
			.login-form-checkbox{
				margin-bottom: 30px;
			}
			
			.login-btn{
				position: relative;
				display: flex;
				padding: 6px 6px;
				box-sizing: border-box;
				justify-content: center;
				align-items: center;
				background-color: #69c98b;
				border-radius: 28px;
				height: 56px;
				.text{
					color: #fff;
					font-size: 18px;
				}
				
				.btn{
					position: absolute;
					top: 6px;
					right: 6px;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 44px;
					height: 44px;
					border-radius: 50%;
					background-color: #fff;
					
				}
			}
		}
	}

	.login-tip{
		margin-top: 5px;
		font-size: 14px;
		text-align: center;
		color: rgb(188, 188, 188);
		
		text{
			color: #69c98b;
		}
	}
}
</style>
