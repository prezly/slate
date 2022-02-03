import * as React from 'react';
import styled from 'styled-components';

import { Caption } from './Caption';

interface HeaderProps {
    withCloseButton?: boolean;
}

export function Header(props: React.PropsWithChildren<HeaderProps>) {
    return (
        <HeaderWrapper>
            <Caption>{props.children}</Caption>
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
