import React, { ReactNode } from "react";
import { AutoComplete, Button, DropDownList, DropDownListItem, GridView, Modal, NumericBox, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { ProductTemplate } from "../../../../Search/Templates/Product";
import _ from "lodash";
import { FormLabel, Grid, Input } from "@mui/joy";

const Columns = [
    { selector: (row: any) => row.produto.nome, name: 'Item' },
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
        quantidade: null,
        desconto: null,
        valor: null,
        total: "0.00",
        itemCombinacoes: []
    }

    public Show = async (item?: any): Promise<any> =>
    {
        
        this.setState({open: true, ...item, itemCombinacoes: item.itemCombinacoes});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    protected TxtQuantidade_Change = (produtoCombinacao: any, combinacaoItem: any, quantidade: number, action: string) => {

        if (action == "+") {    
            if (this.QuantidadeTotal(produtoCombinacao) + 1 > produtoCombinacao.maximo) return;
        }

        let itemCombinacoes: any[] = _.cloneDeep(this.state.itemCombinacoes);

        const itemCombinacao = _.filter(itemCombinacoes, (itemCombinacao: any) => itemCombinacao?.combinacaoId == produtoCombinacao.combinacao.id)[0];

        const item2 = _.filter(produtoCombinacao.combinacao.combinacaoItems, (c: any) => c.id == combinacaoItem.id)[0];

        const item = _.filter(itemCombinacao?.combinacaoItems, (c: any) => c.itemCombinacaoId == item2.id)[0];

        let combinacaoItems = itemCombinacao?.combinacaoItems || [];

        _.remove(combinacaoItems, (c: any) => c.itemCombinacaoId == item2?.id);

        _.remove(itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id);

        combinacaoItems.push({id: item?.id, itemCombinacaoId: item2?.id, quantidade: quantidade});

        itemCombinacoes?.push({
            id: itemCombinacao?.id,
            pedidoVendaItemId: itemCombinacao?.pedidoVendaItemId,
            combinacaoId: produtoCombinacao?.combinacao?.id,
            combinacaoItems: _.filter(combinacaoItems, (c: any) => c.quantidade > 0)
        });

        this.setState({itemCombinacoes});

    }

    protected Quantidade = (produtoCombinacao: any, combinacaoItem: any): number => {
        const quantidade: any = _.map(_.filter(((_.filter(this.state.itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c: any) => c.itemCombinacaoId == combinacaoItem.id), (c2: any) => c2.quantidade as number)[0];
        return parseInt(quantidade) || 0;
    }

    protected QuantidadeTotal = (produtoCombinacao: any): number => {
        const quantidade: any = _.sum(_.map(((_.filter(this.state.itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c2: any) => c2.quantidade as number));
        return parseInt(quantidade) || 0;
    }

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Item' Width={550} Close={this.Close}>
                
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    
                    <Grid md={12}>
                        <AutoComplete Label='Item' Pesquisa={async(Text: string) => await Search.Product(Text)} Text={(Item: any) => `${Item.nome || ''}` } Value={this.state.produto} OnChange={(args: any) => this.setState({produto: args})}>
                            <ProductTemplate />
                        </AutoComplete>
                    </Grid>

                    {_.orderBy((this.state.produto as any)?.combinacoes, ['ordem'], ['asc'])?.map((produtoCombinacao: any) =>
                        <>
                            {produtoCombinacao.maximo == 1 && (
                                <Grid md={12}>
                                    <FormLabel>{produtoCombinacao.combinacao.descricao}&nbsp;&nbsp;{produtoCombinacao.isObrigatorio ? <div style={{color: 'red', fontWeight: 400}}>Obrigatório</div> : <div style={{color: 'gray', fontWeight: 400}}>Opcional</div>}</FormLabel>
                                    <DropDownList
                                        SelectedValue={_.map(((_.filter(this.state.itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c: any) => c.itemCombinacaoId)[0]}
                                        OnChange={(args: EventArgs) => {

                                            let itemCombinacoes: any[] = _.cloneDeep(this.state.itemCombinacoes);

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
                                            return <DropDownListItem Label={combinacaoItem.nome} Value={combinacaoItem.id} />
                                        })}
                                    </DropDownList>
                                </Grid>
                            )}

                            {produtoCombinacao.maximo > 1 && (<>
                                <Grid md={12}>
                                    <FormLabel>{produtoCombinacao.combinacao.descricao}&nbsp;&nbsp;{produtoCombinacao.isObrigatorio ? <div style={{color: 'red', fontWeight: 400}}>Obrigatório</div> : <div style={{color: 'gray', fontWeight: 400}}>Opcional</div>}&nbsp;&nbsp;<div style={{color: 'gray', fontWeight: 400}}>{`[Min: ${produtoCombinacao.minimo} Max: ${produtoCombinacao.maximo}]`}</div></FormLabel>
                                    
                                    {produtoCombinacao.combinacao.combinacaoItems?.map((combinacaoItem: any) => {

                                        return (
                                        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                            <Grid md={3}>
                                                <Input
                                                    value={this.Quantidade(produtoCombinacao, combinacaoItem)}
                                                    startDecorator={
                                                        <Button Text="-" OnClick={() => this.TxtQuantidade_Change(produtoCombinacao, combinacaoItem, this.Quantidade(produtoCombinacao, combinacaoItem) - 1, "-")} />
                                                    }
                                                    endDecorator={
                                                        <Button Text="+" OnClick={() => this.TxtQuantidade_Change(produtoCombinacao, combinacaoItem, this.Quantidade(produtoCombinacao, combinacaoItem) + 1, "+")} />
                                                    }
                                                    sx={{
                                                    '--Input-decoratorChildHeight': `28px`,
                                                    }}
                                                    onChange={(args: any) => this.TxtQuantidade_Change(produtoCombinacao, combinacaoItem, args.target.value, "+")}
                                                />
                                            </Grid>
                                            <Grid md={9}>
                                                <div style={{marginTop: '5px'}}>
                                                    {combinacaoItem.nome}
                                                </div>
                                            </Grid>
                                        </Grid>
                                        );
                                    })}
                                </Grid>
                            </>)}
                        </>
                    )}

                    <Grid md={3}>
                        <NumericBox Label='Quantidade' Text={this.state.quantidade} Scale={3} OnChange={(args: EventArgs) => this.setState({quantidade: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <NumericBox Label='Desconto' Text={this.state.desconto} Prefix="R$ " Scale={2} OnChange={(args: EventArgs) => this.setState({desconto: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <NumericBox Label='Valor' Text={this.state.valor} Prefix="R$ " Scale={2} OnChange={(args: EventArgs) => this.setState({valor: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <TextBox Label='Total' Text={`R$ ${this.state.total.toString()}`} ReadOnly={true} />
                    </Grid>

                    <Grid md={3}>
                        <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
                    </Grid>
                    
                </Grid>
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
            quantidade: null,
            desconto: null,
            valor: null,
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
        args.itemCombinacoes = [];

        for (let itemCombinacao of item.itemCombinacoes) {

            if (_.size(_.filter(itemCombinacao.combinacaoItems, (c: any) => c.itemCombinacaoId != null)) == 0) {
                continue;
            }
            
            if (_.size(_.filter(itemCombinacao.combinacaoItems, (c: any) => c.quantidade > 0)) > 0) {
                args.itemCombinacoes.push(itemCombinacao);
            }

        }

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