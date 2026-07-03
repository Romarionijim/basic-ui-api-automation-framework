import { PostsService } from "../services/posts/post.service"
import { test as base } from '@playwright/test';

export type ApiResources = {
    posts: PostsService
}

export const test = base.extend<ApiResources>({
    posts: async ({ request }, use) => {
        await use(new PostsService(request))
    }
})