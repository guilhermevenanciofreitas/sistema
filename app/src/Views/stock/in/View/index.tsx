
import { ViewStockInBase } from './index.base';
import { Actions, AutoComplete, Button, Content, Form, ViewModal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import _ from 'lodash';
import { NfeTemplate } from '../../../../Search/Templates/Nfe';
import { Products } from './products';
import { color } from '../../../../Utils/color';
import { CheckCircleOutlined, TaskAltOutlined, PlaylistAddCheckCircleRounded, DeleteForever, BookmarksOutlined } from '@mui/icons-material';
import { SupplierTemplate } from '../../../../Search/Templates/Supplier';

export class ViewStockIn extends ViewStockInBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1100}>
               
                <Content>
                    
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                       
                        <Grid md={5}>
                            <AutoComplete 
                                Action={{
                                    Type: 'Nfe',
                                    New: {Values: {}},
                                    Edit: {Id: _.get(this.state.nfe, 'id')}
                                }}
                                Label='Nota fiscal' Pesquisa={async(Text: string) => _.filter(await Search.Nfe(Text), (c) => _.size(c.stockIns) == 0)} Text={(Item: any) => `${Item.protNFe?.infProt?.chNFe}`} Value={this.state.nfe} OnChange={this.TxtNfe_Change}>
                                <NfeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete 
                                Action={{
                                    Type: 'Supplier',
                                    New: {
                                        Values: {
                                            cpfCnpj: _.toUpper(_.get(this.state, 'nfe.NFe.infNFe.emit.CNPJ')),
                                            name: _.toUpper(_.get(this.state, 'nfe.NFe.infNFe.emit.xNome')),
                                            surname: _.toUpper(_.get(this.state, 'nfe.NFe.infNFe.emit.xFant')),
                                            ie: _.get(this.state, 'nfe.NFe.infNFe.emit.IE'),
                                            isBloquearCompra: false,
                                            address: {
                                                cep: _.get(this.state, 'nfe.NFe.infNFe.emit.enderEmit.CEP'),
                                                logradouro: _.toUpper(_.get(this.state, 'nfe.NFe.infNFe.emit.enderEmit.xLgr')),
                                                number: _.toUpper(_.get(this.state, 'nfe.NFe.infNFe.emit.enderEmit.nro')),
                                                complement: _.toUpper(_.get(this.state, 'nfe.NFe.infNFe.emit.enderEmit.xCpl')),
                                                neighborhood: _.toUpper(_.get(this.state, 'nfe.NFe.infNFe.emit.enderEmit.xBairro')),
                                                city: _.get(this.state, 'nfe.enderEmit.city'),
                                                state: _.get(this.state, 'nfe.enderEmit.state'),
                                            }
                                        }
                                    },
                                    Edit: {Id: _.get(this.state.supplier, 'id')}
                                }}
                                Label='Fornecedor' Pesquisa={async(Text: string) => await Search.Supplier(Text)} Text={(Item: any) => `${Item.surname}`} Value={this.state.supplier} OnChange={(supplier: any[]) => this.setState({supplier})}>
                                <SupplierTemplate />
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

            
            </ViewModal>
        );

    }

}