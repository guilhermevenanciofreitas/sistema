
import { ViewProdutoBase } from './index.base';
import { AutoComplete, Button, CheckBox, Form, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { Combinacao } from './combinacao';
import { ProdutoCategoriaTemplate } from '../../../../Search/Templates/ProdutoCategoria';
import { Search } from '../../../../Search';

export class ViewProduto extends ViewProdutoBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.descricao != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={8}>
                            <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.nome} OnChange={(args: EventArgs) => this.setState({nome: args.Value})} />
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Categoria' Pesquisa={async (Text: string) => await Search.ProdutoCategoria(Text)} Text={(Item: any) => `${Item.descricao}` } Value={this.state.categoria} OnChange={(args: any) => this.setState({categoria: args})}>
                                <ProdutoCategoriaTemplate />
                            </AutoComplete>
                        </Grid>

                        <Grid md={12}>
                            <TextBox Label='Descrição' TextTransform='Normal' Text={this.state.descricao} OnChange={(args: EventArgs) => this.setState({descricao: args.Value})} />
                        </Grid>
                        
                        <Grid md={12}>
                            <div style={{display: 'flex'}}>
                                <CheckBox Label='Combinação' Checked={this.state.isCombinacao} OnChange={(args: EventArgs) => this.setState({isCombinacao: args.Value})} />
                            </div>
                        </Grid>
    
                        <Grid md={12}>
                            
                            <Tab>
                                <TabItem Title='Principal' Visible={this.state.isCombinacao}>
                                    <Grid md={12}>
                                        <TextBox Label='Valor' TextTransform='Normal' Text={this.state.valor} OnChange={(args: EventArgs) => this.setState({valor: args.Value})} />
                                    </Grid>
                                </TabItem>
                                <TabItem Title='Combinação' Visible={this.state.isCombinacao}>
                                    <Combinacao Itens={this.state.combinacoes} OnChange={(combinacoes: any[]) => this.setState({combinacoes})} />
                                </TabItem>
                                <TabItem Title='Composição' Visible={true}>
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
