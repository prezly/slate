import * as React from 'react';
import { useEffect, useState } from 'react';

import { PlaceholderAttachment } from '#icons';

import { Placeholder } from './Placeholder';

export default {
    title: 'Extensions/Placeholders/components/Placeholder',
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ width: 680 }}>
                <Story />
            </div>
        ),
    ],
};

const ICON = PlaceholderAttachment;
const TITLE = 'Drag or click to upload an attachment';
const DRAGOVER_TITLE = 'Drop a file here';
const UPLOADING_TITLE = 'Uploading file';
const DESCRIPTION = 'Supported formats: pdf, .ppt, Keynote, .zip, .doc, etc. - Max. 25MB';

export function Default() {
    return <Placeholder icon={ICON} title={TITLE} description={DESCRIPTION}></Placeholder>;
}

export function Format16By9() {
    return (
        <Placeholder
            format="16:9"
            icon={ICON}
            title={TITLE}
            description={DESCRIPTION}
        ></Placeholder>
    );
}

export function Selected() {
    return (
        <div style={{ outline: '6px solid #f9ca7b' }}>
            <Placeholder icon={ICON} title={TITLE} description={DESCRIPTION} selected />
        </div>
    );
}

export function Dragover() {
    return <Placeholder icon={ICON} title={DRAGOVER_TITLE} description={DESCRIPTION} dragOver />;
}

export function SelectedDragover() {
    return (
        <div style={{ outline: '6px solid #f9ca7b' }}>
            <Placeholder icon={ICON} title={TITLE} description={DESCRIPTION} dragOver selected />
        </div>
    );
}

export function KnownProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => Math.min(100, p + 5));
        }, 500);
        return () => clearInterval(interval);
    }, []);
    return (
        <Placeholder
            icon={ICON}
            title={UPLOADING_TITLE}
            description={DESCRIPTION}
            progress={progress}
        />
    );
}

export function UnknownProgress() {
    return <Placeholder icon={ICON} title={UPLOADING_TITLE} description={DESCRIPTION} progress />;
}
