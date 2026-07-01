import { Posts } from "../resources/posts/post-routes"
import { test as base } from '@playwright/test';

export type ApiResources = {
    posts: Posts
}

export const test = base.extend<ApiResources>({
    posts: async ({ request }, use) => {
        await use(new Posts(request))
    }
})