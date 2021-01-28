export const getMailtoHref = (email: string): string => {
    return `mailto:${email}`;
};

export const getTelHref = (phone: string): string => {
    return `tel:${phone}`;
};

export const getFacebookHref = (facebook: string): string => {
    return `https://www.facebook.com/${facebook}`;
};

export const getTwitterHref = (twitter: string): string => {
    return `https://twitter.com/${twitter}`;
};
