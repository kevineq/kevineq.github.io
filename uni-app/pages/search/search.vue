<template>
	<view>
		<view class="search">
			<view class="search-box">
				<view class="search-icon"></view>
				<input type="text" v-model="text" placeholder="搜索" placeholder-style="color: #bbb; fontSize: 14px"
					@keydown.enter="search" style="fontSize: 14px" />
			</view>
			<view class="close" @click="close">取消</view>
		</view>
		<scroll-view ref="scrollView" class="scrollView" scroll-y="true" lower-threshold="10"
			@scrolltolower="scrolltolower">
			<view v-for="c in contentList" :key="c.id">
				<topicCard :listItem="c" />
			</view>
			<u-loading-icon mode="circle" :show="show" size="30" color="#000"></u-loading-icon>
		</scroll-view>

	</view>
</template>

<script>
	import topicCard from "components/topicCard.vue"

	export default {
		data() {
			return {
				page: null,
				text: '',
				contentList: [],
				show: false,
				more: true,
				go: -1
			}
		},
		methods: {
			scrolltolower() {
				if (!this.more) {
					return
				}
				this.show = true
				this.page++
				uni.request({
					url: `https://apis.netstart.cn/qiushi/article/topic/search?page=${this.page}&keyword=${this.text}`,
					success: (res) => {
						console.log(res.data)
						this.more = res.data.has_more
						this.contentList = [...this.contentList, ...res.data.data]
						this.$nextTick(() => {
							this.show = false
						})
					}
				});
			},

			close() {
				uni.navigateBack(this.go)
			},

			search() {
				if (!this.text) {
					return
				}
				this.go = -2
				this.show = true
				this.page = 1
				uni.request({
					url: `https://apis.netstart.cn/qiushi/article/topic/search?page=1&keyword=${this.text}`,
					success: (res) => {
						console.log(res.data)
						this.contentList = res.data.data
						this.$nextTick(() => {
							this.show = false
						})
					}
				});
			}
		},

		components: {
			topicCard
		}
	}
</script>

<style lang="scss" scoped>
	.scrollView {
		height: calc(100vh - 50px);
	}

	.search {
		display: flex;
		align-items: center;
		padding: 0 10px;
		height: 50px;

		.search-box {
			height: 30px;
			flex: 1;
			background-color: #f7f7f7;
			display: flex;
			align-items: center;
			border-radius: 10px;
			padding: 0 10px;

			.search-icon {
				width: 16px;
				height: 16px;
				background-size: 16px 16px;
				background-repeat: no-repeat;
				background-image: url(/static/image/img/ic_search_input.png);
				margin-right: 5px;
			}
		}

		.close {
			font-size: 14px;
			font-weight: 600;
			margin-left: 10px;
		}
	}
</style>
