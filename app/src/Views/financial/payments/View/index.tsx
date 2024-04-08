
import { ViewContaPagarBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, Modal, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { ClienteTemplate } from '../../../../Search/Templates/Cliente';
import { Search } from '../../../../Search';
import { FormOfPaymentTemplate } from '../../../../Search/Templates/FormOfPayment';
import { BankAccountTemplate } from '../../../../Search/Templates/BankAccount';
import { CompanyTemplate } from '../../../../Search/Templates/Company';
import { BankTemplate } from '../../../../Search/Templates/Bank';
import _ from 'lodash';

export class ViewPayment extends ViewContaPagarBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1100} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <fieldset>
                        <legend>Informações gerais</legend>
                        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                            
                            <Grid md={2}>
                                <TextBox Label='Número' TextTransform='Normal' Text={this.state.numeroDocumento} OnChange={(args: EventArgs) => this.setState({numeroDocumento: args.Value})} />
                            </Grid>
                            <Grid md={4}>
                                <AutoComplete Label='Forma de pagamento' Pesquisa={async(Text: string) => await Search.FormOfPayment(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.formOfPayment} OnChange={(formOfPayment: any) => this.setState({formOfPayment})}>
                                    <FormOfPaymentTemplate />
                                </AutoComplete>
                            </Grid>
                            <Grid md={2}>
                                <DatePicker Label='Vencimento' Text={this.state.emissao} OnChange={(args: EventArgs) => this.setState({emissao: args.Value})} />
                            </Grid>
                            <Grid md={2}>
                                <DatePicker Label='Agendamento' Text={this.state.vencimento} OnChange={(args: EventArgs) => this.setState({vencimento: args.Value})} />
                            </Grid>
                            <Grid md={2}>
                                <TextBox Label='Nosso número' TextTransform='Normal' Text={this.state.ourNumber} OnChange={(args: EventArgs) => this.setState({ourNumber: args.Value})} />
                            </Grid>

                            <Grid md={4}>
                                <AutoComplete Label='Empresa' Pesquisa={async(Text: string) => await Search.Company(Text)} Text={(Item: any) => `${Item.nomeFantasia}` } Value={this.state.company} OnChange={(company: any) => this.setState({company})}>
                                    <CompanyTemplate />
                                </AutoComplete>
                            </Grid>

                            <Grid md={4}>
                                <AutoComplete Label='Beneficiário' Pesquisa={async(Text: string) => await Search.Cliente(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.recebedor} OnChange={(recebedor: any) => this.setState({recebedor})}>
                                    <ClienteTemplate />
                                </AutoComplete>
                            </Grid>

                            <Grid md={4}>
                                <AutoComplete Label='Conta bancária' Pesquisa={async(Text: string) => await Search.BankAccount(Text)} Text={(Item: any) => `${Item.bank?.description} - ${Item.agency}-${Item.agencyDigit} / ${Item.account}-${Item.accountDigit}` } Value={this.state.bankAccount} OnChange={(bankAccount: any) => this.setState({bankAccount})}>
                                    <BankAccountTemplate />
                                </AutoComplete>
                            </Grid>
                        
                            {/* 
                            <Grid md={2}>
                                <TextBox Label='Valor' TextTransform='Normal' Text={this.state.valor} OnChange={(args: EventArgs) => this.setState({valor: args.Value})} />
                            </Grid>
                            <Grid md={2}>
                                <TextBox Label='Juros' TextTransform='Normal' Text={this.state.juros} OnChange={(args: EventArgs) => this.setState({juros: args.Value})} />
                            </Grid>
                            <Grid md={2}>
                                <TextBox Label='Multa' TextTransform='Normal' Text={this.state.multa} OnChange={(args: EventArgs) => this.setState({multa: args.Value})} />
                            </Grid>
                            <Grid md={2}>
                                <TextBox Label='Total' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({nome: args.Value})} />
                            </Grid>
                            */}

                        </Grid>
                    </fieldset>

                    {_.get(this.state.formOfPayment, 'type') == 'boleto' && (
                        <fieldset>
                            <legend>Título - Boleto</legend>
                            <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                <Grid md={12}>
                                    <TextBox Label='Linha digitável' TextTransform='Normal' Text={this.state.numeroDocumento} OnChange={(args: EventArgs) => this.setState({numeroDocumento: args.Value})} />
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='Valor do título' TextTransform='Normal' Text={this.state.numeroDocumento} OnChange={(args: EventArgs) => this.setState({numeroDocumento: args.Value})} />
                                </Grid>
                                <Grid md={2}>
                                    <TextBox Label='Valor da multa' TextTransform='Normal' Text={this.state.numeroDocumento} OnChange={(args: EventArgs) => this.setState({numeroDocumento: args.Value})} />
                                </Grid>
                                <Grid md={2}>
                                    <TextBox Label='Valor do juros' TextTransform='Normal' Text={this.state.numeroDocumento} OnChange={(args: EventArgs) => this.setState({numeroDocumento: args.Value})} />
                                </Grid>
                                <Grid md={2}>
                                    <TextBox Label='Valor do desconto' TextTransform='Normal' Text={this.state.numeroDocumento} OnChange={(args: EventArgs) => this.setState({numeroDocumento: args.Value})} />
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='Valor total' TextTransform='Normal' Text={this.state.numeroDocumento} OnChange={(args: EventArgs) => this.setState({numeroDocumento: args.Value})} />
                                </Grid>
                            </Grid>
                        </fieldset>
                    )}

                    {_.get(this.state.formOfPayment, 'type') == 'transferencia' && (
                        <fieldset>
                            <legend>Transferência - TED</legend>
                            <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                                <Grid md={5}>
                                    <DropDownList Label='Tipo de conta' SelectedValue={null} OnChange={(args: EventArgs) => this.setState({sexo: args.Value})}>
                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                        <DropDownListItem Label='Conta corrente' Value={1} />
                                        <DropDownListItem Label='Conta poupança' Value={2} />
                                    </DropDownList>
                                </Grid>
                                <Grid md={5}>
                                    <AutoComplete Label='Finalidade' Pesquisa={async(Text: string) => await Search.Bank(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.bankAccount} OnChange={(bankAccount: any) => this.setState({})}>
                                        <BankTemplate />
                                    </AutoComplete>
                                </Grid>
                                <Grid md={2}>
                                    <DropDownList Label='Camâra centralizadora' SelectedValue={null} OnChange={(args: EventArgs) => this.setState({sexo: args.Value})}>
                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                        <DropDownListItem Label='Conta corrente' Value={1} />
                                        <DropDownListItem Label='Conta poupança' Value={2} />
                                    </DropDownList>
                                </Grid>

                                <Grid md={4}>
                                    <AutoComplete Label='Banco' Pesquisa={async(Text: string) => await Search.Bank(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.bankAccount} OnChange={(bankAccount: any) => this.setState({})}>
                                        <BankTemplate />
                                    </AutoComplete>
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='Agência' TextTransform='Normal' Text={this.state.multa} OnChange={(args: EventArgs) => this.setState({multa: args.Value})} />
                                </Grid>
                                <Grid md={1}>
                                    <TextBox Label='Digito' TextTransform='Normal' Text={this.state.multa} OnChange={(args: EventArgs) => this.setState({multa: args.Value})} />
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='Conta' TextTransform='Normal' Text={this.state.multa} OnChange={(args: EventArgs) => this.setState({multa: args.Value})} />
                                </Grid>
                                <Grid md={1}>
                                    <TextBox Label='Digito' TextTransform='Normal' Text={this.state.multa} OnChange={(args: EventArgs) => this.setState({multa: args.Value})} />
                                </Grid>
                            </Grid>
                        </fieldset>
                    )}
                    
                </Form>
            </Modal>
        );

    }

}