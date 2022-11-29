<template>
	<view>
		<u-navbar title="发帖" :autoBack="true" :placeholder="true" height="50">
			<template #right>
				<view class="post" @click="post">发表</view>
			</template>
		</u-navbar>

		<view class="textarea" ref="textarea" placeholder="分享好玩的事情，和好友一起笑一笑" contenteditable="true" spellcheck="false">
		</view>

		<!-- <textarea placeholder="分享好玩的事情，和好友一起笑一笑" placeholder-style="color: #999"
			v-model="text"></textarea> -->

		<view class="text">
			<view class="text1">#</view>
			<view class="text2">添加社区，被更多好友看到 ~</view>
			<u-icon class="arrow" name="arrow-right" color="#aaa" size="16"></u-icon>
		</view>

		<view class="open">
			<view class="open-icon" :class="{ checked: checked }"></view>
			<view class="open-text">启用匿名</view>
			<switch class="switch" color="#ffdf33" style="transform:scale(0.8)" @change="changeSwitch" />
		</view>

		<view class="icon-list1">
			<view class="icon vedio-icon">
				<view class="texts">视频</view>
			</view>
			<view class="icon pic-icon">
				<view class="texts">图片</view>
			</view>
			<view class="icon face-icon" @click="open">
				<view class="texts">表情</view>
			</view>
		</view>

		<scroll-view class="scrollView" scroll-y="true" v-show="show">
			<view class="icon-list2">
				<view class="icon vedio-icon"></view>
				<view class="icon pic-icon"></view>
				<view class="icon face-icon"></view>
				<u-icon class="close" name="close" color="#000" size="20" @click="close"></u-icon>
			</view>
			<view class="iconBox">
				<view class="icon" v-for="(c, i) in iconArr" :key="c.id" @click="btnIcon(i)">
					<u--image :showLoading="true" :src="c" width="25px" height="25px">
					</u--image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		iconArr
	} from "../../utils/icon.js"

	export default {
		model: {
			event: 'change'
		},

		data() {
			return {
				checked: false,
				text: "",
				show: false,
				iconArr,
			}
		},

		methods: {
			post() {
				if (this.$refs.textarea.$el.innerHTML) {
					localStorage['userPost'] = this.$refs.textarea.$el.innerHTML
				}
			},

			btnIcon(i) {
				// let imgTag = document.createElement("img");
				// imgTag.src = iconArr[i];
				// imgTag.width = 20;
				// imgTag.height = 20;
				// imgTag.style.margin = '0 2px'
				// imgTag.style.transform = 'translateY(4px)'
				// this.$refs.textarea.$el.append(imgTag)
				let imgTag =
					`<img src=${iconArr[i]} style="width: 20px; height: 20px; transform: translateY(2px); padding: 0 1px">`
				document.execCommand("insertHTML", false, imgTag)
			},

			close() {
				this.show = false
			},

			open() {
				this.show = true
			},

			changeSwitch(evt) {
				this.checked = evt.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scrollView {
		height: 260px;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		box-shadow: 0px 1px 10px #ccc;
	}

	.iconBox {
		display: flex;
		flex-wrap: wrap;

		.icon {
			padding: 14px;
		}
	}

	.icon-list2 {
		display: flex;
		padding: 0 20px 0 10px;
		border-bottom: 1px solid #eee;
		height: 50px;
		align-items: center;

		.icon {
			width: 30px;
			height: 30px;
			background-size: 30px 30px;
			background-repeat: no-repeat;
			padding: 0 12px;

			&.vedio-icon {
				background-image: url(/static/image/qiushi_publish_add_video.png);
			}

			&.pic-icon {
				background-image: url(/static/image/qiushi_publish_add_picture.png);
			}

			&.face-icon {
				background-image: url(/static/image/qiushi_publish_add_face.png);
			}
		}

		.close {
			margin-left: auto;
		}
	}

	.post {
		height: 30px;
		line-height: 30px;
		padding: 0 10px;
		font-size: 14px;
		background-color: #ffdf33;
		color: #000;
		border-radius: 5px;
	}

	.publish {
		height: 30px;
		padding: 5px 10px;
		background-color: #eee;
		border-radius: 5px;
		color: #999;
	}

	.textarea {
		width: calc(100% - 20px);
		height: 200px;
		outline: none;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		padding: 10px;

		&:empty:before {
			content: attr(placeholder);
			color: #999;
		}
	}

	.text {
		display: flex;
		align-items: center;
		height: 60px;
		padding: 0 10px;

		.text1 {
			font-size: 30px;
			margin-right: 10px;
			color: #ccc;
		}

		.text2 {
			font-size: 14px;
			color: #999;
		}

		.arrow {
			margin-left: auto;
		}
	}

	.open {
		display: flex;
		align-items: center;
		height: 60px;
		padding: 0 10px;
		height: 60px;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;

		.open-icon {
			width: 30px;
			height: 30px;
			background-size: 30px 30px;
			background-repeat: no-repeat;
			background-image: url(/static/image/qb_icon_publish_not_anonymous.png);

			&.checked {
				background-image: url(/static/image/qb_icon_anonymous_select.png);
			}
		}

		.open-text {
			font-size: 14px;
			margin-left: 10px;
		}

		.switch {
			margin-left: auto;
		}

	}

	.icon-list1 {
		position: fixed;
		display: flex;
		left: 0;
		bottom: 0;
		justify-content: space-around;
		width: 100vw;
		height: 70px;

		.icon {
			position: relative;
			width: 70px;
			height: 70px;
			background-size: 40px 40px;
			background-repeat: no-repeat;
			background-position: center 5px;

			&.vedio-icon {
				background-image: url(/static/image/qiushi_publish_add_video.png);
			}

			&.pic-icon {
				background-image: url(/static/image/qiushi_publish_add_picture.png);
			}

			&.face-icon {
				background-image: url(/static/image/qiushi_publish_add_face.png);
			}

			.texts {
				position: absolute;
				left: 0;
				bottom: 10px;
				width: 100%;
				text-align: center;
				font-size: 13px;
			}
		}
	}
</style>
