
import { ViewProdutoBase } from './index.base';
import { AutoComplete, Button, CheckBox, Form, Modal, Tab, TabItem, TextBox, NumericBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { Combinations } from './combinations';
import { ProductCategoryTemplate } from '../../../../Search/Templates/ProductCategory';
import { Search } from '../../../../Search';

export class ViewProduto extends ViewProdutoBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.description != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={8}>
                            <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Categoria' Pesquisa={async (Text: string) => await Search.ProductCategory(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.category} OnChange={(category: any) => this.setState({category})}>
                                <ProductCategoryTemplate />
                            </AutoComplete>
                        </Grid>

                        <Grid md={12}>
                            <TextBox Label='Descrição' TextTransform='Normal' Text={this.state.description} OnChange={(args: EventArgs) => this.setState({description: args.Value})} />
                        </Grid>
                        
                        <Grid md={12}>
                            <div style={{display: 'flex'}}>
                                <CheckBox Label='Combinação' Checked={this.state.isCombination} OnChange={(args: EventArgs) => this.setState({isCombination: args.Value})} />
                            </div>
                        </Grid>
    
                        <Grid md={12}>
                            
                            <Tab>
                                <TabItem Title='Principal' Visible={this.state.isCombination}>
                                    <Grid md={12}>
                                        <NumericBox Label='Valor' Text={this.state.value} Prefix='R$ ' Scale={2} OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
                                    </Grid>
                                </TabItem>
                                <TabItem Title='Combinação' Visible={this.state.isCombination}>
                                    <Combinations combinations={this.state.combinations} OnChange={(combinations: any[]) => this.setState({combinations})} />
                                </TabItem>
                                <TabItem Title='Composição' Visible={true}>
                                    <></>
                                </TabItem>
                                <TabItem Title='Fornecedores' Visible={true}>
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
