import * as React from 'react';
import styled from 'styled-components';

import { Text } from '#components';

interface LinkProps {
    href: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Link(props: React.PropsWithChildren<LinkProps>) {
    return (
        <LinkWrapper href={props.href} target="_blank">
            <Text>{props.children}</Text>
            {props.icon && <IconWrapper as={props.icon} />}
        </LinkWrapper>
    );
}

const LinkWrapper = styled.a`
    display: inline-flex;
    align-items: center;
    color: white;
    text-decoration: none;
`;

const IconWrapper = styled.span`
    color: white;
    width: 12px;
    height: 12px;
    margin-left: 8px;
`;
