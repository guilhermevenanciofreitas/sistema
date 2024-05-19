
import { ViewTripBase } from './index.base';
import { AutoComplete, Button, DatePicker, DateTimePicker, Form, ViewModal, NumericBox, Tab, TabItem, TextBox, Content, Actions, DropDownList, DropDownListItem } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { PartnerTemplate } from '../../../../Search/Templates/Partner';
import { Search } from '../../../../Search';
import { CompanyTemplate } from '../../../../Search/Templates/Company';
import { VehicleTemplate } from '../../../../Search/Templates/Vehicle';
import { Vehicles } from './vehicles';
import _ from 'lodash';
import { color } from '../../../../Utils/color';
import { TaskAltOutlined } from '@mui/icons-material';
import { Ctes } from './ctes';
import { ShippingOrders } from './shippingOrders';

export class ViewTrip extends ViewTripBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1000}>
                <Content>

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <TextBox Label='Número' TextTransform='UpperCase' Text={this.state.number} OnChange={(args: EventArgs) => this.setState({number: args.Value})} />
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Empresa' Pesquisa={async(Text: string) => await Search.Company(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.company} OnChange={(company: any) => this.setState({company})}>
                                <CompanyTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <DropDownList Label='Tipo' SelectedValue={this.state.type} OnChange={(args: EventArgs) => this.setState({type: args.Value})}>
                                <DropDownListItem Label='[Selecione]' Value={null} />
                                <DropDownListItem Label='Coleta' Value='shippingOrder' />
                                <DropDownListItem Label='Viagem' Value='trip' />
                                <DropDownListItem Label='Entrega' Value='distribution' />
                            </DropDownList>
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
                            <AutoComplete Label='Motorista' Action={{Type: 'Employee', New: {Values: {}}, Edit: {Id: _.get(this.state.driver, 'id')}}} Pesquisa={async(Text: string) => await Search.Employee(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.driver} OnChange={(driver: any) => this.setState({driver})}>
                                <PartnerTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <AutoComplete Label='Veículo' Action={{Type: 'Vehicle', New: {Values: {}}, Edit: {Id: _.get(this.state.vehicle, 'id')}}} Pesquisa={async(Text: string) => await Search.Vehicle(Text)} Text={(Item: any) => `${Item.name} - ${Item.plate}` } Value={this.state.vehicle} OnChange={(vehicle: any) => this.setState({vehicle})}>
                                <VehicleTemplate />
                            </AutoComplete>
                        </Grid>
                        
                        <Grid md={12}>
                            
                            <Tab>
                                <TabItem Title='Reboques' Visible={true}>
                                    <Vehicles vehicles={this.state.vehicles} OnChange={(vehicles: any[]) => this.setState({vehicles})} />
                                </TabItem>
                                <TabItem Title='Ordens de carga' Visible={this.state.type == 'shippingOrder'}>
                                    <ShippingOrders shippingOrders={this.state.shippingOrders} OnChange={(shippingOrders: any[]) => this.setState({shippingOrders})} />
                                </TabItem>
                                <TabItem Title='Conhecimentos' Visible={this.state.type == 'trip'}>
                                    <Ctes ctes={this.state.ctes} OnChange={(ctes: any[]) => this.setState({ctes})} />
                                </TabItem>
                                <TabItem Title='Manifestos' Visible={this.state.type == 'trip'}>
                                    <></>
                                </TabItem>
                                <TabItem Title='Entrega' Visible={this.state.type == 'distribution'}>
                                    <></>
                                </TabItem>
                            </Tab>
                        
                        </Grid>

                    </Grid>

                </Content>
                <Actions>
                    <Button Text='Salvar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
            </ViewModal>
        );

    }

}