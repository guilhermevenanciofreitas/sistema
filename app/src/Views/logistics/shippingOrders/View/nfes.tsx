import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, ViewModal, TextBox } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { SupplierTemplate } from "../../../../Search/Templates/Supplier";

const Columns = [
    { selector: (row: any) => row.supplier?.surname, name: 'Fornecedor' },
];

class ViewVehicle extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        open: false,
        id: '',
        vehicle: null,
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({...item});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='Combinação' Width={450}>
                
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    <Grid md={12}>
                        <AutoComplete Label='Fornecedor' Pesquisa={async(Text: string) => await Search.Supplier(Text)} Text={(Item: any) => `${Item.plate}` } Value={this.state.vehicle} OnChange={(vehicle: any) => this.setState({vehicle})}>
                            <SupplierTemplate />
                        </AutoComplete>
                    </Grid>
                </Grid>

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />

            </ViewModal>
        );
    }

}

export class Nfes extends BaseDetails<Readonly<{nfes: any[], OnChange?: Function | any}>> {

    protected ViewVehicle = React.createRef<ViewVehicle>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewVehicle.current?.Show({
            id: '',
            supplier: null,
        });

        if (item == null) return;

        this.props.nfes.push({...item});
        this.props.OnChange(this.props.nfes);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewVehicle.current?.Show({...args});
        if (item == null) return;
        args.supplier = item.supplier;
        this.props.OnChange(this.props.nfes);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.nfes));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.nfes));

    render(): ReactNode {
        return (
            <>
                <ViewVehicle ref={this.ViewVehicle} />
                <Button Text='Sefaz' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                <Button Text='Importar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.nfes} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}