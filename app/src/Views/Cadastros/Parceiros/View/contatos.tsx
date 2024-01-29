import React, { ReactNode } from "react";
import { Button, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";

const Columns = [
    { selector: (row: any) => row.nome, name: 'Nome' },
    { selector: (row: any) => row.telefone, name: 'Telefone' },
    { selector: (row: any) => row.email, name: 'Email' },
];

class ViewContato extends ViewModal {

    public Close = (contato: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        nome: "",
        telefone: "",
        email: ""
    }

    public Show = async (contato?: any): Promise<any> =>
    {

        this.setState({open: true, ...contato});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Contato' Width={400} Close={this.Close}>
                <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.nome} OnChange={(args: EventArgs) => this.setState({nome: args.Value})} />
                <TextBox Label='Telefone' TextTransform='UpperCase' Text={this.state.telefone} OnChange={(args: EventArgs) => this.setState({telefone: args.Value})} />
                <TextBox Label='Email' TextTransform='LowerCase' Text={this.state.email} OnChange={(args: EventArgs) => this.setState({email: args.Value})} />
                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
            </Modal>
        );
    }

}

export class Contatos extends BaseDetails<Readonly<{Contatos: any[], OnChange?: Function | any}>> {

    protected ViewContato = React.createRef<ViewContato>();

    protected BtnAdicionar_Click = async () => {

        const contato: any = await this.ViewContato.current?.Show({
            id: "",
            nome: "",
            telefone: "",
            email: ""
        });

        if (contato == null) return;

        this.props.Contatos.push({...contato});
        this.props.OnChange(this.props.Contatos);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const contato = await this.ViewContato.current?.Show({...args});
        if (contato == null) return;
        args.nome = contato.nome;
        args.telefone = contato.telefone;
        args.email = contato.email;
        this.props.OnChange(this.props.Contatos);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.Contatos));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.Contatos));

    render(): ReactNode {
        return (
            <>
                <ViewContato ref={this.ViewContato} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.Contatos} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}