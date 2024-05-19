import React from 'react';

export class ButtonSplit {
    Text?: string;
    OnClick?: Function;
}

export abstract class ButtonSplitBase extends React.Component<Readonly<{
    Type?: "Button" | "Submit" | "Reset";
    Text?: string;
    Options?: ButtonSplit[],
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