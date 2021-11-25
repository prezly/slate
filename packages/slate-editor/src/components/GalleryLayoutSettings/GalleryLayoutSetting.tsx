/* eslint jsx-a11y/label-has-associated-control: "warn" */
import type { MouseEvent, ReactNode } from 'react';
import * as React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

interface Props<Size extends string> {
    label: ReactNode;
    name: string;
    onChange: (value: Size) => void;
    options: { label: string; value: Size }[];
    value: Size;
}

const GalleryLayoutSetting = <Size extends string>({
    label,
    name,
    onChange,
    options,
    value,
}: Props<Size>) => (
    <div className="gallery-layout-settings__setting">
        <label className="gallery-layout-settings__setting-label">{label}</label>
        <ToggleButtonGroup name={name} onChange={onChange} type="radio" value={value}>
            {options.map((option) => (
                <ToggleButton
                    key={option.value}
                    onClick={(event: MouseEvent<ToggleButton>) => {
                        /*
                            ToggleButtonGroup's onChange callback is not triggered, see:
                            https://github.com/react-bootstrap/react-bootstrap/issues/2734

                            This happens because of this line:
                            https://github.com/prezly/prezly/blob/174cf9540feb8ea32413264a8e26b3a4a70acc78/apps/backend/resources/javascripts/other/vendor/index.js#L8
                            Which, when removed, causes bootstrap-editable.js to throw errors.
                            Probably more code would be affected by removing this line.

                            So I used ToggleButton's onClick as a workaround.
                        */
                        event.preventDefault();
                        onChange(option.value);
                    }}
                    value={option.value}
                >
                    {option.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    </div>
);

export default GalleryLayoutSetting;
