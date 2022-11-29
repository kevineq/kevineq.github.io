<script setup lang="ts">
import { Api } from "@/apis"
import { ref, computed, onActivated, nextTick } from 'vue'
import { getDate } from '@/utils/date-tools'
import canlerdar from 'solarday2lunarday'
import type { ArticleState, ArticleDetail, CommentItem } from "@/typings";
import { useRouter } from "vue-router";
import { useArticleStore } from '@/stores/article'
import { storeToRefs } from 'pinia'
import CommentCard from '@/components/CommentCard.vue';
import { useThemeStore } from '@/stores/theme'

const store = useThemeStore()
const { theme } = storeToRefs(store)

const router = useRouter()

const props = defineProps<{
    id: string
}>()

const article = useArticleStore()

const { articleId } = storeToRefs(article)

const { setArticleId } = article

const ArticleDetail = ref<ArticleDetail>()
const ArticleState = ref<ArticleState>()
const CommentList = ref<CommentItem[]>([])

const scroll = ref(0)

const view = ref<HTMLElement>();

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)

const isShow = ref<boolean>(true)

const showPopup1 = () => {
    show1.value = true
}

const showPopup2 = () => {
    show2.value = true
}

const text = ref<string>('')

const textCount = computed(() => {
    return 500 - text.value.length;
})

const bgColor = computed(() => {
    return text.value.length > 0 ? "#c49f6a" : "#ccc";
})

const submit = () => {
    if (!text.value) {
        return
    }
    CommentList.value.unshift({
        id: '0',
        content: text.value,
        user: {
            id: '0',
            nickname: 'Kevin',
            avatar: 'http://pics.tide.moreless.io/fetch_avatars/FkPZp3bYPK2FS9I24UyLUrMo8x6d',
        },
        like_count: 0,
        sub_comment_count: 0
    })
    text.value = ''
    show1.value = false
    isShow.value = false
}


const scrollhandle = () => {
    if (view.value?.scrollTop) {
        scroll.value = view.value.scrollTop
    }
}

const getArticleDetail = async () => {
    setArticleId(props.id)
    let data1 = await Api.getArticlDetail(props.id)
    console.log(data1)
    ArticleDetail.value = data1.data
    let data2 = await Api.getArticleState(props.id)
    console.log(data2)
    ArticleState.value = data2.data
    let data3 = await Api.getCommentList(props.id)
    console.log(data3)
    CommentList.value = data3.data
}

const dateObj2 = ref()

const dateObj1 = computed(() => {
    if (ArticleDetail.value?.date_by_day) {
        let date = getDate(ArticleDetail.value.date_by_day)
        dateObj2.value = canlerdar.solar2lunar(date)
    }
})

const back1 = () => {
    router.go(-1)
}

const back2 = () => {
    show2.value = false
}

const headOpacity = computed(() => {
    let opacity = Math.floor((scroll.value / 300) * 100) / 100;
    opacity = opacity >= 1 ? 1 : opacity;
    return opacity;
})

const headColor = computed(() => {
    let opacity = headOpacity.value >= 0.6 ? 0.6 : headOpacity.value;
    if (theme.value) {
        return `rgba(0,0,0,${opacity})`;
    } else {
        return `rgba(255,255,255,${opacity})`;
    }
})

const color = computed(() => {
    return theme.value ? '#fff' : "#000"
})

const date = computed(() => {
    return new Date().toLocaleDateString()
})

onActivated(() => {
    if (props.id === articleId.value) {
        return
    } else {
        ArticleDetail.value = undefined
        ArticleState.value = undefined
        getArticleDetail()
    }
})
</script>


