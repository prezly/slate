export interface User {
    avatar_url: string;
    id: number;
    name: string;
}

export interface UserMentionsExtensionParameters {
    users: User[];
}
