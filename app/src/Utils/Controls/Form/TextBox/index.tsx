/*import React, { ChangeEvent } from "react";
import { TextBoxBase } from './base';
import { EventArgs } from '../../../EventArgs';
import _ from 'lodash';
import { FormGroup, TextField } from "@mui/material";
*/

import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

import { TextBoxBase } from './base';
import { EventArgs } from '../../../EventArgs';

export class ControlTextBox extends TextBoxBase {

    private TextBox = React.createRef<HTMLInputElement>();

    public Focus = (): void =>
    {
        this.TextBox?.current?.focus();
    }
    
    protected TextBox_Change = (args: React.ChangeEvent<HTMLInputElement>): void =>
    {
        
        switch (this.props.TextTransform) {
            case "UpperCase":
                args.target.value = args.target.value.toUpperCase();
                break;
            case "LowerCase":
                args.target.value = args.target.value.toLowerCase();
                break;
        }

        this.setState({Text: args.target.value});
        this.props.OnChange?.call(null, new EventArgs(args.target.value));

    }

    render(): React.ReactNode
    {
        /*return (
            <FormGroup>
                <TextField inputRef={this.TextBox} type="text" variant="filled" size="small" label={this.props.Label} placeholder={this.props.PlaceHolder} value={this.props.Text} onChange={this.TextBox_Change} InputLabelProps={{ shrink: true }} autoComplete='off' />
            </FormGroup>
        )*/

        return (
            <FormControl>
                <FormLabel>{this.props.Label}</FormLabel>
                <Input placeholder={this.props.PlaceHolder} value={this.props.Text} onChange={this.TextBox_Change} />
            </FormControl>
        )
    }

}