import { createAsyncThunk } from '@reduxjs/toolkit';

import { PostsClient } from '@/api/posts';

const postsClient = new PostsClient();

export const getPosts = createAsyncThunk(
    'getPosts',
    async({ skip, limit, searchParam }: { skip: number; limit: number; searchParam: string }) => await postsClient.getPosts(skip, searchParam, limit),
);

export const getPost = createAsyncThunk(
    'getPost',
    async({ id }: { id: string }) => await postsClient.getPost(id),
);

export const getComments = createAsyncThunk(
    'getComments',
    async({ id }: { id: string }) => await postsClient.getComments(id),
);

export const createPost = createAsyncThunk(
    'createPost',
    async({ title, body }: { title: string; body: string }) => await postsClient.createPost(title, body),
);

export const deletePost = createAsyncThunk(
    'deletePost',
    async({ id }: { id: string }) => await postsClient.deletePost(id),
);
