import * as React from 'react';

import { Box } from '#components';

export default {
    title: 'Components/Box',
    component: Box,
};

export function Base() {
    return (
        <Box m="lm" pr="xs" textAlign="right">
            Box
        </Box>
    );
}

export function AsTag() {
    return (
        <Box as="p" m="lm" pr="xs" textAlign="right">
            p tag
        </Box>
    );
}

export function AsCustomComponent() {
    return (
        <Box as={CustomComponent} m="lm" pr="xs" textAlign="right" headerCaption="h1 component" />
    );
}

function CustomComponent({ headerCaption, ...props }: { headerCaption: string }) {
    return <h1 {...props}>{headerCaption}</h1>;
}
