declare module '@prezly/slate-editor/theme' {
    declare namespace TextTheme {
        export type FontWeight = 'normal' | 'bold';
        export interface Colors {
            primary: string;
        }

        export interface Sizes {
            xs: string;
            s: string;
            m: string;
            l: string;
        }

        export interface Values {
            colors: Colors;
            sizes: Sizes;
        }
    }

    export interface Theme {
        text: TextTheme.Values;
    }
}
