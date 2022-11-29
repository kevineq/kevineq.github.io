<template>
	<view class="index">
		<view class="nav">
			<view class="sign">
				<view class="text">签到</view>
			</view>
			<u-tabs :current="currentIndex" :list="titleList" lineWidth="30" lineColor="#ffdf33" :activeStyle="{
				color: '#303133',
				fontWeight: 'bold',
				transform: 'scale(1.1)'
			}" :inactiveStyle="{
				color: '#606266',
				transform: 'scale(1)'
			}" itemStyle="padding-left: 20px; padding-right: 20px; height: 40px;" @click="toggleType1"></u-tabs>
			<view class="post" @click="post"></view>
		</view>

		<swiper class="swiper" :current="currentIndex" @change="toggleType2">
			<swiper-item v-for="(c, i) in contentList" :key="i">
				<scroll-view ref="scrollView" class="scrollView" scroll-y="true" lower-threshold="10"
					refresher-enabled="true" @scrolltolower="scrolltolower" @refresherrefresh="refresherrefresh">

					<view v-if="currentIndex == 2">
						<view class="search">
							<view class="search-box">
								<view class="search-icon"></view>
								<input type="text" v-model="text" placeholder="搜索话题"
									placeholder-style="color: #bbb; fontSize: 14px" @keydown.enter="search"
									style="fontSize: 14px" @input="inputHandle" />
							</view>
							<view class="close"></view>
						</view>

						<view v-if="!show1">
							<u-swiper :list="swiperImageArr" previousMargin="30" nextMargin="30" circular
								:autoplay="true" radius="10" bgColor="#ffffff" height="100">
							</u-swiper>

							<view class="hot-category">
								<view class="title">
									<view class="hot">热门分类</view>
									<view class="more">更多</view>
									<u-icon class="arrow" name="arrow-right" color="#aaa" size="13"></u-icon>
								</view>

								<view class="category-list">
									<view class="list-item" v-for="h in hotList" :key="h.id">
										{{ h.name }}
									</view>
								</view>
							</view>
						</view>

						<view class="new">{{show1 ? '搜索结果' : '最新更新'}}</view>
						<view v-if="show1">
							<view v-for="s in searchList" :key="s.id">
								<topicCard :listItem="s" />
							</view>
						</view>
					</view>

					<view v-for="item in c.list" :key="item.id">
						<discoverCard :listItem="item" v-if="currentIndex == 0" />
						<communityCard :listItem="item" v-if="currentIndex == 1" />
						<topicCard :listItem="item" v-if="currentIndex == 2 && !show1" />
					</view>

					<u-loading-icon mode="circle" :show="show" size="30" color="#000"></u-loading-icon>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import discoverCard from "components/discoverCard.vue"
	import communityCard from "components/communityCard.vue"
	import topicCard from "components/topicCard.vue"

	export default {
		data() {
			return {
				titleList: [{
						name: "附近",
						address: "circle/nearby/list"
					},
					{
						name: "社区",
						address: "topic/all/list"

					},
					{
						name: "话题",
						address: "topic/latest"
					},
				],
				currentIndex: 0,
				activeIndexArr: [],
				contentList: [{
						list: [],
					},
					{
						list: [],
					},
					{
						list: [],
					},
				],
				show: false,
				page: 0,
				text: '',
				swiperImageArr: [
					'/static/image/circle_topic_default_bg3.png',
					'/static/image/circle_topic_default_bg4.png',
					'/static/image/circle_topic_default_bg5.png'
				],
				hotList: [],
				page1: null,
				show1: false,
				searchList: []
			}
		},

		onLoad() {
			this.getData(this.currentIndex)
		},

		methods: {
			inputHandle(evt) {
				if (!evt.detail.value) {
					this.show1 = false
				}
			},

			search() {
				if (!this.text) {
					return
				}
				this.show = true
				this.show1 = true
				this.page1 == 1
				uni.request({
					url: `https://apis.netstart.cn/qiushi/article/topic/search?page=1&keyword=${this.text}`,
					success: (res) => {
						console.log(res.data)
						this.searchList = res.data.data
						this.$nextTick(() => {
							this.show = false
						})
					}
				});
			},

			post() {
				uni.navigateTo({
					url: `/pages/post/post`
				});
			},

			refresherrefresh() {
				this.page++
				this.$refs.scrollView[this.currentIndex].refresherTriggered = true
				let address = this.titleList[this.currentIndex].address
				uni.request({
					url: `https://apis.netstart.cn/qiushi/${address}?page=${this.page}${this.currentIndex == 0 ? '&latitude=23.33&longitude=113.33' : ''}`,
					success: (res) => {
						console.log(res.data.data)
						this.contentList[this.currentIndex].list = res.data.data
						this.$nextTick(() => {
							this.$refs.scrollView[this.currentIndex].refresherTriggered = false
						})
					}
				});
			},

			scrolltolower() {
				if (this.show) {
					return
				}
				this.getData(this.currentIndex)
			},

			getData(i) {
				this.page++
				console.log(this.page)
				this.show = true
				let address = this.titleList[i].address
				if (i == 2) {
					uni.request({
						url: `https://apis.netstart.cn/qiushi/category/hot`,
						success: (res) => {
							console.log(res.data)
							this.hotList = res.data.categories
						}
					});
				}
				uni.request({
					url: `https://apis.netstart.cn/qiushi/${address}?page=${this.page}${this.currentIndex == 0 ? '&latitude=23.33&longitude=113.33' : ''}`,
					success: (res) => {
						console.log(res.data.data)
						this.contentList[i].list = [...this.contentList[i].list, ...res.data.data]
						this.$nextTick(() => {
							this.show = false
						})
					}
				});
				if (this.activeIndexArr.indexOf(i) > -1) {
					return
				}
				this.activeIndexArr.push(i)
			},

			toggleType1(evt) {
				if (this.currentIndex == evt.index) {
					return
				}
				this.currentIndex = evt.index
			},

			toggleType2(evt) {
				this.currentIndex = evt.detail.current
				let i = this.activeIndexArr.indexOf(this.currentIndex)
				console.log(i)
				if (i > -1) {
					return
				}
				this.getData(this.currentIndex)
			}
		},
		components: {
			discoverCard,
			communityCard,
			topicCard
		}
	}
