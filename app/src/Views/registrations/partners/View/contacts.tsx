import React, { ReactNode } from "react";
import { Button, GridView, ViewModal, TextBox } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Divider } from "@mui/joy";

const Columns = [
    { selector: (row: any) => row.name, name: 'Nome' },
    { selector: (row: any) => row.phone, name: 'Telefone' },
    { selector: (row: any) => row.email, name: 'Email' },
];

class ViewContact extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: "",
        name: "",
        phone: "",
        email: ""
    }

    public Show = async (contact?: any): Promise<any> =>
    {

        this.setState({...contact});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='Contato' Width={400}>
                <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                <TextBox Label='Telefone' TextTransform='UpperCase' Text={this.state.phone} OnChange={(args: EventArgs) => this.setState({phone: args.Value})} />
                <TextBox Label='Email' TextTransform='LowerCase' Text={this.state.email} OnChange={(args: EventArgs) => this.setState({email: args.Value})} />
                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
            </ViewModal>
        );
    }

}

export class Contacts extends BaseDetails<Readonly<{contacts: any[], OnChange?: Function | any}>> {

    protected ViewContact = React.createRef<ViewContact>();

    protected BtnAdicionar_Click = async () => {

        const contact: any = await this.ViewContact.current?.Show({
            id: "",
            name: "",
            phone: "",
            email: ""
        });

        if (contact == null) return;

        this.props.contacts.push({...contact});
        this.props.OnChange(this.props.contacts);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const contact = await this.ViewContact.current?.Show({...args});
        if (contact == null) return;
        args.name = contact.name;
        args.phone = contact.phone;
        args.email = contact.email;
        this.props.OnChange(this.props.contacts);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.contacts));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.contacts));

    render(): ReactNode {
        return (
            <>
                <ViewContact ref={this.ViewContact} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.contacts} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}