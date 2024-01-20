import { Box, Sheet } from "@mui/joy";
import { ReactNode } from "react";
import { GridView, Pagination } from "..";
import React from "react";

export class ControlListView extends React.Component<Readonly<{Rows: Array<object>, Columns: Array<object>, TotalRows: number, OnItem: Function, OnSelected: Function, OnPageChange: Function, OnSort: Function, Loading: boolean, defaultRowsPerPage: number}>> {

    render(): ReactNode {
        return (
            <>
                <Sheet variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: 'sm', flexShrink: 1, overflow: 'auto', minHeight: 0}}>
                    <GridView Rows={this.props.Rows} Columns={this.props.Columns} OnItem={(item: any) => this.props.OnItem(item)} OnSelected={this.props.OnSelected} OnSort={this.props.OnSort} Loading={this.props.Loading}></GridView>
                </Sheet>
                <Box sx={{pt: 0, gap: 1, display: {xs: 'none', md: 'flex'}}}>
                    <Box sx={{ flex: 1 }} />
                    <Pagination style="Dropdown" pageChangeHandler={(limit: number, offset: number) => this.props.OnPageChange(limit, offset)} totalRows={this.props.TotalRows} defaultRowsPerPage={this.props.defaultRowsPerPage} records={[10, 50, 100, 500]} />
                    <Box sx={{ flex: 1 }} />
                </Box>
            </>
        );
    }

}