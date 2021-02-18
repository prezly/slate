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
        const html = event.clipboardData.getData('text/html');
        const rtf = event.clipboardData.getData('text/rtf');

        try {
            const cleanHtml = cleanDocx(html, rtf);
            setValue(cleanHtml);
        } catch (error) {
            setValue(error.message);
            console.error(error);
        }
    };

    return <textarea value={value} onPaste={handlePaste} />;
};

export default MyComponent;
```

----

Brought to you by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/docx-cleaner).
