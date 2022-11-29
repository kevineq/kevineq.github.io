<template>
	<view>
		<u-navbar :title="titleList[id]" :autoBack="true" :placeholder="true" height="50">
		</u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleList: ["评论", "收藏", "商城", "任务", "浏览历史"],
				id: null
			}
		},

		onLoad(option) {
			this.id = option.id
		},


		methods: {

		}
	}
</script>

<style>

</style>
