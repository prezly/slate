import * as React from 'react';
import styled from 'styled-components';

import { Text } from '../Text';

interface HeaderProps {
    withCloseButton?: boolean;
}

export function Header(props: React.PropsWithChildren<HeaderProps>) {
    return (
        <HeaderWrapper>
            <Text>{props.children}</Text>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.div`
    background: ${(props) => props.theme.toolbox.background};
    border-top-left-radius: ${(props) => props.theme.toolbox.borderRadius};
    border-top-right-radius: ${(props) => props.theme.toolbox.borderRadius};
    padding: ${(props) => props.theme.toolbox.padding};
`;
