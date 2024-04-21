import React from 'react';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';

import { CurrencyBoxBase } from './base';
import { EventArgs } from '../../../EventArgs';
import { CurrencyInput } from 'react-currency-mask';

export class ControlCurrencyBox extends CurrencyBoxBase {

    private TextBox = React.createRef<HTMLInputElement>();

    public Focus = (): void =>
    {
        this.TextBox?.current?.focus();
    }
    
    protected NumberBox_Change = (originalValue: any): void =>
    {
        
        this.setState({Text: originalValue});
        this.props.OnChange?.call(null, new EventArgs(originalValue));

    }

    render(): React.ReactNode
    {
        return (
            <>
                <FormLabel sx={{fontWeight: 400}}>{this.props.Label}</FormLabel>
                <CurrencyInput
                    value={this.props.Text}
                    onChangeValue={(event, originalValue, maskedValue) => this.NumberBox_Change(originalValue)}
                    InputElement={<Input size='sm' />}
                    />
            </>
        );
    }

}