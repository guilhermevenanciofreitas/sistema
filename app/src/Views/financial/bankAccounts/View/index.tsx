
import { ViewBankAccountBase } from './index.base';
import { AutoComplete, Button, DatePicker, Form, Modal, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { BankTemplate } from '../../../../Search/Templates/Bank';

export class ViewBankAccount extends ViewBankAccountBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={500} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
          
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <AutoComplete Label='Banco' Pesquisa={async(Text: string) => await Search.Bank(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.bank} OnChange={(bank: any) => this.setState({bank})}>
                                <BankTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <TextBox Label='Agência' TextTransform='Normal' Text={this.state.agency} OnChange={(args: EventArgs) => this.setState({agency: args.Value})} />
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Digito' TextTransform='Normal' Text={this.state.agencyDigit} OnChange={(args: EventArgs) => this.setState({agencyDigit: args.Value})} />
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label='Conta' TextTransform='Normal' Text={this.state.account} OnChange={(args: EventArgs) => this.setState({account: args.Value})} />
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Digito' TextTransform='Normal' Text={this.state.accountDigit} OnChange={(args: EventArgs) => this.setState({accountDigit: args.Value})} />
                        </Grid>

                    </Grid>

                </Form>
            </Modal>
        );

    }

}