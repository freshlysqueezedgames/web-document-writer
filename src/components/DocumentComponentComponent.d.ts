import React from 'react';
import { DOCUMENT_COMPONENT_TYPE, DROP_MODE, Range, Highlight, HighlightOptions } from '../store/types';
export declare const DRAG_IDENTIFIER: string;
export declare type DocumentComponentComponentProps = Readonly<{
    id: string;
    content: string;
    focused: boolean;
    drop: DROP_MODE;
    componentType: number;
    highlights?: Highlight[];
    OnContentChange?: (id: string, content: string, index: number, difference: number) => void;
    OnAppendContent?: (id: string, content: string, componentType?: DOCUMENT_COMPONENT_TYPE) => void;
    OnPrependContent?: (id: string, content: string) => void;
    OnFocus?: (id: string) => void;
    OnCursorChange?: (top: number, right: number, bottom: number, left: number) => void;
    OnRemoveContent?: (id: string) => void;
    OnMoveTarget?: (id: string, mode: DROP_MODE) => void;
    OnMove?: (id: string) => void;
    OnImageUpload?: (data: string) => Promise<string>;
    OnHighlightChange?: (startOffset: number, endOffset: number) => void;
    OnDeleteHighlight?: (componentId: string, id: string) => void;
}>;
export declare type DocumentComponentComponentState = Readonly<{
    startOffset: number;
    endOffset: number;
    mouseMode: string;
    draggable: boolean;
}>;
export declare type OffsetRange = Readonly<{
    startOffset: number;
    endOffset: number;
}>;
export interface RenderHighlight extends Highlight {
    rendered: boolean;
    options?: HighlightOptions;
}
export interface SelectionHighlight extends Range {
    id: string;
    name: -1;
    rendered: boolean;
}
export default class DocumentComponentComponent extends React.Component<DocumentComponentComponentProps, DocumentComponentComponentState> {
    textAreaRef: HTMLTextAreaElement | null;
    containerRef: HTMLDivElement | null;
    componentRef: HTMLElement | null;
    spanRef: HTMLSpanElement | null;
    ctrlPressed: boolean;
    shiftPressed: boolean;
    offsetUpdate: boolean;
    dropMode: DROP_MODE;
    state: DocumentComponentComponentState;
    TextAreaRef: (ref: HTMLTextAreaElement | null) => void;
    ContainerRef: (ref: HTMLDivElement | null) => void;
    ComponentRef: (ref: HTMLElement | null) => void;
    SpanRef: (ref: HTMLSpanElement | null) => void;
    HandleTextAreaChange: () => void;
    HandleContentClick: () => void;
    HandleMouseEnter: () => void;
    HandleMouseExit: () => void;
    OnDeleteHighlight: (id: string) => void | undefined;
    IterateBackwardsThroughNodes(node: Node | null, callback: (node: Node, parent: boolean) => boolean | void): void;
    GetNodeTextOffset(node: Node | null): number;
    GetFurthestNode(node1: Node | null, node2: Node | null): boolean;
    HandleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    HandleKeyUp: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    MakeDraggable: () => void;
    HandleDragStart: () => void;
    HandleDragEnd: () => void;
    HandleDragOver: (event: React.DragEvent<HTMLElement>) => void;
    HandleUpload: (result: string) => Promise<void>;
    HandleDrop: () => string;
    SetStateOffset(): void;
    AppendContent: () => void;
    PrependContent: () => void;
    RemoveContent: () => void;
    RenderComponentType(): React.ReactElement;
    RenderContent(highlights: (RenderHighlight | SelectionHighlight)[], content: string): (JSX.Element | string)[];
    RenderContentHighlight(highlights: (RenderHighlight | SelectionHighlight)[], content: string, last: {
        end: number;
        length: number;
    }, i?: number): (JSX.Element | string)[];
    InsertSelectionHighlight(highlights: Highlight[]): (RenderHighlight | SelectionHighlight)[];
    RenderContentSpan(): (string | JSX.Element)[];
    RenderTextArea(): JSX.Element | null;
    render(): React.ReactElement<HTMLDivElement>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    ImmediatelyUpdateCursor: () => false | void;
    UpdateCursor(overrule?: boolean): void;
}
//# sourceMappingURL=DocumentComponentComponent.d.ts.map