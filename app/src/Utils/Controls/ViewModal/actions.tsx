import { DialogActions } from "@mui/joy";
import React from "react";

export class Actions extends React.Component<Readonly<{children: any}>> {

    render(): React.ReactNode {
        return (
            <DialogActions>
                {this.props.children}
            </DialogActions>
        );
    }

}