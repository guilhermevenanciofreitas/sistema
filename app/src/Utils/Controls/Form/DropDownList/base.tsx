import React, { Component, ReactNode } from "react";

export abstract class DropDownListBase extends React.Component<Readonly<{Label?: string; SelectedValue?: any; OnChange?: Function; children?: ReactNode;}>> {

    static defaultProps = {
        Label: null,
        SelectedValue: undefined,
        children: undefined,
    };

    //public abstract readonly SelectedText: string;

    public abstract Focus(): void;

    protected abstract DropDownList_Change(event: any, args: any): void;

}