
import { ViewStockInBase } from './index.base';
import { Actions, AutoComplete, Button, Content, Form, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import _ from 'lodash';
import { NfeTemplate } from '../../../../Search/Templates/Nfe';
import { Products } from './products';
import { color } from '../../../../Utils/color';
import { CheckCircleOutlined, TaskAltOutlined, PlaylistAddCheckCircleRounded, DeleteForever, BookmarksOutlined } from '@mui/icons-material';

export class ViewStockIn extends ViewStockInBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={950} Close={() => this.Close()}>
               
                <Content>
                    
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                       
                        <Grid md={6}>
                            <AutoComplete Label='Nota fiscal' Pesquisa={async(Text: string) => await Search.Nfe(Text)} Text={(Item: any) => `${Item.protNFe?.infProt?.chNFe}` } Value={this.state.nfe} OnChange={(nfe: any) => {

                                var products: any[] = [];

                                if (nfe == null) {
                                    this.setState({nfe: null, products: []});
                                    return;
                                }

                                if (_.isArray(nfe?.NFe?.infNFe?.det)) {
                                    for(const det of nfe?.NFe?.infNFe?.det || []) {
                                        products.push({quantity: det?.prod?.qCom, value: det?.prod?.vProd, prod: det?.prod});
                                    }
                                } else {
                                    const det = nfe?.NFe?.infNFe?.det;
                                    products.push({quantity: det?.prod?.qCom, value: det?.prod?.vProd, prod: det?.prod});
                                }
                                
                                this.setState({nfe, products});
                             
                            }}>
                                <NfeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <FormLabel sx={{fontWeight: 400}}>Status</FormLabel>
                            <Alert variant="soft" style={{height: '32px'}}>
                                <div style={{display: 'flex', height: 'auto'}}>
                                    <div style={{marginTop: '3px', width: '15px', height: '15px', backgroundColor: _.get(this.state.status, 'color') || '#a0a0a0', borderRadius: '25px'}}></div>
                                    <div style={{paddingLeft: '8px'}}>
                                        {_.get(this.state.status, 'description') || "Pendente"}
                                    </div>
                                </div>
                            </Alert>
                        </Grid>

                        <Tab>
                            <TabItem Title='Produtos' Visible={true}>
                                <Products products={this.state.products} OnChange={(products: any[]) => this.setState({products})} />
                            </TabItem>
                            <TabItem Title='Saídas' Visible={true}>
                                <></>
                            </TabItem>
                        </Tab>
                    </Grid>

                </Content>

                <Actions>
                    {this.state.status == 'pending' && (
                        <>
                            {this.state.id && <Button Text='Excluir' StartIcon={<DeleteForever></DeleteForever>} Color='white' BackgroundColor={color.danger} OnClick={this.BtnSalvar_Click} />}
                            <Button Text='Salvar' StartIcon={<CheckCircleOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                            {this.state.id && (<Button Text='Confirmar' StartIcon={<PlaylistAddCheckCircleRounded />} Color='white' BackgroundColor={color.primary} OnClick={this.BtnCheckIn_Click} />)}
                        </>
                    )}
                    {this.state.status == 'checkIn' && (
                        <>
                            <Button Text='Imprimir etiquetas' StartIcon={<BookmarksOutlined />} Color='white' BackgroundColor={color.primary} />
                        </>
                    )}
                </Actions>

            
            </Modal>
        );

    }

}