
import { ViewUsuarioBase } from './index.base';
import { Button, Form, Modal, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';

export class ViewUsuario extends ViewUsuarioBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.nome != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <TextBox Label='Id' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                   
                </Form>
            </Modal>
        );

    }

}