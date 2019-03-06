import { DocumentComponentState } from '../types';
export interface DocumentAction {
    type: 'SET_DOCUMENT';
    slug: string;
    content: DocumentComponentState[];
}
export interface AppendComponentAction {
    type: 'APPEND_COMPONENT';
    after: string;
    id: string;
    content: string;
    focused: boolean;
    componentType: number;
}
export interface UpdateComponentAction {
    type: 'UPDATE_COMPONENT';
    id: string;
    content: string;
}
export interface UpdateComponentTypeAction {
    type: 'UPDATE_COMPONENT_TYPE';
    componentType: number;
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
export declare type Action = DocumentAction | AppendComponentAction | UpdateComponentAction | UpdateComponentTypeAction | FocusComponentAction | UpdateCursorAction | {
    type: 'EMPTY';
};
export declare const SetDocument: (slug: string, content: DocumentComponentState[]) => DocumentAction;
export declare const AppendComponent: (after: string, id: string, content: string, focused?: boolean, componentType?: number) => AppendComponentAction;
export declare const UpdateComponent: (id: string, content: string) => UpdateComponentAction;
export declare const UpdateComponentType: (componentType: number) => {
    type: string;
    componentType: number;
};
export declare const FocusComponent: (id: string) => FocusComponentAction;
export declare const UpdateCursor: (top: number, right: number, bottom: number, left: number) => UpdateCursorAction;
//# sourceMappingURL=index.d.ts.map