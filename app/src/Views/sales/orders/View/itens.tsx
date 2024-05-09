import React, { ReactNode } from "react";
import { AutoComplete, Button, DropDownList, DropDownListItem, GridView, ViewModal, NumericBox, TextBox } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { ProductTemplate } from "../../../../Search/Templates/Product";
import _ from "lodash";
import { FormLabel, Grid, Input } from "@mui/joy";

const Columns = [
    { selector: (row: any) => row.product?.name, name: 'Item' },
    { selector: (row: any) => parseFloat(row.quantity).toLocaleString("pt-BR", {minimumFractionDigits: 3}), name: 'Quantidade', maxWidth: '90px', right: true },
    { selector: (row: any) => parseFloat(row.value).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), name: 'Valor', maxWidth: '110px', right: true },
    { selector: (row: any) => parseFloat(row.discount).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), name: 'Desconto', maxWidth: '110px', right: true },
    { selector: (row: any) => ((parseFloat(row.value) - parseFloat(row.discount)) * parseFloat(row.quantity)).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), name: 'Total', maxWidth: '110px', right: true },
];

class ViewItem extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();
    protected TxtQuantidade = React.createRef<NumericBox>();

    state = {
        id: "",
        product: null,
        quantity: null,
        discount: null,
        value: null,
        itemCombinations: []
    }

    public Show = async (item?: any): Promise<any> =>
    {
        
        this.setState({...item, itemCombinacoes: item.itemCombinacoes});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    protected TxtQuantidade_Change = (produtoCombinacao: any, combinacaoItem: any, quantidade: number, action: string) => {

        if (action == "+") {    
            if (this.QuantidadeTotal(produtoCombinacao) + 1 > produtoCombinacao.maximo) return;
        }

        let itemCombinations: any[] = _.cloneDeep(this.state.itemCombinations);

        const itemCombinacao = _.filter(itemCombinations, (itemCombinacao: any) => itemCombinacao?.combinacaoId == produtoCombinacao.combinacao.id)[0];

        const item2 = _.filter(produtoCombinacao.combinacao.combinacaoItems, (c: any) => c.id == combinacaoItem.id)[0];

        const item = _.filter(itemCombinacao?.combinacaoItems, (c: any) => c.itemCombinacaoId == item2.id)[0];

        let combinacaoItems = itemCombinacao?.combinacaoItems || [];

        _.remove(combinacaoItems, (c: any) => c.itemCombinacaoId == item2?.id);

        _.remove(itemCombinations, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id);

        combinacaoItems.push({id: item?.id, itemCombinacaoId: item2?.id, quantidade: quantidade});

        itemCombinations?.push({
            id: itemCombinacao?.id,
            saleOrderItemId: itemCombinacao?.pedidoVendaItemId,
            combinationId: produtoCombinacao?.combinacao?.id,
            combinacaoItems: _.filter(combinacaoItems, (c: any) => c.quantidade > 0)
        });

        this.setState({itemCombinations});

    }

    protected Quantidade = (produtoCombinacao: any, combinacaoItem: any): number => {
        const quantidade: any = _.map(_.filter(((_.filter(this.state.itemCombinations, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c: any) => c.itemCombinacaoId == combinacaoItem.id), (c2: any) => c2.quantidade as number)[0];
        return parseInt(quantidade) || 0;
    }

    protected QuantidadeTotal = (produtoCombinacao: any): number => {
        const quantidade: any = _.sum(_.map(((_.filter(this.state.itemCombinations, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c2: any) => c2.quantidade as number));
        return parseInt(quantidade) || 0;
    }

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='Item' Width={550}>
                
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    
                    <Grid md={12}>
                        <AutoComplete Label='Item' Pesquisa={async(Text: string) => await Search.Product(Text)} Text={(Item: any) => `${Item.name || ''}` } Value={this.state.product} OnChange={(product: any) => {
                                this.setState({product, discount: '0.00', value: product?.value});
                                this.TxtQuantidade.current?.Focus();
                            }}>
                            <ProductTemplate />
                        </AutoComplete>
                    </Grid>

                    {_.orderBy((this.state.product as any)?.combinacoes, ['ordem'], ['asc'])?.map((produtoCombinacao: any) =>
                        <>
                            {produtoCombinacao.maximo == 1 && (
                                <Grid md={12}>
                                    <FormLabel>{produtoCombinacao.combinacao.descricao}&nbsp;&nbsp;{produtoCombinacao.isObrigatorio ? <div style={{color: 'red', fontWeight: 400}}>Obrigatório</div> : <div style={{color: 'gray', fontWeight: 400}}>Opcional</div>}</FormLabel>
                                    <DropDownList
                                        SelectedValue={_.map(((_.filter(this.state.itemCombinations, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c: any) => c.itemCombinacaoId)[0]}
                                        OnChange={(args: EventArgs) => {

                                            let itemCombinacoes: any[] = _.cloneDeep(this.state.itemCombinations);

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
                        <NumericBox ref={this.TxtQuantidade} Label='Quantidade' Text={this.state.quantity} Scale={3} OnChange={(args: EventArgs) => this.setState({quantity: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <NumericBox Label='Desconto' Text={this.state.discount} Prefix="R$ " Scale={2} OnChange={(args: EventArgs) => this.setState({discount: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <NumericBox Label='Valor' Text={this.state.value} Prefix="R$ " Scale={2} OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
                    </Grid>
                    <Grid md={3}>
                        <NumericBox Label='Total' Text={((parseFloat(this.state.value || '0') - parseFloat(this.state.discount || '0')) * parseFloat(this.state.quantity || '0')).toString()} Prefix="R$ " Scale={2} ReadOnly={true} />
                    </Grid>

                    <Grid md={3}>
                        <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
                    </Grid>
                    
                </Grid>
            </ViewModal>
        );
    }

}

export class Itens extends BaseDetails<Readonly<{Itens: any[], OnChange?: Function | any}>> {

    protected ViewItem = React.createRef<ViewItem>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewItem.current?.Show({
            id: '',
            product: null,
            quantity: null,
            discount: null,
            value: null,
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
        args.product = item.product;
        args.quantity = item.quantity;
        args.discount = item.discount;
        args.value = item.value;
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