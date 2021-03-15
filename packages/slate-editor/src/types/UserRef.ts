export default interface UserRef {
    id: number;
    /**
     * @deprecated Please use `email` instead.
     * @see email
     */
    username: string;
    email: string;
    display_name: string;
    first_name: string | null;
    avatar_url: string;
    /**
     * Last time the user was active.
     */
    last_seen_at: string | null;
}
