import { Post, RawPost } from '@enteties/posts';
import { Pagination } from '@enteties/common';

import { APIClient } from '.';

import { Comment, RawComment } from '@/enteties/comments';

export class PostsClient extends APIClient {
    /** Gets posts. */
    public async getPosts(skip: number, searchParam: string, limit: number = 10): Promise<{ posts: Post[]; pagination: Pagination }> {
        const response = await this.http.get(`https://dummyjson.com/posts/search?q=${searchParam}&limit=${limit}&skip=${skip}`);

        if (!response.ok) {
            await this.handleError(response);
        };

        const data = await response.json();

        const posts = data.posts.map((post: RawPost) => new Post(
            post.id,
            post.title,
            post.body,
            post.tags,
            post.views,
            post.userId,
            post.reactions,
        ));

        return {
            posts: posts,
            pagination: {
                total: data.total,
                skip: data.skip,
                limit,
            },
        };
    };

    /** Creates post. */
    public async createPost(title: string, body: string): Promise<Post> {
        const response = await this.http.post(
            'https://dummyjson.com/posts/add',
            JSON.stringify({
                title,
                body,
                tags: [
                    'fiction',
                    'classic',
                    'american',
                ],
                userId: 5,
                reactions: {
                    likes: 1127,
                    dislikes: 40,
                },
                views: 4419,
            }));

        if (!response.ok) {
            await this.handleError(response);
        };

        const post = await response.json();

        return new Post(
            post.id,
            post.title,
            post.body,
            post.tags,
            post.views,
            post.userId,
            post.reactions,
        );
    };

    /** Gets post. */
    public async getPost(id: string): Promise<Post> {
        const response = await this.http.get(`https://dummyjson.com/posts/${id}`);

        if (!response.ok) {
            await this.handleError(response);
        };

        const post: RawPost = await response.json();

        return new Post(
            post.id,
            post.title,
            post.body,
            post.tags,
            post.views,
            post.userId,
            post.reactions,
        );
    };

    /** Gets comments. */
    public async getComments(postId: string): Promise<Comment[]> {
        const response = await this.http.get(`https://dummyjson.com/posts/${postId}/comments`);

        if (!response.ok) {
            await this.handleError(response);
        };

        const data = await response.json();

        const comments = data.comments.map((comment: RawComment) => new Comment(
            comment.id,
            comment.body,
            comment.postId,
            comment.likes,
            comment.user,
        ));

        return comments;
    };

    /** Deletes post. */
    public async deletePost(id: string): Promise<string> {
        const response = await this.http.delete(`https://dummyjson.com/posts/${id}`);

        if (!response.ok) {
            await this.handleError(response);
        };

        return id;
    };
};
