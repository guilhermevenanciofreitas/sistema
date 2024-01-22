
import { ViewParceiroBase } from './index.base';
import { Button, CheckBox, Form, Modal, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';

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
                            <TextBox Label='CPF' TextTransform='UpperCase' Text={this.state.cpfCnpj} OnChange={(args: EventArgs) => this.setState({cpfCnpj: args.Value})} />
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.nome} OnChange={(args: EventArgs) => this.setState({nome: args.Value})} />
                        </Grid>
                        <Grid md={5}>
                            <TextBox Label='Apelido' TextTransform='UpperCase' Text={this.state.apelido} OnChange={(args: EventArgs) => this.setState({apelido: args.Value})} />
                        </Grid>
                        <Grid md={8}>
                            <div style={{display: 'flex'}}>
                                <CheckBox Label='Cliente' Checked={this.state.isCliente} OnChange={(args: EventArgs) => this.setState({isCliente: args.Value})} />
                                <CheckBox Label='Fornecedor' Checked={this.state.isFornecedor} OnChange={(args: EventArgs) => this.setState({isFornecedor: args.Value})} />
                                <CheckBox Label='Transportadora' Checked={this.state.isTransportadora} OnChange={(args: EventArgs) => this.setState({isTransportadora: args.Value})} />
                                <CheckBox Label='Funcionario' Checked={this.state.isFuncionario} OnChange={(args: EventArgs) => this.setState({isFuncionario: args.Value})} />
                            </div>
                        </Grid>
                    </Grid>

                </Form>
            </Modal>
        );

    }

}