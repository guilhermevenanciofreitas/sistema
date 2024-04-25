
import { ViewOrderBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, MessageBox, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { CostumerTemplate } from '../../../../Search/Templates/Costumer';
import { Itens } from './itens';
import { MunicipioTemplate } from '../../../../Search/Templates/Municipio';
import { Estados } from '../../../../Utils/Estados';
import { Pagamento } from './pagamento';
import { SaleOrderShippingTypeTemplate } from '../../../../Search/Templates/SaleOrderShippingType';
import { EmployeeTemplate } from '../../../../Search/Templates/Employee';
import _ from 'lodash';
import { CompanyTemplate } from '../../../../Search/Templates/Company';

export class ViewOrder extends ViewOrderBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <TextBox Label='Número' TextTransform='UpperCase' Text={this.state.number} OnChange={(args: EventArgs) => this.setState({number: args.Value})} />
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Cliente' Pesquisa={async(Text: string) => await Search.Costumer(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.costumer} OnChange={async (costumer: any) => {
                                if (costumer?.isBloquearVenda) {
                                    await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: "Cliente bloqueado para venda!", buttons: [{ Text: "OK" }]});
                                    return;
                                }
                                this.setState({costumer})
                            }}>
                                <CostumerTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <AutoComplete Label='Tipo de entrega' Pesquisa={async(Text: string) => await Search.SaleOrderShippingType(Text)} Text={(Item: any) => `${Item.descricao}` } Value={this.state.tipoEntrega} OnChange={(args: any) => this.setState({tipoEntrega: args})}>
                                <SaleOrderShippingTypeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <FormLabel sx={{fontWeight: 400}}>Status</FormLabel>
                            <Alert variant="soft" style={{height: '32px'}}>
                                <div style={{display: 'flex', height: 'auto'}}>
                                    <div style={{marginTop: '3px', width: '15px', height: '15px', backgroundColor: _.get(this.state.status, 'color') || '#a0a0a0', borderRadius: '25px'}}></div>
                                    <div style={{paddingLeft: '8px'}}>
                                        {_.get(this.state.status, 'description') || "Pendente"}
                                    </div>
                                </div>
                            </Alert>
                        </Grid>

                        <Grid md={4}>
                            <AutoComplete Label='Empresa' Pesquisa={async(Text: string) => await Search.Company(Text)} Text={(Item: any) => `${Item.nomeFantasia}` } Value={this.state.company} OnChange={(company: any) => this.setState({company})}>
                                <CompanyTemplate />
                            </AutoComplete>
                        </Grid>

                        <Grid md={4}>
                            <AutoComplete Label='Vendedor' Pesquisa={async(Text: string) => await Search.Employee(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.seller} OnChange={(seller: any) => this.setState({seller})}>
                                <EmployeeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Criado em' Text={this.state.createdAt} ReadOnly={true} />
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Valor total' Text={_.sum(this.state.saleOrderItems.map((c: any) => parseFloat(c.value.toString() || '0'))).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} ReadOnly={true} />
                        </Grid>

                        <Tab>
                            <TabItem Title='Itens' Visible={true}>
                                <Itens Itens={this.state.saleOrderItems} OnChange={(saleOrderItems: any[]) => this.setState({saleOrderItems})} />
                            </TabItem>
                            <TabItem Title='Entrega' Visible={this.state.tipoEntrega != null}>
                                <>
                                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                        <Grid md={2}>
                                            <TextBox Label='CEP' TextTransform='UpperCase' Text={this.state.entrega.cep} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, cep: args.Value}})} />
                                        </Grid>
                                        <Grid md={5}>
                                            <TextBox Label='Logradouro' TextTransform='UpperCase' Text={this.state.entrega.logradouro} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, logradouro: args.Value}})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='Número' TextTransform='UpperCase' Text={this.state.entrega.numero} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, numero: args.Value}})} />
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Complemento' TextTransform='UpperCase' Text={this.state.entrega.complemento} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, complemento: args.Value}})} />
                                        </Grid>

                                        <Grid md={5}>
                                            <TextBox Label='Bairro' TextTransform='UpperCase' Text={this.state.entrega.bairro} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, bairro: args.Value}})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <DropDownList Label='Estado' SelectedValue={this.state.entrega.estadoId} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, estadoId: args.Value}})}>
                                                <DropDownListItem Label='[Selecione]' Value={null} />
                                                {
                                                    Estados.map((args) => <DropDownListItem Label={args.nome} Value={args.id} />)
                                                }
                                            </DropDownList>
                                        </Grid>
                                        <Grid md={5}>
                                            <AutoComplete Label='Municipio' Pesquisa={async(Text: string) => await Search.Municipio(Text, this.state.entrega.estadoId)} Text={(Item: any) => `${Item.nome}` } Value={this.state.entrega.municipio} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, municipio: args}})}>
                                                <MunicipioTemplate />
                                            </AutoComplete>
                                        </Grid>
                                    </Grid>
                                    <br></br>
                                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                        <Grid md={4}>
                                            <AutoComplete Label='Transportadora' Pesquisa={async(Text: string) => await Search.Employee(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.entregador} OnChange={(args: any) => this.setState({entregador: args})}>
                                                <EmployeeTemplate />
                                            </AutoComplete>
                                        </Grid>
                                    </Grid>
                                </>
                            </TabItem>
                            <TabItem Title='Pagamento' Visible={true}>
                                <Pagamento Itens={this.state.pagamentos} OnChange={(pagamentos: any[]) => this.setState({pagamentos})} />
                            </TabItem>
                        </Tab>
                        
                    </Grid>

                </Form>
            </Modal>
        );

    }

}