import * as React from 'react';

import type { StackProps } from './Stack';
import { Stack } from './Stack';

interface HStackProps extends Omit<StackProps, 'direction'> {}

export function HStack(props: React.PropsWithChildren<HStackProps>) {
    return <Stack {...props} direction="row" />;
}
