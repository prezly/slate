import * as React from 'react';
import styled, { css } from 'styled-components';

import { Text } from '#components';

interface ButtonProps {
    variant: 'clear';
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    fullWidth?: boolean;
}

export function Button(props: React.PropsWithChildren<ButtonProps>) {
    return (
        <ButtonComponent {...props}>
            <Text>
                {props.Icon && <IconWrapper as={props.Icon} width={12} height={12} />}
                {props.children}
            </Text>
        </ButtonComponent>
    );
}

const ButtonComponent = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: 0;
    cursor: pointer;
    text-decoration: none;
    opacity: 0.5;

    &:hover {
        opacity: 0.8;
    }

    ${(props) =>
        props.variant === 'clear' &&
        css`
            background-color: transparent;
            border: 1px solid transparent;
        `}

    ${(props) =>
        props.fullWidth &&
        css`
            flex-grow: 1;
        `}
`;

const IconWrapper = styled.span`
    margin-right: 8px;
`;
