import * as React from 'react';
import { DocumentComponentDefinition } from '../../store/types';
export interface DocumentEditorComponentProps {
    OnSave?: (document: Array<DocumentComponentDefinition>) => Promise<void>;
    OnImageUpload?: (data: string) => Promise<string>;
}
declare const DocumentEditorComponent: (props: DocumentEditorComponentProps) => React.ReactElement<HTMLDivElement, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export interface DocumentState {
    startOffset: number;
    endOffset: number;
}
export default DocumentEditorComponent;
//# sourceMappingURL=DocumentEditorComponent.d.ts.map