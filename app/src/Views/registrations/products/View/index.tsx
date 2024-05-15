
import { ViewProductBase } from './index.base';
import { AutoComplete, Button, CheckBox, Form, ViewModal, Tab, TabItem, TextBox, NumericBox, Content, Actions } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { Combinations } from './combinations';
import { ProductCategoryTemplate } from '../../../../Search/Templates/ProductCategory';
import { Search } from '../../../../Search';
import { Suppliers } from './suppliers';
import { CheckCircleOutline, DeleteForever, TaskAltOutlined } from '@mui/icons-material';
import { color } from '../../../../Utils/color';
import _ from 'lodash';

export class ViewProduct extends ViewProductBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1000}>
                <Content>
                
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={6}>
                            <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                        </Grid>
                        <Grid md={3}>
                            <AutoComplete Label='Categoria' Action={{Type: 'ProductCategory', New: {Values: {}}, Edit: {Id: _.get(this.state.category, 'id')}}} Pesquisa={async (Text: string) => await Search.ProductCategory(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.category} OnChange={(category: any) => this.setState({category})}>
                                <ProductCategoryTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <AutoComplete Label='Sub-categoria' Action={{Type: 'ProductCategory', New: {Values: {}}, Edit: {Id: _.get(this.state.category, 'id')}}} Pesquisa={async (Text: string) => await Search.ProductCategory(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.category} OnChange={(category: any) => this.setState({category})}>
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
                                <TabItem Title='Principal' Visible={true}>
                                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                        <Grid md={2}>
                                            <NumericBox Label='Custo' Text={this.state.cost} Prefix='R$ ' Scale={2} OnChange={(args: EventArgs) => {
                                                const markup: number = (((parseFloat((this.state.value as any || '0')) / parseFloat(args.Value || '0')) - 1) * 100);
                                                this.setState({cost: args.Value, markup: this.state.value == null ? null : markup.toString()})
                                            }} />
                                        </Grid>
                                        <Grid md={2}>
                                            <NumericBox Label='Markup' Text={this.state.markup} Prefix='% ' Scale={2} OnChange={(args: EventArgs) => {
                                                const value: number = ((parseFloat(args.Value || '0') / 100) + 1) * parseFloat(this.state.cost as any || '0');
                                                if (value != 0)
                                                this.setState({markup: args.Value, value: value.toString()});
                                            }} />
                                        </Grid>
                                        <Grid md={2}>
                                            <NumericBox Label='Valor' Text={this.state.value} Prefix='R$ ' Scale={2} OnChange={(args: EventArgs) => {
                                                const markup: number = (((parseFloat((args.Value as any || '0')) / parseFloat(this.state.cost || '0')) - 1) * 100);
                                                this.setState({value: args.Value, markup: this.state.cost == null ? null : markup.toString()})
                                            }} />
                                        </Grid>
                                        <Grid md={2}>
                                            <NumericBox Label='Estoque' Text={this.state.stockBalance} Scale={3} ReadOnly={true} />
                                        </Grid>
                                        <Grid md={2}>
                                            <NumericBox Label='Estoque Mínimo' Text={this.state.stockMin} OnChange={(args: EventArgs) => this.setState({stockMin: args.Value})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <NumericBox Label='Estoque Máximo' Text={this.state.stockMax} OnChange={(args: EventArgs) => this.setState({stockMax: args.Value})} />
                                        </Grid>
                                    </Grid>
                                </TabItem>
                                <TabItem Title='Combinação' Visible={this.state.isCombination}>
                                    <Combinations combinations={this.state.combinations} OnChange={(combinations: any[]) => this.setState({combinations})} />
                                </TabItem>
                                <TabItem Title='Composição' Visible={true}>
                                    <></>
                                </TabItem>
                                <TabItem Title='Fornecedores' Visible={true}>
                                    <Suppliers suppliers={this.state.suppliers} OnChange={(suppliers: any[]) => this.setState({suppliers})} />
                                </TabItem>
                            </Tab>
                        
                        </Grid>
                        
                    </Grid>

                </Content>

                <Actions>
                    {this.state.id && <Button Text='Excluir' StartIcon={<DeleteForever />} Color='white' BackgroundColor='#dc3545' OnClick={this.BtnSalvar_Click} />}
                    <Button Text='Salvar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
                
            </ViewModal>
        );

    }

}
