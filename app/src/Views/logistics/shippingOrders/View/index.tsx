
import { ViewShippingOrderBase } from './index.base';
import { AutoComplete, Button, Form, Modal, NumericBox, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { PartnerTemplate } from '../../../../Search/Templates/Partner';
import { Search } from '../../../../Search';
import { CompanyTemplate } from '../../../../Search/Templates/Company';
import { VehicleTemplate } from '../../../../Search/Templates/Vehicle';

export class ViewShippingOrder extends ViewShippingOrderBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={800} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={3}>
                            <TextBox Label='Número' TextTransform='UpperCase' Text={this.state.number} OnChange={(args: EventArgs) => this.setState({number: args.Value})} />
                        </Grid>
                        <Grid md={6}>
                            <AutoComplete Label='Empresa' Pesquisa={async(Text: string) => await Search.Company(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.company} OnChange={(company: any) => this.setState({company})}>
                                <CompanyTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <NumericBox Label='Valor' Text={this.state.value} Prefix='R$ ' Scale={2} OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
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
                        <Grid md={5}>
                            <AutoComplete Label='Motorista' Pesquisa={async(Text: string) => await Search.Employee(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.driver} OnChange={(driver: any) => this.setState({driver})}>
                                <PartnerTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Veículo' Pesquisa={async(Text: string) => await Search.Vehicle(Text)} Text={(Item: any) => `${Item.name} - ${Item.plate}` } Value={this.state.vehicle} OnChange={(vehicle: any) => this.setState({vehicle})}>
                                <VehicleTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <NumericBox Label='Peso' Text={this.state.weight} Scale={3} OnChange={(args: EventArgs) => this.setState({weight: args.Value})} />
                        </Grid>
                    </Grid>
                  
                </Form>
            </Modal>
        );

    }

}