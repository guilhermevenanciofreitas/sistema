import React, { Component } from "react";

export abstract class CheckBoxBase extends React.Component<Readonly<
{
    Label?: string;
    Checked?: boolean;
    OnChange?: Function;
}>> {

    static defaultProps = {
        Label: null,
        Checked: false,
    };
    
    public abstract Focus(): void;

    protected abstract CheckBox_Change(args: any): void;

}