import type * as React from 'react';
import styled, { css } from 'styled-components';

import type { BoxProps } from '../Box';
import { Box } from '../Box';

export interface FlexProps extends BoxProps {
    alignItems?: React.CSSProperties['alignItems'];
    justifyContent?: React.CSSProperties['justifyContent'];
    flexWrap?: React.CSSProperties['flexWrap'];
    flexDirection?: React.CSSProperties['flexDirection'];
    flexBasis?: React.CSSProperties['flexBasis'];
    flexGrow?: React.CSSProperties['flexGrow'];
    flexShrink?: React.CSSProperties['flexShrink'];
    justifySelf?: React.CSSProperties['justifySelf'];
    alignSelf?: React.CSSProperties['alignSelf'];
    flex?: React.CSSProperties['flex'];
    inline?: boolean;
    width?: string;
    height?: string;
}

export const Flex = styled(Box)<FlexProps>`
    display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
    flex-direction: ${(props) => props.flexDirection};
    align-items: ${(props) => props.alignItems};
    justify-content: ${(props) => props.justifyContent};
    flex-wrap: ${(props) => props.flexWrap};
    flex-basis: ${(props) => props.flexBasis};
    flex-grow: ${(props) => props.flexGrow};
    flex-shrink: ${(props) => props.flexShrink};
    justify-self: ${(props) => props.justifySelf};
    align-self: ${(props) => props.alignSelf};
    flex: ${(props) => props.flex};

    ${(props) =>
        props.width &&
        css`
            width: ${props.width};
        `}

    ${(props) =>
        props.height &&
        css`
            height: ${props.height};
        `}
`;
