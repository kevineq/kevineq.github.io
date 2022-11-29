<template>
	<view>
		<u-navbar :title="titleList[id].name" :autoBack="true" :placeholder="true" height="50">
		</u-navbar>

		<u-swipe-action>
			<view class="item" v-for="(c, i) in contentList" :key="c.id" ref="item">
				<u-swipe-action-item :options="options1" @click="btn(i)">
					<followCard :listItem="c" class="animate__animated animate__bounce" />
				</u-swipe-action-item>
			</view>
		</u-swipe-action>
	</view>
</template>

<script>
	import followCard from "components/followCard.vue"

	export default {
		data() {
			return {
				titleList: [{
					name: '我的点赞',
					type: 'like'
				}, {
					name: '我的评论',
					type: 'comment'
				}, {
					name: '我的关注',
					type: 'follow'
				}],
				id: null,
				contentList: [],
				options1: [{
					text: '取消关注'
				}]
			}
		},

		onLoad(option) {
			this.id = option.id
		},

		onShow() {
			this.getData()
		},

		methods: {
			btn(i) {
				let key = 'follow-' + this.contentList[i].id;
				// localStorage.removeItem(key)
				this.$refs.item[i].$el.style.transform = 'translateX(100%)'
				this.$refs.item[i].$el.style.transition = 'all .5s linear'
				setTimeout(() => {
					this.$refs.item[i].$el.remove()
				}, 500)
			},

			getData() {
				let keyArr = []
				for (let i = 0; i < localStorage.length; i++) {
					let key = localStorage.key(i);
					if (key.slice(0, 6) == this.titleList[this.id].type) {
						keyArr.push(key);
					}
				}
				let dataArr = []
				for (let j = 0; j < keyArr.length; j++) {
					let data = JSON.parse(localStorage[keyArr[j]]);
					dataArr.push(data);
				}
				this.contentList = dataArr;
			}
		},


		components: {
			followCard
		}
	}
</script>

<style>
</style>
