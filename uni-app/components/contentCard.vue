<template>
	<view class="list-item" @click="goToArticle">
		<view class="hot" v-if="listItem.type">
			<u--image shape="circle" :showLoading="true" :src="tagIcon" width="20px" height="20px">
			</u--image>
			<view class="text">
				{{tagText}}
			</view>
		</view>

		<view class="author">
			<u--image shape="circle" :showLoading="true" :src="listItem.user.thumb" width="40px" height="40px">
			</u--image>
			<view class="login">{{ listItem.user.login }}</view>
			<view class="follow" :class="{active: isFollow}" @click.stop="follow" ref="follow">关注</view>
		</view>

		<view class="content">
			<span class="text1" v-if="listItem.topic">
				♔{{ listItem.topic.content }}
			</span>
			<view v-html="listItem.content">
			</view>
		</view>

		<view class="attachment" v-if="listItem.attachments">
			<img :src="listItem.attachments[0].origin_url" />
		</view>

		<view class="image" v-if="listItem.format == 'image'">
			<img :src="listItem.origin_url" />
		</view>

		<video class="video" v-if="listItem.format == 'video'" :src="listItem.origin_url" :poster="listItem.pic_url"
			controls style="border-radius: 5px"></video>

		<view class="hot-comment" v-if="listItem.hot_comment && hotShow">
			<view class="author">
				<u--image shape="circle" :showLoading="true" :src="listItem.hot_comment.user.thumb" width="30px"
					height="30px">
				</u--image>
				<view class="login">{{ listItem.hot_comment.user.login }}:</view>
				<view class="count">{{ listItem.hot_comment.like_count }}赞</view>
			</view>
			<view class="content">{{ listItem.hot_comment.content }}</view>
		</view>

		<view class="tool-bar">
			<view class="left-bar">
				<view class="up">
					<view class="icon" :class="{ active : isUp }" @click.stop="up"></view>
					<view class="num" ref="upNum">{{ listItem.votes.up }}</view>
				</view>
				<view class="down">
					<view class="icon" :class="{ active : isDown }" @click.stop="down"></view>
					<view class="num" ref="downNum">
						{{ listItem.votes.down }}
					</view>
				</view>
			</view>
			<view class="right-bar">
				<view class="comment">
					<view class="icon"></view>
					<view class="num">
						{{
              listItem.comments_count == 0 ? "评论" : listItem.comments_count
            }}
					</view>
				</view>
				<view class="share">
					<view class="icon"></view>
					<view class="num">
						{{ listItem.share_count == 0 ? "分享" : listItem.share_count }}
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
			hotShow: Boolean
		},

		data() {
			return {
				isUp: false,
				isDown: false,
				isFollow: false
			};
		},

		computed: {
			tagIcon() {
				return this.listItem.type == "hot" ? "/static/image/ic_rss_hot.png" :
					listItem.type == "promote" ?
					"/static/image/ic_tag_originality.png" :
					"/static/image/ic_tag_up.png.png"
			},

			tagText() {
				return this.listItem.type == "hot" ?
					"热门" :
					listItem.type == "promote" ?
					"神原创" :
					"神UP"
			},

		},

		methods: {
			follow() {
				let key = 'follow-' + this.listItem.user.id;
				if (this.isFollow) {
					this.isFollow = false
					this.$refs.follow.$el.innerHTML = '关注'
					localStorage.removeItem(key)
				} else {
					this.isFollow = true
					this.$refs.follow.$el.innerHTML = '已关注'
					let value = {
						id: this.listItem.user.id,
						thumb: this.listItem.user.thumb,
						login: this.listItem.user.login
					}
					localStorage[key] = JSON.stringify(value)
				}
			},

			goToArticle() {
				this.$emit("goToArticle", this.listItem.id)
			},

			up() {
				if (this.isFollow) {
					this.isUp = false
					this.$refs.upNum.$el.innerHTML--
				} else {
					this.isUp = true
					this.$refs.upNum.$el.innerHTML++
				}
			},

			down() {
				if (this.isDown) {
					this.isDown = false
					this.$refs.downNum.$el.innerHTML++
				} else {
					this.isDown = true
					this.$refs.downNum.$el.innerHTML--
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.video {
		width: 100%;
	}

	.list-item {
		width: calc(100% - 20px);
		padding: 0 10px;
		border-bottom: 1px solid #eee;

		.hot {
			display: flex;
			align-items: center;
			height: 40px;

			.text {
				margin-left: 5px;
				font-size: 14px;
				color: #ccc;
			}
		}

		.author {
			display: flex;
			align-items: center;
			height: 60px;

			.login {
				font-size: 14px;
				color: #999;
				margin-left: 10px;
			}

			.follow {
				margin-left: auto;
				border-radius: 999px;
				font-size: 12px;
				background-color: #eee;
				padding: 4px 8px;

				&.active {
					background-color: #ffdf33;
				}
			}
		}

		.content {
			line-height: 30px;

			span {
				font-size: 14px;
				font-weight: 700;
				border-radius: 5px;
				margin-right: 5px;
				padding: 0 5px;
				background-color: #ffdf33;
			}
		}

		.attachment {
			width: 100%;

			img {
				width: 100%;
				display: block;
			}
		}

		.image {
			width: 100%;

			img {
				width: 100%;
				display: block;
			}
		}

		.hot-comment {
			background-color: #f7f7f7;
			border-radius: 10px;
			padding: 0 10px;
			margin-top: 10px;

			.author {
				height: 50px;

				.login {
					font-size: 14px;
					color: #999;
				}

				.count {
					margin-left: auto;
					font-size: 14px;
					color: #999;
				}
			}

			.content {
				font-size: 14px;
			}
		}

		.tool-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;

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
				display: flex;

				.up {
					display: flex;
					align-items: center;

					.icon {
						background-image: url(/static/image/operation_support.png);
						background-position: 1px 1px;
						margin-left: -10px;

						&.active {
							background-image: url(/static/image/operation_support_press.png);
							background-position: 0px 0px;
						}
					}
				}

				.down {
					display: flex;
					align-items: center;

					.icon {
						background-image: url(/static/image/operation_unsupport.png);

						&.active {
							background-image: url(/static/image/operation_unsupport_press.png);
						}
					}
				}
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
			}
		}
	}
</style>
