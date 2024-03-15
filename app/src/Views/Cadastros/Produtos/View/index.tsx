
import { ViewProdutoBase } from './index.base';
import { Button, CheckBox, Form, Modal, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';

export class ViewProduto extends ViewProdutoBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.descricao != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <TextBox Label='Descrição' TextTransform='UpperCase' Text={this.state.descricao} OnChange={(args: EventArgs) => this.setState({descricao: args.Value})} />
                    
                    <Grid md={12}>
                        <div style={{display: 'flex'}}>
                            <CheckBox Label='Combinação' Checked={this.state.isCombinacao} OnChange={(args: EventArgs) => this.setState({isCombinacao: args.Value})} />
                        </div>
                    </Grid>
                        
                </Form>
            </Modal>
        );

    }

}