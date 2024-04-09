import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewOrderBase extends ViewModal<Readonly<{Title: string}>> {

    state = {
        open: false,
        id: "",
        number: "",
        costumer: null,
        company: null,
        seller: null,
        tipoEntrega: null,
        status: null,
        createdAt: '',
        itens: [],
        pagamentos: [],

        entregador: null,
        entrega: {
            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            estadoId: "",
            bairro: "",
            municipio: null,
        },
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("sales/order/findOne", {id});
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

            if (this.state.costumer == null) {
                await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: "Informe o cliente para venda!", buttons: [{ Text: "OK" }]});
                return;
            }

            Loading.Show();

            const request = {
                ...this.state,
                costumerId: _.get(this.state.costumer, 'id') || null,
                companyId: _.get(this.state.company, 'id') || null,
                sellerId: _.get(this.state.seller, 'id') || null,
                entregadorId: _.get(this.state.entregador, 'id') || null,
            }

            let r = await Service.Post("sales/order/save", request);
    
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
            id: "",
            number: "",
            costumer: null,
            company: null,
            seller: null,
            status: null,
            tipoEntrega: null,
            createdAt: '',
            itens: [],
            pagamentos: [],
            entregador: null,
            entrega: {},
        });
    }

}