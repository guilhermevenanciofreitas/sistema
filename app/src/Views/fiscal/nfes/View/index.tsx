
import { ViewNotaFiscalBase } from './index.base';
import { Button, CheckBox, Form, ViewModal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker, GridView, Content, Actions, DateTimePicker } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid, IconButton } from '@mui/joy';

import { Search } from '../../../../Search';
import { TabelaPrecoTemplate } from '../../../../Search/Templates/TabelaPreco';
import _ from 'lodash';
import { color } from '../../../../Utils/color';
import { CheckCircleOutlined, Print, DownloadOutlined, TravelExplore } from '@mui/icons-material';
import { Service } from '../../../../Service';

enum colors {
    'status-100' = '#4ad185',
    'status-101' = '#dc3545'
}

export class ViewNotaFiscal extends ViewNotaFiscalBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={900}>
               
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={12} style={{marginBottom: '10px'}}>
                            <FormLabel sx={{fontWeight: 400}}>Arquivo XML</FormLabel>
                            <input type="file" onChange={this.BtnXml_Click} />
                        </Grid>

                        <Grid md={7}>
                            <TextBox Label='Chave de acesso' Mask={'#### #### #### #### #### #### #### #### #### #### ####'} TextTransform='Normal' Text={_.get(this.state, 'protNFe.infProt.chNFe')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'protNFe.infProt.chNFe', args.Value))} EndDecorator={<IconButton onClick={this.BtnConsultar} ><TravelExplore /></IconButton>} />
                        </Grid>
                        <Grid md={5}>
                            <FormLabel sx={{fontWeight: 400}}>Status</FormLabel>
                            <Alert variant="soft" style={{height: '32px'}}>
                                <div style={{display: 'flex', height: 'auto'}}>
                                    <div style={{marginTop: '3px', width: '15px', height: '15px', backgroundColor: colors[`status-${_.get(this.state, 'protNFe.infProt.cStat')}` as keyof typeof colors], borderRadius: '25px'}}></div>
                                    <div style={{paddingLeft: '8px'}}>
                                        {_.get(this.state, 'protNFe.infProt') && <>{_.get(this.state, 'protNFe.infProt.cStat')} - {_.get(this.state, 'protNFe.infProt.xMotivo')}</>}
                                    </div>
                                </div>
                            </Alert>
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Número' TextTransform='Normal' Text={_.get(this.state, 'NFe.infNFe.ide.nNF')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'NFe.infNFe.ide.nNF', args.Value))} />
                        </Grid>
                        <Grid md={1}>
                            <TextBox Label='Série' TextTransform='Normal' Text={_.get(this.state, 'NFe.infNFe.ide.serie')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'NFe.infNFe.ide.serie', args.Value))} />
                        </Grid>
                        <Grid md={3}>
                            <DropDownList Label='Tipo emissão' SelectedValue={_.get(this.state, 'NFe.infNFe.ide.tpEmis')} OnChange={(args: EventArgs) => this.setState((state) => _.set(state, 'NFe.infNFe.ide.tpEmis', args.Value))}>
                                <DropDownListItem Label='[Selecione]' Value={null} />
                                <DropDownListItem Label='Emissão normal' Value='1' />
                                <DropDownListItem Label='Contingência FS-IA' Value='2' />
                                <DropDownListItem Label='Contingência SCAN' Value='3' />
                                <DropDownListItem Label='Contingência DPEC' Value='4' />
                                <DropDownListItem Label='Contingência FS-DA' Value='5' />
                                <DropDownListItem Label='Contingência SVC-AN' Value='6' />
                                <DropDownListItem Label='Contingência SVC-RS' Value='7' />
                            </DropDownList>
                        </Grid>
                        <Grid md={3}>
                            <DateTimePicker Label='Emissão' Text={_.get(this.state, 'NFe.infNFe.ide.dhEmi')} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                        </Grid>
                        <Grid md={3}>
                            <DateTimePicker Label='Entrada/Saída' Text={_.get(this.state, 'NFe.infNFe.ide.dhSaiEnt')} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                        </Grid>
                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Identificação' Visible={true}>
                                    Identificação
                                </TabItem>
                                <TabItem Title='Emitente' Visible={true}>
                                    Emitente
                                </TabItem>
                                <TabItem Title='Destinatário' Visible={true}>
                                    Destinatário
                                </TabItem>
                                <TabItem Title='Itens' Visible={true}>
                                    Itens
                                </TabItem>
                                <TabItem Title='Faturas' Visible={true}>
                                    Faturas
                                </TabItem>
                            </Tab>
                        </Grid>
                    </Grid>

                </Content>
                <Actions>
                    {this.state.id && <Button Text='Imprimir' StartIcon={<Print />} Color={'white'} BackgroundColor={color.primary} OnClick={() => null} />}
                    {this.state.id && <Button Text='Download' StartIcon={<DownloadOutlined />} Color={'white'} BackgroundColor={color.primary} OnClick={() => null} />}
                    <Button Text='Salvar' StartIcon={<CheckCircleOutlined />} Color={'white'} BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
                
            </ViewModal>
        );

    }

}