export interface PressContact {
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

export function isPressContact(value: any): value is PressContact {
    return (
        (typeof value.avatar_url === 'string' || value.avatar_url === null) &&
        (typeof value.company === 'string' || value.company === null) &&
        (typeof value.description === 'string' || value.description === null) &&
        (typeof value.email === 'string' || value.email === null) &&
        (typeof value.facebook === 'string' || value.facebook === null) &&
        typeof value.id === 'number' &&
        (typeof value.mobile === 'string' || value.mobile === null) &&
        typeof value.name === 'string' &&
        (typeof value.phone === 'string' || value.phone === null) &&
        (typeof value.twitter === 'string' || value.twitter === null) &&
        typeof value.uuid === 'string' &&
        (typeof value.website === 'string' || value.website === null)
    );
}
