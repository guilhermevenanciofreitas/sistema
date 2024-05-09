
import { ViewNotaFiscalBase } from './index.base';
import { Button, CheckBox, Form, Modal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker, GridView } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';

import { Search } from '../../../../Search';
import { TabelaPrecoTemplate } from '../../../../Search/Templates/TabelaPreco';
import _ from 'lodash';


export class ViewNotaFiscal extends ViewNotaFiscalBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1150} Close={this.Close}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        
                        <Grid md={12}>
                            <input type="file" onChange={this.BtnXml_Click} />
                        </Grid>

                        <Grid md={2}>
                            <TextBox Label='Número' TextTransform='Normal' Text={_.get(this.state, 'NFe.infNFe.ide.nNF')} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
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
            </Modal>
        );

    }

}