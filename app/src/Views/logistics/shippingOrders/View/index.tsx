
import { ViewShippingOrderBase } from './index.base';
import { AutoComplete, Button, DatePicker, DateTimePicker, Form, ViewModal, NumericBox, Tab, TabItem, TextBox, Content, Actions } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { PartnerTemplate } from '../../../../Search/Templates/Partner';
import { Search } from '../../../../Search';
import { CompanyTemplate } from '../../../../Search/Templates/Company';
import { Nfes } from './nfes';
import _ from 'lodash';
import { color } from '../../../../Utils/color';
import { TaskAltOutlined } from '@mui/icons-material';

export class ViewShippingOrder extends ViewShippingOrderBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={900}>
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
                            <DateTimePicker Label='Data' Text={this.state.date} OnChange={(args: EventArgs) => this.setState({date: args.Value})} />
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
                        <Grid md={6}>
                            <AutoComplete Label='Remetente' Pesquisa={async(Text: string) => await Search.Partner(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.sender} OnChange={(sender: any) => this.setState({sender})}>
                                <PartnerTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={6}>
                            <AutoComplete Label='Destinatário' Pesquisa={async(Text: string) => await Search.Partner(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.recipient} OnChange={(recipient: any) => this.setState({recipient})}>
                                <PartnerTemplate />
                            </AutoComplete>
                        </Grid>
                        
                        <Grid md={4}>
                            <TextBox Label='Produto predominante' TextTransform='UpperCase' Text={this.state.predominantProduct} OnChange={(args: EventArgs) => this.setState({predominantProduct: args.Value})} />
                        </Grid>

                        <Grid md={2}>
                            <NumericBox Label='Peso' Text={this.state.weight} Scale={3} OnChange={(args: EventArgs) => this.setState({weight: args.Value})} />
                        </Grid>

                        <Grid md={2}>
                            <NumericBox Label='Valor' Text={this.state.value} Prefix='R$ ' Scale={2} OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
                        </Grid>

                        <Grid md={12}>
                            
                            <Tab>
                                <TabItem Title='Reboques' Visible={true}>
                                    <></>
                                </TabItem>
                                <TabItem Title='Notas fiscais' Visible={true}>
                                    <Nfes nfes={this.state.nfes} OnChange={(nfes: any[]) => this.setState({nfes})} />
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