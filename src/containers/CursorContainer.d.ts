import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { EditorStateRecord } from '../store/reducers/EditorReducer';
export interface CursorContainerPresentationProps {
    top: number;
    right: number;
    bottom: number;
    left: number;
    offsetX?: number;
    offsetY?: number;
}
interface MappedStateProps {
    cursor: EditorStateRecord;
}
export interface CursorContainerProps {
    presentation?: (props: CursorContainerPresentationProps) => React.ReactElement;
}
declare const _default: ReactRedux.ConnectedComponentClass<(props: CursorContainerProps & MappedStateProps) => React.ReactElement<React.ExoticComponent<{
    children?: React.ReactNode;
}>, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, Pick<CursorContainerProps & MappedStateProps, "presentation">>;
export default _default;
//# sourceMappingURL=CursorContainer.d.ts.map