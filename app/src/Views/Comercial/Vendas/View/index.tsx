
import { ViewContratoBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, MessageBox, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { ClienteTemplate } from '../../../../Search/Templates/Cliente';
import { Itens } from './itens';
import { MunicipioTemplate } from '../../../../Search/Templates/Municipio';
import { Estados } from '../../../../Utils/Estados';
import { Pagamento } from './pagamento';
import { TipoEntregaTemplate } from '../../../../Search/Templates/TipoEntrega';

export class ViewPedidoVenda extends ViewContratoBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={5}>
                            <AutoComplete Label='Cliente' Pesquisa={async(Text: string) => await Search.Cliente(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.cliente} OnChange={async (args: any) => {
                                if (args?.isBloquearVenda) {
                                    await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: "Cliente bloqueado para venda!", buttons: [{ Text: "OK" }]});
                                    return;
                                }
                                this.setState({cliente: args})
                            }}>
                                <ClienteTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={3}>
                            <AutoComplete Label='Tipo de entrega' Pesquisa={async(Text: string) => await Search.TipoEntrega(Text)} Text={(Item: any) => `${Item.descricao}` } Value={this.state.tipoEntrega} OnChange={(args: any) => this.setState({tipoEntrega: args})}>
                                <TipoEntregaTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <FormLabel>Status</FormLabel>
                            <Alert variant="soft">{this.state.status?.descricao || "SEM STATUS"}</Alert>
                        </Grid>

                        <Tab>
                            <TabItem Title='Itens' Visible={true}>
                                <Itens Itens={this.state.itens} OnChange={(itens: any[]) => this.setState({itens})} />
                            </TabItem>
                            <TabItem Title='Entrega' Visible={this.state.tipoEntrega != null}>
                                <>
                                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                        <Grid md={2}>
                                            <TextBox Label='CEP' TextTransform='UpperCase' Text={this.state.entrega.cep} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, cep: args.Value}})} />
                                        </Grid>
                                        <Grid md={5}>
                                            <TextBox Label='Logradouro' TextTransform='UpperCase' Text={this.state.entrega.logradouro} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, logradouro: args.Value}})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextBox Label='Número' TextTransform='UpperCase' Text={this.state.entrega.numero} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, numero: args.Value}})} />
                                        </Grid>
                                        <Grid md={3}>
                                            <TextBox Label='Complemento' TextTransform='UpperCase' Text={this.state.entrega.complemento} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, complemento: args.Value}})} />
                                        </Grid>

                                        <Grid md={5}>
                                            <TextBox Label='Bairro' TextTransform='UpperCase' Text={this.state.entrega.bairro} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, bairro: args.Value}})} />
                                        </Grid>
                                        <Grid md={2}>
                                            <DropDownList Label='Estado' SelectedValue={this.state.entrega.estadoId} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, estadoId: args.Value}})}>
                                                <DropDownListItem Label='[Selecione]' Value={null} />
                                                {
                                                    Estados.map((args) => <DropDownListItem Label={args.nome} Value={args.id} />)
                                                }
                                            </DropDownList>
                                        </Grid>
                                        <Grid md={5}>
                                            <AutoComplete Label='Municipio' Pesquisa={async(Text: string) => await Search.Municipio(Text, this.state.entrega.estadoId)} Text={(Item: any) => `${Item.nome}` } Value={this.state.entrega.municipio} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, municipio: args}})}>
                                                <MunicipioTemplate />
                                            </AutoComplete>
                                        </Grid>
                                    </Grid>
                                    <br></br>
                                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                                        <Grid md={4}>
                                            <AutoComplete Label='Entregador' Pesquisa={async(Text: string) => await Search.Funcionario(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.entregador} OnChange={(args: any) => this.setState({entregador: args})}>
                                                <ClienteTemplate />
                                            </AutoComplete>
                                        </Grid>
                                    </Grid>
                                </>
                            </TabItem>
                            <TabItem Title='Pagamento' Visible={true}>
                                <Pagamento Itens={this.state.pagamentos} OnChange={(pagamentos: any[]) => this.setState({pagamentos})} />
                            </TabItem>
                        </Tab>
                        
                    </Grid>

                </Form>
            </Modal>
        );

    }

}