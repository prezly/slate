declare module '@prezly/slate-editor/theme' {
    declare namespace BoxTheme {
        export interface Spacing {
            none: string;
            xs: string;
            s: string;
            sm: string;
            m: string;
            lm: string;
            l: string;
        }

        export type BoxSizes = keyof Spacing | 'auto';

        export interface Values {
            spacing: Spacing;
        }
    }

    export interface Theme {
        box: BoxTheme.Values;
    }
}
