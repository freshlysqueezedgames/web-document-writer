import React from 'react';
import { ReactComponentLike } from 'prop-types';
export declare type KeyMap<T> = {
    [key: string]: T;
};
export interface WithAnimationState<T> {
    styles: T;
}
export interface WithAnimationProps<T> {
    styles: T;
}
export default function WithAnimation<T extends KeyMap<number>>(WrappedComponent: ReactComponentLike, initialStyles: T): {
    new (props: Readonly<WithAnimationProps<T>>): {
        delta: number;
        state: WithAnimationState<T>;
        shouldComponentUpdate(nextProps: WithAnimationProps<T>): boolean;
        Animate(time: number, key: string, to: number, from: number): void;
        render(): JSX.Element;
        context: any;
        setState<K extends "styles">(state: WithAnimationState<T> | ((prevState: Readonly<WithAnimationState<T>>, props: Readonly<WithAnimationProps<T>>) => WithAnimationState<T> | Pick<WithAnimationState<T>, K> | null) | Pick<WithAnimationState<T>, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<React.PropsWithChildren<WithAnimationProps<T>>>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: WithAnimationProps<T>, context?: any): {
        delta: number;
        state: WithAnimationState<T>;
        shouldComponentUpdate(nextProps: WithAnimationProps<T>): boolean;
        Animate(time: number, key: string, to: number, from: number): void;
        render(): JSX.Element;
        context: any;
        setState<K extends "styles">(state: WithAnimationState<T> | ((prevState: Readonly<WithAnimationState<T>>, props: Readonly<WithAnimationProps<T>>) => WithAnimationState<T> | Pick<WithAnimationState<T>, K> | null) | Pick<WithAnimationState<T>, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<React.PropsWithChildren<WithAnimationProps<T>>>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
//# sourceMappingURL=Animated.d.ts.map