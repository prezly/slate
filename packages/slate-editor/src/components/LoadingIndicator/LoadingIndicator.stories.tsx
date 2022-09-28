import type { CSSProperties, ReactElement } from 'react';
import React, { useEffect, useState } from 'react';

import { LoadingIndicator } from './LoadingIndicator';

export default {
    title: 'Components/LoadingIndicator',
    decorators: [(Story: React.ComponentType) => <Story />],
};

function Container(props: { style?: CSSProperties; children: ReactElement }) {
    return (
        <div
            style={{
                backgroundColor: 'white',
                ...props.style,
                padding: 30,
                width: 500,
            }}
        >
            {props.children}
        </div>
    );
}

export function InfiniteLoading() {
    return (
        <Container>
            <LoadingIndicator />
        </Container>
    );
}

export function FiniteLoading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => Math.min(100, p + 5));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <LoadingIndicator progress={progress * 0.01} onClick={() => setProgress(0)} />
        </Container>
    );
}

export function InfiniteLoadingOnDarkBackground() {
    return (
        <Container style={{ backgroundColor: 'rgba(27, 27, 54, 0.96)' }}>
            <LoadingIndicator />
        </Container>
    );
}

export function FiniteLoadingOnDarkBackround() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => Math.min(100, p + 5));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container style={{ backgroundColor: 'rgba(27, 27, 54, 0.96)' }}>
            <LoadingIndicator progress={progress * 0.01} onClick={() => setProgress(0)} />
        </Container>
    );
}

export function Customized() {
    return (
        <Container>
            <LoadingIndicator style={{ color: '#aaa' }} width={16} height={16} />
        </Container>
    );
}
