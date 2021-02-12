# @prezly/docx-cleaner

Normalize dirty HTML and DOCX/RTF documents into clean, understandable HTML

![Version](https://img.shields.io/npm/v/@prezly/docx-cleaner)
![License](https://img.shields.io/npm/l/@prezly/docx-cleaner)

## Usage

```tsx
import React, { ClipboardEvent, useState } from 'react';
import { cleanDocx } from '@prezly/docx-cleaner';

const MyComponent = () => {
    const [value, setValue] = useState<string>('');

    const handlePaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const html = data.getData('text/html');
        const rtf = data.getData('text/rtf');

        try {
            const cleanHtml = cleanDocx(html, rtf);
            setValue(cleanHtml);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <textarea value={value} onPaste={handlePaste} />
    );
};

export default MyComponent;
```
