import React, { ReactNode } from "react";
import { FormBase } from "./base";

export class ControlForm extends FormBase {

    render(): ReactNode
    {
        return React.Children.map(this.props.children, child => {
            return child;
        });
    }

}