<template>
	<view class="user-view">
		<view class="nav">
			<view class="text">我</view>
			<view class="info">
				<view class="clear"></view>
				<view class="create"></view>
			</view>
		</view>

		<view v-if="!isUser">
			<view class="text1" @click="login">登录体验更多功能</view>
			<view class="icon-list1">
				<view class="icon phone-icon"></view>
				<view class="icon wx-icon"></view>
				<view class="icon qq-icon"></view>
				<view class="icon wb-icon"></view>
			</view>
		</view>

		<view v-if="isUser">
			<view class="user">
				<u--image shape="circle" :showLoading="true" src="/static/image/user.png" width="40px" height="40px">
				</u--image>
				<view class="user-info">
					<view class="name">{{ userName }}</view>
					<view class="info">
						<view class="total">总访客 0</view>
						<view class="today">今日 0</view>
					</view>
				</view>
				<view class="home">个人主页
					<u-icon class="arrow" name="arrow-right" size="12"></u-icon>
				</view>
			</view>
		</view>

		<view class="text-list">
			<view class="item">
				<view class="count">0</view>
				<view class="text">糗事</view>
			</view>
			<view class="item">
				<view class="count">0</view>
				<view class="text">动态</view>
			</view>
			<view class="item">
				<view class="count">0</view>
				<view class="text">关注</view>
			</view>
			<view class="item">
				<view class="count">0</view>
				<view class="text">粉丝</view>
			</view>
		</view>
		<view class="icon-list2">
			<view class="icon" v-for="(t, i) in titleList" :key="i">
				<view class="text">{{t.name}}</view>
			</view>
		</view>
		<view class="icon-list3">
			<view class="item">
				<view class="icon punch-icon"></view>
				<view class="text">糗百好物</view>
				<u-icon class="arrow" name="arrow-right"></u-icon>
			</view>
			<view class="item">
				<view class="icon expert-icon"></view>
				<view class="text">每周达人</view>
				<u-icon class="arrow" name="arrow-right"></u-icon>
			</view>
			<view class="item">
				<view class="icon authentication-icon"></view>
				<view class="text">糗百认证</view>
				<u-icon class="arrow" name="arrow-right"></u-icon>
			</view>
			<view class="item">
				<view class="icon medal-icon"></view>
				<view class="text">糗百钱袋</view>
				<u-icon class="arrow" name="arrow-right"></u-icon>
			</view>
			<view class="item">
				<view class="icon audit-icon"></view>
				<view class="text">审核糗事</view>
				<u-icon class="arrow" name="arrow-right"></u-icon>
			</view>
			<view class="item">
				<view class="icon adolescent-icon"></view>
				<view class="text">青少年模式</view>
				<u-icon class="arrow" name="arrow-right"></u-icon>
			</view>
			<view class="item">
				<view class="icon feedback-icon"></view>
				<view class="text">联系客服</view>
				<u-icon class="arrow" name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleList: [{
						name: "评论",
					},
					{
						name: "收藏",
					},
					{
						name: "商城",
					},
					{
						name: "任务",
					},
					{
						name: "浏览历史",
					},
				],
				userName: '',
				isUser: false
			}
		},

		onShow() {
			this.getUserData()
		},

		methods: {
			getUserData() {
				if (localStorage['user']) {
					this.userName = localStorage['user']
					this.isUser = true
				}
			},

			login() {
				uni.navigateTo({
					url: `/pages/login/login`
				});
			},

			// btn(n) {
			// 	uni.navigateTo({
			// 		url: `/pages/user/userChildren?id=${n}`
			// 	});
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		display: flex;
		align-items: center;
		height: 60px;
		padding: 0 10px;
		
		.user-info {
			margin-left: 10px;
		}

		.name {
			height: 20px;
			line-height: 20px;
			font-size: 14px;
		}

		.info {
			display: flex;
			height: 20px;
			line-height: 20px;
			font-size: 13px;
			color: #999;

			.total {
				margin-right: 10px;
			}
		}

		.home {
			display: flex;
			margin-left: auto;
			font-size: 13px;
			color: #999;
		}
	}

	.user-view {
		width: 100vw;
		height: calc(100vh - 50px);

		.clear {
			margin-left: auto;
			width: 30px;
			height: 30px;
			background-size: 30px 30px;
			background-repeat: no-repeat;
			background-image: url(/static/image/ic_profile_toggle.png);
		}

		.create {
			width: 30px;
			height: 30px;
			background-size: 30px 30px;
			background-repeat: no-repeat;
			background-image: url(/static/image/ic_profile_setting.png);
			margin-left: 10px;
		}

		.nav {
			display: flex;
			align-items: center;
			position: relative;
			height: 50px;
			padding: 0 10px;

			.text {
				flex: 1;
				text-align: center;
				transform: translateX(40px);
				font-weight: 600;
				font-size: 18px;
			}

			.info {
				display: flex;
				margin-left: auto;
			}
		}

		.text1 {
			height: 30px;
			font-size: 14px;
			text-align: center;
		}

		.icon-list1 {
			display: flex;
			justify-content: space-around;

			.icon {
				width: 40px;
				height: 40px;
				background-size: 40px 40px;
				background-repeat: no-repeat;

				&.phone-icon {
					background-image: url(/static/image/ic_login_phone.png);
				}

				&.wx-icon {
					background-image: url(/static/image/ic_login_qq.png);
				}

				&.qq-icon {
					background-image: url(/static/image/ic_login_weixin.png);
				}

				&.wb-icon {
					background-image: url(/static/image/ic_login_weibo.png);
				}
			}
		}

		.text-list {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 60px;

			.item {
				text-align: center;

				.text {
					height: 20px;
					line-height: 20px;
					font-size: 12px;
					color: #999;
				}
			}
		}

		.icon-list2 {
			display: flex;
			justify-content: space-around;
			border-radius: 5px;
			margin: 0 10px;
			box-shadow: 0 0 10px 1px #eee;

			.icon {
				position: relative;
				width: 60px;
				height: 80px;
				background-size: 40px 40px;
				background-repeat: no-repeat;
				background-position: center 10px;
			}

			.icon:nth-child(1) {
				background-image: url(/static/image/ic_profile_comment.png);
			}

			.icon:nth-child(2) {
				background-image: url(/static/image/ic_profile_collection.png);
			}

			.icon:nth-child(3) {
				background-image: url(/static/image/ic_profile_shop.png);
			}

			.icon:nth-child(4) {
				background-image: url(/static/image/ic_profile_mission.png);
			}

			.icon:nth-child(5) {
				background-image: url(/static/image/ic_profile_history.png);
			}

			.text {
				position: absolute;
				left: 0;
				bottom: 10px;
				width: 100%;
				text-align: center;
				font-size: 12px;
			}
		}

		.icon-list3 {
			margin-top: 10px;
			padding: 0 10px;

			.item {
				height: 45px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #eee;

				&.item:last-child {
					border-bottom: none;
				}

				.icon {
					width: 20px;
					height: 20px;
					background-size: 20px 20px;
					background-repeat: no-repeat;

					&.punch-icon {
						background-image: url(/static/image/ic_profile_punch.png);
					}

					&.expert-icon {
						background-image: url(/static/image/ic_profile_expert.png);
					}

					&.authentication-icon {
						background-image: url(/static/image/ic_profile_authentication.png);
					}

					&.audit-icon {
						background-image: url(/static/image/ic_profile_audit.png);
					}

					&.adolescent-icon {
						background-image: url(/static/image/ic_profile_adolescent.png);
					}

					&.feedback-icon {
						background-image: url(/static/image/ic_profile_feedback.png);
					}

					&.medal-icon {
						background-image: url(/static/image/ic_profile_medal.png);
					}
				}

				.text {
					font-size: 14px;
					margin-left: 10px;
				}

				.arrow {
					margin-left: auto;
					color: #ccc;
				}
			}
		}
	}
</style>
