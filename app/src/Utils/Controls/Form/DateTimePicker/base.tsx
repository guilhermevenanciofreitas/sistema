import React, { Component } from "react";

class Parameters {
    Label?: string;
    PlaceHolder?: string;
    Text?: string | null;
    ReadOnly?: boolean;
    OnChange?: Function;
}

export abstract class DateTimePickerBase extends React.Component<Parameters> {

    static defaultProps = {
        Label: null,
        Text: null,
        ReadyOnly: false,
    };

    public abstract Focus(): void;

    protected abstract TextBox_Change(args: any): void;

}