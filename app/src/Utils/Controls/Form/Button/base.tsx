import React from 'react';

export abstract class ButtonBase extends React.Component<Readonly<{
    Type?: "Button" | "Submit" | "Reset";
    Text?: string;
    Color?: string;
    BackgroundColor?: string;
    StartIcon?: React.ReactNode;
    Enable?: boolean;
    OnClick?: Function;
}>> {

    static defaultProps = {
        Type: 'Button',
        Text: '',
        Enable: true,
    };

    protected abstract Button_Click(args: object): void;

}