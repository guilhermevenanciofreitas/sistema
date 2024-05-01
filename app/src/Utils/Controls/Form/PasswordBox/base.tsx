import React, { Component } from "react";

class Parameters {
    Label?: string;
    ReadOnly?: boolean;
    PlaceHolder?: string;
    Text?: string;
    Mask?: any;
    OnChange?: Function;
}

export abstract class PasswordBoxBase extends React.Component<Parameters> {

    static defaultProps = {
        Label: null,
        ReadyOnly: false,
        Text: '',
        Mask: null
    };

    public abstract Focus(): void;

    protected abstract TextBox_Change(args: any): void;

}