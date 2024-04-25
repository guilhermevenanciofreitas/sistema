import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewPartnerBase extends ViewModal<Readonly<{Title: string, Type: "customer" | "supplier" | "shipping-company" | "employee"}>> {

    state = {
        open: false,
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
        isBlockSale: true,
        isBloquearCompra: true,

        contacts: [],
        address: []
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post(`registrations/${this.props.Type}/findOne`, {id});
            Loading.Hide();
            this.setState(r?.data);
        }

        this.setState({open: true});

        return this.Initialize(this.Close);
 
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

            let r = await Service.Post(`registrations/${this.props.Type}/save`, this.state);
    
            Loading.Hide();
    
            if (r?.status == 201) {
                await MessageBox.Show({title: "Info", width: 400, content: r?.data.message, buttons: [{ Text: "OK" }]});
                return;
            }
    
            await MessageBox.Show({title: "Info", width: 400, type: "Success", content: "Salvo com sucesso!", buttons: [{ Text: "OK" }]});
    
            this.Close(r?.data.id);

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
            isBlockSale: true,
            isBloquearCompra: true,

            contacts: [],
            address: []
        });
    }

}