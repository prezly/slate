import * as React from 'react';

import type { BoxProps } from '#components';
import { Box } from '#components';

export default {
    title: 'Components/Box',
    component: Box,
};

export function Playground(props: BoxProps) {
    return <Box {...props}>Box</Box>;
}
