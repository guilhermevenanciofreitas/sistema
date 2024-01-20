import React, { ReactNode } from "react";

export class ControlLeft extends React.Component<Readonly<{children: any}>> {

    render(): ReactNode
    {
        return <div style={{float: 'left'}}>
            {this.props.children}
        </div>;
    }

}