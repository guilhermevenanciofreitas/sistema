import React, { Component } from "react";

class Parameters {
    Label?: string;
    PlaceHolder?: string;
    Text?: string;
    TextTransform?: "Normal" | "UpperCase" | "LowerCase";
    OnChange?: Function;
}

export abstract class TextBoxBase extends React.Component<Parameters> {

    static defaultProps = {
        Label: null,
        Text: '',
        TextTransform: "Normal"
    };

    public abstract Focus(): void;

    protected abstract TextBox_Change(args: any): void;

}