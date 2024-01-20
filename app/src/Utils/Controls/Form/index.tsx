import React, { FormEvent, ReactNode } from "react";
import { FormBase } from "./base";

export class ControlForm extends FormBase {

    protected Form_Submit = (args: FormEvent<HTMLFormElement>) => {
        args.preventDefault();
        this.props.OnSubmit?.call(null);
    }

    protected Form_Reset = (args: FormEvent<HTMLFormElement>) => {
        args.preventDefault();
        this.props.OnReset?.call(null);
    }

    render(): ReactNode
    {
        return (
            <form onSubmit={this.Form_Submit} onReset={this.Form_Reset}>
                {this.props.children}
            </form>
        );
    }

}