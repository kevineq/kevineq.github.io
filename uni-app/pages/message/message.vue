<template>
	<view class="note-view">
		<view class="nav">
			<view class="add"></view>
			<view class="text">消息</view>
			<view class="info">
				<view class="clear"></view>
				<view class="create"></view>
			</view>
		</view>

		<view class="icon-list">
			<view class="icon" v-for="(t, i) in titleList" :key="i" @click="btn(i)">
				<view class="text">{{t.name}}</view>
			</view>
		</view>

		<view class="empty">
			<view class="text">这里什么都没有哦~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleList: [{
						name: "我的点赞",
					},
					{
						name: "我的评论",
					},
					{
						name: "我的关注",
					},
				],
			}
		},

		onShow() {
			this.getUserData()
		},

		methods: {
			getUserData() {
				if (!localStorage['user']) {
					uni.redirectTo({
						url: `/pages/login/login`
					});
				}
			},

			btn(n) {
				uni.navigateTo({
					url: `/pages/message/messageChildren?id=${n}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add {
		width: 30px;
		height: 30px;
		background-size: 30px 30px;
		background-repeat: no-repeat;
		background-image: url(/static/image/ic_add_contacts.png);
	}

	.clear {
		width: 30px;
		height: 30px;
		background-size: 30px 30px;
		background-repeat: no-repeat;
		background-image: url(/static/image/ic_clear_all_unread.png);
	}

	.create {
		width: 30px;
		height: 30px;
		background-size: 30px 30px;
		background-repeat: no-repeat;
		background-image: url(/static/image/ic_create_conversation.png);
		margin-left: 10px;
	}

	.nav {
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		height: 50px;
		padding: 0 10px;

		.text {
			flex: 1;
			text-align: center;
			transform: translateX(20px);
			font-weight: 600;
			font-size: 18px;
		}

		.info {
			display: flex;
			margin-left: auto;
		}
	}

	.icon-list {
		display: flex;
		justify-content: space-around;
		width: 100vw;
		height: 100px;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;

		.icon {
			position: relative;
			width: 100px;
			height: 100px;
			background-size: 60px 60px;
			background-repeat: no-repeat;
			background-position: center 5px;
		}

		.icon:nth-child(1) {
			background-image: url(/static/image/ic_im_message_like.png);
		}

		.icon:nth-child(2) {
			background-image: url(/static/image/ic_im_message_comment.png);
		}

		.icon:nth-child(3) {
			background-image: url(/static/image/ic_im_message_fans.png);
		}

		.text {
			position: absolute;
			left: 0;
			bottom: 15px;
			width: 100%;
			text-align: center;
			font-size: 13px;
		}
	}

	.empty {
		position: relative;
		width: 100vw;
		height: calc(100vh - 192px);
		background-size: 120px 120px;
		background-repeat: no-repeat;
		background-position: center 40%;
		background-image: url(/static/image/empty_about_im.png);

		.text {
			position: absolute;
			left: 0;
			bottom: 40%;
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #999;
		}
	}
</style>
