import type { Theme } from '@prezly/slate-editor/theme';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from './dark';

interface SlateEditorThemeProviderProps {
    theme?: Theme;
}

export function SlateEditorThemeProvider(
    props: React.PropsWithChildren<SlateEditorThemeProviderProps>,
) {
    return <ThemeProvider theme={props.theme ?? theme}>{props.children}</ThemeProvider>;
}
