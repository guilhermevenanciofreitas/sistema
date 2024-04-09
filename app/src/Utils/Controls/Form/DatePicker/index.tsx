import React from 'react';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';

import { DatePickerBase } from './base';
import { EventArgs } from '../../../EventArgs';

export class ControlDatePicker extends DatePickerBase {

    private TextBox = React.createRef<HTMLInputElement>();

    public Focus = (): void =>
    {
        this.TextBox?.current?.focus();
    }
    
    protected TextBox_Change = (args: React.ChangeEvent<HTMLInputElement>): void =>
    {
 
        let value: string | null = args.target.value;

        if (value == "") value = null;
        
        this.props.OnChange?.call(null, new EventArgs(value));

    }

    render(): React.ReactNode
    {
        return (
            <>
                <FormLabel sx={{fontWeight: 400}}>{this.props.Label}</FormLabel>
                <Input size='sm' type='date' placeholder={this.props.PlaceHolder} value={this.props.Text || ""} onChange={this.TextBox_Change} disabled={this.props.ReadOnly} />
            </>
        );
    }

}