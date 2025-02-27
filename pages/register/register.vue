<template>
	<view id="register-content">
		<view class="register-title">
			<view class="register-text">
				注册账号
			</view>
			<view class="register-desc">
				注册即可加入学海无涯!享受多种学习体验
			</view>
		</view>
		<view class="register-form">
			<view class="register-form-wrapper">
				<u-form :model="form" ref="registForm">
				<view class="register-form-item register-username">
					<u-form-item prop="username">
					<u-input placeholder="请输入你的用户名" v-model="form.username" :placeholderStyle="'color: rgba(111, 117, 130, .8)'" :customStyle="inputStyle">
						<u-icon class="input-icon" name="account-fill" color="#6c727f" size="24px" slot="prefix"></u-icon>
					</u-input>
					</u-form-item>
				</view>
				<view class="register-form-item register-password">
					<u-form-item prop="password">
					<u-input placeholder="请输入你的密码" v-model="form.password" password :placeholderStyle="'color: rgba(111, 117, 130, .8)'" :customStyle="inputStyle">
						<u-icon class="input-icon" name="lock-fill" color="#6c727f" size="24px" slot="prefix"></u-icon>
					</u-input>
					</u-form-item>
				</view>
				<view class="register-form-item register-rePassword">
					<u-form-item prop="repassword">
					<u-input placeholder="请再次输入你的密码" v-model="form.repassword" password :placeholderStyle="'color: rgba(111, 117, 130, .8)'" :customStyle="inputStyle">
						<u-icon class="input-icon" name="lock-fill" color="#6c727f" size="24px" slot="prefix"></u-icon>
					</u-input>
					</u-form-item>
				</view>
				<view class="register-form-checkbox">
					<u-form-item prop="checked">
					<u-checkbox-group v-model="form.checked" iconSize="24">
						<u-checkbox activeColor="#69c98b" labelColor="#bcbcbc" :size="34" :labelSize="30" label="我已经阅读并同意服务条款"></u-checkbox>
					</u-checkbox-group>
					</u-form-item>
				</view>
				</u-form>
				<view class="register-btn" @click="regist">
					<view class="text">注册</view>
					<view class="btn">
						<u-icon name="arrow-leftward" color="#69c98b" size="30px" bold></u-icon>
					</view>
				</view>
				
			</view>
		</view>
		<view class="register-tip">
			已有账号?<text @tap="toLogin">点击前往登录</text>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					repassword: '',
					checked: []
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
							trigger: ['change','blur'],
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码', 
							trigger: ['change','blur']
						}
					],
					repassword: [
						{
							required: true,
							message: '请输入确定密码',
							trigger: ['change','blur']
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
			};
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url:`/pages/login/login`
				})
			},
			regist() {
				
				this.$refs.registForm.validate().then(async (res) => {
					if(this.form.password !== this.form.repassword) {
						uni.$u.toast('密码不一致')
						return
					} else {
						let result = await this.$store.dispatch('print/userRegister',{username: this.form.username,password: this.form.password});
						if(result === 'ok') {
							this.$refs.uToast.show({
								type: 'loading',
								title: '正在加载',
								message: "正在加载",
								complete() {
									uni.$u.toast('注册成功！')
									setTimeout(() => {
										uni.navigateTo({
											url: '../login/login'
										})
									},1000)
								}
							})
							
						} else {
							uni.$u.toast('用户名已被占用！')
						}
						
					}
					
					
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		},
		onReady() {
			this.$refs.registForm.setRules(this.rules)
		}
	}
</script>

<style lang="scss">
#register-content{
	padding: 0 20px;
	
	.register-title{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		
		height: 160px;
		
		
		.register-text{
			font-size: 32px;
			color: #121826;
			margin-bottom: 10px;
		}
		
		.register-desc{
			font-size: 14px;
			color: #6c727f;
		}
	}
	
	.register-form{
		
		.register-form-wrapper{
			
			.register-form-item{
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
			
			.register-form-checkbox{
				margin-bottom: 30px;
			}
			
			.register-btn{
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
					left: 6px;
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

	.register-tip{
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
