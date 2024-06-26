
import { ViewContaPagarBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, ViewModal, NumericBox, TextBox, Content, Actions } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { CustomerTemplate } from '../../../../Search/Templates/Customer';
import { Search } from '../../../../Search';
import { PaymentFormTemplate } from '../../../../Search/Templates/PaymentForm';
import { BankAccountTemplate } from '../../../../Search/Templates/BankAccount';
import { CompanyTemplate } from '../../../../Search/Templates/Company';
import { BankTemplate } from '../../../../Search/Templates/Bank';
import _ from 'lodash';
import { TaskAltOutlined } from '@mui/icons-material';
import { color } from '../../../../Utils/color';

export class ViewPayment extends ViewContaPagarBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1100}>
                <Content>

                    <fieldset>
                        <legend>Informações gerais</legend>
                        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                            
                            <Grid md={2}>
                                <TextBox Label='Número' TextTransform='Normal' Text={this.state.number} OnChange={(args: EventArgs) => this.setState({number: args.Value})} />
                            </Grid>
                            <Grid md={4}>
                                <AutoComplete Label='Forma de pagamento' Pesquisa={async(Text: string) => await Search.PaymentForm(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.paymentForm} OnChange={(paymentForm: any) => this.setState({paymentForm})}>
                                    <PaymentFormTemplate />
                                </AutoComplete>
                            </Grid>
                            <Grid md={2}>
                                <DatePicker Label='Vencimento' Text={this.state.dueDate} OnChange={(args: EventArgs) => this.setState({dueDate: args.Value, scheduleDate: args.Value})} />
                            </Grid>
                            <Grid md={2}>
                                <DatePicker Label='Agendamento' Text={this.state.scheduleDate} OnChange={(args: EventArgs) => this.setState({scheduleDate: args.Value})} />
                            </Grid>
                            <Grid md={2}>
                                <TextBox Label='Nosso número' TextTransform='Normal' Text={this.state.ourNumber} OnChange={(args: EventArgs) => this.setState({ourNumber: args.Value})} ReadOnly={true} />
                            </Grid>

                            <Grid md={4}>
                                <AutoComplete Label='Empresa' Pesquisa={async(Text: string) => await Search.Company(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.company} OnChange={(company: any) => this.setState({company})}>
                                    <CompanyTemplate />
                                </AutoComplete>
                            </Grid>

                            <Grid md={4}>
                                <AutoComplete Label='Beneficiário' Action={{Type: 'Customer', New: {Values: {}}, Edit: {Id: _.get(this.state.receiver, 'id')}}} Pesquisa={async(Text: string) => await Search.Customer(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.receiver} OnChange={(receiver: any) => this.setState({receiver})}>
                                    <CustomerTemplate />
                                </AutoComplete>
                            </Grid>

                            <Grid md={4}>
                                <AutoComplete Label='Conta bancária' Action={{Type: 'BankAccount', New: {Values: {}}, Edit: {Id: _.get(this.state.bankAccount, 'id')}}} Pesquisa={async(Text: string) => await Search.BankAccount(Text)} Text={(Item: any) => `${Item.bank?.description} - ${Item.agency}-${Item.agencyDigit} / ${Item.account}-${Item.accountDigit}` } Value={this.state.bankAccount} OnChange={(bankAccount: any) => this.setState({bankAccount})}>
                                    <BankAccountTemplate />
                                </AutoComplete>
                            </Grid>

                            <Grid md={3}>
                                <TextBox Label='Nº Documento' TextTransform='Normal' Text={this.state.documentNumber} OnChange={(args: EventArgs) => this.setState({documentNumber: args.Value})} />
                            </Grid>
                            <Grid md={2}>
                                <TextBox Label='Moeda' TextTransform='Normal' Text={'BRL (Real)'} OnChange={() => null} ReadOnly={true} />
                            </Grid>
                            <Grid md={2}>
                                <NumericBox Label='Valor' Text={this.state.value} Prefix='R$ ' Scale={2} OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
                            </Grid>
                            <Grid md={5}>
                                <TextBox Label='Aviso ao benificiário' TextTransform='Normal' Text={this.state.beneficiaryNotice} OnChange={(args: EventArgs) => this.setState({beneficiaryNotice: args.Value})} />
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

                    {_.get(this.state.paymentForm, 'type') == 'boleto' && (
                        <fieldset>
                            <legend>Título - Boleto</legend>
                            <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                <Grid md={12}>
                                    <TextBox Label='Linha digitável' TextTransform='Normal' Text={this.state.data?.digitableLine} OnChange={(args: EventArgs) => this.setState({data: {...this.state.data, digitableLine: args.Value}})} />
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='Valor da multa' TextTransform='Normal' Text={this.state.data?.fine || "0.00"} OnChange={(args: EventArgs) => this.setState({data: {...this.state.data, fine: args.Value}})} />
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='Valor do juros' TextTransform='Normal' Text={this.state.data?.interest || "0.00"} OnChange={(args: EventArgs) => this.setState({data: {...this.state.data, interest: args.Value}})} />
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='Valor do desconto' TextTransform='Normal' Text={this.state.data?.discount || "0.00"} OnChange={(args: EventArgs) => this.setState({data: {...this.state.data, discount: args.Value}})} />
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='Valor total' TextTransform='Normal' Text={((parseFloat(this.state.value || "0")) + (parseFloat(this.state.data?.fine || "0")) + (parseFloat(this.state.data?.interest || "0")) - (parseFloat(this.state.data?.discount || "0"))).toLocaleString("pt-BR", {minimumFractionDigits: 2})} ReadOnly={true} />
                                </Grid>

                                {/*
                                <Grid md={3}>
                                    <DropDownList Label='Sacado/Pagador tipo inscrição' SelectedValue={null} ReadOnly={true}>
                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                        <DropDownListItem Label='CPF' Value={'cpf'} />
                                        <DropDownListItem Label='CNPJ' Value={'cnpj'} />
                                    </DropDownList>
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='CNPJ do Sacado/Pagador' TextTransform='Normal' Text={''} ReadOnly={true} />
                                </Grid>
                                <Grid md={6}>
                                    <TextBox Label='Nome do Sacado/Pagador' TextTransform='Normal' Text={''} ReadOnly={true} />
                                </Grid>
                                */}

                                <Grid md={3}>
                                    <DropDownList Label='Cedente/Benificiário tipo inscrição' SelectedValue={null}>
                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                        <DropDownListItem Label='CPF' Value={'cpf'} />
                                        <DropDownListItem Label='CNPJ' Value={'cnpj'} />
                                    </DropDownList>
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='CNPJ do Cedente/Benificiário' TextTransform='Normal' Text={''} />
                                </Grid>
                                <Grid md={6}>
                                    <TextBox Label='Nome do Cedente/Benificiário' TextTransform='Normal' Text={''} />
                                </Grid>
                                {/*
                                <Grid md={3}>
                                    <DropDownList Label='Sacador/Avalista tipo inscrição' SelectedValue={null}>
                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                        <DropDownListItem Label='CPF' Value={'cpf'} />
                                        <DropDownListItem Label='CNPJ' Value={'cnpj'} />
                                    </DropDownList>
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='CNPJ do Sacador/Avalista' TextTransform='Normal' Text={''} />
                                </Grid>
                                <Grid md={6}>
                                    <TextBox Label='Nome do Sacador/Avalista' TextTransform='Normal' Text={''} />
                                </Grid>
                                */}

                            </Grid>
                        </fieldset>
                    )}

                    {_.get(this.state.paymentForm, 'type') == 'transferencia' && (
                        <fieldset>
                            <legend>Transferência - TED</legend>
                            <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                                <Grid md={5}>
                                    <DropDownList Label='Tipo de conta' SelectedValue={this.state.data?.accountType} OnChange={(args: EventArgs) => this.setState({data: {...this.state.data, accountType: args.Value}})}>
                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                        <DropDownListItem Label='Conta corrente' Value={'CC'} />
                                        <DropDownListItem Label='Conta poupança' Value={'CP'} />
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
                                    <TextBox Label='Agência' TextTransform='Normal' Text={this.state.data?.agency} OnChange={(args: EventArgs) => this.setState({data: {...this.state.data, agency: args.Value}})} />
                                </Grid>
                                <Grid md={1}>
                                    <TextBox Label='Digito' TextTransform='Normal' Text={this.state.data?.accountDigit} OnChange={(args: EventArgs) => this.setState({data: {...this.state.data, accountDigit: args.Value}})} />
                                </Grid>
                                <Grid md={3}>
                                    <TextBox Label='Conta' TextTransform='Normal' Text={this.state.data?.account} OnChange={(args: EventArgs) => this.setState({data: {...this.state.data, account: args.Value}})} />
                                </Grid>
                                <Grid md={1}>
                                    <TextBox Label='Digito' TextTransform='Normal' Text={this.state.data?.accountDigit} OnChange={(args: EventArgs) => this.setState({data: {...this.state.data, accountDigit: args.Value}})} />
                                </Grid>
                            </Grid>
                        </fieldset>
                    )}

                    <fieldset>
                        <legend>Processamento</legend>

                    </fieldset>
                    
                </Content>
                <Actions>
                    <Button Text='Salvar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
            </ViewModal>
        );

    }

}