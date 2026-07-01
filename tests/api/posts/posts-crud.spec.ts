import { expect } from '@playwright/test';
import { test } from '../../../api/fixtures/api.fixture';
import { PostType } from '../../../api/types/post-options.types';
import { TestTags } from '../../../api/tags/test-tags';

test.describe('Post CRUD tests', async () => {
    test('should get list of posts - [GET] /posts', { tag: [TestTags.POSTS] }, async ({ posts }) => {
        await test.step('should get all posts', async () => {
            const response = await posts.getPost({ allPosts: true });
            const responseBody: PostType[] = await response?.json();
            await expect(response!).toBeOK();
            expect(responseBody[0].id).toBe(1);
            expect(responseBody[0].userId).toBe(1);
        })

        // await test.step('should get single post by ID', async () => {

        // })

        // await test.step('should get comments from specific post by ID', async () => {

        // })

        // await test.step('should get comments from specific post by post ID query param', async () => {

        // })

    })
})