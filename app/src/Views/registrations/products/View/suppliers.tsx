import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, ViewModal, TextBox, NumericBox, Actions, Content } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { SupplierTemplate } from "../../../../Search/Templates/Supplier";
import { color } from "../../../../Utils/color";
import { TaskAltOutlined } from "@mui/icons-material";
import { MeasurementUnitTemplate } from "../../../../Search/Templates/MeasurementUnit";

const Columns = [
    { selector: (row: any) => row.supplier?.surname, name: 'Fornecedor' },
    { selector: (row: any) => row.measurementUnit?.name, name: 'Unidade de medida', minWidth: '300px', maxWidth: '300px' },
    { selector: (row: any) => parseFloat(row.contain).toLocaleString('pt-BR', {minimumFractionDigits: 3}), name: 'Contém', minWidth: '80px', maxWidth: '80px', right: true },
    { selector: (row: any) => parseFloat(row.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), name: 'Valor', minWidth: '120px', maxWidth: '120px', right: true },
];

class ViewSupplier extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        supplier: null,
        measurementUnit: null,
        contain: null,
        value: null
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({...item});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='Fornecedor' Width={450}>
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <AutoComplete Label='Fornecedor' Pesquisa={async(Text: string) => await Search.Supplier(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.supplier} OnChange={(supplier: any) => this.setState({supplier})}>
                                <SupplierTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={8}>
                            <AutoComplete Label='Unidade de medida' Pesquisa={async(Text: string) => await Search.MeasurementUnit(Text)} Text={(Item: any) => `${Item.name}` } Value={this.state.measurementUnit} OnChange={(measurementUnit: any) => this.setState({measurementUnit})}>
                                <MeasurementUnitTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <NumericBox Label='Contém' Text={this.state.contain} Scale={3} OnChange={(args: EventArgs) => this.setState({contain: args.Value})} />
                        </Grid>
                        <Grid md={5}>
                            <NumericBox Label='Valor unitário' Text={this.state.value} Prefix="R$ " Scale={2} OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
                        </Grid>
                    </Grid>
                </Content>
                <Actions>
                    <Button Text='Confirmar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnConfirmar_Click} />
                </Actions>
            </ViewModal>
        );
    }

}

export class Suppliers extends BaseDetails<Readonly<{suppliers: any[], OnChange?: Function | any}>> {

    protected ViewSupplier = React.createRef<ViewSupplier>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewSupplier.current?.Show({
            id: '',
            supplier: null,
            measurementUnit: null,
            contain: null,
            value: null
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
        args.measurementUnit = item.measurementUnit,
        args.contain = item.contain,
        args.value = item.value;
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