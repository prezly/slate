import * as React from 'react';

import type { StackProps } from './Stack';
import { Stack } from './Stack';

interface VStackProps extends Omit<StackProps, 'flexDirection'> {}

export function VStack(props: React.PropsWithChildren<VStackProps>) {
    return <Stack {...props} flexDirection="column" />;
}
