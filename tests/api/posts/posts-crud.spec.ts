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

        await test.step('should get single post by ID', async () => {
            const response = await posts.getPost({ id: 1 })
            const responseBody: PostType = await response?.json()
            expect(responseBody.id).toBe(1)
            expect(responseBody.userId).toBe(1);
        })
    })

    test('Should create post successfully - [POST] /posts', { tag: [TestTags.POSTS] }, async ({ posts }) => {

        await test.step('should create post with correct payload', async () => {
            const payload = {
                title: 'test title',
                body: 'test body',
                userId: 550,
                id: 550055
            }
            const response = await posts.createPost(payload);
            expect(response.status()).toBe(201)
        })
    })
})