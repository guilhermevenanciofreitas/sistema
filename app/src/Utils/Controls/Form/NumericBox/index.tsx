import React from 'react';
import FormLabel from '@mui/joy/FormLabel';
import Input, { InputProps } from '@mui/joy/Input';

import { NumericBoxBase } from './base';
import { EventArgs } from '../../../EventArgs';

import {NumericFormat} from 'react-number-format'

const CustomInput = (props: InputProps) => {
    return (
      <Input
        {...props}
        size='sm'
      />
    )
}

export class ControlNumericBox extends NumericBoxBase {

    private TextBox = React.createRef<HTMLInputElement>();

    public Focus = (): void =>
    {
        this.TextBox?.current?.focus();
    }
    
    protected TextBox_Change = (value: string): void =>
    {
        this.setState({Text: value});
        this.props.OnChange?.call(null, new EventArgs(value));
    }

    render(): React.ReactNode
    {
        return (
            <>
                <FormLabel sx={{fontWeight: 400}}>{this.props.Label}</FormLabel>
                <NumericFormat customInput={CustomInput} value={this.props.Text} onValueChange={({value}) => this.TextBox_Change(value)} prefix={this.props.Prefix} decimalScale={this.props.Scale} decimalSeparator=',' thousandSeparator={''} fixedDecimalScale={true} />
            </>
        );
    }

}