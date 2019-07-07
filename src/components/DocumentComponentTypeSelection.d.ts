import * as React from 'react';
import { LinkOptions, DocumentComponentConfig } from '../store/types';
import { DOCUMENT_COMPONENT_TYPE, DOCUMENT_HIGHLIGHT_TYPE, HighlightOptions } from '../store/types';
import { KeyMap } from './Animated';
export interface DocumentComponentTypeSelectionProps {
    startOffset: number;
    endOffset: number;
    component: DocumentComponentConfig | undefined;
    OnSelection: (componentType: number) => void;
    OnHighlight: (componentType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number, options?: HighlightOptions) => void;
    OnRemoveHighlight: (componentType: DOCUMENT_HIGHLIGHT_TYPE, startOffset: number, endOffset: number) => void;
    OnSave: () => void;
}
interface DocumentComponentTypeSelectionState {
    link: string;
    active: KeyMap<boolean>;
    linkOptions: LinkOptions | undefined;
}
declare class DocumentComponentTypeSelection extends React.Component<DocumentComponentTypeSelectionProps, DocumentComponentTypeSelectionState> {
    state: DocumentComponentTypeSelectionState;
    OnHighlight: (highlightType: DOCUMENT_HIGHLIGHT_TYPE, active: boolean) => void;
    OnSelection: (componentType: DOCUMENT_COMPONENT_TYPE) => void;
    OnLinkChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    static getDerivedStateFromProps(nextProps: DocumentComponentTypeSelectionProps, prevState: DocumentComponentTypeSelectionState): {
        active: KeyMap<boolean>;
        link: string;
        linkOptions: LinkOptions | undefined;
    };
    render(): React.ReactElement<HTMLElement>;
}
export default DocumentComponentTypeSelection;
//# sourceMappingURL=DocumentComponentTypeSelection.d.ts.map