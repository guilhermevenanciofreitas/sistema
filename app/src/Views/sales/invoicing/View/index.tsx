
import { ViewOrderInvoicingBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, GridView, MessageBox, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import _ from 'lodash';

export class ViewOrderInvoicing extends ViewOrderInvoicingBase {

    private ColumnsOrders = [
        { selector: (row: any) => row.number, sort: 'number', name: 'Número', maxWidth:"200px" },
        { selector: (row: any) => row.costumer, sort: 'costumer', name: 'Cliente' },
    ];

    private ColumnsNfe = [
        //{ selector: (row: any) => row.orderNumber, sort: 'number', name: 'Número', maxWidth:"200px" },
        { selector: (row: any) => row[0].nfe?.emit?.xNome, name: 'Emitente' },
        { selector: (row: any) => row[0].nfe?.dest?.xNome, name: 'Destinatário' },
    ]

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>
{/*
                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />
*/}
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <GridView Columns={this.ColumnsOrders} Rows={this.state.orders} OnItem={() => null} OnSelected={() => null} />
                        </Grid>
                        
                        <Tab>
                            <TabItem Title='Notas fiscais' Visible={true}>
                                <GridView SelectedRows={false} Columns={this.ColumnsNfe} Rows={_.map(this.state.orders, (c: any) => c.saleOrderNfe)} OnItem={() => null} OnSelected={() => null} />
                            </TabItem>
                            <TabItem Title='Boletos' Visible={true}>
                                <></>
                            </TabItem>
                        </Tab>
                        
                    </Grid>

                </Form>
            </Modal>
        );

    }

}