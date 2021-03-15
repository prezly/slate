export enum TextDirection {
    LTR = 'ltr',
    RTL = 'rtl',
}

export default interface Culture {
    code: string;
    locale: string;
    name: string;
    direction: TextDirection;
}
