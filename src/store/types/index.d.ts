import { List, RecordOf } from 'immutable';
export declare const DOCUMENT_COMPONENT_TYPE: {
    [index: string]: number;
};
export declare type DocumentComponentState = {
    id: string;
    content: string;
    focused: boolean;
    componentType: number;
};
export declare type DocumentComponentStateRecord = RecordOf<DocumentComponentState>;
export declare type DocumentState = {
    slug: string;
    components: List<DocumentComponentStateRecord>;
};
export declare type DocumentStateRecord = RecordOf<DocumentState>;
export declare type CursorState = Readonly<{
    top: number;
    right: number;
    bottom: number;
    left: number;
}>;
export declare type CursorStateRecord = RecordOf<CursorState>;
export declare type EditorState = {
    cursor: CursorStateRecord;
    document: DocumentStateRecord;
};
//# sourceMappingURL=index.d.ts.map