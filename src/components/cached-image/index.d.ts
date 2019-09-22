import React from 'react';
export interface CachedImageProps {
    style?: React.CSSProperties;
    image: string;
}
export interface CachedImageState {
    style?: React.CSSProperties;
}
export default class CachedImage extends React.Component<CachedImageProps, CachedImageState> {
    canvas: HTMLCanvasElement | null;
    canvasReference: (element: HTMLCanvasElement | null) => HTMLCanvasElement | null;
    constructor(props: CachedImageProps);
    render(): JSX.Element;
    componentDidMount(): void;
}
//# sourceMappingURL=CachedImage.d.ts.map