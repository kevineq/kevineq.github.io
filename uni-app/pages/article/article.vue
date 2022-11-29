<template>
	<view>
		<u-navbar title="趣闻" :autoBack="true" :placeholder="true" height="50">
		</u-navbar>
		<scroll-view scroll-y="true" class="scrollView">
			<contentCard :listItem="article" :hotShow="false" />
			<view v-if="hotCommentList.length">
				<view class="hotTitle">
					热门评论{{hotCommentList.length}}
				</view>
				<view v-for="h in hotCommentList" :key="h.id">
					<commentCard :listItem="h" />
				</view>
			</view>
			<view v-if="commentList.length">
				<view class="hotTitle">
					最新评论{{commentList.length}}
				</view>
				<view v-for="c in commentList" :key="c.id">
					<commentCard :listItem="c" />
				</view>
			</view>
			<view class="show" v-if="!more">
				已显示全部评论
			</view>
		</scroll-view>


		<view class="comment1">
			<u-notice-bar class="notice" :text="text1" direction="column" color="#000" bgColor="#f7f7f7" icon=""
				duration="3000" @click="btnNotice">
			</u-notice-bar>
			<view class="icon-list">
				<view class="icon" v-for="i in 4" :key="i">
				</view>
			</view>
		</view>

		<u-popup :show="show1" mode="bottom" @close="close" overlayOpacity="0">
			<view class="box">
				<view class="input-box">
					<view class="textarea" ref="textarea" placeholder="优质的评论将展示在前排哦" contenteditable="true"
						spellcheck="false">
					</view>
					<view class="post" @click="post">发表</view>
				</view>
				<view class="icon-list2">
					<view class="icon-item" v-for="(c, i) in iconText" :key="i" @click="btnIcon(c.type)">
						<view class="icon2" :class="{active: c.type == iconType}"></view>
						<view class="icon2-text">
							{{c.name}}
						</view>
					</view>
				</view>
				<scroll-view class="text1-list" scroll-y="true" v-if="iconType == 'hot'">
					<view class="text1-item" v-for="t in text1" @click="btnHot(t)">
						{{t}}
					</view>
				</scroll-view>
				<scroll-view class=" text2-list" scroll-y="true" v-if="iconType == 'emoji'">
					<view class="iconBox">
						<view class="icon" v-for="(c, i) in iconArr" :key="c.id" @click="btnEmoji(i)">
							<u--image :showLoading="true" :src="c" width="25px" height="25px">
							</u--image>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import contentCard from "components/contentCard.vue"
	import commentCard from "components/commentCard.vue"
	import {
		iconArr
	} from "../../utils/icon.js"

	export default {
		data() {
			return {
				show: false,
				id: null,
				article: {},
				commentList: [],
				hotCommentList: [],
				more: true,
				text1: [
					'伤害性不大，侮辱性极强!',
					'我受过专业训练，一般不会笑，除非忍不住',
					'我单方面宣布，你就是神评!',
					'来人，给秀儿盖戳!',
					'吊钱没有，吊图一堆',
					'我单方面宣布，你就是神评!'
				],
				show1: false,
				iconText: [{
					name: '热词',
					type: 'hot'
				}, {
					name: '表情',
					type: 'gif'
				}, {
					name: 'Emoji',
					type: 'emoji'
				}, {
					name: '图片',
					type: 'img'
				}],
				iconType: 'hot',
				iconArr
				// page: 0
			}
		},

		onLoad(option) {
			this.id = option.id
			this.getData()
		},

		methods: {
			post() {
				if (this.$refs.textarea.$el.innerHTML) {
					this.commentList.unshift({
						user: {
							thumb: '/static/image/user.png',
							login: 'Kevin'
						},
						ip_location: '广东',
						like_count: 0,
						content: this.$refs.textarea.$el.innerHTML,
					})
					this.show1 = false
				}
			},

			btnHot(t) {
				document.execCommand("insertHTML", false, t)
			},

			btnEmoji(i) {
				let imgTag =
					`<img src=${iconArr[i]} style="width: 20px; height: 20px; transform: translateY(2px); padding: 0 1px">`
				document.execCommand("insertHTML", false, imgTag)
			},

			btnIcon(type) {
				this.iconType = type
			},

			close() {
				this.show1 = false
			},

			btnNotice() {
				this.show1 = true
			},

			getData() {
				this.show = true
				uni.request({
					url: `https://apis.netstart.cn/qiushi/article/${this.id}/comment/list?page=1`,
					success: (res) => {
						console.log(res.data)
						this.more = res.data.has_more
						this.article = res.data.article
						this.hotCommentList = res.data.hot_comments
						this.commentList = res.data.items;
						this.$nextTick(() => {
							this.show = false
						})
					},
				});
			},
		},

		components: {
			contentCard,
			commentCard
		}
	}
