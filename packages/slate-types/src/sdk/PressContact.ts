export default interface PressContact {
    avatar_url: string | null;
    company: string | null;
    description: string | null;
    email: string | null;
    facebook: string | null;
    id: number;
    mobile: string | null;
    name: string;
    phone: string | null;
    twitter: string | null;
    website: string | null;
}

export const isPressContact = (value: any): value is PressContact => {
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
        (typeof value.website === 'string' || value.website === null)
    );
};
