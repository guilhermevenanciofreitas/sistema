import { Box, Sheet } from "@mui/joy";
import { ReactNode } from "react";
import { GridView, Pagination } from "..";
import React from "react";

export class ControlListView extends React.Component<Readonly<{Rows: Array<object>, Columns: Array<object>, Count: number, Limit: number, OffSet: number, OnItem: Function, OnSelected: Function, OnPageChange: Function, OnSort: Function, Loading: boolean, Records: any}>> {

    render(): ReactNode {
        return (
            <>
                
                {/*
                <Sheet variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: 'sm', flexShrink: 1, overflow: 'auto', minHeight: 0}}>
                    <GridView Rows={this.props.Rows} Columns={this.props.Columns} OnItem={(item: any) => this.props.OnItem(item)} OnSelected={this.props.OnSelected} OnSort={this.props.OnSort} Loading={this.props.Loading}></GridView>
                </Sheet>
                */}
                
                <div style={{width: '100%', height: '100%', border: '1px solid rgba(0,0,0,.12)', overflow: 'auto'}}>
                    <GridView Rows={this.props.Rows} Columns={this.props.Columns} OnItem={(item: any) => this.props.OnItem(item)} OnSelected={this.props.OnSelected} OnSort={this.props.OnSort} Loading={this.props.Loading}></GridView>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Pagination Type="Dropdown" Limit={this.props.Limit} OnPageChange={(limit: number, offset: number) => this.props.OnPageChange(limit, offset)} Count={this.props.Count} OffSet={this.props.OffSet} Records={this.props.Records} />
                </div>
            </>
        );
    }

}