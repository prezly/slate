declare module '@prezly/slate-editor/theme' {
    declare namespace ToolboxTheme {
        export interface Values {
            background: string;
            borderRadius: string;
            delimiterColor: string;
            padding: string;
            textColorName: keyof TextTheme.Colors;
        }
    }

    export interface Theme {
        toolbox: ToolboxTheme.Values;
    }
}
