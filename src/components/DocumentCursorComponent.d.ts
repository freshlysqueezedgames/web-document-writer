import * as React from 'react';
import { CursorContainerProps } from '../containers';
import './DocumentCursorComponent.scss';
declare type CursorComponentState = Readonly<{
    top: number;
    right: number;
    bottom: number;
    left: number;
}>;
export default class DocumentCursorComponent extends React.Component<CursorContainerProps, CursorComponentState> {
    lastTop: number | undefined;
    lastRight: number | undefined;
    lastBottom: number | undefined;
    lastLeft: number | undefined;
    time: number;
    constructor(props: CursorContainerProps);
    OnAnimationFrame: ((timestamp: number) => void) | undefined;
    componentDidUpdate(): void;
    render(): React.ReactElement<HTMLDivElement>;
}
export {};
//# sourceMappingURL=DocumentCursorComponent.d.ts.map