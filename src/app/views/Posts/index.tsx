import { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import { Post } from '@enteties/posts';

import { useAppDispatch, useAppSelector } from '@store/index';
import { getPosts } from '@store/posts/actions';
import { setPage, setSearchParameter } from '@store/posts/slice';
import { openModal } from '@store/modals/slice';

import appConfig from '@app/configs/appConfig.json';

import { Pagination } from '@components/common/Pagination';
import { PostItem } from '@components/Posts/Post';
import { Search } from '@components/common/Search';
import { CreatePost } from '@components/common/Modal/CreatePost';
import { Button } from '@components/common/Button';
import { ListSkeleton } from '@components/common/ListSkeleton';

import './index.scss';

const Posts = () => {
    const dispatch = useAppDispatch();

    const [searchValue, setSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { posts, pagination, searchParam } = useAppSelector(state => state.posts);

    const handleSkipChange = (selectedPage: number) => {
        if (isLoading) { return; };

        dispatch(setPage(selectedPage));
    };

    const onOpenCreatePost = () => {
        dispatch(openModal({
            content: <CreatePost />,
            canBeClosed: true,
        }));
    };

    const searchPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);

        if (e.target.value.length >= appConfig.numbers.THREE_NUMBER) {
            dispatch(setSearchParameter(e.target.value));
            dispatch(setPage(0));

            return;
        }

        dispatch(setSearchParameter(''));
    };

    useEffect(() => { window.scrollTo({ top: 0, behavior:'smooth' }); }, [posts]);

    useEffect(() => {
        setIsLoading(true);
        (async() => {
            try {
                unwrapResult(await dispatch(getPosts({ skip: pagination.skip, limit: appConfig.paginationLimits.POSTS, searchParam })));
                setIsLoading(false);
            } catch (error: any) { }
        })();
    }, [pagination.skip, searchParam]);

    return (
        <div className="posts">
            <div className="posts__heading">
                <h1 className="posts__title">Posts</h1>
                <Button onConfirm={() => onOpenCreatePost()} label="Create" />
            </div>
            <Search onChange={searchPost} value={searchValue} />
            {isLoading ?
                <ListSkeleton height={220} listsToRender={appConfig.paginationLimits.POSTS} />
                :
                <div className="posts__content" >
                    {posts.map((post: Post) =>
                        <PostItem post={post} key={post.id} />,
                    )}
                </div>
            }
            {<Pagination
                limit={pagination.limit}
                currentSkip={pagination.skip}
                setSkip={handleSkipChange}
                total={pagination.total}
            />}
        </div>
    );
};

export default Posts;
