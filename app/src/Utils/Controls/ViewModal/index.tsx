import React from "react";
import { DialogActions, DialogContent, DialogTitle, Divider, IconButton, Modal, ModalDialog } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';

export class ControlViewModal extends React.Component<Readonly<{children: any, Open?: boolean, Title?: string, Width: number, Close?: any}>> {

    state = {
        open: false
    }

    protected Initialize = (Close: any) => {
        return new Promise<any>(resolve => {
            this.Close = (value: any) => {
                let result = null;
                if (value) {
                result = value;
                }
                Close();
                return resolve(result);
            };
        });
    }

    public Show = async () => {
        this.setState({open: true});
        return this.Initialize(this.Close);
    }

    public Close = (value: any) => {
        this.setState({open: false});
    }

    render(): React.ReactNode {
        return(
            <Modal open={this.state.open} onClose={() => this.Close(null)} style={{zIndex: 10000}}>
                <ModalDialog minWidth={this.props.Width} layout={undefined} maxWidth={this.props.Width} {...{sx: {top: '100px', left: '50%', transform: 'translateX(-50%)'}}}>
                    <DialogTitle>{this.props.Title}</DialogTitle>
                    <IconButton onClick={() => this.Close(null)} sx={{position: 'absolute', right: 8, top: 8}}><CloseIcon /></IconButton>
                    <Divider></Divider>
                    <DialogContent>
                        <div style={{overflow: 'hidden', bottom: '10px'}}>
                            {this.props.children}
                        </div>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        );
    }

}