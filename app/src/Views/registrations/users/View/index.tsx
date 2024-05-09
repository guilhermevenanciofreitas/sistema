
import { ViewUserBase } from './index.base';
import { Button, Form, ViewModal, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';

export class ViewUser extends ViewUserBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1000}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' Enable={this.state.name != ''} />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <TextBox Label='Id' TextTransform='Normal' Text={this.state.id} OnChange={(args: EventArgs) => this.setState({id: args.Value})} />
                    <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                    <TextBox Label='Email' TextTransform='LowerCase' Text={this.state.email} OnChange={(args: EventArgs) => this.setState({email: args.Value})} />

                    {/*
                    <TextBox Label='Sobre nome' TextTransform='UpperCase' Text={this.state.SobreNome} OnChange={(args: EventArgs) => this.setState({SobreNome: args.Value})} />
                    <TextBox Label='Email' TextTransform='LowerCase' Text={this.state.Email} OnChange={(args: EventArgs) => this.setState({Email: args.Value})} />

                    <DropDownList Label='Sexo' SelectedValue={this.state.Sexo} OnChange={(args: EventArgs) => this.setState({Sexo: args.Value})}>
                        <DropDownListItem Label='[Selecione]' />
                        <DropDownListItem Label='Masculino' Value='Masculino' />
                        <DropDownListItem Label='Feminino' Value='Feminino' />
                    </DropDownList>

                    <AutoComplete Label='País' Pesquisa={Pesquisa.Country} Text={(Item: any) => `${Item.nome_pais} - (${Item.sigla})` } Value={this.state.Pais} OnChange={(args) => this.setState({Pais: args})}>
                        <CountryTemplate />
                    </AutoComplete>

                    <CheckBox Label='Ativo' Checked={this.state.Ativo} OnChange={(args: EventArgs) => this.setState({Ativo: args.Value})} />
                    */}

                </Form>
            </ViewModal>
        );

    }

}