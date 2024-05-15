
import { ViewPartnerBase } from './index.base';
import { Button, CheckBox, Form, ViewModal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker, GridView, Content, Actions, MessageBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid, IconButton } from '@mui/joy';

import { Contacts } from './contacts';
import { Address } from './address';
import { color } from '../../../../Utils/color';
import { TaskAltOutlined, TravelExplore } from '@mui/icons-material';
import { EconomicActivityTemplate } from '../../../../Search/Templates/EconomicActivity';
import { Search } from '../../../../Search';
import { LegalNatureTemplate } from '../../../../Search/Templates/LegalNature';
import _ from 'lodash';
import { CityTemplate } from '../../../../Search/Templates/City';
import { StateTemplate } from '../../../../Search/Templates/State';

export class ViewPartner extends ViewPartnerBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1150}>
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <TextBox Label={this.state.type} TextTransform='UpperCase' Text={this.state.cpfCnpj} Mask={this.state.type == 'CNPJ' ? '##.###.###/####-##' : '###.###.###-#####'}
                            EndDecorator={this.state.type == 'CNPJ' ? <IconButton onClick={this.BtnConsultarCnpj_Click} ><TravelExplore /></IconButton> : <></>}
                            OnChange={(args: EventArgs) => {
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
                            <div style={{display: 'flex'}}>
                                <CheckBox Label='Cliente' Checked={this.state.isCustomer} OnChange={(args: EventArgs) => this.setState({isCustomer: args.Value})} />
                                <CheckBox Label='Fornecedor' Checked={this.state.isSupplier} OnChange={(args: EventArgs) => this.setState({isSupplier: args.Value})} />
                                <CheckBox Label='Transportadora' Checked={this.state.isShippingCompany} OnChange={(args: EventArgs) => this.setState({isShippingCompany: args.Value})} />
                                <CheckBox Label='Funcionario' Checked={this.state.isEmployee} OnChange={(args: EventArgs) => this.setState({isEmployee: args.Value})} />
                            </div>
                        </Grid>
                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Principal' Visible={true}>
                                    <div style={{display: 'flex'}}>
                                        <Grid md={2}>
                                            <DatePicker Label={this.state.type == 'CPF' ? 'Nascimento' : 'Abertura'} Text={this.state.birth} OnChange={(args: EventArgs) => this.setState({birth: args.Value})} />
                                        </Grid>
                                        
                                        {this.state.type == 'CPF' && (
                                            <>
                                                <Grid md={2}>
                                                    <DropDownList Label='Sexo' SelectedValue={this.state.sex} OnChange={(args: EventArgs) => this.setState({sex: args.Value})}>
                                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                                        <DropDownListItem Label='Masculino' Value={1} />
                                                        <DropDownListItem Label='Feminino' Value={2} />
                                                    </DropDownList>
                                                </Grid>
                                                <Grid md={2}>
                                                    <DropDownList Label='Estado cívil' SelectedValue={this.state.maritalStatus} OnChange={(args: EventArgs) => this.setState({maritalStatus: args.Value})}>
                                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                                        <DropDownListItem Label={this.state.sex == '2' ? 'Solteira' : 'Solteiro'} Value={1} />
                                                        <DropDownListItem Label={this.state.sex == '2' ? 'Casada' : 'Casado'} Value={2} />
                                                        <DropDownListItem Label={this.state.sex == '2' ? 'Divorciada' : 'Divorciado'} Value={3} />
                                                        <DropDownListItem Label={this.state.sex == '2' ? 'Viúva' : 'Viúvo'} Value={4} />
                                                    </DropDownList>
                                                </Grid>
                                                <Grid md={2}>
                                                    <TextBox Label='RG' TextTransform='UpperCase' Text={this.state.rg} OnChange={(args: EventArgs) => this.setState({rg: args.Value})} />
                                                </Grid>
                                            </>
                                        )}
                                        
                                        <Grid md={2}>
                                            <TextBox Label='Insc. Estadual' TextTransform='UpperCase' Text={this.state.ie} OnChange={(args: EventArgs) => this.setState({ie: args.Value})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='Insc. Municipal' TextTransform='UpperCase' Text={this.state.im} OnChange={(args: EventArgs) => this.setState({im: args.Value})} />
                                        </Grid>

                                        {this.state.type == 'CNPJ' && (
                                            <>
                                                <Grid md={3}>
                                                    <AutoComplete Label='Natureza jurídica' Pesquisa={async (Text: string) => await Search.LegalNature(Text)} Text={(Item: any) => `${Item.code} - ${Item.name}` } Value={this.state.legalNature} OnChange={(legalNature: any) => this.setState({legalNature})}>
                                                        <LegalNatureTemplate />
                                                    </AutoComplete>
                                                </Grid>
                                                <Grid md={3}>
                                                    <AutoComplete Label='Atividade ecônomica' Pesquisa={async (Text: string) => await Search.EconomicActivity(Text)} Text={(Item: any) => `${Item.cnae} - ${Item.name}` } Value={this.state.economicActivity} OnChange={(economicActivity: any) => this.setState({economicActivity})}>
                                                        <EconomicActivityTemplate />
                                                    </AutoComplete>
                                                </Grid>
                                            </>
                                        )}

                                    </div>
                                    {this.state.type == 'CPF' && (
                                    <div style={{display: 'flex'}}>
                                        <Grid md={3}>
                                            <DropDownList Label='Escolaridade' SelectedValue={this.state.scholarity} OnChange={(args: EventArgs) => this.setState({scholarity: args.Value})}>
                                                <DropDownListItem Label='[Selecione]' Value={null} />
                                                <DropDownListItem Label='Educação infantil' Value={1} />
                                                <DropDownListItem Label='Fundamental' Value={2} />
                                                <DropDownListItem Label='Médio' Value={3} />
                                                <DropDownListItem Label='Superior (Graduação)' Value={4} />
                                                <DropDownListItem Label='Pós-graduação' Value={5} />
                                                <DropDownListItem Label='Mestrado' Value={6} />
                                                <DropDownListItem Label='Doutorado' Value={6} />
                                            </DropDownList>
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Profissao' TextTransform='UpperCase' Text={this.state.profession} OnChange={(args: EventArgs) => this.setState({profession: args.Value})} />
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Naturalidade' TextTransform='UpperCase' Text={this.state.naturalness} OnChange={(args: EventArgs) => this.setState({naturalness: args.Value})} />
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Nacionalidade' TextTransform='UpperCase' Text={this.state.nationality} OnChange={(args: EventArgs) => this.setState({nationality: args.Value})} />
                                        </Grid>
                                    </div>
                                    )}

                                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                        <Grid md={2}>
                                            <TextBox Label='CEP' TextTransform='UpperCase' Mask='##.###-###' Text={_.get(this.state.address, 'cep')} EndDecorator={<IconButton onClick={this.BtnConsultarCep_Click} ><TravelExplore /></IconButton>} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'address.cep', args.Value))} />
                                        </Grid>
                                        <Grid md={5}>
                                            <TextBox Label='Logradouro' TextTransform='UpperCase' Text={_.get(this.state.address, 'logradouro')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'address.logradouro', args.Value))} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='Número' TextTransform='UpperCase' Text={_.get(this.state.address, 'number')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'address.number', args.Value))} />
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Complemento' TextTransform='UpperCase' Text={_.get(this.state.address, 'complement')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'address.complement', args.Value))} />
                                        </Grid>

                                        <Grid md={5}>
                                            <TextBox Label='Bairro' TextTransform='UpperCase' Text={_.get(this.state.address, 'neighborhood')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'address.neighborhood', args.Value))} />
                                        </Grid>
                                        <Grid md={2}>
                                            <AutoComplete Label='Estado' Pesquisa={async(Text: string) => await Search.State(Text)} Text={(Item: any) => `${Item.description}` } Value={_.get(this.state, 'address.state')} OnChange={(state1: any) => {
                                                this.setState((state) => {
                                                    if (state1 == null) {
                                                        _.set(state, 'address.city', null)
                                                    }
                                                    _.set(state, 'address.state', state1);
                                                    return state;
                                                })
                                            }} >
                                                <StateTemplate />
                                            </AutoComplete>
                                        </Grid>
                                        <Grid md={5}>
                                            <AutoComplete Label='Municipio' Pesquisa={async(Text: string) => {
                                                    if (!_.get(this.state, 'address.state.id')) {
                                                        await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: 'Informe o estado!', buttons: [{ Text: "OK" }]});
                                                        return [];
                                                    }
                                                    return await Search.City(Text, _.toString(_.get(this.state, 'address.state.id')))
                                                }}
                                                Text={(Item: any) => `${Item.name}` }
                                                Value={_.get(this.state, 'address.city')}
                                                OnChange={(city: any) => this.setState((state) => _.set(state, 'address.city', city))} 
                                            >
                                                <CityTemplate />
                                            </AutoComplete>
                                        </Grid>
                                    
                                        <Grid md={12}>
                                            <div style={{display: 'flex'}}>
                                                <CheckBox Label='Ativo' Checked={this.state.isActive} OnChange={(args: EventArgs) => this.setState({isActive: args.Value})} />
                                                {this.state.isCustomer && <CheckBox Label='Bloquear venda' Checked={this.state.isBlockSale} OnChange={(args: EventArgs) => this.setState({isBlockSale: args.Value})} />}
                                                {this.state.isSupplier && <CheckBox Label='Bloquear compra' Checked={this.state.isBlockBuy} OnChange={(args: EventArgs) => this.setState({isBlockBuy: args.Value})} />}
                                            </div>
                                        </Grid>
                                    </Grid>

                                </TabItem>
                                <TabItem Title='Contatos' Visible={true}>
                                    <Contacts contacts={this.state.contacts} OnChange={(contacts: any[]) => this.setState({contacts})} />
                                </TabItem>
                                {/*
                                <TabItem Title='Endereços' Visible={true}>
                                    <Address address={this.state.address} OnChange={(address: any[]) => this.setState({address})} />
                                </TabItem>
                                */}
                                <TabItem Title='Vendedores' Visible={this.state.isCustomer}>
                                    Vendedores
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