import React, { createContext, ReactElement, ReactNode, useContext } from 'react';

export enum Theme {
    CLASSIC = 'classic',
    DARK = 'dark',
}

const ToolbarsTheme = createContext<Theme>(Theme.CLASSIC);

export function useToolbarsTheme(): Theme {
    return useContext(ToolbarsTheme);
}

export function withToolbarsThemeContext(theme: Theme, children: ReactNode): ReactElement {
    return (
        <ToolbarsTheme.Provider value={theme}>
            {children}
        </ToolbarsTheme.Provider>
    );
}

export const CLASSIC = Theme.CLASSIC;
export const DARK = Theme.DARK;
