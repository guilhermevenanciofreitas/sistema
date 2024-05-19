import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, ViewModal, TextBox, Content, Actions } from "../../../../Utils/Controls";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { NfeTemplate } from "../../../../Search/Templates/Nfe";
import _ from "lodash";
import { color } from "../../../../Utils/color";
import { CheckCircleOutlined } from "@mui/icons-material";
import { ShippingOrderTemplate } from "../../../../Search/Templates/ShippingOrder";

const Columns = [
    { selector: (row: any) => row.shippingOrder?.sender?.surname, sort: 'sender', name: 'Rementente' },
    { selector: (row: any) => row.shippingOrder?.recipient?.surname, sort: 'sender', name: 'Destinatário' },
    { selector: (row: any) => parseFloat(row.shippingOrder?.weight).toLocaleString("pt-BR", {minimumFractionDigits: 3}), sort: 'weight', name: 'Peso', minWidth: '100px', maxWidth: '100px' },
];

class ViewShippingOrder extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        shippingOrder: null,
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({...item});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='Ordem de carga' Width={450}>
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <AutoComplete 
                                Action={{Type: 'ShippingOrder', Edit: {Id: _.get(this.state.shippingOrder, 'id')}}}
                                Label='Ordem de carga' Pesquisa={async(Text: string) => await Search.ShippingOrder(Text)} Text={(Item: any) => `${Item.sender?.surname} / ${Item.sender?.cpfCnpj}`} Value={this.state.shippingOrder} OnChange={(shippingOrder: any) => this.setState({shippingOrder})}>
                                <ShippingOrderTemplate />
                            </AutoComplete>
                        </Grid>
                    </Grid>
                </Content>
                <Actions>
                    <Button Text='Confirmar' StartIcon={<CheckCircleOutlined />} Color={'white'} BackgroundColor={color.success} OnClick={this.BtnConfirmar_Click} />
                </Actions>
            </ViewModal>
        );
    }

}

export class ShippingOrders extends BaseDetails<Readonly<{shippingOrders: any[], OnChange?: Function | any}>> {

    protected ViewShippingOrder = React.createRef<ViewShippingOrder>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewShippingOrder.current?.Show({
            id: '',
            supplier: null,
        });

        if (item == null) return;

        this.props.shippingOrders.push({...item});
        this.props.OnChange(this.props.shippingOrders);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewShippingOrder.current?.Show({...args});
        if (item == null) return;
        args.supplier = item.supplier;
        this.props.OnChange(this.props.shippingOrders);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.shippingOrders));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.shippingOrders));

    render(): ReactNode {
        return (
            <>
                <ViewShippingOrder ref={this.ViewShippingOrder} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.shippingOrders} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}