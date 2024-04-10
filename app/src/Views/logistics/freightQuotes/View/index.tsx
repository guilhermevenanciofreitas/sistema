
import { ViewFreightCalculationBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { BankTemplate } from '../../../../Search/Templates/Bank';
import { CompanyTemplate } from '../../../../Search/Templates/Company';
import { CostumerTemplate } from '../../../../Search/Templates/Costumer';
import { EmployeeTemplate } from '../../../../Search/Templates/Employee';
import { PartnerTemplate } from '../../../../Search/Templates/Partner';
import { CalledOccurrenceTemplate } from '../../../../Search/Templates/CalledOccurrence';
import { colors } from '..';
import dayjs from 'dayjs';
import { FreightCalculationTypeTemplate } from '../../../../Search/Templates/FreightCalculationType';
import { RegionTemplate } from '../../../../Search/Templates/Region';
import { Recipients } from './recipients';
import { Weights } from './weights';

export class ViewFreightCalculation extends ViewFreightCalculationBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
          
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={4}>
                            <TextBox Label='Descrição' TextTransform='UpperCase' Text={this.state.description} OnChange={(args: EventArgs) => this.setState({description: args.Value})} />
                        </Grid>
                        <Grid md={3}>
                            <AutoComplete Label='Tipo' Pesquisa={async(Text: string) => await Search.FreightCalculationType(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.type} OnChange={(type: any) => this.setState({type})}>
                                <FreightCalculationTypeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <AutoComplete Label='Região' Pesquisa={async(Text: string) => await Search.Region(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.senderRegion} OnChange={(senderRegion: any) => this.setState({senderRegion})}>
                                <RegionTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='ICMS' TextTransform='Normal' Text={this.state.aliquotICMS} OnChange={(args: EventArgs) => this.setState({aliquotICMS: args.Value})} />
                        </Grid>
                        
                    </Grid>

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Destinatários (Região)' Visible={true}>
                                    <Recipients recipients={this.state.recipients} OnChange={(recipients: any[]) => this.setState({recipients})} />
                                </TabItem>
                                <TabItem Title='Cálculo' Visible={true}>
                                    <Weights weights={this.state.weights} OnChange={(weights: any[]) => this.setState({weights})} />
                                </TabItem>
                            </Tab>
                        </Grid>
                    </Grid>

                </Form>
            </Modal>
        );

    }

}