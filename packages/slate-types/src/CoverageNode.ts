import { Coverage } from '@prezly/sdk';

export default interface CoverageNode {
    coverage: {
        id: Coverage['id'];
    };
    type: 'coverage';
    uuid: string;
}
