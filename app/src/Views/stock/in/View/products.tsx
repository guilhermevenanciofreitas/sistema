import React, { ReactNode } from "react";
import { AutoComplete, Button, DropDownList, DropDownListItem, GridView, Modal, NumericBox, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { ProductTemplate } from "../../../../Search/Templates/Product";
import _ from "lodash";
import { FormLabel, Grid, Input } from "@mui/joy";
import { StockLocationTemplate } from "../../../../Search/Templates/StockLocation";

const Item = ({ row }: any) => {
    return (
        <div style={{display: 'flex', height: 'auto'}}>
            <div data-tag="allowRowEvents" style={{ overflow: 'hidden', textOverflow: 'ellipses', gap: 2 }}>
                {<b>{row.product?.name || <span style={{color: '#ec5353'}}>[Selecione]</span>}</b>}
                <br />
                <i><span style={{fontSize: 12}}>Item NF: {row.prod?.xProd}</span></i>
            </div>
        </div>
    );
};

const Columns = [
    { selector: (row: any) => <Item row={row} />, name: 'Item' },
    { selector: (row: any) => parseFloat(row.quantity).toLocaleString('pt-BR', {minimumFractionDigits: 3}), name: 'Quantidade', maxWidth: '90px', right: true },
    { selector: (row: any) => parseFloat(row.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), name: 'Valor', maxWidth: '110px', right: true },
    { selector: (row: any) => (parseFloat(row.value) * parseFloat(row.quantity)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), name: 'Total', maxWidth: '110px', right: true },
];

class ViewItem extends ViewModal {

    protected TxtQuantidade = React.createRef<NumericBox>();

    public Close = (item: any) => this.setState({open: false});

    state = {
        open: false,
        id: '',
        stockLocation: null,
        product: null,
        quantity: null,
        value: null,
        prod: null
    }

    public Show = async (item?: any): Promise<any> =>
    {
        
        this.setState({open: true, ...item});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Item' Width={550} Close={this.Close}>
                
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    
                    <Grid md={12}>
                        {_.get(this.state, 'prod.xProd')}
                    </Grid>
                    
                    <Grid md={12}>
                        <AutoComplete Label='Localização' Pesquisa={async(Text: string) => await Search.StockLocation(Text)} Text={(Item: any) => `${Item.name}` } Value={this.state.stockLocation} OnChange={(stockLocation: any) => this.setState({stockLocation})}>
                            <StockLocationTemplate />
                        </AutoComplete>
                    </Grid>
                    
                    <Grid md={12}>
                        <AutoComplete Label='Item' Pesquisa={async(Text: string) => await Search.Product(Text)} Text={(Item: any) => `${Item.name || ''}` } Value={this.state.product} OnChange={(product: any) => {
                                this.setState({product, value: product?.value || this.state.value});
                                this.TxtQuantidade.current?.Focus();
                            }}>
                            <ProductTemplate />
                        </AutoComplete>
                    </Grid>

                    <Grid md={4}>
                        <NumericBox ref={this.TxtQuantidade} Label='Quantidade' Text={this.state.quantity} Scale={3} OnChange={(args: EventArgs) => this.setState({quantity: args.Value})} />
                    </Grid>
                    <Grid md={4}>
                        <NumericBox Label='Valor' Text={this.state.value} Prefix="R$ " Scale={2} OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
                    </Grid>
                    <Grid md={4}>
                        <NumericBox Label='Total' Text={(parseFloat(this.state.value || '0') * parseFloat(this.state.quantity || '0')).toString()} Prefix="R$ " Scale={2} ReadOnly={true} />
                    </Grid>

                    <Grid md={3}>
                        <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
                    </Grid>
                    
                </Grid>
            </Modal>
        );
    }

}

export class Products extends BaseDetails<Readonly<{products: any[], OnChange?: Function | any}>> {

    protected ViewItem = React.createRef<ViewItem>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewItem.current?.Show({
            id: '',
            stockLocation: null,
            product: null,
            quantity: null,
            value: null,
            prod: null
        });

        if (item == null) return;

        this.props.products.push({...item});
        this.props.OnChange(this.props.products);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewItem.current?.Show({...args});
        
        if (item == null) return;
        args.stockLocation = item.stockLocation;
        args.product = item.product;
        args.quantity = item.quantity;
        args.value = item.value;

        this.props.OnChange(this.props.products);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.products));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.products));

    render(): ReactNode {
        return (
            <>
                <ViewItem ref={this.ViewItem} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.products} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}