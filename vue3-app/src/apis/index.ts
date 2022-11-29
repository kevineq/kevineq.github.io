import http from "@/http";
import type { HomeItem, SearchList, ArticleState, CommentItem } from "@/typings"

export const Api = {
  getHomeList: (fromDate: string, toDate: string) => {
    return http.request<Array<HomeItem>>({
      url: `lessons?from=${fromDate}&to=${toDate}`,
      method: 'get'
    })
  },

  getSearchList: () => {
    return http.request<SearchList>({
      url: `today_recommends`,
      method: 'get'
    })
  },

  getArticlDetail: (id: string) => {
    return http.request<ArticleState>({
      url: `lessons/${id}`,
      method: 'get'
    })
  },

  getArticleState: (id: string) => {
    return http.request<ArticleState>({
      url: `lessons/${id}/activity_stats`,
      method: 'get'
    })
  },

  getCommentList: (id: string) => {
    return http.request<Array<CommentItem>>({
      url: `lessons/${id}/comments`,
      method: 'get'
    })
  },

  getCommentsList: (id: string) => {
    return http.request<Array<CommentItem>>({
      url: `comments/${id}/comments`,
      method: 'get'
    })
  },
}

