declare module 'popper-max-size-modifier' {
    import type { Modifier } from 'react-popper';
    declare const maxSize: Modifier<'maxSize', Modifier<'preventOverflow'>['options']>;
    export default maxSize;
}
