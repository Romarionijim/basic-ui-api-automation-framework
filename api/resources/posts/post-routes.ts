import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiClient } from "../../client/api-client";
import { PostResourceOptions, PostType } from "../../types/post-options.types";

export class Posts {
    apiClient: ApiClient;

    constructor(protected request: APIRequestContext) {
        this.apiClient = new ApiClient(request);
    }

    async getPost(options: PostResourceOptions = {}) {
        if (options.allPosts) {
            return await this.apiClient.get('/posts');
        }
        if (options.id) {
            return await this.apiClient.get(`/posts/${options.id}`);
        }
        if (options.commentsById) {
            return await this.apiClient.get(`/posts/${options.id}/comments`);
        }
        if (options.postIdQueryParam) {
            return await this.apiClient.get(`/comments?postId${options.id}`)
        }
    }

    async createPost<T>(post: PostType) {
        return await this.apiClient.post('/posts', {
            data: post
        })
    }
}