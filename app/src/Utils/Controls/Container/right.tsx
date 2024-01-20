import React, { ReactNode } from "react";

export class ControlRight extends React.Component<Readonly<{children: any}>> {

    render(): ReactNode
    {
        return <div style={{float: 'right', textAlign: 'right'}}>
            {this.props.children}
        </div>;
    }

}