import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { Button } from '@components/common/Button';

import { Comment } from '@enteties/comments';

import { useAppDispatch, useAppSelector } from '@store/index';
import { getComments, getPost } from '@store/posts/actions';

import viewsIcon from '@static/images/viewsIcon.png';
import likeIcon from '@static/images/likeIcon.png';
import dislikeIcon from '@static/images/dislikeIcon.png';

import './index.scss';

const PostPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const [isLoading, setIsLoading]=useState<boolean>(false);

    const { currentPost: { post, comments } } = useAppSelector(state => state.posts);

    useEffect(() => {
        setIsLoading(true);
        (async() => {
            try {
                if (!id) { return; };

                unwrapResult(await dispatch(getPost({ id })));
                unwrapResult(await dispatch(getComments({ id })));

                setIsLoading(false);
            } catch (error: any) {}
        })();
    }, []);

    if (isLoading) {
        return (
            <div className="post__wrapper">
                <Button
                    label="Go back"
                    onConfirm={() => navigate('/posts')}
                    className="post__go-back"
                />
                <Skeleton height={250} borderRadius={20}/>
            </div>
        );
    }

    return (
        <div className="post__wrapper">
            <Button
                label="Go back"
                onConfirm={() => navigate('/posts')}
                className="post__go-back"
            />
            <div className="post">
                <p className="post__title">{post.userId}</p>
                <p className="post__title">{post.title}</p>
                <p className="post__text">{post.body}</p>
                <div className="post__info">
                    <div className="post__info__element">
                        <img className="post__info__element__icon" src={viewsIcon} alt="views" />
                        <span>{post.views}</span>
                    </div>
                    <div className="post__info__element">
                        <img className="post__info__element__icon" src={likeIcon} alt="like" />
                        <span>{post.reactions.likes}</span>
                    </div>
                    <div className="post__info__element">
                        <img className="post__info__element__icon" src={dislikeIcon} alt="dislike" />
                        <span>{post.reactions.dislikes}</span>
                    </div>
                </div>
            </div>
            <div className="post__comments">
                {comments.map((comment: Comment) =>
                    <div className="post__comments__item" key={comment.id}>
                        <p className="post__comments__item__name">{comment.user.fullName}</p>
                        <p className="post__comments__item__text">{comment.body}</p>
                        <div className="post__comments__item__likes">
                            <img
                                className="post__comments__item__likes__icon"
                                src={likeIcon}
                                alt="like"
                            />
                            <span>{comment.likes}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostPage;
