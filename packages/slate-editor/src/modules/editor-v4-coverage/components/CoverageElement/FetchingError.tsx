import type { FunctionComponent } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';

import type { ApiError } from '../../../../modules/api';
import { HttpCodes } from '../../../../modules/api';

interface Props {
    className?: string;
    error: ApiError;
    onRetry: () => void;
}

export const FetchingError: FunctionComponent<Props> = ({ className, error, onRetry }) => {
    if (error.status === HttpCodes.NOT_FOUND) {
        return (
            <div className={className}>
                Selected coverage no longer exists and will not be displayed.
            </div>
        );
    }

    return (
        <div className={className}>
            We have encountered a problem when loading your coverage.
            <Button bsSize="xs" onClick={onRetry}>
                Try again
            </Button>
        </div>
    );
};
