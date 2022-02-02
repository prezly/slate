import * as React from 'react';
import styled from 'styled-components';

import { Text } from '../Text';

interface ToggleProps {
    value?: boolean;
    onChange?: (value: boolean) => void;
}

export function Toggle(props: React.PropsWithChildren<ToggleProps>) {
    return (
        <Text as="label">
            <ToggleComponent
                checked={props.value}
                onChange={(e) => props.onChange?.(e.target.checked)}
            />
            {props.children}
        </Text>
    );
}

const GRAY_CIRCLE = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e")`;
const WHITE_CIRCLE = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e")`;

const ToggleComponent = styled.input.attrs({ type: 'checkbox' })`
    appearance: none;
    width: 30px;
    height: 16px;
    border-radius: 24px;
    background-image: ${GRAY_CIRCLE};
    background-size: contain;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: left center;
    transition: background-position 0.15s ease-in-out;
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.16);

    &:checked {
        background-image: ${WHITE_CIRCLE};
        background-color: #f9ca7b;
        background-position: right center;
        border-color: #f9ca7b;
    }

    &:focus {
        outline: 0;
        box-shadow: 0 0 0 4px rgba(249, 203, 123, 0.1);
    }

    &:disabled {
        opacity: 0.5;
    }
`;
