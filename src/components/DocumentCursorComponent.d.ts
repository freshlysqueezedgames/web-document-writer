import * as React from 'react';
import { CursorContainerPresentationProps } from '../containers';
declare type CursorComponentState = Readonly<{
    top: number;
    right: number;
    bottom: number;
    left: number;
}>;
export default class DocumentCursorComponent extends React.Component<CursorContainerPresentationProps, CursorComponentState> {
    lastTop: number | undefined;
    lastRight: number | undefined;
    lastBottom: number | undefined;
    lastLeft: number | undefined;
    time: number;
    constructor(props: CursorContainerPresentationProps);
    OnAnimationFrame: ((timestamp: number) => void) | undefined;
    componentDidUpdate(): void;
    render(): React.ReactElement<HTMLDivElement>;
}
export {};
//# sourceMappingURL=DocumentCursorComponent.d.ts.map