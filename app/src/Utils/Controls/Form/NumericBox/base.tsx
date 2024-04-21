import React, { Component } from "react";

class Parameters {
    Label?: string;
    Prefix?: string;
    Scale?: number;
    ReadOnly?: boolean;
    PlaceHolder?: string;
    Text?: string | null;
    Mask?: any;
    OnChange?: Function;
}

export abstract class NumericBoxBase extends React.Component<Parameters> {

    static defaultProps = {
        Label: null,
        ReadyOnly: false,
        Text: '',
        Mask: null,
    };

    public abstract Focus(): void;

    protected abstract TextBox_Change(args: any): void;

}