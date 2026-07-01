import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiClient } from "../../client/api-client";
import { PostResourceOptions, Post } from "../../types/post-options.types";

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

    async createPost<T>(post: Post) {
        return await this.apiClient.post('/posts', {
            data: post
        })
    }

    async patchPost<T>(id: number, post: Partial<Post>) {
        return await this.apiClient.patch(`/posts/${id}`, {
            data: post
        })
    }

    async deletePost(id: number) {
        return await this.apiClient.delete(`/posts/${id}`);
    }
}