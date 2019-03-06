import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { DocumentComponentState } from '../store/types';
export declare type DocumentComponent = {};
export declare type Document = {
    slug: string;
    components: Array<DocumentComponentState>;
};
interface DocumentContainerMappedStateProps {
    slug: string;
    components: Array<DocumentComponentState>;
}
interface DocumentContainerMappedDispatchProps {
    OnAppendContent: (id: string, value: string) => void;
    OnContentChange: (id: string, content: string) => void;
    OnFocusChange: (id: string) => void;
    OnCursorChange: (top: number, right: number, bottom: number, left: number) => void;
    OnComponentTypeChange: (componentType: number) => void;
}
export interface DocumentContainerProps extends DocumentContainerMappedStateProps, DocumentContainerMappedDispatchProps {
    presentation?: (props: DocumentContainerProps) => React.ReactElement;
}
declare const _default: ReactRedux.ConnectedComponentClass<(props: DocumentContainerProps) => React.ReactElement<React.ExoticComponent<{
    children?: React.ReactNode;
}>, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, Pick<DocumentContainerProps, "presentation">>;
export default _default;
//# sourceMappingURL=DocumentContainer.d.ts.map