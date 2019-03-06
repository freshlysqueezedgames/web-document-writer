import * as React from 'react';
import * as ReactRedux from 'react-redux';
interface CursorContainerMappedStateProps {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface CursorContainerProps extends CursorContainerMappedStateProps {
    presentation?: (props: CursorContainerProps) => React.ReactElement;
}
declare const _default: ReactRedux.ConnectedComponentClass<(props: CursorContainerProps) => React.ReactElement<React.ExoticComponent<{
    children?: React.ReactNode;
}>, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, Pick<CursorContainerProps, "presentation">>;
export default _default;
//# sourceMappingURL=CursorContainer.d.ts.map