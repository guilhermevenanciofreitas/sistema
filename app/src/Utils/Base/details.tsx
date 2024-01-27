import React from "react";

export class BaseDetails<T = {}> extends React.Component<T> {

    state = {
        Selecteds: []
    }
    
    protected Remover = (Data: any[]) =>
    {
        
        const r = Data.filter((row: any) => !this.state.Selecteds.map((row: any) => row.index).includes(row.index));
        this.setState({Selecteds: []});
        return r;
    }

    protected Selected = (SelectedRows: any[], Data: any[]) =>
    {
        const list = Data.map((row, index) => {
            row.index = index;
            return row;
        });
        this.setState({Selecteds: SelectedRows});
        return list;
    }

}