import * as React from 'react';
import styled from 'styled-components';

interface HeaderProps {
    withCloseButton?: boolean;
}

export function Header(props: React.PropsWithChildren<HeaderProps>) {
    return <HeaderWrapper>{props.children}</HeaderWrapper>;
}

const HeaderWrapper = styled.div`
    background: ${(props) => props.theme.toolbox.hello};
`;
