<template>
	<view class="index">
		<view class="header">
			<view class="sign">
				<view class="text" @click="sign">签到</view>
			</view>
			<view class="search" @click="search">搜索趣闻</view>
			<view class="post" @click="post"></view>
		</view>

		<u-popup :show="showPopup" round="10" mode="center" @close="close">
			<view class="box">
				<uni-calendar class="calendar" :selected="infoArr" @change="changeCalendar" :lunar="true"
					start-date="'2022-1-1'" :end-date="endDate" />
			</view>
		</u-popup>

		<u-tabs :current="currentIndex" :list="titleList" lineWidth="30" lineColor="#ffdf33" :activeStyle="{
            color: '#303133',
            fontWeight: 'bold',
            transform: 'scale(1.1)'
        }" :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)'
        }" itemStyle="padding-left: 32px; padding-right: 32px; height: 40px;" @click="toggleType1"></u-tabs>

		<swiper :current="currentIndex" @change="toggleType2">
			<swiper-item v-for="(c, i) in contentList" :key="i">
				<scroll-view ref="scrollView" class="scrollView" scroll-y="true" lower-threshold="10"
					refresher-enabled="true" @scrolltolower="scrolltolower" @refresherrefresh="refresherrefresh">
					<view v-for="item in c.list" :key="item.id">
						<contentCard :listItem="item" :hotShow="true" @goToArticle="goToArticle" />
					</view>
					<u-loading-icon mode="circle" :show="show" size="30" color="#000"></u-loading-icon>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import contentCard from "components/contentCard.vue"



	export default {
		data() {
			return {
				titleList: [{
						name: "推荐",
						address: "newlist",
					},
					{
						name: "视频",
						address: "list/video",
					},
					{
						name: "图文",
						address: "list/imgrank",
					},
					{
						name: "精选",
						address: "follow/list",
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
					{
						list: [],
					}
				],
				show: false,
				showPopup: false,
				infoArr: [],
				endDate: new Date().toLocaleDateString().split('/').join('-'),
				extraSign: {
					date: '',
					info: true
				}
			}
		},

		onLoad() {
			this.getInfo()
			this.getData(this.currentIndex)
		},

		onShow() {
			this.getUserPost()
		},

		methods: {
			getInfo() {
				if (localStorage['userSign']) {
					this.infoArr = JSON.parse(localStorage['userSign'])
				}
				if (localStorage['userExtraSign']) {
					let extraSign = JSON.parse(localStorage['userExtraSign'])
					let date = new Date().toLocaleDateString().split('/').join('-')
					console.log(extraSign.date, date)
					if (extraSign.date != date) {
						extraSign.info = true
					}
					this.extraSign = extraSign
				}
			},

			changeCalendar(evt) {
				if (evt.fulldate == this.endDate) {
					this.infoArr.push({
						date: evt.fulldate,
						info: '签到'
					})
					localStorage['userSign'] = JSON.stringify(this.infoArr)
				}
				if (evt.fulldate != this.endDate && this.extraSign.info) {
					let date = new Date().toLocaleDateString().split('/').join('-')
					this.infoArr.push({
						date: evt.fulldate,
						info: '补签'
					})
					this.extraSign = {
						date,
						info: false
					}
					localStorage['userSign'] = JSON.stringify(this.infoArr)
					localStorage['userExtraSign'] = JSON.stringify(this.extraSign)
				}
			},

			close() {
				this.showPopup = false
			},

			sign() {
				this.showPopup = true
			},

			getUserPost() {
				if (localStorage['userPost']) {
					this.contentList[0].list.unshift({
						user: {
							thumb: '/static/image/user.png',
							login: 'Kevin'
						},
						content: localStorage['userPost'],
						votes: {
							up: 0,
							down: 0
						},
						comments_count: 0,
						share_count: 0
					})
				}
				this.$nextTick(() => {
					localStorage.removeItem('userPost')
				})
			},

			goToArticle(id) {
				uni.navigateTo({
					url: `/pages/article/article?id=${id}`
				});
			},

			search() {
				uni.navigateTo({
					url: `/pages/search/search`
				});
			},

			post() {
				uni.navigateTo({
					url: `/pages/post/post`
				});
			},

			refresherrefresh() {
				this.$refs.scrollView[this.currentIndex].refresherTriggered = true
				let newId = new Date().getTime()
				let address = this.titleList[this.currentIndex].address
				uni.request({
					url: `https://apis.netstart.cn/qiushi/article/${address}?new=${newId}`,
					success: (res) => {
						console.log(res.data)
						this.contentList[this.currentIndex].list = res.data.items
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
				this.show = true
				let newId = new Date().getTime()
				let address = this.titleList[i].address
				uni.request({
					url: `https://apis.netstart.cn/qiushi/article/${address}?new=${newId}`,
					success: (res) => {
						console.log(res.data)
						this.contentList[i].list = [...this.contentList[i].list, ...res.data.items]
						this.$nextTick(() => {
							this.show = false
						})
					},
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
			contentCard
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 98vw;
		height: 400px;
		border-radius: 10px;

		.calendar {
			width: 94vw;
			margin: 0 auto;
		}
	}

	swiper {
		height: calc(100vh - 145px);
	}

	.scrollView {
		height: calc(100vh - 145px);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		padding: 5px 10px;

		.sign {
			position: relative;
			width: 60px;
			height: 30px;
			background-size: 60px 30px;
			background-repeat: no-repeat;
			background-image: url(/static/image/qb_sign_gold_coin_1.png);
			margin-right: 15px;

			.text {
				position: absolute;
				right: 6px;
				top: 50%;
				transform: translateY(-50%);
				font-size: 12px;
			}
		}

		.search {
			flex: 1;
			height: 30px;
			line-height: 30px;
			background-size: 14px 14px;
			background-repeat: no-repeat;
			background-position: 10px center;
			background-image: url(/static/image/ic_search_input.png);
			text-align: center;
			font-size: 14px;
			color: #ccc;
			background-color: #f7f7f7;
			border-radius: 20px;
		}

		.post {
			width: 60px;
			height: 30px;
			background-size: 60px 30px;
			background-repeat: no-repeat;
			background-image: url(/static/image/ic_qiushi_create_article.png);
			margin-left: 15px;
		}
	}
</style>
