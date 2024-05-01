import React from 'react';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';

import { PasswordBoxBase } from './base';
import { EventArgs } from '../../../EventArgs';

import { IMaskInput } from 'react-imask';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export class ControlPasswordBox extends PasswordBoxBase {

    private TextBox = React.createRef<HTMLInputElement>();

    private TextMaskAdapter = React.forwardRef<HTMLElement, CustomProps>((props: CustomProps, ref: any) =>
    {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask={this.props.Mask}
                definitions={{'#': /[0-9]/}}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        )
    });

    public Focus = (): void =>
    {
        this.TextBox?.current?.focus();
    }
    
    protected TextBox_Change = (args: React.ChangeEvent<HTMLInputElement>): void =>
    {
        this.setState({Text: args.target.value});
        this.props.OnChange?.call(null, new EventArgs(args.target.value));
    }

    render(): React.ReactNode
    {
        return (
            <>
                <FormLabel sx={{fontWeight: 400}}>{this.props.Label}</FormLabel>
                <Input size='sm' type='password' disabled={this.props.ReadOnly} placeholder={this.props.PlaceHolder} value={this.props.Text} onChange={this.TextBox_Change} slotProps={this.props.Mask ? { input: { component: this.TextMaskAdapter } } : undefined } />
            </>
        );
    }

}