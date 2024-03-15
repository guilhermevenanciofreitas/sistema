import React, { ReactNode } from "react";
import { AutoComplete, Button, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { ProdutoTemplate } from "../../../../Search/Templates/Produto";

const Columns = [
    { selector: (row: any) => row.cep, name: 'CEP' },
    { selector: (row: any) => row.logradouro, name: 'Logradouro' },
    { selector: (row: any) => row.numero, name: 'Número' },
];

class ViewCombinacao extends ViewModal {

    public Close = (endereco: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        produto: null,
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
    }

    public Show = async (endereco?: any): Promise<any> =>
    {

        this.setState({open: true, ...endereco});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Item' Width={600} Close={this.Close}>
                
                <AutoComplete Label='Item' Pesquisa={async(Text: string) => await Search.Produto(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.produto} OnChange={(args: any) => this.setState({cliente: args})}>
                    <ProdutoTemplate />
                </AutoComplete>

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
            </Modal>
        );
    }

}

export class Combinacoes extends BaseDetails<Readonly<{Enderecos: any[], OnChange?: Function | any}>> {

    protected ViewContato = React.createRef<ViewCombinacao>();

    protected BtnAdicionar_Click = async () => {

        const endereco: any = await this.ViewContato.current?.Show({
            id: "",
            cep: "",
            logradouro: "",
            numero: ""
        });

        if (endereco == null) return;

        this.props.Enderecos.push({...endereco});
        this.props.OnChange(this.props.Enderecos);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const endereco = await this.ViewContato.current?.Show({...args});
        if (endereco == null) return;
        args.cep = endereco.cep;
        args.logradouro = endereco.logradouro;
        args.numero = endereco.numero;
        this.props.OnChange(this.props.Enderecos);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.Enderecos));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.Enderecos));

    render(): ReactNode {
        return (
            <>
                <ViewCombinacao ref={this.ViewContato} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.Enderecos} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}