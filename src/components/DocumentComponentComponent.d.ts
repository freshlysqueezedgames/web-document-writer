import * as React from 'react';
import './DocumentComponentComponent.scss';
export declare type DocumentComponentComponentProps = Readonly<{
    id: string;
    content: string;
    focused: boolean;
    componentType: number;
    OnContentChange?: (id: string, content: string) => void;
    OnContentAddition?: (id: string, content: string) => void;
    OnFocus?: (id: string) => void;
    OnCursorChange?: (top: number, right: number, bottom: number, left: number) => void;
}>;
export declare type DocumentComponentComponentState = Readonly<{
    startOffset: number;
    endOffset: number;
}>;
export declare type Range = Readonly<{
    startOffset: number;
    endOffset: number;
}>;
export default class DocumentComponentComponent extends React.Component<DocumentComponentComponentProps, DocumentComponentComponentState> {
    textAreaRef: HTMLTextAreaElement | null;
    componentRef: HTMLElement | null;
    spanRef: HTMLSpanElement | null;
    ctrlPressed: boolean;
    offsetUpdate: boolean;
    state: DocumentComponentComponentState;
    TextAreaRef: (ref: HTMLTextAreaElement | null) => void;
    ComponentRef: (ref: HTMLElement | null) => void;
    SpanRef: (ref: HTMLSpanElement | null) => void;
    HandleTextAreaChange: () => void;
    HandleContentClick: () => void;
    HandleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    HandleKeyUp: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    SetStateOffset(): void;
    RenderComponentType(): React.ReactElement;
    RenderContentSpan(): JSX.Element;
    render(): React.ReactElement<HTMLDivElement>;
    componentDidUpdate(): void;
}
//# sourceMappingURL=DocumentComponentComponent.d.ts.map