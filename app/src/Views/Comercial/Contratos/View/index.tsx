
import { ViewContratoBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, Modal, Tab, TabItem, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { ClienteTemplate } from '../../../../Search/Templates/Cliente';

export class ViewContrato extends ViewContratoBase {

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
                        <Grid md={3}>
                            <DropDownList Label='Prazo' SelectedValue={this.state.prazo} OnChange={(args: EventArgs) => this.setState({prazo: args.Value})}>
                                <DropDownListItem Label='[Selecione]' Value={null} />
                                <DropDownListItem Label='6 meses' Value={1} />
                                <DropDownListItem Label='12 meses' Value={2} />
                            </DropDownList>
                        </Grid>
                        <Grid md={2}>
                            <DatePicker Label='Inicio' Text={this.state.inicio} OnChange={(args: EventArgs) => this.setState({inicio: args.Value})} />
                        </Grid>
                        <Grid md={2}>
                            <DatePicker Label='Termino' Text={this.state.termino} OnChange={(args: EventArgs) => this.setState({termino: args.Value})} />
                        </Grid>

                        <Tab>
                            <TabItem Title='Serviços' Visible={true}>
                                <></>
                            </TabItem>
                            <TabItem Title='Itens' Visible={true}>
                                <></>
                            </TabItem>
                            <TabItem Title='Arquivos' Visible={true}>
                                <></>
                            </TabItem>
                        </Tab>
                        
                    </Grid>

                </Form>
            </Modal>
        );

    }

}