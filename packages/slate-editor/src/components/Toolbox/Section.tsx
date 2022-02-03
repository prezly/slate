import React from 'react';
import styled from 'styled-components';

import { Caption } from './Caption';

interface SectionProps {
    caption?: string;
}

export function Section(props: React.PropsWithChildren<SectionProps>) {
    return (
        <SectionWrapper>
            {props.caption && (
                <CaptionWrapper>
                    <Caption>{props.caption}</Caption>
                </CaptionWrapper>
            )}

            {props.children}
        </SectionWrapper>
    );
}

const SectionWrapper = styled.div`
    border-top: 1px solid ${(props) => props.theme.toolbox.delimiterColor};
    background: ${(props) => props.theme.toolbox.background};
    padding: ${(props) => props.theme.toolbox.padding};
`;

const CaptionWrapper = styled.div`
    padding-bottom: 18px;
`;
