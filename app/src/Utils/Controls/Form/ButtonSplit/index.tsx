import { Button, ButtonGroup, IconButton, Menu, MenuItem } from '@mui/joy';
import React from 'react';
import { ButtonSplit, ButtonSplitBase } from './base';
import { ArrowDropDown } from '@mui/icons-material';

export class ControlButtonSplit extends ButtonSplitBase {

    state = {
        open: false
    }

    private actionRef = React.createRef<() => void | null>();
    private anchorRef = React.createRef<HTMLDivElement>();

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

        //<Button type='button' variant='solid' onClick={this.Button_Click} startDecorator={this.props.StartIcon} size='sm' style={Styles} disabled={!this.props.Enable}>{this.props.Text}</Button>
        return (
            <>
                <ButtonGroup size='sm' ref={this.anchorRef} variant="solid" aria-label="split button">
                    <Button onClick={this.Button_Click} style={Styles} size='sm'>{this.props.Text}</Button>
                    <IconButton aria-controls={this.state.open ? 'split-button-menu' : undefined} aria-expanded={this.state.open ? 'true' : undefined} aria-label="select merge strategy" aria-haspopup="menu"
                        onMouseDown={() => {
                            // @ts-ignore
                            this.actionRef.current = () => this.setState({open: !this.state.open});
                        }}
                        onKeyDown={() => {
                            // @ts-ignore
                            this.actionRef.current = () => this.setState({open: !this.state.open});
                        }}
                        onClick={() => {
                            this.actionRef.current?.();
                        }}
                    >
                    <ArrowDropDown />
                    </IconButton>
                </ButtonGroup>
                <Menu open={this.state.open} onClose={() => this.setState({open: false})} anchorEl={this.anchorRef.current} style={{zIndex: 10000}}>
                    {this.props.Options?.map((option: ButtonSplit, index: number) => {
                        return (
                            <MenuItem
                                key={index}
                                onClick={(event) => option.OnClick?.call(null)}
                            >
                                {option.Text}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </>
        )
        
    }

}