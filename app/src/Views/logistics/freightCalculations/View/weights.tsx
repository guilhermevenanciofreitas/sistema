import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, DropDownList, DropDownListItem, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { RegionTemplate } from "../../../../Search/Templates/Region";
import { EventArgs } from "../../../../Utils/EventArgs";

const Columns = [
    { selector: (row: any) => row.startWeight, name: 'Peso inicial' },
    { selector: (row: any) => row.endWeight, name: 'Peso final' },
    { selector: (row: any) => row.calculationType == 'fix' ? 'Fixo' : 'Multiplicado', name: 'Peso final' },
    { selector: (row: any) => row.value, name: 'Valor' },
];

class ViewWeight extends ViewModal {

    public Close = (recipient: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        startWeight: '0.000',
        endWeight: '0.000',
        calculationType: 'fix',
        value: '0.00'
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({open: true, ...item});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Destinatário (Região)' Width={600} Close={this.Close}>
                
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    <Grid md={3}>
                        <TextBox Label='Peso inicial' TextTransform='UpperCase' Text={this.state.startWeight} OnChange={(args: EventArgs) => this.setState({startWeight: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <TextBox Label='Peso final' TextTransform='UpperCase' Text={this.state.endWeight} OnChange={(args: EventArgs) => this.setState({endWeight: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <DropDownList Label='Cálculo' SelectedValue={this.state.calculationType} OnChange={(args: EventArgs) => this.setState({calculationType: args.Value})}>
                            <DropDownListItem Label='[Selecione]' Value={null} />
                            <DropDownListItem Label='Fixo' Value={'fix'} />
                            <DropDownListItem Label='Multiplicado' Value={'multiplied'} />
                        </DropDownList>
                    </Grid>
                    <Grid md={3}>
                        <TextBox Label='Valor' TextTransform='UpperCase' Text={this.state.value} OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
                    </Grid>
                </Grid>

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />

            </Modal>
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
                <GridView Columns={Columns} Rows={this.props.weights} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}