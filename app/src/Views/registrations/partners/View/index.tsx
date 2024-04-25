
import { ViewPartnerBase } from './index.base';
import { Button, CheckBox, Form, Modal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker, GridView } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';

import { Contacts } from './contacts';
import { Address } from './address';

export class ViewPartner extends ViewPartnerBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1150} Close={this.Close}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.name != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

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
                                                    <DropDownList Label='Estado cívil' SelectedValue={this.state.estadoCivil} OnChange={(args: EventArgs) => this.setState({estadoCivil: args.Value})}>
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
                                    </div>
                                    {this.state.type == 'CPF' && (
                                    <div style={{display: 'flex'}}>
                                        <Grid md={3}>
                                            <DropDownList Label='Escolaridade' SelectedValue={this.state.escolaridade} OnChange={(args: EventArgs) => this.setState({escolaridade: args.Value})}>
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
                                            <TextBox Label='Profissao' TextTransform='UpperCase' Text={this.state.profissao} OnChange={(args: EventArgs) => this.setState({profissao: args.Value})} />
                                        </Grid>
                                    </div>
                                    )}
                                    
                                    <Grid md={12}>
                                        <div style={{display: 'flex'}}>
                                            <CheckBox Label='Ativo' Checked={this.state.isAtivo} OnChange={(args: EventArgs) => this.setState({isAtivo: args.Value})} />
                                            {this.state.isCustomer && <CheckBox Label='Bloquear venda' Checked={this.state.isBlockSale} OnChange={(args: EventArgs) => this.setState({isBlockSale: args.Value})} />}
                                            {this.state.isSupplier && <CheckBox Label='Bloquear compra' Checked={this.state.isBloquearCompra} OnChange={(args: EventArgs) => this.setState({isBloquearCompra: args.Value})} />}
                                        </div>
                                    </Grid>
                                </TabItem>
                                <TabItem Title='Contatos' Visible={true}>
                                    <Contacts contacts={this.state.contacts} OnChange={(contacts: any[]) => this.setState({contacts})} />
                                </TabItem>
                                <TabItem Title='Endereços' Visible={true}>
                                    <Address address={this.state.address} OnChange={(address: any[]) => this.setState({address})} />
                                </TabItem>
                                <TabItem Title='Vendedores' Visible={this.state.isCustomer}>
                                    Vendedores
                                </TabItem>
                            </Tab>
                        </Grid>
                    </Grid>

                </Form>
            </Modal>
        );

    }

}