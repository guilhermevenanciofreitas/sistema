import React, { Component } from "react";

class Parameters {
    Label?: string;
    PlaceHolder?: string;
    Text?: string | null;
    OnChange?: Function;
}

export abstract class DatePickerBase extends React.Component<Parameters> {

    static defaultProps = {
        Label: null,
        Text: null,
    };

    public abstract Focus(): void;

    protected abstract TextBox_Change(args: any): void;

}