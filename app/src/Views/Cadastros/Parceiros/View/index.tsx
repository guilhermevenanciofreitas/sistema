
import { ViewParceiroBase } from './index.base';
import { Button, CheckBox, Form, Modal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';

import { Search } from '../../../../Search';
import { TabelaPrecoTemplate } from '../../../../Search/Templates/TabelaPreco';

export class ViewParceiro extends ViewParceiroBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1150} Close={this.Close}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.nome != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <TextBox Label={this.state.tipo} TextTransform='UpperCase' Text={this.state.cpfCnpj} Mask={this.state.tipo == 'CNPJ' ? '##.###.###/####-##' : '###.###.###-#####'} OnChange={(args: EventArgs) => {
                                this.setState({tipo: args.Value.length >= 15 ? 'CNPJ' : 'CPF', cpfCnpj: args.Value})
                            }} />
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label={this.state.tipo == 'CPF' ? 'Nome' : 'Razão social'} TextTransform='UpperCase' Text={this.state.nome} OnChange={(args: EventArgs) => this.setState({nome: args.Value})} />
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label={this.state.tipo == 'CPF' ? 'Apelido' : 'Nome fantasia'} TextTransform='UpperCase' Text={this.state.apelido} OnChange={(args: EventArgs) => this.setState({apelido: args.Value})} />
                        </Grid>
                        <Grid md={12}>
                            <div style={{display: 'flex'}}>
                                <CheckBox Label='Cliente' Checked={this.state.isCliente} OnChange={(args: EventArgs) => this.setState({isCliente: args.Value})} />
                                <CheckBox Label='Fornecedor' Checked={this.state.isFornecedor} OnChange={(args: EventArgs) => this.setState({isFornecedor: args.Value})} />
                                <CheckBox Label='Transportadora' Checked={this.state.isTransportadora} OnChange={(args: EventArgs) => this.setState({isTransportadora: args.Value})} />
                                <CheckBox Label='Funcionario' Checked={this.state.isFuncionario} OnChange={(args: EventArgs) => this.setState({isFuncionario: args.Value})} />
                            </div>
                        </Grid>
                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Principal' Visible={true}>
                                    <div style={{display: 'flex'}}>
                                        <Grid md={2}>
                                            <DatePicker Label={this.state.tipo == 'CPF' ? 'Nascimento' : 'Abertura'} Text={this.state.nascimento} OnChange={(args: EventArgs) => this.setState({nascimento: args.Value})} />
                                        </Grid>
                                        
                                        {this.state.tipo == 'CPF' && (
                                            <>
                                                <Grid md={2}>
                                                    <DropDownList Label='Sexo' SelectedValue={this.state.sexo} OnChange={(args: EventArgs) => this.setState({sexo: args.Value})}>
                                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                                        <DropDownListItem Label='Masculino' Value={1} />
                                                        <DropDownListItem Label='Feminino' Value={2} />
                                                    </DropDownList>
                                                </Grid>
                                                <Grid md={2}>
                                                    <DropDownList Label='Estado cívil' SelectedValue={this.state.estadoCivil} OnChange={(args: EventArgs) => this.setState({estadoCivil: args.Value})}>
                                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                                        <DropDownListItem Label={this.state.sexo == '2' ? 'Solteira' : 'Solteiro'} Value={1} />
                                                        <DropDownListItem Label={this.state.sexo == '2' ? 'Casada' : 'Casado'} Value={2} />
                                                        <DropDownListItem Label={this.state.sexo == '2' ? 'Divorciada' : 'Divorciado'} Value={3} />
                                                        <DropDownListItem Label={this.state.sexo == '2' ? 'Viúva' : 'Viúvo'} Value={4} />
                                                    </DropDownList>
                                                </Grid>
                                                <Grid md={2}>
                                                    <TextBox Label='RG' TextTransform='UpperCase' Text={this.state.rg} OnChange={(args: EventArgs) => this.setState({rg: args.Value})} />
                                                </Grid>
                                            </>
                                        )}
                                        
                                        <Grid md={2}>
                                            <TextBox Label='Insc. Estadual' TextTransform='UpperCase' Text={this.state.ie} OnChange={(args: EventArgs) => this.setState({ie: args.Value})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='Insc. Municipal' TextTransform='UpperCase' Text={this.state.im} OnChange={(args: EventArgs) => this.setState({im: args.Value})} />
                                        </Grid>
                                    </div>
                                    {this.state.tipo == 'CPF' && (
                                    <div style={{display: 'flex'}}>
                                        <Grid md={3}>
                                            <DropDownList Label='Escolaridade' SelectedValue={this.state.escolaridade} OnChange={(args: EventArgs) => this.setState({escolaridade: args.Value})}>
                                                <DropDownListItem Label='[Selecione]' Value={null} />
                                                <DropDownListItem Label='Educação infantil' Value={1} />
                                                <DropDownListItem Label='Fundamental' Value={2} />
                                                <DropDownListItem Label='Médio' Value={3} />
                                                <DropDownListItem Label='Superior (Graduação)' Value={4} />
                                                <DropDownListItem Label='Pós-graduação' Value={5} />
                                                <DropDownListItem Label='Mestrado' Value={6} />
                                                <DropDownListItem Label='Doutorado' Value={6} />
                                            </DropDownList>
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Profissao' TextTransform='UpperCase' Text={this.state.profissao} OnChange={(args: EventArgs) => this.setState({profissao: args.Value})} />
                                        </Grid>
                                    </div>
                                    )}
                                    <div style={{display: 'flex'}}>
                                        <Grid md={3}>
                                            <AutoComplete Label='Tabela de preço' Pesquisa={async(Text: string) => await Search.TabelaPreco(Text)} Text={(Item: any) => `${Item.descricao}` } Value={this.state.tabelaPreco} OnChange={(args: any) => this.setState({tabelaPreco: args})}>
                                                <TabelaPrecoTemplate />
                                            </AutoComplete>
                                        </Grid>
                                    </div>
                                    <Grid md={12}>
                                        <div style={{display: 'flex'}}>
                                            <CheckBox Label='Ativo' Checked={this.state.isAtivo} OnChange={(args: EventArgs) => this.setState({isAtivo: args.Value})} />
                                            {this.state.isCliente && <CheckBox Label='Bloquear venda' Checked={this.state.isBloquearVenda} OnChange={(args: EventArgs) => this.setState({isBloquearVenda: args.Value})} />}
                                            {this.state.isFornecedor && <CheckBox Label='Bloquear compra' Checked={this.state.isBloquearCompra} OnChange={(args: EventArgs) => this.setState({isBloquearCompra: args.Value})} />}
                                        </div>
                                    </Grid>
                                </TabItem>
                                <TabItem Title='Contatos' Visible={true}>
                                    Contatos
                                </TabItem>
                                <TabItem Title='Endereços' Visible={true}>
                                    Endereços
                                </TabItem>
                                <TabItem Title='Vendedores' Visible={this.state.isCliente}>
                                    Vendedores
                                </TabItem>
                            </Tab>
                        </Grid>
                    </Grid>

                </Form>
            </Modal>
        );

    }

}