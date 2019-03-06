import { RecordOf } from 'immutable';
import { Action } from '../actions';
import { CursorStateRecord } from '../types';
export declare const defaultCursorStateRecord: CursorStateRecord;
declare const CursorReducer: (state: RecordOf<Readonly<{
    top: number;
    right: number;
    bottom: number;
    left: number;
}>> | undefined, action: Action) => RecordOf<Readonly<{
    top: number;
    right: number;
    bottom: number;
    left: number;
}>>;
export default CursorReducer;
//# sourceMappingURL=CursorReducer.d.ts.map