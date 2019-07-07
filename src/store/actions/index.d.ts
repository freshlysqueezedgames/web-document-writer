import { DOCUMENT_COMPONENT_TYPE, DROP_MODE, DOCUMENT_HIGHLIGHT_TYPE, HighlightOptions, DocumentComponentConfig } from '../types';
export interface DocumentAction {
    type: 'SET_DOCUMENT';
    slug: string;
    content: DocumentComponentConfig[];
}
export interface AddComponentAction {
    id: string;
    content: string;
    focused: boolean;
    componentType: number;
}
export interface PrependComponentAction extends AddComponentAction {
    type: 'PREPEND_COMPONENT';
    before: string;
}
export interface AppendComponentAction extends AddComponentAction {
    type: 'APPEND_COMPONENT';
    after: string;
}
export interface UpdateComponentAction {
    type: 'UPDATE_COMPONENT';
    id: string;
    content: string;
    index: number;
    difference: number;
}
export interface RemoveComponentAction {
    type: 'REMOVE_COMPONENT';
    id: string;
}
export interface UpdateComponentTypeAction {
    type: 'UPDATE_COMPONENT_TYPE';
    componentType: number;
}
export interface UpdateHighlightTypeAction {
    type: 'UPDATE_HIGHLIGHT_TYPE';
    highlightType: number;
    startOffset: number;
    endOffset: number;
    options?: HighlightOptions;
}
export interface RemoveHighlightTypeAction {
    type: 'REMOVE_HIGHLIGHT_TYPE';
    highlightType: DOCUMENT_HIGHLIGHT_TYPE;
    startOffset: number;
    endOffset: number;
}
export interface DeleteHighlightAction {
    type: 'DELETE_HIGHLIGHT';
    componentId: string;
    id: string;
}
export interface FocusComponentAction {
    type: 'FOCUS_COMPONENT';
    id: string;
}
export interface UpdateCursorAction {
    type: 'UPDATE_CURSOR';
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface UpdateCursorOffsetsAction {
    type: 'UPDATE_CURSOR_OFFSETS';
    offsetX: number;
    offsetY: number;
}
export interface MoveTargetComponentAction {
    type: 'MOVE_TARGET_COMPONENT_ACTION';
    id: string;
    mode: DROP_MODE;
}
export interface MoveComponentAction {
    type: 'MOVE_COMPONENT_ACTION';
    id: string;
}
export interface RangeAction {
    id: string;
    start: number;
    end: number;
    options?: HighlightOptions;
}
export interface HighlightRangeAction extends RangeAction {
    type: 'HIGHLIGHT_RANGE';
    name: DOCUMENT_HIGHLIGHT_TYPE;
}
export interface ComponentRangeAction extends RangeAction {
    type: 'COMPONENT_RANGE';
    name: DOCUMENT_COMPONENT_TYPE;
}
export interface UndoAction {
    type: 'UNDO';
}
export interface RedoAction {
    type: 'REDO';
}
export declare type Action = DocumentAction | PrependComponentAction | AppendComponentAction | UpdateComponentAction | UpdateComponentTypeAction | UpdateHighlightTypeAction | RemoveHighlightTypeAction | DeleteHighlightAction | FocusComponentAction | UpdateCursorAction | UpdateCursorOffsetsAction | RemoveComponentAction | MoveTargetComponentAction | MoveComponentAction | HighlightRangeAction | UndoAction | RedoAction | {
    type: 'EMPTY';
};
export declare const SetDocument: (slug: string, content: DocumentComponentConfig[]) => DocumentAction;
export declare const PrependComponent: (before: string, id: string, content: string, focused?: boolean, componentType?: number) => PrependComponentAction;
export declare const AppendComponent: (after: string, id: string, content: string, focused?: boolean, componentType?: number) => AppendComponentAction;
export declare const UpdateComponent: (id: string, content: string, index: number, difference: number) => UpdateComponentAction;
export declare const UpdateComponentType: (componentType: number) => UpdateComponentTypeAction;
export declare const UpdateHighlightType: (highlightType: number, startOffset: number, endOffset: number, options?: import("../types").LinkOptions | undefined) => UpdateHighlightTypeAction;
export declare const RemoveHighlightType: (highlightType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number) => RemoveHighlightTypeAction;
export declare const DeleteHighlight: (componentId: string, id: string) => DeleteHighlightAction;
export declare const FocusComponent: (id: string) => FocusComponentAction;
export declare const UpdateCursor: (top: number, right: number, bottom: number, left: number) => UpdateCursorAction;
export declare const UpdateCursorOffsets: (offsetX: number, offsetY: number) => UpdateCursorOffsetsAction;
export declare const RemoveComponent: (id: string) => RemoveComponentAction;
export declare const MoveTargetComponent: (id: string, mode?: DROP_MODE) => MoveTargetComponentAction;
export declare const MoveComponent: (id: string) => MoveComponentAction;
export declare const HighlightRange: (id: string, start: number, end: number, name: DOCUMENT_HIGHLIGHT_TYPE, options?: import("../types").LinkOptions | undefined) => HighlightRangeAction;
export declare const ComponentRange: (id: string, start: number, end: number, name: DOCUMENT_COMPONENT_TYPE, options?: import("../types").LinkOptions | undefined) => ComponentRangeAction;
export declare const Undo: () => UndoAction;
export declare const Redo: () => RedoAction;
//# sourceMappingURL=index.d.ts.map