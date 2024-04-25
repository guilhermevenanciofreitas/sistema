import React, { Component } from "react";

/*export class Data {
    public Rows: any[] = new Array();
}*/

class Parameters {
    Columns?: any;
    Rows?: any;
    Loading?: boolean;
    OnItem?: Function | any;
    OnSort?: Function | any;
    OnSelected?: Function | any;
    SelectedRows?: boolean; 
}

export abstract class GridViewBase extends React.Component<Parameters> {

    static defaultProps = {
        SelectedRows: true,
    };

}