import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import React from "react";

export class ViewPartnerBase extends React.Component<Readonly<{Title: string, Type: "customer" | "supplier" | "shipping-company" | "employee"}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        type: "CPF",
        cpfCnpj: '',
        name: '',
        surname: '',
        isCustomer: false,
        isSupplier: false,
        isShippingCompany: false,
        isEmployee: false,
        birth: null,
        sex: null,
        estadoCivil: "",
        rg: "",
        ie: "",
        im: "",
        escolaridade: null,
        profissao: "",
        tabelaPreco: null,
        isAtivo: true,

        isBlockSale: false,
        isBloquearCompra: true,

        contacts: [],
        address: []
    }

    public New = async (partner: any): Promise<any> =>
    {
    
        this.Limpar();

        this.setState({...partner});

        return await this.ViewModal.current?.Show();
    
    }

    public Edit = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post(`registrations/${this.props.Type}/findOne`, {id});
            Loading.Hide();
            this.setState(r?.data);
        }

        return await this.ViewModal.current?.Show();
 
    }

    protected BtnLimpar_Click = async () =>
    {
        try
        {
            this.Limpar();
        }
        catch (err: any)
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnSalvar_Click = async () =>
    {
        try
        {

            Loading.Show();

            const request = {
                id: _.get(this.state, 'id') || null,
                cpfCnpj: _.get(this.state, 'cpfCnpj') || null,
                name: _.get(this.state, 'name') || null,
                surname: _.get(this.state, 'surname') || null,
                isCustomer: _.get(this.state, 'isCustomer') || null,
                isSupplier: _.get(this.state, 'isSupplier') || null,
                isShippingCompany: _.get(this.state, 'isShippingCompany') || null,
                isEmployee: _.get(this.state, 'isEmployee') || null,
                birth: _.get(this.state, 'birth') || null,
                sex: _.get(this.state, 'sex') || null,
            }

            let response = await Service.Post(`registrations/${this.props.Type}/save`, request);
    
            Loading.Hide();
    
            if (response?.status == 201) {
                await MessageBox.Show({title: "Info", width: 400, content: response?.data.message, buttons: [{ Text: "OK" }]});
                return;
            }
    
            await MessageBox.Show({title: "Info", width: 400, type: "Success", content: "Salvo com sucesso!", buttons: [{ Text: "OK" }]});
    
            this.ViewModal.current?.Close(response?.data);

        }
        catch(err: any)
        {
            await DisplayError.Show(err);
        }
    }

    private Limpar = () =>
    {
        this.setState({
            id: '',
            type: "CPF",
            cpfCnpj: '',
            name: '',
            surname: '',
            isCustomer: this.props.Type == 'customer',
            isSupplier: this.props.Type == 'supplier',
            isShippingCompany: this.props.Type == 'shipping-company',
            isEmployee: this.props.Type == 'employee',
            birth: null,
            sex: null,
            estadoCivil: "",
            rg: "",
            ie: "",
            im: "",
            escolaridade: null,
            profissao: "",
            tabelaPreco: null,
            isAtivo: true,
            
            isBlockSale: false,
            isBloquearCompra: true,

            contacts: [],
            address: []
        });
    }

}