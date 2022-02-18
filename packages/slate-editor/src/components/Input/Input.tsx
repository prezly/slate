import * as React from 'react';

interface InputProps {
    value: string;
    onChange: (newValue: string) => void;
}

export function Input(props: InputProps) {
    return <input value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)} />;
}
