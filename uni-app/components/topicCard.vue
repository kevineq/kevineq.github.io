<template>
	<view class="list-item">
		<u--image radius="10" :showLoading="true" :src="listItem.avatar_urls[0].pic_url" width="50px" height="50px">
		</u--image>
		<view class="info">
			<view class="content">{{ listItem.content }}</view>
			<view class="abstract" v-if="listItem.abstract">
				{{ listItem.abstract }}
			</view>
			<view class="article">
				<view class="text">动态 {{ listItem.all_article_count }}</view>
				<view class="text">今日 {{ listItem.today_article_count }}</view>
			</view>
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
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		height: 80px;
		padding: 0 10px;

		.info {
			width: calc(100% - 60px);
			margin-left: 10px;

			.content {
				height: 20px;
				line-height: 20px;
				font-size: 14px;
			}

			.abstract {
				height: 20px;
				line-height: 20px;
				font-size: 12px;
				color: #999;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.article {
				display: flex;

				.text {
					margin-right: 10px;
					height: 20px;
					line-height: 20px;
					font-size: 13px;
					color: #999;
				}
			}
		}
	}
</style>
