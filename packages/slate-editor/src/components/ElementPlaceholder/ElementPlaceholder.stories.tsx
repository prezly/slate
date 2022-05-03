import * as React from 'react';

import { ChickenNoSignalIllustration } from '#icons';

import { VStack } from '../Stack';

import { Container, Illustration, Title, Subtitle } from './';

export default {
    title: 'Components/ElementPlaceholder',
};

export function NoData() {
    return (
        <div style={{ width: 700 }}>
            <Container onClick={() => console.log('Click')}>
                <VStack spacing="2">
                    <Illustration>
                        <ChickenNoSignalIllustration />
                    </Illustration>
                    <VStack spacing="1">
                        <Title>The selected Prezly Story is no longer available</Title>
                        <Subtitle>
                            Click to select another a bookmark of one of your stories
                        </Subtitle>
                    </VStack>
                </VStack>
            </Container>
        </div>
    );
}
