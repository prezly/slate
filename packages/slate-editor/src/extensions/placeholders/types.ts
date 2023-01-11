import type { OEmbedInfo } from '@prezly/sdk';

export type FetchOEmbedFn = (url: string) => Promise<OEmbedInfo>;

export type { Props as FrameProps } from './components/Frame';
