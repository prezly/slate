declare module '@prezly/slate-editor/theme' {
    export interface ToolboxTheme {
        background: string;
        borderRadius: string;
        padding: string;
        textColorName: keyof TextTheme.Colors;
    }

    export interface Theme {
        toolbox: ToolboxTheme;
    }
}
