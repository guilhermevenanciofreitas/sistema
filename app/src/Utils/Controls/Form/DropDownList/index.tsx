import React from 'react';
import { FormControl, FormLabel, Select } from '@mui/joy';
import { DropDownListBase } from './base';
import { DropDownListItem } from '../..';
import { EventArgs } from '../../../EventArgs';
import { SelectAllRounded } from '@mui/icons-material';

export class ControlDropDownList extends DropDownListBase {

    private DropDownList = React.createRef<HTMLButtonElement>();

    //public get SelectedText(): string {
    //    return (this.DropDownList.current?.options[this.DropDownList.current?.selectedIndex]?.label) || "";
    //}

    public Focus = (): void =>
    {
        this.DropDownList.current?.focus();
    }

    protected DropDownList_Change = (event: React.SyntheticEvent | null, newValue: string | null): void =>
    {
        this.props.OnChange?.call(this, new EventArgs(newValue));
    }

    render(): React.ReactNode
    {

        return (
            <>
                {this.props.Label && <FormLabel>{this.props.Label}</FormLabel>}
                <Select ref={this.DropDownList} value={this.props.SelectedValue} onChange={this.DropDownList_Change}>
                    {this.props.children}
                </Select>
            </>
        )

        /*return(
            <Select inputRef={this.DropDownList} variant="filled" select={true} label={this.props.Label} value={this.props.SelectedValue} onChange={this.DropDownList_Change} SelectProps={{ native: true }} InputLabelProps={{ shrink: true }} >
                {this.props.children}
            </Select >
        );*/
    }
}