</script>

<style lang="scss" scoped>
	.u-swiper {
		margin: 15px 0;
	}

	.swiper {
		height: calc(100vh - 90px);
	}

	.scrollView {
		height: calc(100vh - 90px);
	}

	.nav {
		width: calc(100vw - 20px);
		height: 50px;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;

		.sign {
			position: relative;
			width: 60px;
			height: 30px;
			background-size: 60px 30px;
			background-repeat: no-repeat;
			background-image: url(/static/image/qb_sign_gold_coin_1.png);

			.text {
				position: absolute;
				right: 6px;
				top: 50%;
				transform: translateY(-50%);
				font-size: 12px;
			}
		}

		.post {
			width: 60px;
			height: 30px;
			background-size: 60px 30px;
			background-repeat: no-repeat;
			background-image: url(/static/image/ic_circle_create_article.png);
		}
	}

	.search {
		display: flex;
		align-items: center;
		padding: 0 10px;

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
			width: 26px;
			height: 26px;
			background-size: 26px 26px;
			background-repeat: no-repeat;
			background-image: url(/static/image/img/ic_black_room.png);
			margin-left: 10px;
		}
	}

	.hot-category {
		padding: 5px 10px 0 10px;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;

		.title {
			display: flex;
			align-items: center;
			height: 30px;

			.hot {
				font-size: 14px;
			}

			.more {
				margin-left: auto;
				font-size: 13px;
				color: #aaa;
			}
		}

		.category-list {
			display: flex;
			align-items: center;
			height: 50px;

			.list-item {
				padding: 5px 10px;
				color: #999;
				background-color: #f4f4f4;
				font-size: 13px;
				margin-right: 10px;
				border-radius: 5px;
			}
		}
	}

	.new {
		padding: 10px 10px 0 10px;
		font-size: 14px;
	}
</style>
