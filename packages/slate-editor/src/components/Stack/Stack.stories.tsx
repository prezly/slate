import * as React from 'react';

import { HStack, VStack } from '#components';

export default {
    title: 'Components/Stack',
};

export function Horizontal() {
    return (
        <HStack spacing="sm">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </HStack>
    );
}

export function Vertical() {
    return (
        <VStack spacing="lm">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </VStack>
    );
}

export function Combined() {
    return (
        <VStack spacing="s">
            <div>1</div>
            <HStack spacing="l">
                <div>2</div>
                <div>3</div>
            </HStack>
            <div>4</div>
        </VStack>
    );
}
