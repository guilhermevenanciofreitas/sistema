import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import React from "react";

export class ViewPartnerBase extends React.Component<Readonly<{Title: string, Type: "customer" | "supplier" | "shipping-company" | "employee"}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
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
        maritalStatus: '',
        rg: '',
        ie: '',
        im: '',
        legalNature: null,
        economicActivity: null,

        scholarity: null,
        profession: '',
        naturalness: '',
        nationality: '',
        
        address: null,

        isActive: true,

        isBlockSale: false,
        isBlockBuy: false,

        contacts: []
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

    protected BtnConsultarCnpj_Click = async () =>
    {
        try
        {
            
            Loading.Show();
            const r = await Service.Post(`registrations/${this.props.Type}/consult`, {cnpj: this.state.cpfCnpj.replace(/[^0-9]/g,'')});
            Loading.Hide();

            this.setState({...r?.data});

        }
        catch (err: any)
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnConsultarCep_Click = async () =>
    {
        try
        {
                
            Loading.Show();
            const r = await Service.Post(`cep/consult`, {cep: _.toString(_.get(this.state.address, 'cep')).replace(/[^0-9]/g,'')});
            Loading.Hide();

            this.setState({address: {..._.get(this.state, 'address') as any, ...r?.data}});
    
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

            const address = {
                cep: _.get(this.state, 'address.cep') || null,
                logradouro: _.get(this.state, 'address.logradouro') || null,
                number: _.get(this.state, 'address.number') || null,
                complement: _.get(this.state, 'address.complement') || null,
                neighborhood: _.get(this.state, 'address.neighborhood') || null,
                stateId: _.get(this.state, 'address.state.id') || null,
                cityId: _.get(this.state, 'address.city.id') || null,
            }

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
                maritalStatus: _.get(this.state, 'maritalStatus') || null,

                rg: _.get(this.state, 'rg') || null,
                ie: _.get(this.state, 'ie') || null,
                im: _.get(this.state, 'im') || null,

                scholarity: _.get(this.state, 'scholarity') || null,
                profession: _.get(this.state, 'profession') || null,
                naturalness: _.get(this.state, 'naturalness') || null,
                nationality: _.get(this.state, 'nationality') || null,

                address: address,

                isActive: _.get(this.state, 'isActive') || null,
                isBlockSale: _.get(this.state, 'isBlockSale') || null,
                isBlockBuy: _.get(this.state, 'isBlockBuy') || null,
            }

            let response = await Service.Post(`registrations/${this.props.Type}/save`, request);
    
            Loading.Hide();
    
            if (response?.status == 201) {
                await MessageBox.Show({title: "Info", width: 400, type: 'Warning', content: response?.data.message, buttons: [{ Text: "OK" }]});
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
            maritalStatus: '',
            rg: '',
            ie: '',
            im: '',
            legalNature: null,
            economicActivity: null,

            scholarity: null,
            profession: '',
            naturalness: '',
            nationality: '',
            
            address: null,

            isAtivo: true,

            isBlockSale: false,
            isBlockBuy: false,

            contacts: []
        });
    }

}