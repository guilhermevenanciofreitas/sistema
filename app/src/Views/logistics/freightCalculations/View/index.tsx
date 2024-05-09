
import { ViewFreightCalculationBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, ViewModal, NumericBox, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { FreightCalculationTypeTemplate } from '../../../../Search/Templates/FreightCalculationType';
import { MesoRegionTemplate } from '../../../../Search/Templates/MesoRegion';
import { Recipients } from './recipients';
import { Weights } from './weights';

export class ViewFreightCalculation extends ViewFreightCalculationBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1100}>
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
                            <AutoComplete Label='Remetente (Região)' Pesquisa={async(Text: string) => await Search.MesoRegion(Text)} Text={(Item: any) => `${Item.description} - ${Item.state?.acronym}` } Value={this.state.senderMesoRegion} OnChange={(senderMesoRegion: any) => this.setState({senderMesoRegion})}>
                                <MesoRegionTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={2}>
                            <NumericBox Label='ICMS' Text={this.state.aliquotICMS} Prefix='% ' Scale={2} OnChange={(args: EventArgs) => this.setState({aliquotICMS: args.Value})} />
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
            </ViewModal>
        );

    }

}