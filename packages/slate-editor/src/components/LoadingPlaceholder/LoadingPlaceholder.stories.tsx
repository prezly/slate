import * as React from 'react';
import { useEffect, useState } from 'react';

import { LoadingPlaceholder, ResponsiveLoadingPlaceholder, VStack } from '#components';
import { Image } from '#icons';

export default {
    title: 'Components/LoadingPlaceholder',
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ padding: 20, maxWidth: 680 }}>
                <Story />
            </div>
        ),
    ],
};

function StaticTemplate(args: { description: string; progress: number }) {
    return (
        <VStack spacing="2">
            <div>
                <LoadingPlaceholder {...args} icon={false} description={false} />
            </div>
            <div>
                <LoadingPlaceholder {...args} icon={false} />
            </div>
            <div>
                <LoadingPlaceholder {...args} icon={Image} description={false} />
            </div>
            <div>
                <LoadingPlaceholder {...args} icon={Image} />
            </div>
        </VStack>
    );
}

export const Static = StaticTemplate.bind({});
// @ts-ignore
Static.args = {
    description: 'Loading image',
    progress: 50,
};

function DynamicTemplate(args: { estimatedDuration: number; description: string }) {
    const [progress, setProgress] = useState(0);

    useEffect(function () {
        const timer = setInterval(function () {
            setProgress((currentProgress) => (currentProgress + 1) % 100);
        }, 50);

        return () => clearInterval(timer);
    });

    return (
        <VStack spacing="2">
            <div>
                <LoadingPlaceholder
                    {...args}
                    icon={false}
                    description={false}
                    progress={progress}
                />
            </div>
            <div>
                <LoadingPlaceholder {...args} icon={false} progress={progress} />
            </div>
            <div>
                <LoadingPlaceholder
                    {...args}
                    icon={Image}
                    description={false}
                    progress={progress}
                />
            </div>
            <div>
                <LoadingPlaceholder {...args} icon={Image} progress={progress} />
            </div>
        </VStack>
    );
}

export const Dynamic = DynamicTemplate.bind({});
// @ts-ignore
Dynamic.args = {
    description: 'Loading image',
    estimatedDuration: 1000,
};

function ApproxProgressTemplate(args: { estimatedDuration: number; description: string }) {
    const [key, setKey] = useState('id-0');

    function restart() {
        setKey(`id-${new Date().getTime()}`);
    }

    return (
        <VStack spacing="2">
            <div>
                <button onClick={restart}>Restart</button>
            </div>
            <div>
                <LoadingPlaceholder key={key} {...args} icon={false} description={false} />
            </div>
            <div>
                <LoadingPlaceholder key={key} {...args} icon={false} />
            </div>
            <div>
                <LoadingPlaceholder key={key} {...args} icon={Image} description={false} />
            </div>
            <div>
                <LoadingPlaceholder key={key} {...args} icon={Image} />
            </div>
        </VStack>
    );
}

export const ApproxProgress = ApproxProgressTemplate.bind({});
// @ts-ignore
ApproxProgress.args = {
    description: 'Loading image',
    estimatedDuration: 1000,
};

function ResponsiveTemplate(args: { estimatedDuration: number; description: string }) {
    const [key, setKey] = useState('id-0');

    function restart() {
        setKey(`id-${new Date().getTime()}`);
    }

    return (
        <VStack spacing="2">
            <div>
                <button onClick={restart}>Restart</button>
            </div>
            <div>
                <ResponsiveLoadingPlaceholder
                    key={key}
                    {...args}
                    icon={false}
                    description={false}
                    style={{ resize: 'both', overflow: 'auto' }}
                />
            </div>
            <div>
                <ResponsiveLoadingPlaceholder
                    key={key}
                    {...args}
                    icon={false}
                    style={{ resize: 'both', overflow: 'auto' }}
                />
            </div>
            <div>
                <ResponsiveLoadingPlaceholder
                    key={key}
                    {...args}
                    icon={Image}
                    description={false}
                    style={{ resize: 'both', overflow: 'auto' }}
                />
            </div>
            <div>
                <ResponsiveLoadingPlaceholder
                    key={key}
                    {...args}
                    icon={Image}
                    style={{ resize: 'both', overflow: 'auto' }}
                />
            </div>
        </VStack>
    );
}

export const Responsive = ResponsiveTemplate.bind({});
// @ts-ignore
Responsive.args = {
    description: 'Loading image',
    estimatedDuration: 1000,
};
