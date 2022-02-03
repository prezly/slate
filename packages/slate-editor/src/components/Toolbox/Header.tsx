import * as React from 'react';
import styled from 'styled-components';

import { Button, Flex } from '#components';
import { Cross } from '#icons';

import { Caption } from './Caption';

interface HeaderProps {
    withCloseButton?: boolean;
    onCloseClick?: () => void;
}

export function Header(props: React.PropsWithChildren<HeaderProps>) {
    return (
        <HeaderWrapper>
            <Flex alignItems="center" justifyContent="space-between">
                <Caption>{props.children}</Caption>

                {props.withCloseButton && (
                    <Button variant="clear" Icon={Cross} onClick={props.onCloseClick} />
                )}
            </Flex>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.div`
    overflow: hidden;
    background: ${(props) => props.theme.toolbox.background};
    border-top-left-radius: ${(props) => props.theme.toolbox.borderRadius};
    border-top-right-radius: ${(props) => props.theme.toolbox.borderRadius};
    padding: ${(props) => props.theme.toolbox.padding};
`;
