
import { ViewNotaFiscalBase } from './index.base';
import { Button, CheckBox, Form, Modal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker, GridView } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';

import { Search } from '../../../../Search';
import { TabelaPrecoTemplate } from '../../../../Search/Templates/TabelaPreco';


export class ViewNotaFiscal extends ViewNotaFiscalBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1150} Close={this.Close}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.nome != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        
                    <Grid md={2}>
                            <TextBox Label='Número' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                        </Grid>
                        <Grid md={3}>
                            <DropDownList Label='Modelo' SelectedValue={this.state.id} OnChange={(args: EventArgs) => this.setState({Sexo: args.Value})}>
                                <DropDownListItem Label='[Selecione]' />
                                <DropDownListItem Label='Masculino' Value='Masculino' />
                                <DropDownListItem Label='Feminino' Value='Feminino' />
                            </DropDownList>
                        </Grid>
                        <Grid md={1}>
                            <TextBox Label='Serie' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                        </Grid>
                        <Grid md={2}>
                            <DropDownList Label='Tipo' SelectedValue={this.state.id} OnChange={(args: EventArgs) => this.setState({Sexo: args.Value})}>
                                <DropDownListItem Label='[Selecione]' />
                                <DropDownListItem Label='Saída' Value='1' />
                                <DropDownListItem Label='Entrada' Value='2' />
                            </DropDownList>
                        </Grid>
                        <Grid md={4}>
                            <DropDownList Label='Operação' SelectedValue={this.state.id} OnChange={(args: EventArgs) => this.setState({Sexo: args.Value})}>
                                <DropDownListItem Label='[Selecione]' />
                                <DropDownListItem Label='Saída' Value='1' />
                                <DropDownListItem Label='Entrada' Value='2' />
                            </DropDownList>
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label='Nome/Razão social' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                        </Grid>
                        <Grid md={3}>
                            <TextBox Label='CPF/CNPJ' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Inscrição Estadual' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                        </Grid>
                        <Grid md={2}>
                            <DatePicker Label='Emissão' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({nascimento: args.Value})} />
                        </Grid>

                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Endereço' Visible={true}>
                                    <div style={{display: 'flex'}}>
                                        <Grid md={4}>
                                            <TextBox Label='Endereço' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                                        </Grid>
                                        <Grid md={1}>
                                            <TextBox Label='Número' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='Complemento' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Bairro' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <DatePicker Label='Saída' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({nascimento: args.Value})} />
                                        </Grid>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <Grid md={4}>
                                            <TextBox Label='Municipio' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='CEP' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                                        </Grid>
                                        <Grid md={1}>
                                            <TextBox Label='UF' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='Fone' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                                        </Grid>
                                    </div>
                                </TabItem>
                                <TabItem Title='Produtos' Visible={true}>
                                    Produtos
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