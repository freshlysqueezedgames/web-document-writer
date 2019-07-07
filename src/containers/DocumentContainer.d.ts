import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { EditorStateRecord } from '../store/reducers/EditorReducer';
import { DocumentComponentConfig, DROP_MODE, DOCUMENT_COMPONENT_TYPE, DOCUMENT_HIGHLIGHT_TYPE } from '../store/types';
interface DocumentContainerMappedDispatchProps {
    OnAppendContent: (id: string, value: string, componentType?: DOCUMENT_COMPONENT_TYPE) => void;
    OnPrependContent: (id: string, value: string) => void;
    OnContentChange: (id: string, content: string, index: number, difference: number) => void;
    OnFocusChange: (id: string) => void;
    OnCursorChange: (top: number, right: number, bottom: number, left: number) => void;
    OnComponentTypeChange: (componentType: number) => void;
    OnHighlightTypeChange: (highlightType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number) => void;
    OnRemoveHighlightType: (highlightType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number) => void;
    OnDeleteHighlight: (componentId: string, id: string) => void;
    OnCursorOffsetChange: (offsetX: number, offsetY: number) => void;
    OnRemoveContent: (id: string) => void;
    OnMoveTarget: (id: string, mode: DROP_MODE) => void;
    OnMove: (id: string) => void;
}
export interface DocumentContainerProps extends DocumentContainerMappedDispatchProps {
    presentation?: (props: DocumentContainerPresentationProps) => React.ReactElement;
}
export interface DocumentContainerPresentationProps extends DocumentContainerMappedDispatchProps {
    slug: string;
    components: Array<DocumentComponentConfig>;
}
interface MapStateProps {
    state: EditorStateRecord;
}
declare class DocumentContainer extends React.Component<DocumentContainerProps & MapStateProps> {
    private element;
    ElementRef: (ref: HTMLDivElement | null) => HTMLDivElement | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    UpdateOffsets: () => void;
    render(): React.ReactElement<typeof React.Fragment>;
}
declare const _default: ReactRedux.ConnectedComponentClass<typeof DocumentContainer, Pick<DocumentContainerProps & MapStateProps, "presentation">>;
export default _default;
//# sourceMappingURL=DocumentContainer.d.ts.map