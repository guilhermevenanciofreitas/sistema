
import { ViewOrderBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, MessageBox, ViewModal, Tab, TabItem, TextBox, Content, Actions } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid, IconButton } from '@mui/joy';
import { Search } from '../../../../Search';
import { CustomerTemplate } from '../../../../Search/Templates/Customer';
import { Itens } from './itens';
import { CityTemplate } from '../../../../Search/Templates/City';
import { Estados } from '../../../../Utils/Estados';
import { Receivies } from './receivies';
import { SaleOrderShippingTypeTemplate } from '../../../../Search/Templates/SaleOrderShippingType';
import { EmployeeTemplate } from '../../../../Search/Templates/Employee';
import _ from 'lodash';
import { CompanyTemplate } from '../../../../Search/Templates/Company';
import { StateTemplate } from '../../../../Search/Templates/State';
import { TaskAltOutlined, TravelExplore } from '@mui/icons-material';
import { color } from '../../../../Utils/color';

export class ViewOrder extends ViewOrderBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1000}>
                <Content>

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <TextBox Label='Número' TextTransform='UpperCase' Text={this.state.number} OnChange={(args: EventArgs) => this.setState({number: args.Value})} />
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Cliente' Action={{Type: 'Customer', New: {Values: {}}, Edit: {Id: _.get(this.state.customer, 'id')}}} Pesquisa={async(Text: string) => await Search.Customer(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.customer} OnChange={async (customer: any) => {
                                if (customer?.isBlockSale) {
                                    await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: "Cliente bloqueado para venda!", buttons: [{ Text: "OK" }]});
                                    return;
                                }
                                this.setState({customer})
                            }}>
                                <CustomerTemplate />
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
                            <AutoComplete Label='Vendedor' Action={{Type: 'Employee', New: {Values: {}}, Edit: {Id: _.get(this.state.seller, 'id')}}} Pesquisa={async(Text: string) => await Search.Employee(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.seller} OnChange={(seller: any) => this.setState({seller})}>
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
                                            <TextBox Label='CEP' TextTransform='UpperCase' Mask='##.###-###' Text={_.get(this.state.shippingAddress, 'cep')} EndDecorator={<IconButton onClick={this.BtnConsultarCep_Click} ><TravelExplore /></IconButton>} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'shippingAddress.cep', args.Value))} />
                                        </Grid>
                                        <Grid md={5}>
                                            <TextBox Label='Logradouro' TextTransform='UpperCase' Text={_.get(this.state.shippingAddress, 'logradouro')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'shippingAddress.logradouro', args.Value))} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='Número' TextTransform='UpperCase' Text={_.get(this.state.shippingAddress, 'number')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'shippingAddress.number', args.Value))} />
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Complemento' TextTransform='UpperCase' Text={_.get(this.state.shippingAddress, 'complement')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'shippingAddress.complement', args.Value))} />
                                        </Grid>

                                        <Grid md={5}>
                                            <TextBox Label='Bairro' TextTransform='UpperCase' Text={_.get(this.state.shippingAddress, 'neighborhood')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'shippingAddress.neighborhood', args.Value))} />
                                        </Grid>
                                        <Grid md={2}>
                                            <AutoComplete Label='Estado' Pesquisa={async(Text: string) => await Search.State(Text)} Text={(Item: any) => `${Item.description}` } Value={_.get(this.state, 'shippingAddress.state')} OnChange={(state1: any) => {
                                                this.setState((state) => {
                                                    if (state1 == null) {
                                                        _.set(state, 'shippingAddress.city', null)
                                                    }
                                                    _.set(state, 'shippingAddress.state', state1);
                                                    return state;
                                                })
                                            }} >
                                                <StateTemplate />
                                            </AutoComplete>
                                        </Grid>
                                        <Grid md={5}>
                                            <AutoComplete Label='Municipio' Pesquisa={async(Text: string) => {
                                                    if (!_.get(this.state, 'shippingAddress.state.id')) {
                                                        await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: 'Informe o estado!', buttons: [{ Text: "OK" }]});
                                                        return [];
                                                    }
                                                    return await Search.City(Text, _.toString(_.get(this.state, 'shippingAddress.state.id')))
                                                }}
                                                Text={(Item: any) => `${Item.name}` }
                                                Value={_.get(this.state, 'shippingAddress.city')}
                                                OnChange={(city: any) => this.setState((state) => _.set(state, 'shippingAddress.city', city))} 
                                            >
                                                <CityTemplate />
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

                </Content>
                <Actions>
                    <Button Text='Salvar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
            </ViewModal>
        );

    }

}