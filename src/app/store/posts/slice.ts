import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '@enteties/posts';
import { Pagination } from '@enteties/common';

import { createPost, deletePost, getComments, getPost, getPosts } from './actions';

import { Comment } from '@/enteties/comments';

interface PostsState {
    posts: Post[];
    pagination: Pagination;
    searchParam: string;
    currentPost: {
        post: Post;
        comments: Comment[];
    };
};

export const initialState: PostsState = {
    posts: [],
    pagination: { skip: 0, page: 1, total: 0, limit: 5 } as Pagination,
    searchParam: '',
    currentPost: {
        post: new Post(),
        comments: [],
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.pagination.skip = action.payload;
        },
        setSearchParameter(state, action: PayloadAction<string>) {
            state.searchParam = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            Object.assign(state, action.payload);
        });
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.currentPost.post = action.payload;
        });
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.currentPost.comments = action.payload;
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload),
            };
        });
    },
});

export const { setPage, setSearchParameter } = postsSlice.actions;

export default postsSlice.reducer;