</script>

<style lang="scss" scoped>
	.text1-list {
		padding: 0 10px;
		width: calc(100vw - 20px);
		height: 210px;

		.text1-item {
			width: 100%;
			height: 40px;
			line-height: 40px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			border-bottom: 1px solid #eee;
			font-size: 14px;
		}
	}

	.text2-list {
		height: 210px;

		.iconBox {
			display: flex;
			flex-wrap: wrap;

			.icon {
				padding: 14px;
			}
		}

	}

	.box {
		box-shadow: 0px 1px 10px #ccc;

		.input-box {
			display: flex;
			align-items: center;
			padding: 10px;

			.textarea {
				width: calc(100vw - 100px);
				outline: none;
				padding: 5px 10px;
				font-size: 14px;
				background-color: #f7f7f7;
				border-radius: 5px;

				&:empty:before {
					content: attr(placeholder);
					color: #999;
				}
			}

			.post {
				padding: 4px 10px;
				font-size: 14px;
				background-color: #ffdf33;
				color: #000;
				border-radius: 5px;
				margin-left: 10px;
			}
		}

		.icon-list2 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;

			.icon-item {
				display: flex;
				align-items: center;

				.icon2 {
					width: 30px;
					height: 30px;
					background-size: 30px 30px;
				}

				.icon2-text {
					font-size: 14px;
				}
			}

			.icon-item:nth-child(1) .icon2 {
				background-image: url(/static/image/im_ic_send_word.png);

				&.active {
					background-image: url(/static/image/im_ic_send_word_select.png);
				}
			}

			.icon-item:nth-child(2) .icon2 {
				background-image: url(/static/image/im_ic_send_gif.png);

				&.active {
					background-image: url(/static/image/im_ic_send_gif_select.png);
				}
			}

			.icon-item:nth-child(3) .icon2 {
				background-image: url(/static/image/im_ic_send_emotion.png);

				&.active {
					background-image: url(/static/image/im_ic_send_emotion_light_select.png);
				}
			}

			.icon-item:nth-child(4) .icon2 {
				background-image: url(/static/image/im_ic_send_image.png);

				&.active {
					background-image: url(/static/image/im_ic_send_image_impress.png);
				}
			}

		}
	}

	.scrollView {
		height: calc(100vh - 100px);
	}

	.hotTitle {
		padding: 10px 10px 0 10px;
		font-size: 14px;
	}

	.show {
		text-align: center;
		font-size: 14px;
		color: #999;
		padding: 30px 0;
	}

	.comment1 {
		position: fixed;
		display: flex;
		left: 0;
		bottom: 0;
		height: 50px;
		align-items: center;
		padding-left: 10px;
		background-color: #fff;
		box-shadow: 0px 1px 10px #ccc;

		.notice {
			width: 50vw;
			border-radius: 10px;
		}

		.icon-list {
			width: calc(50vw - 34px);
			display: flex;
			justify-content: space-evenly;

			.icon {
				width: 30px;
				height: 30px;
				background-size: 30px 30px;
			}

			.icon:nth-child(1) {
				background-image: url(/static/image/im_ic_send_word.png);
			}

			.icon:nth-child(2) {
				background-image: url(/static/image/im_ic_send_gif.png);
			}

			.icon:nth-child(3) {
				background-image: url(/static/image/im_ic_send_emotion.png);
			}

			.icon:nth-child(4) {
				background-image: url(/static/image/im_ic_send_image.png);
			}
		}
	}
</style>
