import * as React from 'react';
import styled from 'styled-components';

import * as icons from './';

export default {
    title: 'Icons',
};

export function Icons() {
    return (
        <IconSetWrapper>
            {Object.entries(icons).map(([name, Icon]) => (
                <IconWrapper key={name}>
                    <Icon />
                    <span>{name}</span>
                </IconWrapper>
            ))}
        </IconSetWrapper>
    );
}

const IconSetWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr [col-start]);
    column-gap: 10px;
    row-gap: 15px;
`;

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
