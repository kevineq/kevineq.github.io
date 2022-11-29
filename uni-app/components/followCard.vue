<template>
	<view class="list-item">
		<u--image shape="circle" :showLoading="true" :src="listItem.thumb" width="40px" height="40px">
		</u--image>
		<view class="login">
			{{listItem.login}}
		</view>
		<!-- <view class="follow">已关注</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			listItem: Object,
		},


		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.list-item {
		padding: 0 10px;
		display: flex;
		align-items: center;
		height: 60px;

		.login {
			margin-left: 10px;
		}

		.follow {
			margin-left: auto;
			border-radius: 999px;
			font-size: 12px;
			background-color: #ffdf33;
			padding: 4px 8px;
		}
	}
</style>
