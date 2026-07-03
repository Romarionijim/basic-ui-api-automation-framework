import { PostsService } from "../services/posts/post.service"
import { test as base } from '@playwright/test';

export type ApiServices = {
    posts: PostsService
}

export const test = base.extend<ApiServices>({
    posts: async ({ request }, use) => {
        await use(new PostsService(request))
    }
})