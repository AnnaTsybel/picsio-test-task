import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@store/index';
import { deletePost } from '@store/posts/actions';

import viewsIcon from '@static/images/viewsIcon.png';
import likeIcon from '@static/images/likeIcon.png';
import dislikeIcon from '@static/images/dislikeIcon.png';
import deleteIcon from '@static/images/deleteIcon.png';

import { Post } from '@/enteties/posts';

import './index.scss';

export const PostItem: React.FC<{ post: Post }> = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    /** Removes post, but do not refetch posts, because provided api does not delete items, it only returns post. */
    const removePost = (event: any) => {
        event.stopPropagation();

        dispatch(deletePost({ id: post.id }));
    };

    return (
        <div className="posts__item" onClick={() => navigate(`/posts/${post.id}`) }>
            <button onClick={removePost} className="posts__item__delete">
                <img className="posts__item__info__icon" src={deleteIcon} alt="delete" />
            </button>
            <p className="posts__item__title">{post.userId}</p>
            <p className="posts__item__title">{post.title}</p>
            <p className="posts__item__text">{post.body}</p>
            <div className="posts__item__info">
                <div className="posts__item__info__element">
                    <img className="posts__item__info__icon" src={viewsIcon} alt="views" />
                    <span>{post.views}</span>
                </div>
                <div className="posts__item__info__element">
                    <img className="posts__item__info__icon" src={likeIcon} alt="like" />
                    <span>{post.reactions.likes}</span>
                </div>
                <div className="posts__item__info__element">
                    <img className="posts__item__info__icon" src={dislikeIcon} alt="dislike" />
                    <span>{post.reactions.dislikes}</span>
                </div>
            </div>
        </div>
    );
};
