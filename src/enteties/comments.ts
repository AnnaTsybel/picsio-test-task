import { RawUser, User } from '@enteties/users';

export interface RawComment {
    id: string;
    body: string;
    postId: string;
    likes: number;
    user: RawUser;
};

export class Comment {
    constructor(
        public id: string = '',
        public body: string = '',
        public postId: string = '',
        public likes: number = 0,
        public user: User = new User,
    ) { }
};
