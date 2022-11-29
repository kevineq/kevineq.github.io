export interface HomeItem {
    id: string,
    article: string,
    title: string,
    date_by_day: number,
}

export interface CommentItem {
    id: string,
    content: string,
    user: UserInfo,
    like_count: number,
    sub_comment_count: number,
}

export interface SearchCommentItem {
    id: string,
    content: string,
    user: UserInfo,
    like_count: number,
    sub_comment_count: number,
}

export interface SearchLessonsItem {
    id: string,
    article: string,
    title: string,
    date_by_day: number,
}

export interface SearchList {
    comments: Array<SearchCommentItem>,
    lessons: Array<SearchLessonsItem>
}

export interface ArticleState {
    comment_count: number,
    favourite_count: number,
    id: string,
    article: string,
    title: string,
    provenance: string,
    date_by_day: number,
    author: AuthorInfo
}

export interface UserInfo {
    id: string,
    nickname: string,
    avatar: string,
}

export interface AuthorInfo {
    id: string,
    name: string,
}

export interface ArticleDetail {
    id: string,
    article: string,
    title: string,
    provenance: string,
    date_by_day: number,
    author: AuthorInfo
}








