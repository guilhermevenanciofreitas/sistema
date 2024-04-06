
import { ViewContaPagarBase } from './index.base';
import { AutoComplete, Button, DatePicker, Form, Modal, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { ClienteTemplate } from '../../../../Search/Templates/Cliente';
import { Search } from '../../../../Search';
import { FormOfPaymentTemplate } from '../../../../Search/Templates/FormOfPayment';
import { BankAccountTemplate } from '../../../../Search/Templates/BankAccount';

export class ViewContaPagar extends ViewContaPagarBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <TextBox Label='Nº Doc' TextTransform='Normal' Text={this.state.numeroDocumento} OnChange={(args: EventArgs) => this.setState({numeroDocumento: args.Value})} />
                        </Grid>
                        <Grid md={2}>
                            <DatePicker Label='Emissão' Text={this.state.emissao} OnChange={(args: EventArgs) => this.setState({emissao: args.Value})} />
                        </Grid>
                        <Grid md={2}>
                            <DatePicker Label='Vencimento' Text={this.state.vencimento} OnChange={(args: EventArgs) => this.setState({vencimento: args.Value})} />
                        </Grid>
                        <Grid md={6}>
                            <AutoComplete Label='Recebedor' Pesquisa={async(Text: string) => await Search.Cliente(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.recebedor} OnChange={(recebedor: any) => this.setState({recebedor})}>
                                <ClienteTemplate />
                            </AutoComplete>
                        </Grid>

                        <Grid md={4}>
                            <AutoComplete Label='Conta bancária' Pesquisa={async(Text: string) => await Search.BankAccount(Text)} Text={(Item: any) => `${Item.bank?.description} Ag. ${Item.agency}-${Item.agencyDigit} / ${Item.account}-${Item.accountDigit}` } Value={this.state.bankAccount} OnChange={(bankAccount: any) => this.setState({bankAccount})}>
                                <BankAccountTemplate />
                            </AutoComplete>
                        </Grid>
                        
                        <Grid md={4}>
                            <AutoComplete Label='Forma de pagamento' Pesquisa={async(Text: string) => await Search.FormOfPayment(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.formOfPayment} OnChange={(formOfPayment: any) => this.setState({formOfPayment})}>
                                <FormOfPaymentTemplate />
                            </AutoComplete>
                        </Grid>

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

                    </Grid>

                </Form>
            </Modal>
        );

    }

}