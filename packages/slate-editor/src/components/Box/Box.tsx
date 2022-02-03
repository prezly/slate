import type { BoxTheme } from '@prezly/slate-editor/theme';
import type { Property } from 'csstype';
import type * as React from 'react';
import type { DefaultTheme, ThemedStyledProps } from 'styled-components';
import styled, { css } from 'styled-components';

type BoxSizingProps = {
    mt?: BoxTheme.Sizes;
    mr?: BoxTheme.Sizes;
    mb?: BoxTheme.Sizes;
    ml?: BoxTheme.Sizes;
    pt?: BoxTheme.Sizes;
    pr?: BoxTheme.Sizes;
    pb?: BoxTheme.Sizes;
    pl?: BoxTheme.Sizes;
    m?: BoxTheme.Sizes;
    p?: BoxTheme.Sizes;
    width?: React.CSSProperties['width'];
    height?: React.CSSProperties['height'];
    overflow?: React.CSSProperties['overflow'];
    textAlign?: 'center' | 'left' | 'right';
};

export interface BoxProps extends BoxSizingProps, React.DOMAttributes<HTMLElement> {
    display?: Property.Display;
}

export const Box = styled.div<BoxProps>`
    box-sizing: border-box;
    text-align: ${(props) => props.textAlign || 'left'};

    ${(props) =>
        props.display !== undefined &&
        css`
            display: ${props.display};
        `}

    ${(props) =>
        props.width !== undefined &&
        css`
            width: ${props.width};
        `}

  ${(props) =>
        props.height !== undefined &&
        css`
            height: ${props.height};
        `}

  ${(props) =>
        props.overflow !== undefined &&
        css`
            overflow: ${props.overflow};
        `}

  ${(props) =>
        'p' in props
            ? css`
                  padding: ${selectSpacing(props, props.p)};
              `
            : css`
                  padding-top: ${selectSpacing(props, props.pt)};
                  padding-right: ${selectSpacing(props, props.pr)};
                  padding-bottom: ${selectSpacing(props, props.pb)};
                  padding-left: ${selectSpacing(props, props.pl)};
              `}

  ${(props) =>
        'm' in props
            ? css`
                  margin: ${selectSpacing(props, props.m)};
              `
            : css`
                  margin-top: ${selectSpacing(props, props.mt)};
                  margin-right: ${selectSpacing(props, props.mr)};
                  margin-bottom: ${selectSpacing(props, props.mb)};
                  margin-left: ${selectSpacing(props, props.ml)};
              `}
`;

function selectSpacing(
    props: ThemedStyledProps<BoxSizingProps, DefaultTheme>,
    size: BoxTheme.Sizes | undefined,
) {
    if (!size) {
        return 0;
    }

    if (size === 'auto') {
        return 'auto';
    }

    return props.theme.box.spacing[size];
}
