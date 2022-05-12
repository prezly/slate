import type { ReactNode } from 'react';
import React from 'react';

import { VStack } from '../Stack';

import { Container } from './Container';
import { Illustration } from './Illustration';
import { Subtitle } from './Subtitle';
import { Title } from './Title';

interface Props {
    title: string;
    illustration: ReactNode;
    onClick?: () => void;
    subtitle?: string;
}

export function ElementPlaceholder({ onClick, title, subtitle, illustration }: Props) {
    return (
        <Container onClick={onClick}>
            <VStack spacing="2">
                <Illustration>{illustration}</Illustration>
                <VStack spacing="1">
                    <Title>{title}</Title>
                    {subtitle && <Subtitle>{subtitle}</Subtitle>}
                </VStack>
            </VStack>
        </Container>
    );
}
