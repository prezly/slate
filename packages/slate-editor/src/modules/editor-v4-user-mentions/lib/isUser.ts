import type { User } from '../types';

export function isUser(user: any): user is User {
    return (
        typeof user === 'object' &&
        user !== null &&
        typeof user.avatar_url === 'string' &&
        typeof user.id === 'number' &&
        typeof user.name === 'string'
    );
}

