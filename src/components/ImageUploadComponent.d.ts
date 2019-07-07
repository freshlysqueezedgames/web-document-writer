import React from 'react';
import { KeyMap } from './Animated';
export interface ImageUploadProps {
    OnUpload: (result: string) => void;
}
export declare enum DRAG_STATE {
    NONE = 0,
    ACTIVE = 1,
    INACTIVE = 2
}
export interface ImageUploadState {
    drag: DRAG_STATE;
    message: string;
    progress: number;
}
export interface TimeBarStyles extends KeyMap<number> {
    width: number;
}
export interface TimeBarProps {
    styles: TimeBarStyles;
}
export default class ImageUploadComponent extends React.Component<ImageUploadProps, ImageUploadState> {
    state: ImageUploadState;
    dragEnterCount: number;
    uploading: boolean;
    input: HTMLInputElement | null;
    inputReference: (element: HTMLInputElement | null) => HTMLInputElement | null;
    HandleFileUpload: () => void;
    HandleDragEnter: (event: DragEvent) => void;
    HandleDragLeave: (event: DragEvent) => void;
    HandleDragEnd: (event: DragEvent) => void;
    HandleAnimationEnd: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=ImageUploadComponent.d.ts.map