
import { ViewNotaFiscalBase } from './index.base';
import { Button, CheckBox, Form, ViewModal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker, GridView } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';

import { Search } from '../../../../Search';
import { TabelaPrecoTemplate } from '../../../../Search/Templates/TabelaPreco';


export class ViewNotaFiscal extends ViewNotaFiscalBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1150}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.nome != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        
                        <Grid md={2}>
                            <TextBox Label='Número' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                        </Grid>
                        
                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Emitente' Visible={true}>
                                    Emitente
                                </TabItem>
                                <TabItem Title='Destinatário' Visible={true}>
                                    Destinatário
                                </TabItem>
                                <TabItem Title='Impostos' Visible={true}>
                                    Impostos
                                </TabItem>
                                <TabItem Title='Faturas' Visible={true}>
                                    Faturas
                                </TabItem>
                            </Tab>
                        </Grid>
                    </Grid>

                </Form>
            </ViewModal>
        );

    }

}