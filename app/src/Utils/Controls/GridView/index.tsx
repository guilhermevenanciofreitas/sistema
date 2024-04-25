import DataTable from 'react-data-table-component';
import { GridViewBase } from "./base";

export class ControlGridView extends GridViewBase {

  render(): React.ReactNode
  {
    return (
      <>
        <DataTable
          sortServer={true}
          columns={this.props.Columns || []}
          data={this.props.Rows || []}
          onRowDoubleClicked={(args: any) => this.props.OnItem(args)}
          dense
          selectableRows={this.props.SelectedRows}
          onSort={(column: any, direction: any) => {if (!column?.sort) return;this.props.OnSort({column: column.sort, direction})}}
          highlightOnHover
          noDataComponent={<h3>Nenhum resultado encontrato!</h3>}
          noHeader={false}
          progressPending={this.props.Loading}
          progressComponent={<div className="loader" />}
          onSelectedRowsChange={(args: any) => this.props.OnSelected(args)}
        />
      </>
    );
  }

}