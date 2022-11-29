<template>
	<view class="list-item">
		<view class="author">
			<u--image radius="10" :showLoading="true" :src="listItem.avatar" width="40px" height="40px">
			</u--image>
			<view class="info">
				<view class="content">{{ listItem.content }}</view>
				<view class="desc">
					<view class="article">帖子 {{ listItem.counter.article_count }}</view>
					<view class="view">浏览 {{ listItem.counter.view_count }}</view>
				</view>
			</view>
			<view class="follow">关注</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			listItem: Object,
		},
	};
</script>

<style lang="scss" scoped>
	.list-item {
		width: calc(100% - 20px);
		padding: 0 10px;
		border-bottom: 1px solid #eee;

		.author {
			display: flex;
			align-items: center;
			height: 70px;

			.info {
				width: calc(100% - 100px);
				margin-left: 10px;
			}

			.content {
				height: 20px;
				line-height: 20px;
				font-size: 14px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.desc {
				display: flex;

				.article,
				.view {
					height: 20px;
					line-height: 20px;
					font-size: 13px;
					color: #999;
					margin-right: 10px;
				}
			}

			.follow {
				margin-left: auto;
				border-radius: 999px;
				font-size: 12px;
				background-color: #ffdf33;
				padding: 4px 8px;
			}
		}
	}
</style>
