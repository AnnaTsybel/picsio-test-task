export interface RawPost {
    id: string;
    body: string;
    title: string;
    tags: string[];
    likes: number;
    views: number;
    userId: string;
    reactions: {
        likes: number;
        dislikes: number;
    };
};

export class Reactions {
    constructor(
        public likes: number = 0,
        public dislikes: number = 0,
    ) { }
};

export class Post {
    constructor(
        public id: string = '',
        public title: string = '',
        public body: string = '',
        public tags: string[] = [],
        public views: number = 0,
        public userId: string = '',
        public reactions: Reactions = new Reactions(),
    ) { }
};
