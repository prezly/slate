declare module '@prezly/slate-editor/theme' {
    declare namespace StackTheme {
        export interface Spacing {
            none: string;
            xs: string;
            s: string;
            sm: string;
            m: string;
            lm: string;
            l: string;
        }

        export type StackSizes = keyof Spacing;

        export interface Values {
            spacing: Spacing;
        }
    }

    export interface Theme {
        stack: StackTheme.Values;
    }
}
