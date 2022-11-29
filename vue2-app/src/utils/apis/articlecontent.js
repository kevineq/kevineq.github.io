export const titleTypes = {
    0: "图文",
    1: "阅读",
    2: "连载",
    3: "问答",
    4: "音乐",
    5: "影视",
    8: "电台",
    // 阅读1、问答3、音乐4 、影视5、电台8、连载2
};

export const categoryNames = {
    0: "hp", // "图文"
    1: "essay", // "阅读"
    2: "serialcontent", // "连载"
    3: "question", //"问答"
    4: "music", //"音乐"
    5: "movie", // "影视"
    8: "radio", // "电台"
}

export const categoryNamess = {
    0: "hp", // "图文"
    1: "essay", // "阅读"
    2: "serial", // "连载"
    3: "question", //"问答"
    4: "music", //"音乐"
    5: "movie", // "影视"
    8: "radio", // "电台"
}

export const titleCategory = {
    "图文": 0,
    "阅读": 1,
    "连载": 2,
    "问答": 3,
    "音乐": 4,
    "影视": 5,
    "电台": 8,
};

export const titleIndexs = {
    "hp": 0,
    "essay": 1,
    "serialcontent": 2,
    "question": 3,
    "music": 4,
    "movie": 5,
    "radio": 8,
};

export const collectTypes = {
    0: "hp", // "图文"
    1: "article", // "文章"
    2: "music", //"音乐"
    3: "movie", // "影视"
    4: "radio", // "电台"
};

export const contentTypes = {
    0: "follow", // "我的关注"
    1: "playlist", // "歌单"
    2: "contribute", //"投稿"
    3: "set", // "设置"
};

// 推荐列表
export const getHomeData = ({
    axios,
    date
}) => {
    return axios.get(`https://apis.netstart.cn/one/channel/one/${date}`)
    // return axios.get('/data.json?date=' + date)
}

// 图文详情
export const getHpDetail = ({
    axios,
    date
}) => {
    return axios.get(`https://apis.netstart.cn/one/hp/bydate/${date}`)
}

// 文章详情 API
export const getArticleDetail = ({
    axios,
    category,
    id,
}) => {
    let categoryName = categoryNames[category]
    if (!categoryName) {
        console.error('未知的分类类型:', category)
        return
    }
    return axios.get(`https://apis.netstart.cn/one/${categoryName}/htmlcontent/${id}`)
    // return axios.get('/detail.json?id=' + id)
}

// 文章相关评论详情 API
export const getArticleRatings = ({
    axios,
    category,
    id,
}) => {
    let categoryName = categoryNamess[category]
    if (!categoryName) {
        console.error('未知的分类类型:', category)
        return
    }
    return axios.get(`https://apis.netstart.cn/one/comment/praiseandtime/${categoryName}/${id}/0`)
}

// 文章列表
export const getArticleList = ({
    axios,
    category,
    date,
}) => {
    return axios.get(`https://apis.netstart.cn/one/find/bymonth/${category}/${date}`)
}

// 专题列表
export const getBannerList = ({
    axios,
}) => {
    return axios.get(`https://apis.netstart.cn/one/banner/list/4`)
}

// 小记列表
export const getDiaryList = ({
    axios,
    id
}) => {
    return axios.get(`https://apis.netstart.cn/one/diary/square/more/${id}`)
    // return axios.get('/diary.json?id=' + id)
}

// 热榜列表
export const getRankList = ({
    axios,
}) => {
    return axios.get(`https://apis.netstart.cn/one/find/rank`)
}

// 榜单详情列表
export const getRankDetailList = ({
    axios,
    id
}) => {
    return axios.get(`https://apis.netstart.cn/one/find/rank/${id}`)
}

// 热门作者
export const getAuthorList = ({
    axios,
}) => {
    return axios.get(`https://apis.netstart.cn/one/author/hot`)
}

// 年度连载列表
export const getYearSerialcontentList = ({
    axios,
    date
}) => {
    return axios.get(`https://apis.netstart.cn/one/find/serial/byyear/${date}`)
}

// 连载章节目录列表
export const getSerialcontentData = ({
    axios,
    id
}) => {
    return axios.get(`https://apis.netstart.cn/one/find/serial/list/${id}`)
}

// 连载章节ID列表
export const getIDSerialcontentData = ({
    axios,
    id
}) => {
    return axios.get(`https://apis.netstart.cn/one/serial/list/${id}`)
}

import {
    searchEngTypes,
} from "@/utils/discoverType";

// 文章搜索
export const getSearchList = ({
    axios,
    category,
    keyword,
    page,
}) => {
    let categoryName = searchEngTypes[category]
    if (!categoryName) {
        console.error('未知的分类类型:', category)
        return
    }
    return axios.get(`https://apis.netstart.cn/one/search/${categoryName}/${keyword}/${page}`)
}

// 作者作品列表
export const getAuthorContentList = ({
    axios,
    id,
    page
}) => {
    return axios.get(`https://apis.netstart.cn/one/author/works?author_id=${id}&page_num=${page}`)
}