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
    OnSelected?: Function | any;;
}

export abstract class GridViewBase extends React.Component<Parameters> {

}