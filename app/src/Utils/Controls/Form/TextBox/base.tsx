import React, { Component } from "react";

class Parameters {
    Label?: string;
    PlaceHolder?: string;
    Text?: string;
    Mask?: any;
    TextTransform?: "Normal" | "UpperCase" | "LowerCase";
    OnChange?: Function;
}

export abstract class TextBoxBase extends React.Component<Parameters> {

    static defaultProps = {
        Label: null,
        Text: '',
        Mask: null,
        TextTransform: "Normal"
    };

    public abstract Focus(): void;

    protected abstract TextBox_Change(args: any): void;

}