import * as React from 'react';
export interface ButtonProps {
    OnClick: () => void;
}
export interface RemoveButtonState {
    animation: string;
}
export declare class RemoveButton extends React.Component<ButtonProps, RemoveButtonState> {
    state: RemoveButtonState;
    cancelled: boolean;
    triggered: boolean;
    HandleCancel: () => void;
    HandleMouseDown: () => void;
    render(): JSX.Element;
}
export declare const AddButton: (props: ButtonProps) => JSX.Element;
export declare const DragIndicatorButton: () => JSX.Element;
//# sourceMappingURL=Buttons.d.ts.map