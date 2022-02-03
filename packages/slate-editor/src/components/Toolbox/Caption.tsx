import * as React from 'react';
import { useTheme } from 'styled-components';

import { Text } from '#components';

interface CaptionProps {
    withCloseButton?: boolean;
}

export function Caption(props: React.PropsWithChildren<CaptionProps>) {
    const theme = useTheme();

    return (
        <Text color={theme.toolbox.textColorName} fontWeight="bold">
            {props.children}
        </Text>
    );
}
