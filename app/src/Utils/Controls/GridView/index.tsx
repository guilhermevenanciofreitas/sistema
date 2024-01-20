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
              selectableRows
              onSort={(column: any, direction: any) => this.props.OnSort({column: column.sort, direction})}
              highlightOnHover
              noDataComponent={<h3>Nenhum resultado encontrato!</h3>}
              noHeader={false}
              progressPending={this.props.Loading}
              progressComponent={<h3>Carregando...</h3>}
              onSelectedRowsChange={(args: any) => this.props.OnSelected(args)}
            />
          </>
        );
    }

}