import { ListItemNode, ListItemTextNode, TextNode } from '@prezly/slate-types';

declare module '@prezly/slate-types' {
    interface AdditionalCustomTypes {
        Element: ListItemNode | ListItemTextNode;
        Text: TextNode;
    }
}
