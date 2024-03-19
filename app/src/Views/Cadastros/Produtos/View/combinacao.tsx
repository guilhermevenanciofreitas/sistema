import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { ProdutoTemplate } from "../../../../Search/Templates/Produto";
import { ProdutoCombinacaoGrupoTemplate } from "../../../../Search/Templates/ProdutoCombinacaoGrupo";
import { Grid } from "@mui/joy";

const Columns = [
    { selector: (row: any) => row.combinacao.descricao, name: 'Item' },
    { selector: (row: any) => row.isObrigatorio ? "SIM" : "NÃO", name: 'Obrigatório' },
    { selector: (row: any) => row.minimo, name: 'Minimo' },
    { selector: (row: any) => row.maximo, name: 'Máximo' },
];

class ViewCombinacao extends ViewModal {

    public Close = (combinacao: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        combinacao: null,
        isObrigatorio: true,
        minimo: "1",
        maximo: "1",
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
                
                <Grid>
                    <Grid md={12}>
                        <AutoComplete Label='Item' Pesquisa={async(Text: string) => await Search.ProdutoCombinacaoGrupo(Text)} Text={(Item: any) => `${Item.descricao}` } Value={this.state.combinacao} OnChange={(args: any) => this.setState({combinacao: args})}>
                            <ProdutoCombinacaoGrupoTemplate />
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

            </Modal>
        );
    }

}

export class Combinacao extends BaseDetails<Readonly<{Itens: any[], OnChange?: Function | any}>> {

    protected ViewCombinacao = React.createRef<ViewCombinacao>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewCombinacao.current?.Show({
            id: "",
            combinacao: null,
            isObrigatorio: false,
            minimo: "1",
            maximo: "1",
        });

        if (item == null) return;

        this.props.Itens.push({...item});
        this.props.OnChange(this.props.Itens);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewCombinacao.current?.Show({...args});
        if (item == null) return;
        args.combinacao = item.combinacao;
        args.isObrigatorio = item.isObrigatorio;
        args.minimo = item.minimo;
        args.maximo = item.maximo;
        this.props.OnChange(this.props.Itens);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.Itens));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.Itens));

    render(): ReactNode {
        return (
            <>
                <ViewCombinacao ref={this.ViewCombinacao} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.Itens} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}