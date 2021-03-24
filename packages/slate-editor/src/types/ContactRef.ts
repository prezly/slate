export default interface ContactRef {
    avatar_url: string;
    contact_type: 'person' | 'organisation';
    display_name: string;
    function_name: string | null;
    id: number;
    is_deleted: boolean;
    links: {
        api: string;
        view: string | null;
    };
}
