import React, { Component } from "react";

class Parameters {
    Label?: string;
    ReadOnly?: boolean;
    PlaceHolder?: string;
    Text?: number;
    Mask?: any;
    OnChange?: Function;
}

export abstract class CurrencyBoxBase extends React.Component<Parameters> {

    static defaultProps = {
        Label: null,
        ReadyOnly: false,
        Text: '',
        Mask: null,
    };

    public abstract Focus(): void;

    protected abstract NumberBox_Change(args: any): void;

}