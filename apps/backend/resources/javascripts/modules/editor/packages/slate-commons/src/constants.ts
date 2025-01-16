import { v4 as uuidV4 } from 'uuid';

// Name of the property that will be used to store node ids. Randomized to avoid collisions.
export const NODE_ID_MANAGER_ID_PROPERTY_NAME = uuidV4();
