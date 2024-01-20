import { Button } from '@mui/joy';
import React from 'react';
import { ButtonBase } from './base';

export class ControlButton extends ButtonBase {

    private Loading: boolean = false;

    protected Button_Click = async (args: object): Promise<void> =>
    {
        try
        {

            if (this.Loading) return;

            this.Loading = true;
    
            if (this.props.OnClick != undefined)
            {
                await this.props.OnClick(args);
            }

        }
        catch
        {

        }
        finally
        {
            this.Loading = false;
        } 
    }

    render(): React.ReactNode
    {

        const Styles = {
            color: this.props.Enable ? this.props.Color : '#666666',
            backgroundColor: this.props.Enable ? this.props.BackgroundColor : '#cccccc',
        };

        switch (this.props.Type) {
            case "Submit":
                //return <Button type='submit' variant="contained" startIcon={this.props.StartIcon} onClick={this.Button_Click} style={Styles} size="small" disabled={!this.props.Enable}>{this.props.Text}</Button>
                return <Button type='submit' variant='solid' onClick={this.Button_Click} startDecorator={this.props.StartIcon} size='sm' style={Styles} disabled={!this.props.Enable}>{this.props.Text}</Button>
            case "Reset":
                //return <Button type='reset' variant="contained" startIcon={this.props.StartIcon} onClick={this.Button_Click} style={Styles} size="small" disabled={!this.props.Enable}>{this.props.Text}</Button>
                return <Button type='reset' variant='solid' onClick={this.Button_Click} startDecorator={this.props.StartIcon} size='sm' style={Styles} disabled={!this.props.Enable}>{this.props.Text}</Button>
            default:
                //return <Button type='button' variant="contained" startIcon={this.props.StartIcon} onClick={this.Button_Click} style={Styles} size="small" disabled={!this.props.Enable}>{this.props.Text}</Button>
                return <Button type='button' variant='solid' onClick={this.Button_Click} startDecorator={this.props.StartIcon} size='sm' style={Styles} disabled={!this.props.Enable}>{this.props.Text}</Button>
        }
        
    }

}