import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, DropDownList, DropDownListItem, GridView, ViewModal, NumericBox, TextBox } from "../../../../Utils/Controls";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { EventArgs } from "../../../../Utils/EventArgs";
import _ from "lodash";

const Columns = [
    { selector: (row: any) => row.startWeight.toLocaleString("pt-BR", {minimumFractionDigits: 3}), name: 'Peso inicial' },
    { selector: (row: any) => parseFloat(row.endWeight).toLocaleString("pt-BR", {minimumFractionDigits: 3}), name: 'Peso final' },
    { selector: (row: any) => row.calculationType == 'fix' ? 'Fixo' : 'Multiplicado', name: 'Cálculo' },
    { selector: (row: any) => parseFloat(row.value).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), name: 'Valor' },
];

class ViewWeight extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: "",
        startWeight: '0.000',
        endWeight: '0.000',
        calculationType: 'fix',
        value: '0.00'
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({...item});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='Destinatário (Região)' Width={600}>
                
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    <Grid md={3}>
                        <NumericBox Label='Peso inicial' Text={this.state.startWeight} Scale={3} OnChange={(args: EventArgs) => this.setState({startWeight: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <NumericBox Label='Peso final' Text={this.state.endWeight} Scale={3} OnChange={(args: EventArgs) => this.setState({endWeight: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <DropDownList Label='Cálculo' SelectedValue={this.state.calculationType} OnChange={(args: EventArgs) => this.setState({calculationType: args.Value})}>
                            <DropDownListItem Label='[Selecione]' Value={null} />
                            <DropDownListItem Label='Fixo' Value={'fix'} />
                            <DropDownListItem Label='Multiplicado' Value={'multiplied'} />
                        </DropDownList>
                    </Grid>
                    <Grid md={3}>
                        <NumericBox Label='Valor' Text={this.state.value} Scale={2} Prefix="R$ " OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
                    </Grid>
                </Grid>

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />

            </ViewModal>
        );
    }

}

export class Weights extends BaseDetails<Readonly<{weights: any[], OnChange?: Function | any}>> {

    protected ViewWeight = React.createRef<ViewWeight>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewWeight.current?.Show({
            id: "",
            startWeight: '0.000',
            endWeight: '0.000',
            calculationType: 'fix',
            value: '0.00'
        });

        if (item == null) return;

        this.props.weights.push({...item});
        this.props.OnChange(this.props.weights);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewWeight.current?.Show({...args});
        if (item == null) return;
        args.startWeight = item.startWeight;
        args.endWeight = item.endWeight;
        args.calculationType = item.calculationType;
        args.value = item.value;
        this.props.OnChange(this.props.weights);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.weights));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.weights));

    render(): ReactNode {
        return (
            <>
                <ViewWeight ref={this.ViewWeight} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={_.orderBy(_.map(this.props.weights, (c: any) => { c.startWeight = parseFloat(c.startWeight); return c}), ['startWeight'], ['asc'])} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}