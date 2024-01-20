import React, { ReactNode } from "react";

export class ControlContainer extends React.Component<Readonly<{children: any}>> {

    render(): ReactNode
    {
        return <div style={{width: '100%'}}>{this.props.children}</div>;
    }

}