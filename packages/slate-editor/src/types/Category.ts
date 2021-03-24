import Culture from './Culture';

export default interface Category {
    display_description: string | null;
    display_name: string;
    i18n: {
        [cultureCode: string]: {
            description: string | null;
            locale: Culture;
            name: string;
            slug: string | null;
        };
    };
    id: number;
}
