import { DialogContent } from "@mui/joy";
import React from "react";

export class Content extends React.Component<Readonly<{children: any}>> {

    render(): React.ReactNode {
        return (
            <DialogContent>
                <div style={{overflow: 'hidden'}}>
                    {this.props.children} 
                </div>
            </DialogContent>
        );
    }

}