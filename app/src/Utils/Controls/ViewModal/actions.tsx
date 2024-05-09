import { DialogActions, Divider } from "@mui/joy";
import React from "react";

export class Actions extends React.Component<Readonly<{children: any}>> {

    render(): React.ReactNode {
        return (
            <DialogActions>
                <div style={{display: 'flex', gap: '6px'}}>
                    {this.props.children}
                </div>
            </DialogActions>
        );
    }

}