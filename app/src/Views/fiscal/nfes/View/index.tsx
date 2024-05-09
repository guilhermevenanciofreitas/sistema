
import { ViewNotaFiscalBase } from './index.base';
import { Button, CheckBox, Form, Modal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker, GridView, Content, Actions } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';

import { Search } from '../../../../Search';
import { TabelaPrecoTemplate } from '../../../../Search/Templates/TabelaPreco';
import _ from 'lodash';
import { color } from '../../../../Utils/color';
import { CheckCircleOutlined } from '@mui/icons-material';


export class ViewNotaFiscal extends ViewNotaFiscalBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1150} Close={this.Close}>
               
                <Content>

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

                </Content>
                <Actions>
                    <Button Text='Salvar' StartIcon={<CheckCircleOutlined />} Color={'white'} BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
                
            </Modal>
        );

    }

}