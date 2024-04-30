
import { ViewFreightCalculationBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, Modal, NumericBox, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { FreightCalculationTypeTemplate } from '../../../../Search/Templates/FreightCalculationType';
import { MesoRegionTemplate } from '../../../../Search/Templates/MesoRegion';
import { CompanyTemplate } from '../../../../Search/Templates/Company';
import { PartnerTemplate } from '../../../../Search/Templates/Partner';

export class ViewFreightCalculation extends ViewFreightCalculationBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={800} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
          
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={5}>
                            <AutoComplete Label='Empresa' Pesquisa={async(Text: string) => await Search.Company(Text)} Text={(Item: any) => `${Item.nomeFantasia}` } Value={this.state.company} OnChange={(company: any) => this.setState({company})}>
                                <CompanyTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Tipo' Pesquisa={async(Text: string) => await Search.FreightCalculationType(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.type} OnChange={(type: any) => this.setState({type})}>
                                <FreightCalculationTypeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <NumericBox Label='Peso' Text={this.state.weight} Scale={3} OnChange={(args: EventArgs) => this.setState({weight: args.Value}, () => this.Calculation())} />
                        </Grid>

                        <Grid md={7}>
                            <AutoComplete Label='Remetente' Pesquisa={async(Text: string) => await Search.Partner(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.sender} OnChange={(sender: any) => this.setState({sender})}>
                                <PartnerTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={5}>
                            <AutoComplete Label='Região' Pesquisa={async(Text: string) => await Search.MesoRegion(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.senderMesoRegion} OnChange={(senderMesoRegion: any) => this.setState({senderMesoRegion}, () => this.Calculation())} ReadOnly={this.state.sender != null}>
                                <MesoRegionTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={7}>
                            <AutoComplete Label='Destinatário' Pesquisa={async(Text: string) => await Search.Partner(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.recipient} OnChange={(recipient: any) => this.setState({recipient})}>
                                <PartnerTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={5}>
                            <AutoComplete Label='Região' Pesquisa={async(Text: string) => await Search.MesoRegion(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.recipientMesoRegion} OnChange={(recipientMesoRegion: any) => this.setState({recipientMesoRegion}, () => this.Calculation())} ReadOnly={this.state.recipient != null}>
                                <MesoRegionTemplate />
                            </AutoComplete>
                        </Grid>
                        
                    </Grid>

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Cálculo' Visible={true}>
                                    
                                    {this.state.calculating && (<div className="loader" style={{height: '30px'}} />)}

                                    {!this.state.calculating && (
                                        <>
                                            <label><b>Valor:</b></label> {parseFloat(this.state.value).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}
                                            <br></br>
                                            <label><b>ICMS:</b></label> {`${parseFloat(this.state.valueICMS).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})} (${parseFloat(this.state.aliquotICMS).toLocaleString("pt-BR", {minimumFractionDigits: 2})}%)`}
                                            <br></br>
                                            <label><b>Total:</b></label> {(parseFloat(this.state.value) + parseFloat(this.state.valueICMS)).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}
                                        </>
                                    )}

                                </TabItem>
                                <TabItem Title='Notas fiscais' Visible={true}>
                                    <></>
                                </TabItem>
                            </Tab>
                        </Grid>
                    </Grid>

                </Form>
            </Modal>
        );

    }

}