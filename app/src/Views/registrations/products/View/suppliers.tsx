import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { SupplierTemplate } from "../../../../Search/Templates/Supplier";

const Columns = [
    { selector: (row: any) => row.supplier?.surname, name: 'Fornecedor' },
];

class ViewSupplier extends ViewModal {

    public Close = (suppliers: any) => this.setState({open: false});

    state = {
        open: false,
        id: '',
        supplier: null,
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({open: true, ...item});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Combinação' Width={450} Close={this.Close}>
                
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    <Grid md={12}>
                        <AutoComplete Label='Fornecedor' Pesquisa={async(Text: string) => await Search.Supplier(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.supplier} OnChange={(supplier: any) => this.setState({supplier})}>
                            <SupplierTemplate />
                        </AutoComplete>
                    </Grid>
                </Grid>

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />

            </Modal>
        );
    }

}

export class Suppliers extends BaseDetails<Readonly<{suppliers: any[], OnChange?: Function | any}>> {

    protected ViewSupplier = React.createRef<ViewSupplier>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewSupplier.current?.Show({
            id: '',
            supplier: null,
        });

        if (item == null) return;

        this.props.suppliers.push({...item});
        this.props.OnChange(this.props.suppliers);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewSupplier.current?.Show({...args});
        if (item == null) return;
        args.supplier = item.supplier;
        this.props.OnChange(this.props.suppliers);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.suppliers));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.suppliers));

    render(): ReactNode {
        return (
            <>
                <ViewSupplier ref={this.ViewSupplier} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.suppliers} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}