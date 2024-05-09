import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, ViewModal, TextBox } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { ProductCombinationGroupTemplate } from "../../../../Search/Templates/ProductCombinationGroup";

const Columns = [
    { selector: (row: any) => row.combinationGroup?.description, name: 'Item' },
    { selector: (row: any) => row.isObrigatorio ? "SIM" : "NÃO", name: 'Obrigatório' },
    { selector: (row: any) => row.minimo, name: 'Minimo' },
    { selector: (row: any) => row.maximo, name: 'Máximo' },
];

class ViewCombination extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        combinationGroup: null,
        isObrigatorio: true,
        minimo: '1',
        maximo: '1',
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
                        <AutoComplete Label='Item' Pesquisa={async(Text: string) => await Search.ProductCombinationGroup(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.combinationGroup} OnChange={(combinationGroup: any) => this.setState({combinationGroup})}>
                            <ProductCombinationGroupTemplate />
                        </AutoComplete>
                    </Grid>
                    <Grid md={12}>
                        <CheckBox Label='Obrigatório' Checked={this.state.isObrigatorio} OnChange={(args: EventArgs) => this.setState({isObrigatorio: args.Value})} />
                    </Grid>
                    <Grid md={6}>
                        <TextBox Label='Minimo' TextTransform='LowerCase' Text={this.state.minimo} OnChange={(args: EventArgs) => this.setState({minimo: args.Value})} />
                    </Grid>
                    <Grid md={6}>
                        <TextBox Label='Máximo' TextTransform='LowerCase' Text={this.state.maximo} OnChange={(args: EventArgs) => this.setState({maximo: args.Value})} />
                    </Grid>
                </Grid>

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />

            </ViewModal>
        );
    }

}

export class Combinations extends BaseDetails<Readonly<{combinations: any[], OnChange?: Function | any}>> {

    protected ViewCombination = React.createRef<ViewCombination>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewCombination.current?.Show({
            id: '',
            combinationGroup: null,
            isObrigatorio: false,
            minimo: '1',
            maximo: '1',
        });

        if (item == null) return;

        this.props.combinations.push({...item});
        this.props.OnChange(this.props.combinations);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewCombination.current?.Show({...args});
        if (item == null) return;
        args.combinationGroup = item.combinationGroup;
        args.isObrigatorio = item.isObrigatorio;
        args.minimo = item.minimo;
        args.maximo = item.maximo;
        this.props.OnChange(this.props.combinations);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.combinations));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.combinations));

    render(): ReactNode {
        return (
            <>
                <ViewCombination ref={this.ViewCombination} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.combinations} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}