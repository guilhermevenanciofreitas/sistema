
import { ViewFreightCalculationBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { FreightCalculationTypeTemplate } from '../../../../Search/Templates/FreightCalculationType';

export class ViewFreightCalculation extends ViewFreightCalculationBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={700} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
          
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={5}>
                            <AutoComplete Label='Empresa' Pesquisa={async(Text: string) => await Search.FreightCalculationType(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.type} OnChange={(type: any) => this.setState({type})}>
                                <FreightCalculationTypeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Tipo' Pesquisa={async(Text: string) => await Search.FreightCalculationType(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.type} OnChange={(type: any) => this.setState({type})}>
                                <FreightCalculationTypeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <TextBox Label='Peso' TextTransform='Normal' Text={''} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                        </Grid>

                        <Grid md={8}>
                            <AutoComplete Label='Remetente' Pesquisa={async(Text: string) => await Search.FreightCalculationType(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.type} OnChange={(type: any) => this.setState({type})}>
                                <FreightCalculationTypeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Região' Pesquisa={async(Text: string) => await Search.FreightCalculationType(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.type} OnChange={(type: any) => this.setState({type})}>
                                <FreightCalculationTypeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={8}>
                            <AutoComplete Label='Destinatário' Pesquisa={async(Text: string) => await Search.FreightCalculationType(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.type} OnChange={(type: any) => this.setState({type})}>
                                <FreightCalculationTypeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Região' Pesquisa={async(Text: string) => await Search.FreightCalculationType(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.type} OnChange={(type: any) => this.setState({type})}>
                                <FreightCalculationTypeTemplate />
                            </AutoComplete>
                        </Grid>
                        
                    </Grid>

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Notas fiscais' Visible={true}>
                                    <></>
                                </TabItem>
                                <TabItem Title='Cálculo' Visible={true}>
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