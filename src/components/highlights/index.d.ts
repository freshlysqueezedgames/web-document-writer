import * as React from 'react';
import { LinkOptions } from '../../store/types';
interface HighlightComponentProps {
    id: string;
    className: string;
    elements: (JSX.Element | string)[];
}
export declare const HighlightComponent: (props: HighlightComponentProps) => JSX.Element;
interface LinkHighlightComponentProps extends HighlightComponentProps {
    options: LinkOptions;
    root: HTMLElement | null;
    OnDelete?: (id: string) => void;
}
interface LinkHighlightComponentState {
    readonly reveal: string;
}
export declare class LinkHighlightComponent extends React.Component<LinkHighlightComponentProps, LinkHighlightComponentState> {
    state: LinkHighlightComponentState;
    anchorRef: HTMLAnchorElement | null;
    AnchorRef: (ref: HTMLAnchorElement | null) => HTMLAnchorElement | null;
    OnMouseOver: () => void;
    OnMouseOut: () => void;
    RemoveAnchor: () => void | undefined;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=index.d.ts.map