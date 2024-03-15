
import { ViewContratoBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { ClienteTemplate } from '../../../../Search/Templates/Cliente';
import { Itens } from './itens';
import { MunicipioTemplate } from '../../../../Search/Templates/Municipio';
import { Estados } from '../../../../Utils/Estados';

export class ViewItem extends ViewContratoBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={5}>
                            <AutoComplete Label='Cliente' Pesquisa={async(Text: string) => await Search.Cliente(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.cliente} OnChange={(args: any) => this.setState({cliente: args})}>
                                <ClienteTemplate />
                            </AutoComplete>
                        </Grid>

                        <Tab>
                            <TabItem Title='Itens' Visible={true}>
                                <Itens Itens={this.state.itens} OnChange={(itens: any[]) => this.setState({itens})} />
                            </TabItem>
                            <TabItem Title='Pagamento' Visible={true}>
                                <></>
                            </TabItem>
                            <TabItem Title='Entrega' Visible={true}>
                                <>
                                    <TextBox Label='CEP' TextTransform='UpperCase' Text={this.state.entrega.cep} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, cep: args.Value}})} />
                                    <TextBox Label='Logradouro' TextTransform='UpperCase' Text={this.state.entrega.logradouro} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, logradouro: args.Value}})} />
                                    <TextBox Label='Número' TextTransform='UpperCase' Text={this.state.entrega.numero} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, numero: args.Value}})} />
                                    <TextBox Label='Bairro' TextTransform='UpperCase' Text={this.state.entrega.bairro} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, bairro: args.Value}})} />
                                    <DropDownList Label='Estado' SelectedValue={this.state.entrega.estadoId} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, estadoId: args.Value}})}>
                                        <DropDownListItem Label='[Selecione]' Value={null} />
                                        {
                                            Estados.map((args) => <DropDownListItem Label={args.nome} Value={args.id} />)
                                        }
                                    </DropDownList>
                                    <AutoComplete Label='Municipio' Pesquisa={async(Text: string) => await Search.Municipio(Text, this.state.entrega.estadoId)} Text={(Item: any) => `${Item.nome}` } Value={this.state.entrega.municipio} OnChange={(args: EventArgs) => this.setState({entrega: {...this.state.entrega, municipio: args}})}>
                                        <MunicipioTemplate />
                                    </AutoComplete>
                                </>
                            </TabItem>
                        </Tab>
                        
                    </Grid>

                </Form>
            </Modal>
        );

    }

}