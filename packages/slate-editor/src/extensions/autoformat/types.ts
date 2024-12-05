import type { AutoformatRule } from '@udecode/plate-autoformat';

export interface AutoformatParameters {
    /**
     * A list of triggering rules.
     */
    rules: AutoformatRule[];
}
