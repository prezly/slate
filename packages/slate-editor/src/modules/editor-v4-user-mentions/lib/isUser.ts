import type { User } from '../types';

const isUser = (user: any): user is User =>
    typeof user === 'object' &&
    user !== null &&
    typeof user.avatar_url === 'string' &&
    typeof user.id === 'number' &&
    typeof user.name === 'string';

export default isUser;
