import React from "react";
import { DialogContent, DialogTitle, Divider, IconButton, Modal, ModalDialog } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';

export class ControlModal extends React.Component<Readonly<{children: any, Open: boolean, Title: string, Close: any}>> {

    render(): React.ReactNode {
        return(
            <Modal open={this.props.Open} onClose={() => this.props.Close()} style={{zIndex: 10000}} >
                <ModalDialog minWidth={1000} {...{sx: {top: '250px'}}}>
                    <DialogTitle>{this.props.Title}</DialogTitle>
                    <IconButton onClick={() => this.props.Close()} sx={{position: 'absolute', right: 8, top: 8}}><CloseIcon /></IconButton>
                    <Divider></Divider>
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                </ModalDialog>
            </Modal>
        );
    }

}