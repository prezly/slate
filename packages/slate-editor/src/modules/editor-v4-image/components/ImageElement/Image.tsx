import type { HTMLAttributes } from 'react';
import React from 'react';

interface Props extends HTMLAttributes<HTMLImageElement> {
    className?: string;
    alt: string;
    src: string;
}

export function Image({ alt, className, src, ...props }: Props) {
    return <img alt={alt} src={src} className={className} {...props} />;
}
