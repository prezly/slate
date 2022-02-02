declare module '@prezly/slate-editor/theme' {
    declare namespace TextTheme {
        export type FontWeight = 'normal' | 'bold';
        export interface Colors {
            primary: string;
        }

        export interface Sizes {
            // $font-size-x-small: 12px;
            // $font-size-small: 14px;
            // $font-size-medium: 16px;
            // $font-size-large: 18px;

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
