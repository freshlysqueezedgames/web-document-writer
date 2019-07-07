import { Range } from '../types';
export interface Indices {
    from: number;
    length: number;
}
export declare const RangeIndices: <T extends Range>(ranges: T[], insert: T) => Indices;
export declare const AddRange: <T extends Range>(ranges: T[], insert: T) => T[];
export declare const UpdateRanges: <T extends Range>(list: T[], index: number, difference: number) => T[];
export declare const RemoveRanges: <T extends Range>(list: T[], start: number, end: number, condition: (item: T) => boolean) => T[];
//# sourceMappingURL=index.d.ts.map