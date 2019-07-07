import * as React from 'react';
import { ReactComponentLike } from 'prop-types';
export interface DragState {
    top: number;
    left: number;
}
export declare function DragTarget(identifier?: string): string;
export declare function WithPositionalDrag<P extends Object>(WrappedComponent: ReactComponentLike, fixed?: boolean, identifier?: string): {
    new (props: Readonly<P>): {
        state: DragState;
        startX: number;
        startY: number;
        offsetX: number;
        offsetY: number;
        div: HTMLDivElement | null;
        BindDiv: (ref: HTMLDivElement | null) => HTMLDivElement | null;
        OnDragStart: (event: React.DragEvent<Element>) => void;
        OnDrag: (event: React.DragEvent<Element>) => void;
        OnDragEnd: (event: React.DragEvent<Element>) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "top" | "left">(state: DragState | ((prevState: Readonly<DragState>, props: Readonly<P>) => DragState | Pick<DragState, K> | null) | Pick<DragState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<React.PropsWithChildren<P>>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: P, context?: any): {
        state: DragState;
        startX: number;
        startY: number;
        offsetX: number;
        offsetY: number;
        div: HTMLDivElement | null;
        BindDiv: (ref: HTMLDivElement | null) => HTMLDivElement | null;
        OnDragStart: (event: React.DragEvent<Element>) => void;
        OnDrag: (event: React.DragEvent<Element>) => void;
        OnDragEnd: (event: React.DragEvent<Element>) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "top" | "left">(state: DragState | ((prevState: Readonly<DragState>, props: Readonly<P>) => DragState | Pick<DragState, K> | null) | Pick<DragState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<React.PropsWithChildren<P>>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
//# sourceMappingURL=DragAndDrop.d.ts.map