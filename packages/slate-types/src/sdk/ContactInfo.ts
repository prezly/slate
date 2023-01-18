export interface ContactInfo {
    avatar_url: string | null;
    name: string;
    company: string;
    description: string;
    address: string;
    mobile: string;
    phone: string;
    email: string;
    website: string;
    facebook: string;
    twitter: string;
}

export function isContactInfo(value: any): value is ContactInfo {
    return (
        (typeof value.avatar_url === 'string' || value.avatar_url === null) &&
        typeof value.name === 'string' &&
        typeof value.company === 'string' &&
        typeof value.description === 'string' &&
        typeof value.address === 'string' &&
        typeof value.mobile === 'string' &&
        typeof value.phone === 'string' &&
        typeof value.email === 'string' &&
        typeof value.website === 'string' &&
        typeof value.facebook === 'string' &&
        typeof value.twitter === 'string'
    );
}

export namespace ContactInfo {
    export function normalize<T extends ContactInfo>(value: T): ContactInfo {
        return {
            avatar_url: value.avatar_url ?? null,
            name: value.name ?? '',
            company: value.company ?? '',
            description: value.description ?? '',
            address: value.address ?? '',
            mobile: value.mobile ?? '',
            phone: value.phone ?? '',
            email: value.email ?? '',
            website: value.website ?? '',
            facebook: value.facebook ?? '',
            twitter: value.twitter ?? '',
        };
    }
}
