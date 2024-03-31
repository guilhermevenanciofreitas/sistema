
import { ViewConfiguracaoBase } from './index.base';
import { Button, CheckBox, Form, Modal, Tab, TabItem, TextBox, DropDownList, DropDownListItem, AutoComplete, DatePicker, GridView } from '../../Utils/Controls';
import { EventArgs } from '../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';

export class ViewConfiguracao extends ViewConfiguracaoBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1150} Close={this.Close}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.razaoSocial != ''} />
                 
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <TextBox Label={this.state.tipo} TextTransform='UpperCase' Text={this.state.cpfCnpj} Mask={this.state.tipo == 'CNPJ' ? '##.###.###/####-##' : '###.###.###-#####'} OnChange={(args: EventArgs) => {
                                this.setState({tipo: args.Value.length >= 15 ? 'CNPJ' : 'CPF', cpfCnpj: args.Value})
                            }} />
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label={this.state.tipo == 'CPF' ? 'Nome' : 'Razão social'} TextTransform='UpperCase' Text={this.state.razaoSocial} OnChange={(args: EventArgs) => this.setState({razaoSocial: args.Value})} />
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label={this.state.tipo == 'CPF' ? 'Apelido' : 'Nome fantasia'} TextTransform='UpperCase' Text={this.state.nomeFantasia} OnChange={(args: EventArgs) => this.setState({nomeFantasia: args.Value})} />
                        </Grid>
                        <Grid md={12}>
                            <Tab>
                                <TabItem Title='Principal' Visible={true}>
                                </TabItem>
                                <TabItem Title='Contatos' Visible={true}>
                                </TabItem>
                                <TabItem Title='Pedido Digital' Visible={true}>
                                    <div style={{display: 'flex'}}>
                                        <Grid md={12}>
                                            <TextBox Label='Frase' TextTransform="Normal" Text={this.state.pedidoDigital.frase} OnChange={(args: EventArgs) => this.setState({pedidoDigital: {...this.state.pedidoDigital, frase: args.Value}})} />
                                        </Grid>
                                    </div>
                                </TabItem>
                            </Tab>
                        </Grid>
                    </Grid>

                </Form>
            </Modal>
        );

    }

}