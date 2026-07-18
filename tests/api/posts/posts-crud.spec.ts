import { expect } from '@playwright/test';
import { test } from '../../../api/fixtures/api.fixture';
import { Post } from '../../../api/types/post-options.types';
import { TestTags } from '../../../api/tags/test-tags';
import { mockGenerator } from '../../../api/mocks/mock-generator';

test.describe('Post CRUD tests', async () => {
    test('should get list of posts - [GET] /posts', { tag: [TestTags.POSTS] }, async ({ posts }) => {
        await test.step('should get all posts', async () => {
            const response = await posts.getPost({ allPosts: true });
            const responseBody: Post[] = await response?.json();
            await expect(response!).toBeOK();
            expect(responseBody[0].id).toBe(1);
            expect(responseBody[0].userId).toBe(1);
        })

        await test.step('should get single post by ID - [GET] /posts/:id', async () => {
            const response = await posts.getPost({ id: 1 })
            const responseBody: Post = await response?.json()
            expect(responseBody.id).toBe(1)
            expect(responseBody.userId).toBe(1);
        })
    })

    test('Should create post successfully - [POST] /posts', { tag: [TestTags.POSTS] }, async ({ posts }) => {
        await test.step('should create post with correct payload', async () => {
            const payload = mockGenerator.generatePost();
            const response = await posts.createPost(payload);
            await expect(response!).toBeOK();
            expect(response.status()).toBe(201)
        })
    })

    test('Should patch post ID successfully - [PATCH] /posts/:id', { tag: [TestTags.POSTS] }, async ({ posts }) => {
        await test.step('should patch post with correct ID and payload', async () => {
            const response = await posts.getPost({ id: 1 });
            const responseBody: Post = await response?.json();
            const newId = 7;
            await posts.patchPost(responseBody.id, { id: newId });
            
            const patchesResponse = await posts.getPost({id: newId});
            const patchedResponseBody: Post = await patchesResponse?.json();
            expect(patchedResponseBody.id).toBe(newId);
        });
    });

    test('Should delete post successully - [DELETE] /posts/:id', { tag: [TestTags.POSTS] }, async ({ posts }) => {
        await test.step('should delete post with correct ID', async () => {
            const response = await posts.deletePost(1);
            await expect(response!).toBeOK();
            expect(response.status()).toBe(200)
        })
    });
})