import { List, RecordOf } from 'immutable';
export declare enum DOCUMENT_COMPONENT_TYPE {
    NONE = -1,
    PARAGRAPH = 0,
    HEADER_1 = 1,
    HEADER_2 = 2,
    HEADER_3 = 3,
    CODE = 4,
    IMAGE = 5
}
export declare enum DOCUMENT_HIGHLIGHT_TYPE {
    BOLD = 0,
    ITALIC = 1,
    UNDERLINE = 2,
    LINK = 3
}
export declare enum DROP_MODE {
    NONE = 0,
    APPEND = 1,
    PREPEND = 2
}
export interface LinkOptions {
    url: string;
}
export declare type HighlightOptions = LinkOptions;
export interface Range {
    start: number;
    end: number;
}
export interface Highlight extends Range {
    id: string;
    name: DOCUMENT_HIGHLIGHT_TYPE;
    options?: HighlightOptions;
}
export interface DocumentComponentBase {
    content: string;
    componentType: DOCUMENT_COMPONENT_TYPE;
}
export interface DocumentComponentDefinition extends DocumentComponentBase {
    highlights?: Highlight[];
}
export interface DocumentComponentConfig extends DocumentComponentDefinition {
    id: string;
    focused: boolean;
    drop: DROP_MODE;
}
export interface DocumentComponentState extends DocumentComponentBase {
    id: string;
    focused: boolean;
    drop: DROP_MODE;
    highlights: List<RecordOf<Highlight>>;
}
export declare type DocumentComponentStateRecord = RecordOf<DocumentComponentState>;
export interface DocumentState {
    slug: string;
    components: List<DocumentComponentStateRecord>;
}
export declare type DocumentStateRecord = RecordOf<DocumentState>;
export declare type CursorState = Readonly<{
    top: number;
    right: number;
    bottom: number;
    left: number;
    offsetX: number;
    offsetY: number;
}>;
export declare type CursorStateRecord = RecordOf<CursorState>;
export interface EditorState {
    cursor: CursorStateRecord;
    document: DocumentStateRecord;
}
//# sourceMappingURL=index.d.ts.map