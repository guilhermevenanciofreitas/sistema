import React, { Component } from "react";

class Parameters {
    Label?: string;
    ReadOnly?: boolean;
    PlaceHolder?: string;
    Text?: string;
    Mask?: any;
    TextTransform?: "Normal" | "UpperCase" | "LowerCase";
    EndDecorator?: React.ReactNode;
    OnChange?: Function;
}

export abstract class TextBoxBase extends React.Component<Parameters> {

    static defaultProps = {
        Label: null,
        ReadyOnly: false,
        Text: '',
        Mask: null,
        TextTransform: "Normal"
    };

    public abstract Focus(): void;

    protected abstract TextBox_Change(args: any): void;

}