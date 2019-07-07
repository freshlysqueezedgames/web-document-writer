import { RecordOf, List, Record } from 'immutable';
import { Highlight } from '../types';
import { Action } from '../actions';
export declare type HighlightRecord = RecordOf<Highlight>;
export declare const HighlightRecordFactory: Record.Factory<Highlight>;
declare const HighlightsReducer: (state: List<RecordOf<Highlight>>, action: Action) => List<RecordOf<Highlight>>;
export default HighlightsReducer;
//# sourceMappingURL=HighlightsReducer.d.ts.map