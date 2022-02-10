import * as React from 'react';

import type { StackProps } from './Stack';
import { Stack } from './Stack';

interface VStackProps extends Omit<StackProps, 'direction'> {}

export function VStack(props: React.PropsWithChildren<VStackProps>) {
    return <Stack {...props} direction="column" />;
}
