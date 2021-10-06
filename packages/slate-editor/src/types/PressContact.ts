export default interface PressContact {
    avatar_url: string | null;
    company: string | null;
    // TODO: cultures
    description: string | null;
    email: string | null;
    facebook: string | null;
    id: number;
    // TODO: is_visible_in_room
    mobile: string | null;
    name: string;
    // TODO: order
    phone: string | null;
    // TODO: stories
    twitter: string | null;
    uuid: string;
    website: string | null;
}
