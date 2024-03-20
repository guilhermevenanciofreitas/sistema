import React, { ReactNode } from "react";
import { AutoComplete, Button, DropDownList, DropDownListItem, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { ProdutoTemplate } from "../../../../Search/Templates/Produto";
import _ from "lodash";

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
        valor: "0.00",
        itemCombinacoes: []
    }

    public Show = async (item?: any): Promise<any> =>
    {
        
        this.setState({open: true, ...item, itemCombinacoes: item.itemCombinacoes});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Item' Width={600} Close={this.Close}>
                
                <AutoComplete Label='Item' Pesquisa={async(Text: string) => await Search.Produto(Text)} Text={(Item: any) => `${Item.descricao || ''}` } Value={this.state.produto} OnChange={(args: any) => this.setState({produto: args})}>
                    <ProdutoTemplate />
                </AutoComplete>

                {(this.state.produto as any)?.combinacoes?.map((produtoCombinacao: any) =>
                    <>

                        {produtoCombinacao.maximo == 1 && (
                            <>
                                <DropDownList Label={produtoCombinacao.combinacao.descricao}
                                    SelectedValue={_.map(((_.filter(this.state.itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c: any) => c.itemCombinacaoId)[0]}
                                    OnChange={(args: EventArgs) => {

                                        let itemCombinacoes: any[] = this.state.itemCombinacoes;

                                        let itemCombinacao = _.filter(itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id)[0];

                                        _.remove(itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id);

                                        itemCombinacoes?.push({
                                            id: itemCombinacao?.id,
                                            pedidoVendaItemId: itemCombinacao?.pedidoVendaItemId,
                                            combinacaoId: produtoCombinacao?.combinacao?.id,
                                            combinacaoItems: [{id: itemCombinacao?.combinacaoItems[0]?.id, itemCombinacaoId: args.Value, quantidade: 1}]
                                        });
                                        
                                        this.setState({itemCombinacoes});
                                    }}
                                >
                                    <DropDownListItem Label='[Selecione]' Value={null} />
                                    {produtoCombinacao.combinacao.combinacaoItems?.map((combinacaoItem: any) => {
                                        return <DropDownListItem Label={combinacaoItem.descricao} Value={combinacaoItem.id} />
                                    })}
                                </DropDownList>
                            </>
                        )}
                    </>
                )}

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
            produto: {
                combinacoes: []
            },
            quantidade: "1",
            valor: "0.00",
            itemCombinacoes: []
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
        args.itemCombinacoes = item.itemCombinacoes;

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