<template>
    <div class="view relative bg-white dark:bg-color5 dark:text-gray-300" ref="view" @scroll.passive="scrollhandle"
        v-if="ArticleDetail">
        <div class="fixed flex top-0 left-0 px-4 h-16 w-screen justify-between items-center"
            :style="{ backgroundColor: headColor }">
            <van-icon name="arrow-left" size="20" @click="back1" />
            <div class="text-sm" :style="{ opacity: headOpacity }">
                <div class="">{{ ArticleDetail?.title }}</div>
                <div>{{ dateObj2?.fullLunarMonthString }}</div>
            </div>
        </div>

        <div class="absolute top-16 right-5 w-12 flex">
            <div class="w-6">{{ dateObj2?.fullLunarMonthString }}</div>
            <div class="w-6 text-2xl">{{ ArticleDetail?.title }}</div>
        </div>
        <div class="text-justify mt-72 px-5 leading-8">{{ ArticleDetail?.article }}</div>
        <div class="mx-3 text-gray-400 mt-6">《{{ ArticleDetail?.provenance
        }}》{{ ArticleDetail?.author.name }}</div>

        <div class="mx-5 border-t border-solid border-gray-200 my-5"></div>

        <div class="font-semibold h-10 leading-10 px-4">想法</div>
        <div class="flex items-center h-16 text-gray-400 px-7" v-if="isShow">
            <img src="http://pics.tide.moreless.io/fetch_avatars/FkPZp3bYPK2FS9I24UyLUrMo8x6d"
                class="w-8 h-8 rounded-full mr-2">
            <div @click="showPopup1">写点什么吧...</div>
        </div>

        <div class="mb-32">
            <div v-for="c in CommentList.slice(0, 3)" :key="c.id">
                <CommentCard :CommentItem="c" />
            </div>
            <div class="count px-4 font-semibold" @click="showPopup2">全部{{ CommentList.length }}条想法</div>
        </div>

        <div
            class="bottom fixed bottom-0 flex shadow-xx dark:shadow-zz items-center w-screen h-14 bg-white dark:bg-color5 px-4">
            <van-icon name="comment-o" size="20" class="mr-1" /> {{ ArticleState?.comment_count }}
            <van-icon name="like-o" size="20" class="ml-5 mr-1" /> {{ ArticleState?.favourite_count }}
            <van-icon name="share-o" size="20" class="ml-auto" />
        </div>

        <van-popup v-model:show="show1" position="center" class=" w-5/6 rounded-2xl ">
            <div class="bg-white px-5 pb-5">
                <div class="flex h-20 items-center text-sm ">
                    <img src="http://pics.tide.moreless.io/fetch_avatars/FkPZp3bYPK2FS9I24UyLUrMo8x6d"
                        class="w-8 h-8 rounded-full mr-3">
                    <div>
                        <div>Kevin</div>
                        <div class="text-gray-400">{{ date }}</div>
                    </div>
                </div>
                <textarea placeholder="写点什么吧..." v-model="text"></textarea>
                <div class="flex justify-between items-center">
                    <div class="text-gray-400">{{ textCount }}</div>
                    <div class="text-sm px-4 py-1.5 rounded-full text-white" :style="{ backgroundColor: bgColor }"
                        @click="submit">
                        发送
                    </div>
                </div>
            </div>

        </van-popup>

        <van-popup v-model:show="show2" position="top" class="w-screen h-screen overflow-auto dark:bg-color5">
            <van-nav-bar fixed class="dark:bg-color5">
                <template #left>
                    <van-icon name="arrow-left" size="20" @click="back2" :color="color" />
                </template>
                <template #title>
                    <div class="dark:text-gray-300">{{ ArticleDetail?.title }}</div>
                    <div class="text-xs dark:text-gray-300 text-gray-500">{{ CommentList.length }}个想法</div>
                </template>
                <template #right>
                    <van-icon name="ellipsis" size="22" :color="color" />
                </template>
            </van-nav-bar>

            <div class="mt-16">
                <div v-for="c in CommentList" :key="c.id">
                    <CommentCard :CommentItem="c" class="card bg-white dark:bg-color5" />
                </div>
            </div>

            <div class="fixed bottom-5 right-5" @click="showPopup1">
                <van-icon name="add" size="40" />
            </div>
        </van-popup>
    </div>
</template>

<style lang="scss" scoped>
.view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    z-index: 20;
    --van-popup-background-color: #cacfd5;
    --van-nav-bar-background-color: #cacfd5;
}

// .bottom {
//     box-shadow: 0px -1px 10px #eee;
// }

textarea {
    width: 100%;
    height: 200px;
    border: none;
    padding: 0;
    overflow: auto;
}

textarea::-webkit-input-placeholder {
    color: #999;
    font-size: 14px;
}

.count {
    color: #c49f6a;
}

.card {
    width: 90%;
    border-radius: 10px;
    margin: 0 auto;
    margin-bottom: 20px;
    padding: 10px;
}
</style>


