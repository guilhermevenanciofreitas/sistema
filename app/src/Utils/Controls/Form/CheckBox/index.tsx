import React, { ChangeEvent } from "react";
import { CheckBoxBase } from './base';
import { EventArgs } from '../../../EventArgs';
import _ from 'lodash';
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export class ControlCheckBox extends CheckBoxBase {

    private CheckBox = React.createRef<HTMLButtonElement>();

    protected CheckBox_Change = (args: React.ChangeEvent<HTMLInputElement>): void =>
    {
        this.props.OnChange?.call(null, new EventArgs(args.target.checked));
    }

    public Focus = (): void =>
    {
        this.CheckBox.current?.focus();
    }
    
    render(): React.ReactNode
    {
        return (
            <FormGroup>
                <FormControlLabel control={<Checkbox ref={this.CheckBox} checked={this.props.Checked} onChange={this.CheckBox_Change} />} label={this.props.Label} />
            </FormGroup>
        )
    }

}