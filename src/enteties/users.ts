export interface RawUser {
    id: string;
    username: string;
    fullName: string;
};

export class User {
    constructor(
        public id: string = '',
        public username: string = '',
        public fullName: string = '',
    ) { }
};
