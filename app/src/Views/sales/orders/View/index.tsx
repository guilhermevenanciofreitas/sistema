
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
import { Receivies } from './receivies';
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
                                if (costumer?.isBlockSale) {
                                    await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: "Cliente bloqueado para venda!", buttons: [{ Text: "OK" }]});
                                    return;
                                }
                                this.setState({costumer})
                            }}>
                                <CostumerTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <AutoComplete Label='Tipo de entrega' Pesquisa={async(Text: string) => await Search.SaleOrderShippingType(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.shippingType} OnChange={(shippingType: any) => this.setState({shippingType})}>
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
                            <AutoComplete Label='Empresa' Pesquisa={async(Text: string) => await Search.Company(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.company} OnChange={(company: any) => this.setState({company})}>
                                <CompanyTemplate />
                            </AutoComplete>
                        </Grid>

                        <Grid md={4}>
                            <AutoComplete Label='Vendedor' Pesquisa={async(Text: string) => await Search.Employee(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.seller} OnChange={(seller: any) => this.setState({seller})}>
                                <EmployeeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Criado em' Text={this.state.createdAt} ReadOnly={true} />
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Valor total' Text={_.sum(this.state.items.map((c: any) => (parseFloat(c.value || '0') - parseFloat(c.discount || '0')) * parseFloat(c.quantity || '0'))).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} ReadOnly={true} />
                        </Grid>

                        <Tab>
                            <TabItem Title='Produtos' Visible={true}>
                                <Itens Itens={this.state.items} OnChange={(items: any[]) => this.setState({items})} />
                            </TabItem>
                            <TabItem Title='Pagamento' Visible={true}>
                                <Receivies receivies={this.state.receivies} OnChange={(receivies: any[]) => this.setState({receivies})} />
                            </TabItem>
                            <TabItem Title='Entrega' Visible={this.state.shippingType != null}>
                                <>
                                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                        <Grid md={2}>
                                            <TextBox Label='CEP' TextTransform='UpperCase' Text={this.state.shippingAddress?.cep} OnChange={(args: EventArgs) => this.setState({shippingAddress: {...this.state.shippingAddress, cep: args.Value}})} />
                                        </Grid>
                                        <Grid md={5}>
                                            <TextBox Label='Logradouro' TextTransform='UpperCase' Text={this.state.shippingAddress?.logradouro} OnChange={(args: EventArgs) => this.setState({shippingAddress: {...this.state.shippingAddress, logradouro: args.Value}})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='Número' TextTransform='UpperCase' Text={this.state.shippingAddress?.numero} OnChange={(args: EventArgs) => this.setState({shippingAddress: {...this.state.shippingAddress, numero: args.Value}})} />
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Complemento' TextTransform='UpperCase' Text={this.state.shippingAddress?.complemento} OnChange={(args: EventArgs) => this.setState({shippingAddress: {...this.state.shippingAddress, complemento: args.Value}})} />
                                        </Grid>

                                        <Grid md={5}>
                                            <TextBox Label='Bairro' TextTransform='UpperCase' Text={this.state.shippingAddress?.bairro} OnChange={(args: EventArgs) => this.setState({shippingAddress: {...this.state.shippingAddress, bairro: args.Value}})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <DropDownList Label='Estado' SelectedValue={this.state.shippingAddress?.estadoId} OnChange={(args: EventArgs) => this.setState({shippingAddress: {...this.state.shippingAddress, estadoId: args.Value}})}>
                                                <DropDownListItem Label='[Selecione]' Value={null} />
                                                {
                                                    Estados.map((args) => <DropDownListItem Label={args.nome} Value={args.id} />)
                                                }
                                            </DropDownList>
                                        </Grid>
                                        <Grid md={5}>
                                            <AutoComplete Label='Municipio' Pesquisa={async(Text: string) => await Search.Municipio(Text, this.state.shippingAddress?.estadoId)} Text={(Item: any) => `${Item.nome}` } Value={this.state.shippingAddress?.municipio} OnChange={(args: EventArgs) => this.setState({shippingAddress: {...this.state.shippingAddress, municipio: args}})}>
                                                <MunicipioTemplate />
                                            </AutoComplete>
                                        </Grid>
                                    </Grid>
                                    <br></br>
                                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                        <Grid md={4}>
                                            <AutoComplete Label='Transportadora' Pesquisa={async(Text: string) => await Search.ShippingCompany(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.shippingCompany} OnChange={(shippingCompany: any) => this.setState({shippingCompany})}>
                                                <EmployeeTemplate />
                                            </AutoComplete>
                                        </Grid>
                                    </Grid>
                                </>
                            </TabItem>
                        </Tab>
                        
                    </Grid>

                </Form>
            </Modal>
        );

    }

}