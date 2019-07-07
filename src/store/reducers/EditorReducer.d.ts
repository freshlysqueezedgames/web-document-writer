import { RecordOf } from 'immutable';
import { Action } from '../actions';
import { EditorState } from '../types';
export declare type EditorStateRecord = RecordOf<EditorState>;
declare const EditorReducer: (state: RecordOf<EditorState> | undefined, action: Action) => RecordOf<EditorState>;
export default EditorReducer;
//# sourceMappingURL=EditorReducer.d.ts.map