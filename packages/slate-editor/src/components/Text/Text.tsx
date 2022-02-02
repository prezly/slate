import type { TextTheme } from '@prezly/slate-editor/theme';
import styled from 'styled-components';

interface TextProps {
    color?: keyof TextTheme.Colors;
}

export const Text = styled.span<TextProps>`
    color: ${(props) => props.theme.text.colors[props.color ?? 'primary']};
    font-size: ${(props) => props.theme.text.sizes.s};
`;
