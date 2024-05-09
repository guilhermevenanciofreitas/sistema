
import { ViewConfiguracaoBase } from './index.base';
import { Button, CheckBox, Form, ViewModal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker, GridView } from '../../Utils/Controls';
import { EventArgs } from '../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import _ from 'lodash';

export class ViewConfiguracao extends ViewConfiguracaoBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1150}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                 
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <TextBox Label={this.state.type} TextTransform='UpperCase' Text={this.state.cpfCnpj} Mask={this.state.type == 'CNPJ' ? '##.###.###/####-##' : '###.###.###-#####'} OnChange={(args: EventArgs) => {
                                this.setState({type: args.Value.length >= 15 ? 'CNPJ' : 'CPF', cpfCnpj: args.Value})
                            }} />
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label={this.state.type == 'CPF' ? 'Nome' : 'Razão social'} TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label={this.state.type == 'CPF' ? 'Apelido' : 'Nome fantasia'} TextTransform='UpperCase' Text={this.state.surname} OnChange={(args: EventArgs) => this.setState({surname: args.Value})} />
                        </Grid>
                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Principal' Visible={true}>
                                </TabItem>
                                <TabItem Title='Contatos' Visible={true}>
                                </TabItem>
                                <TabItem Title='Certificado' Visible={true}>

                                    <input type="file" onChange={this.Certificate_Change} />

                                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                        <Grid md={5}>
                                            <TextBox Label={'Nome'} TextTransform='Normal' Text={_.get(this.state.certificate, 'info.FriendlyName')} ReadOnly={true} />
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label={'Série'} TextTransform='Normal' Text={_.get(this.state.certificate, 'info.SerialNumber')} ReadOnly={true} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label={'Emitido em'} TextTransform='Normal' Text={_.get(this.state.certificate, 'info.Effective')} ReadOnly={true} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label={'Expira em'} TextTransform='Normal' Text={_.get(this.state.certificate, 'info.Expiration')} ReadOnly={true} />
                                        </Grid>
                                    </Grid>
                                </TabItem>
                                <TabItem Title='Pedido Digital' Visible={true}>
                                    <div style={{display: 'flex'}}>
                                        <Grid md={12}>
                                            {/*<TextBox Label='Frase' TextTransform="Normal" Text={this.state.pedidoDigital.frase} OnChange={(args: EventArgs) => this.setState({pedidoDigital: {...this.state.pedidoDigital, frase: args.Value}})} />*/}
                                        </Grid>
                                    </div>
                                </TabItem>
                            </Tab>
                        </Grid>
                    </Grid>

                </Form>
            </ViewModal>
        );

    }

}