<template>
	<view class="comment">
		<view class="author">
			<u--image shape="circle" :showLoading="true" :src="listItem.user.thumb" width="40px" height="40px">
			</u--image>
			<view class="user">
				<view class="login">{{ listItem.user.login }}</view>
				<view class="address">{{ listItem.ip_location }}</view>
			</view>
			<view class="more-icon"></view>
			<view class="like">
				<view class="icon" :class="{active: show}" @click="like"></view>
				<view class="num" ref="num">{{ listItem.like_count }}</view>
			</view>
		</view>
		<view class="content" v-html="listItem.content"></view>
		<view class="reply">回复</view>
	</view>
</template>

<script>
	export default {
		props: {
			listItem: Object,
		},

		data() {
			return {
				show: false
			}
		},

		methods: {
			like() {
				if (this.show) {
					this.show = false
					this.$refs.num.$el.innerHTML--
				} else {
					this.show = true
					this.$refs.num.$el.innerHTML++
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.comment {
		width: calc(100vw - 20px);
		padding: 10px;
		border-bottom: 1px solid #eee;

		.author {
			display: flex;
			align-items: center;
			height: 50px;

			.user {
				margin-left: 10px;
			}

			.login {
				height: 20px;
				line-height: 20px;
				font-size: 14px;
				color: #999;
			}

			.address {
				height: 20px;
				line-height: 20px;
				font-size: 13px;
				color: #ccc;
			}

			.more-icon {
				width: 30px;
				height: 30px;
				background-size: 30px 30px;
				background-repeat: no-repeat;
				background-image: url(/static/image/ic_more_white.png);
				margin-right: 10px;
				margin-left: auto;
			}

			.like {
				display: flex;
				align-items: center;

				.icon {
					width: 30px;
					height: 30px;
					background-size: 30px 30px;
					background-repeat: no-repeat;
					background-image: url(/static/image/ic_like_comment.png);

					&.active {
						background-image: url(/static/image/qiuyoucircle_like_on.png);
					}
				}

				.num {
					font-size: 14px;
					color: #ccc;
				}
			}
		}

		.content {
			line-height: 30px;
			font-size: 14px;
			margin-left: 50px;
		}

		.reply {
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			margin-left: 50px;
			color: skyblue;
		}
	}
</style>
