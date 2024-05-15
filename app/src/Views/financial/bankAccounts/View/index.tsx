
import { ViewBankAccountBase } from './index.base';
import { AutoComplete, Button, DatePicker, Form, ViewModal, TextBox, Content, Actions } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { BankTemplate } from '../../../../Search/Templates/Bank';
import { TaskAltOutlined } from '@mui/icons-material';
import { color } from '../../../../Utils/color';

export class ViewBankAccount extends ViewBankAccountBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={500}>
                <Content>

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

                </Content>
                <Actions>
                    <Button Text='Salvar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
            </ViewModal>
        );

    }

}