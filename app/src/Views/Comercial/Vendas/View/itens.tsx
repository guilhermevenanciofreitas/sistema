import React, { ReactNode } from "react";
import { AutoComplete, Button, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { ProdutoTemplate } from "../../../../Search/Templates/Produto";

const Columns = [
    { selector: (row: any) => row.produto.descricao, name: 'Item' },
    { selector: (row: any) => row.quantidade, name: 'Quantidade' },
    { selector: (row: any) => row.valor, name: 'Valor' },
    { selector: (row: any) => "0.00", name: 'Desconto' },
    { selector: (row: any) => row.valor, name: 'Total' },
];

class ViewItem extends ViewModal {

    public Close = (item: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        produto: null,
        quantidade: "1.000",
        valor: "0.00"
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({open: true, ...item});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Item' Width={600} Close={this.Close}>
                
                <AutoComplete Label='Item' Pesquisa={async(Text: string) => await Search.Produto(Text)} Text={(Item: any) => `${Item.descricao}` } Value={this.state.produto} OnChange={(args: any) => this.setState({produto: args})}>
                    <ProdutoTemplate />
                </AutoComplete>

                <TextBox Label='Quantidade' TextTransform='UpperCase' Text={this.state.quantidade} OnChange={(args: EventArgs) => this.setState({quantidade: args.Value})} />
                <TextBox Label='Valor' TextTransform='UpperCase' Text={this.state.valor} OnChange={(args: EventArgs) => this.setState({valor: args.Value})} />

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
            </Modal>
        );
    }

}

export class Itens extends BaseDetails<Readonly<{Itens: any[], OnChange?: Function | any}>> {

    protected ViewItem = React.createRef<ViewItem>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewItem.current?.Show({
            id: "",
            produto: null,
            quantidade: "1",
        });

        if (item == null) return;

        this.props.Itens.push({...item});
        this.props.OnChange(this.props.Itens);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewItem.current?.Show({...args});
        if (item == null) return;
        args.produto = item.produto;
        args.quantidade = item.quantidade;
        args.valor = item.valor;
        this.props.OnChange(this.props.Itens);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.Itens));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.Itens));

    render(): ReactNode {
        return (
            <>
                <ViewItem ref={this.ViewItem} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.Itens} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}