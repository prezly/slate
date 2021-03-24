import { useEffect, useState } from 'react';

export default function useLinkCandidateElement(
    linkCandidateId: string | null,
): HTMLElement | null {
    const [linkCandidateElement, setLinkCandidateElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // This component re-renders before the link candidate element is rendered in some cases
        // so we use a `setTimeout` to get the DOM element after the re-render task loop.
        const timeoutId = setTimeout(() => {
            // Using a state to trigger a re-render to ensure `ElementPortal` renders correctly.
            setLinkCandidateElement(
                linkCandidateId ? document.getElementById(linkCandidateId) : null,
            );
        });

        return () => clearTimeout(timeoutId);
    }, [linkCandidateId]);

    return linkCandidateElement;
}
