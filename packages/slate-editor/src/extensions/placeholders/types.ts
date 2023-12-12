import type { NewsroomRef, OEmbedInfo } from '@prezly/sdk';
import type { Path } from 'slate';

import type { PlaceholderNode } from './PlaceholderNode';

export type FetchOEmbedFn = (url: string) => Promise<OEmbedInfo>;

export type { Props as FrameProps } from './components/Frame';

export type RemovableFlagConfig = boolean | ((element: PlaceholderNode, path: Path) => boolean);

export type WithMediaGalleryTab = false | { enabled: boolean; newsroom: NewsroomRef };
