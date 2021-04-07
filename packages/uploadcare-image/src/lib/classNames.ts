type FalsyValue = undefined | null | false;

export default function classNames(...args: Array<string | FalsyValue>) {
    return args.filter(Boolean).join(' ');
}