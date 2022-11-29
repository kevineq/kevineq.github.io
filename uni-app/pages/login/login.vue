<template>
	<view class="login-view">
		<view class="background"></view>
		<view class="close" @click="close"></view>
		<view class="icon" :class="{active: show}"></view>
		<view class="phone">
			<view class="phone-text" v-show="!isIdLogin">+86</view>
			<input class="phone-ipt" v-model="value1" :placeholder="isPlaceholder1" :maxlength="isMaxLength1"
				placeholder-style="fontSize: 14px; color: #000" @focus="focusPhone" />
		</view>
		<view class="code">
			<input class="code-ipt" v-model="value2" :placeholder="isPlaceholder2" :maxlength="isMaxLength2"
				placeholder-style="fontSize: 14px; color: #000" :password="isIdLogin" @focus="focusCode" />
			<view class="text">{{ isText }}</view>
		</view>

		<view class="agree">
			<checkbox class="agree-ipt" ref="agree" />
			<view class="text">
				我已阅读并同意<span>《用户服务协议》</span>和<span>《隐私政策》</span>
			</view>
		</view>

		<view class="login1" @click="login">{{ isLoginText }}</view>

		<view class="login2" @click="isIdLogin = !isIdLogin">

			{{isIdLogin ? '验证码登录' : '账号密码登录'}}
		</view>

		<u-divider class="login3" text="第三方账号登录"></u-divider>

		<view class="login-icon">
			<view class="icon1 qq-icon"></view>
			<view class="icon1 wx-icon"></view>
			<view class="icon1 wb-icon"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: "",
				value2: "",
				isIdLogin: false,
				show: false
			};
		},

		computed: {
			isMaxLength1() {
				if (this.isIdLogin) {
					return "15";
				} else {
					return "11";
				}
			},
			isMaxLength2() {
				if (this.isIdLogin) {
					return "15";
				} else {
					return "6";
				}
			},
			isPlaceholder1() {
				if (this.isIdLogin) {
					return "昵称，手机号，邮箱";
				} else {
					return "输入手机号";
				}
			},
			isPlaceholder2() {
				if (this.isIdLogin) {
					return "请输入密码";
				} else {
					return "输入验证码";
				}
			},
			isText() {
				if (this.isIdLogin) {
					return "忘记密码?";
				} else {
					return "获取验证码";
				}
			},
			isLoginText() {
				if (this.isIdLogin) {
					return "登录";
				} else {
					return "注册/登录";
				}
			},
		},

		methods: {
			focusPhone() {
				this.show = false
			},

			focusCode() {
				this.show = true
			},

			close() {
				uni.navigateBack(-1);
			},

			login() {
				if (this.$refs.agree.checkboxChecked == true && this.value1 == 13428068868 && this.value2 == 123456) {
					localStorage['user'] = this.value1;
					uni.switchTab({
						url: `/pages/user/user`
					});
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.login-view {
		width: 100vw;
		height: 100vh;

		.background {
			width: 100%;
			height: 26%;
			background-color: #ffe933;
		}

		.close {
			position: absolute;
			left: 10px;
			top: 10px;
			width: 30px;
			height: 30px;
			background-size: 30px 30px;
			background-repeat: no-repeat;
			background-image: url(/static/image/ic_nav_close.png);
		}

		.icon {
			position: absolute;
			left: 50%;
			top: 17%;
			transform: translateX(-50%);
			width: 125px;
			height: 88px;
			background-size: 125px 88px;
			background-repeat: no-repeat;
			background-image: url(/static/image/ic_login_open_eyes.png);

			&.active {
				background-image: url(/static/image/ic_login_close_eyes.png);
			}
		}

		.phone-ipt,
		.code-ipt {
			flex: 1;
			font-size: 14px;
			font-weight: 600;
		}

		.phone,
		.code {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50px;
		}

		.phone {
			margin: 80px 20px 0;

			.phone-text {
				margin-right: 10px;
				font-size: 14px;
				font-weight: 600;
			}
		}

		.code {
			margin: 0 20px;
			border-bottom: 1px solid #eee;

			.text {
				height: 30px;
				line-height: 30px;
				padding: 0 10px;
				border-radius: 5px;
				font-size: 13px;
				color: #999;
				background-color: #f4f4f4;
			}
		}

		.agree {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 30px;
			margin: 20px 0;

			.agree-ipt {
				margin-right: 10px;
			}

			.text {
				font-size: 13px;
				color: #999;

				span {
					color: #2baefc;
				}
			}
		}

		.login1 {
			height: 50px;
			line-height: 50px;
			text-align: center;
			margin: 0 20px;
			background-color: #f4f4f4;
			border-radius: 5px;
			font-size: 14px;
			color: #999;
			margin-top: 5px;
		}

		.login2 {
			text-align: center;
			font-size: 14px;
			margin: 20px 0;

			span {
				color: #999;
			}
		}

		.login-icon {
			display: flex;
			justify-content: space-evenly;
			margin-top: 20px;

			.icon1 {
				width: 40px;
				height: 40px;
				background-size: 40px 40px;
				background-repeat: no-repeat;

				&.qq-icon {

					background-image: url(/static/image/ic_login_qq.png);
				}

				&.wx-icon {

					background-image: url(/static/image/ic_login_weixin.png);
				}

				&.wb-icon {

					background-image: url(/static/image/ic_login_weibo.png);
				}
			}
		}
	}
</style>
