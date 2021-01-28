import { FunctionComponent, SVGProps } from 'react';

export interface SocialFieldData {
    getHref: (value: string) => string;
    Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    value: string;
}

export type SocialFieldEntry = [string, SocialFieldData];
