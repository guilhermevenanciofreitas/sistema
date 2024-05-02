
import { ViewStockInBase } from './index.base';
import { AutoComplete, Button, Form, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import _ from 'lodash';
import { NfeTemplate } from '../../../../Search/Templates/Nfe';
import { Products } from './products';

export class ViewStockIn extends ViewStockInBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={900} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    {this.state.status == 'pending' && (
                        <>
                            <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                            <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />
                            {this.state.id && (<Button Text='Confirmar' Type='Button' Color='white' BackgroundColor='blue' OnClick={this.BtnCheckIn_Click} />)}
                        </>
                    )}
                    

                    {this.state.status == 'checkIn' && (
                        <>
                            <Button Text='Imprimir etiquetas' Type='Button' Color='white' BackgroundColor='green' />
                        </>
                    )}

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                       
                        <Grid md={6}>
                            <AutoComplete Label='Nota fiscal' Pesquisa={async(Text: string) => await Search.Nfe(Text)} Text={(Item: any) => `${Item.protNFe?.infProt?.chNFe}` } Value={this.state.nfe} OnChange={(nfe: any) => this.setState({nfe})}>
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

                </Form>
            </Modal>
        );

    }

}