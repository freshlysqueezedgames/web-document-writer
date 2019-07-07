import { Action } from '../actions';
import { CursorStateRecord } from '../types';
export declare const defaultCursorStateRecord: CursorStateRecord;
declare const CursorReducer: (state: import("immutable").RecordOf<Readonly<{
    top: number;
    right: number;
    bottom: number;
    left: number;
    offsetX: number;
    offsetY: number;
}>> | undefined, action: Action) => import("immutable").RecordOf<Readonly<{
    top: number;
    right: number;
    bottom: number;
    left: number;
    offsetX: number;
    offsetY: number;
}>>;
export default CursorReducer;
//# sourceMappingURL=CursorReducer.d.ts.map