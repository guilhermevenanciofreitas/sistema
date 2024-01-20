import React, { ReactNode } from 'react';
import Option from '@mui/joy/Option';
import { DropDownListItemBase } from './base';

export class ControlDropDownListItem extends DropDownListItemBase {
    render(): ReactNode
    {
        return (
            <Option value={this.props.Value}>{this.props.Label}</Option>
        );
    }
}