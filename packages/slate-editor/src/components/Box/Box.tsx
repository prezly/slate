import type { BoxTheme } from '@prezly/slate-editor/theme';
import type { Property } from 'csstype';
import * as React from 'react';

import type { WithAsComponent } from '#lib/type-utils';

import { classNames } from './Box.module.css';

type BoxSizingProps = {
    p?: BoxTheme.Sizes;
    pt?: BoxTheme.Sizes;
    pr?: BoxTheme.Sizes;
    pb?: BoxTheme.Sizes;
    pl?: BoxTheme.Sizes;
    m?: BoxTheme.Sizes;
    mt?: BoxTheme.Sizes;
    mr?: BoxTheme.Sizes;
    mb?: BoxTheme.Sizes;
    ml?: BoxTheme.Sizes;
    width?: React.CSSProperties['width'];
    height?: React.CSSProperties['height'];
    textAlign?: 'center' | 'left' | 'right';
};

export interface BoxProps extends BoxSizingProps, React.DOMAttributes<HTMLElement> {
    display?: Property.Display;
}

export function Box<El extends React.ElementType = 'div'>(
    props: React.PropsWithChildren<WithAsComponent<BoxProps, El>>,
) {
    const className = React.useMemo(() => {
        const list = ['className' in props ? props.className : '', classNames['box']];
        const sizesKeys = ['p', 'pt', 'pr', 'pb', 'pl', 'm', 'mt', 'mr', 'mb', 'ml'] as const;

        sizesKeys.forEach((key) => {
            const value = props[key];

            if (value) {
                list.push(classNames[`box--${key}-${value}`]);
            }
        });

        if (props.textAlign) {
            list.push(classNames[`box--text-align-${props.textAlign}`]);
        }

        return list.join(' ');
    }, []);

    const Component = props.as || 'div';

    const { p, pt, pr, pb, pl, m, mt, mr, mb, ml, width, height, textAlign, ...clearProps } = props;

    return (
        <Component
            className={className}
            style={{ width: props.width, height: props.height }}
            {...clearProps}
        >
            {props.children}
        </Component>
    );
}
