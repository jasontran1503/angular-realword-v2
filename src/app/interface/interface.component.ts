export interface ResultUser {
    user: User;
}

export interface User {
    bio: string;
    createdAt: string;
    email: string;
    id: number;
    image: string;
    token: string;
    updatedAt: string;
    username: string;
}

export interface ResultSingleArticle {
    article: Article;
}

export interface Article {
    author: Profile;
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
}

export interface ResultTag {
    tags: string[];
}

export interface ResultMultipleArticles {
    articles: Article[];
    articlesCount: number;
}

export interface ResultProfile {
    profile: Profile;
}

export interface Profile {
    bio: string;
    following: boolean;
    image: string;
    username: string;
}

export interface ResultComment {
    comments: Comment[];
}

export interface Comment {
    author: Profile;
    body: string;
    createdAt: string;
    id: number;
    updatedAt: string;
}