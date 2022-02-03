import type { StackTheme } from '@prezly/slate-editor/theme';
import styled, { css } from 'styled-components';

import type { FlexProps } from '#components';
import { Flex } from '#components';

export interface StackProps extends FlexProps {
    spacing: StackTheme.StackSizes;
}

export const Stack = styled(Flex)<StackProps>`
    ${(props) =>
        props.flexDirection === 'column' &&
        props.spacing &&
        css`
            & > * {
                margin-bottom: ${props.theme.stack.spacing[props.spacing]};
            }

            & > *:last-child {
                margin-bottom: 0;
            }
        `}

    ${(props) =>
        props.flexDirection === 'column-reverse' &&
        props.spacing &&
        css`
            & > * {
                margin-top: ${props.theme.stack.spacing[props.spacing]};
            }

            & > *:last-child {
                margin-top: 0;
            }
        `}

    ${(props) =>
        props.flexDirection === 'row' &&
        props.spacing &&
        css`
            & > * {
                margin-right: ${props.theme.stack.spacing[props.spacing]};
            }

            & > *:last-child {
                margin-right: 0;
            }
        `}

    ${(props) =>
        props.flexDirection === 'row-reverse' &&
        props.spacing &&
        css`
            & > * {
                margin-left: ${props.theme.stack.spacing[props.spacing]};
            }

            & > *:last-child {
                margin-left: 0;
            }
        `}
`;
