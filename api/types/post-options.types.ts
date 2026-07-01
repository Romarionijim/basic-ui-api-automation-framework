export interface PostResourceOptions {
    allPosts?: boolean;
    id?: number;
    commentsById?: string;
    postIdQueryParam?: number;
}

export interface PostType {
    userId: number;
    id: number;
    title: string;
    body: string;
}