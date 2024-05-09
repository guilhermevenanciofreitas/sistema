
import { ViewLocationBase } from './index.base';
import { Button, Form, ViewModal, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';

export class ViewLocation extends ViewLocationBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1000}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.name != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <TextBox Label='Id' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                    <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                    <TextBox Label='Descrição' TextTransform='LowerCase' Text={this.state.description} OnChange={(args: EventArgs) => this.setState({description: args.Value})} />

                </Form>
            </ViewModal>
        );

    }

}