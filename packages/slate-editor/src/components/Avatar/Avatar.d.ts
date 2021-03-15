import { FunctionComponent } from 'react';

interface Props {
    className?: string;
    name?: string;
    size?: 'tiny' | 'small' | 'smaller' | 'normal' | 'large' | '40';
    square?: boolean;
    src?: string;
}

declare const Avatar: FunctionComponent<Props>;

export default Avatar;
