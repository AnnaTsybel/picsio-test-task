import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { NotificationsPlugin } from '@utils/notifications';
import { useAppDispatch } from '@store/index';
import { closeModal } from '@store/modals/slice';
import { createPost } from '@store/posts/actions';
import closeIcon from '@static/images/closeIcon.png';

import './index.scss';

export const CreatePost = () => {
    const dispatch = useAppDispatch();
    const methods = useForm();

    const { control, handleSubmit } = methods;

    const addPost = async(data: any) => {
        if (!data.title) {
            NotificationsPlugin.notify('Enter post title.');

            return;
        };

        if (!data.text) {
            NotificationsPlugin.notify('Enter post text.');

            return;
        };

        try {
            await dispatch(createPost({ title: data.title, body: data.text }));
            dispatch(closeModal());
        } catch (e: any) {}
    };

    return (
        <div className="create-post">
            <button
                className="create-post__close"
                onClick={() => dispatch(closeModal())}
            >
                <img src={closeIcon} alt="close" />
            </button>
            <h1 className="create-post__title">Create Post</h1>
            <FormProvider {...methods}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field: { value, onChange } }) =>
                        <Input
                            label="Title"
                            value={value ? value : ''}
                            onChange={onChange}
                        />
                    }
                />
                <Controller
                    name="text"
                    control={control}
                    render={({ field: { value, onChange } }) =>
                        <Input
                            label="Text"
                            value={value ? value : ''}
                            onChange={onChange}
                        />
                    }
                />
                <Button
                    onConfirm={handleSubmit(addPost)}
                    label="Create post"
                />
            </FormProvider>
        </div>
    );
};
