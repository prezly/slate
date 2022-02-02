import React from 'react';
import styled from 'styled-components';

import { Caption } from './Caption';

interface SectionProps {
    caption?: string;
    contentPosition?: 'start' | 'center' | 'end';
}

export function Section(props: React.PropsWithChildren<SectionProps>) {
    return (
        <SectionWrapper>
            {props.caption && (
                <CaptionWrapper>
                    <Caption>{props.caption}</Caption>
                </CaptionWrapper>
            )}

            <SectionContent contentPosition={props.contentPosition}>
                {props.children}
            </SectionContent>
        </SectionWrapper>
    );
}

const SectionWrapper = styled.div`
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    background: ${(props) => props.theme.toolbox.background};
    padding: ${(props) => props.theme.toolbox.padding};
`;

const SectionContent = styled.div<Pick<SectionProps, 'contentPosition'>>`
    display: flex;
    justify-content: ${(props) => props.contentPosition ?? 'start'};
`;

const CaptionWrapper = styled.div`
    padding-bottom: 18px;
`;
