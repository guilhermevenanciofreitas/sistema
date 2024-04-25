import React, { ReactNode } from "react";
import { Button, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";

const Columns = [
    { selector: (row: any) => row.cep, name: 'CEP' },
    { selector: (row: any) => row.logradouro, name: 'Logradouro' },
    { selector: (row: any) => row.numero, name: 'Número' },
];

class ViewAddress extends ViewModal {

    public Close = (address: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
    }

    public Show = async (address?: any): Promise<any> =>
    {

        this.setState({open: true, ...address});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Contato' Width={400} Close={this.Close}>
                <TextBox Label='CEP' TextTransform='UpperCase' Text={this.state.cep} OnChange={(args: EventArgs) => this.setState({cep: args.Value})} />
                <TextBox Label='Logradouro' TextTransform='UpperCase' Text={this.state.logradouro} OnChange={(args: EventArgs) => this.setState({logradouro: args.Value})} />
                <TextBox Label='Número' TextTransform='LowerCase' Text={this.state.numero} OnChange={(args: EventArgs) => this.setState({numero: args.Value})} />
                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
            </Modal>
        );
    }

}

export class Address extends BaseDetails<Readonly<{address: any[], OnChange?: Function | any}>> {

    protected ViewAddress= React.createRef<ViewAddress>();

    protected BtnAdicionar_Click = async () => {

        const address: any = await this.ViewAddress.current?.Show({
            id: "",
            cep: "",
            logradouro: "",
            numero: ""
        });

        if (address == null) return;

        this.props.address.push({...address});
        this.props.OnChange(this.props.address);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const endereco = await this.ViewAddress.current?.Show({...args});
        if (endereco == null) return;
        args.cep = endereco.cep;
        args.logradouro = endereco.logradouro;
        args.numero = endereco.numero;
        this.props.OnChange(this.props.address);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.address));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.address));

    render(): ReactNode {
        return (
            <>
                <ViewAddress ref={this.ViewAddress} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.address} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}