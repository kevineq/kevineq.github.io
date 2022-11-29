<template>
	<view class="list-item">
		<view class="author">
			<u--image shape="circle" :showLoading="true" :src="listItem.user.thumb" width="40px" height="40px">
			</u--image>
			<view class="user">
				<view class="info">
					<view class="login">{{ listItem.user.login }}</view>
					<view class="icon" :class="{ gender: isGender }">
						<view class="text">{{ listItem.user.age }}</view>
					</view>
				</view>
				<view class="desc">{{ listItem.ip_location }}</view>
			</view>
			<view class="follow">关注</view>
		</view>

		<view class="content">{{ listItem.content }}</view>

		<view class="image" v-if="listItem.pic_urls.length">
			<img :src="listItem.pic_urls[0].pic_url" />
		</view>

		<view class="tool-bar">
			<view class="left-bar">
				{{ listItem.distance }}
			</view>
			<view class="right-bar">
				<view class="share">
					<view class="icon"></view>
					<view class="num">
						{{ listItem.share_count == 0 ? "分享" : listItem.share_count }}
					</view>
				</view>
				<view class="comment">
					<view class="icon"></view>
					<view class="num">
						{{ listItem.comment_count == 0 ? "评论" : listItem.comment_count }}
					</view>
				</view>
				<view class="like">
					<view class="icon"></view>
					<view class="num">
						{{ listItem.like_count == 0 ? "0" : listItem.like_count }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			listItem: Object,
		},

		data() {
			return {};
		},

		computed: {
			isGender() {
				return this.listItem.user.gender == "M" ? true : false;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.list-item {
		width: calc(100% - 20px);
		padding: 0 10px;
		border-bottom: 1px solid #eee;

		.user {
			margin-left: 10px;
		}

		.author {
			display: flex;
			align-items: center;
			height: 60px;

			.info {
				display: flex;
				align-items: center;

				.login {
					height: 20px;
					line-height: 20px;
					font-size: 14px;
					color: #666;
					margin-right: 5px;
				}

				.icon {
					position: relative;
					width: 45px;
					height: 20px;
					background-size: 45px 20px;
					background-repeat: no-repeat;
					background-image: url(/static/image/ic_userhome_female.9.png);

					&.gender {
						background-image: url(/static/image/ic_userhome_male.9.png);
					}

					.text {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-10%, -50%);
						font-size: 12px;
						color: #fff;
					}
				}
			}

			.desc {
				height: 20px;
				line-height: 20px;
				font-size: 13px;
				color: #ccc;
			}

			.follow {
				margin-left: auto;
				border-radius: 999px;
				font-size: 12px;
				background-color: #ffdf33;
				padding: 4px 8px;
			}
		}

		.content {
			line-height: 30px;
			margin-left: 50px;
		}

		.image {
			margin-left: 50px;

			img {
				width: 100%;
				display: block;
			}
		}

		.tool-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			margin-left: 50px;

			.icon {
				width: 40px;
				height: 40px;
				background-size: 40px 40px;
				background-repeat: no-repeat;
			}

			.num {
				font-size: 14px;
			}

			.left-bar {
				font-size: 14px;
			}

			.right-bar {
				display: flex;

				.comment {
					display: flex;
					align-items: center;

					.icon {
						background-image: url(/static/image/qiushi_comment.png);
					}
				}

				.share {
					display: flex;
					align-items: center;

					.icon {
						background-image: url(/static/image/qiushi_share.png);
					}
				}

				.like {
					display: flex;
					align-items: center;

					.icon {
						background-image: url(/static/image/qiushi_share.png);
					}
				}
			}
		}
	}
</style>
