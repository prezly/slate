import type * as React from 'react';

/**
 * Inspired by https://stackoverflow.com/a/66568474/3021445
 */
export type WithAsComponent<Props, El extends React.ElementType> = { as?: El } & Props &
    Omit<React.ComponentPropsWithoutRef<El>, keyof Props>;
