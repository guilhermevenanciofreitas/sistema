import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewOrderBase extends ViewModal<Readonly<{Title: string}>> {

    state = {
        open: false,
        id: '',
        number: '',
        value: '0.00',
        costumer: null,
        company: null,
        seller: null,
        status: null,
        createdAt: '',

        items: [],
        receivies: [],

        shippingType: null,
        shippingCompany: null,
        shippingAddress: {
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            estadoId: '',
            bairro: '',
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

            if (this.state.status != null) {
                await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: <>Venda com status {_.get(this.state.status, 'descricao')}<br />Não e possível editar!</>, buttons: [{ Text: "OK" }]});
                return;
            }

            if (this.state.costumer == null) {
                await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: "Informe o cliente para venda!", buttons: [{ Text: "OK" }]});
                return;
            }

            Loading.Show();

            let items = [];
            let receivies = [];

            for (const saleOrderItem of this.state.items || []) {
                items.push({
                    id: _.get(saleOrderItem, 'id') || null,
                    productId: _.get(saleOrderItem, 'product.id') || null,
                    quantity: _.get(saleOrderItem, 'quantity') || null,
                    value: _.get(saleOrderItem, 'value') || null,
                    discount: _.get(saleOrderItem, 'discount') || null,
                });
            }

            for (const receivie of this.state.receivies || []) {
                receivies.push({
                    id: _.get(receivie, 'id') || null,
                    receivieFormId: _.get(receivie, 'receivieForm.id') || null,
                    dueDate: _.get(receivie, 'dueDate') || null,
                    value: _.get(receivie, 'value') || null,
                });
            }

            const request = {
                id: _.get(this.state, 'id') || null,
                number: _.get(this.state, 'number') || null,
                costumerId: _.get(this.state.costumer, 'id') || null,
                companyId: _.get(this.state.company, 'id') || null,
                sellerId: _.get(this.state.seller, 'id') || null,
              
                items,
                receivies,

                shippingTypeId: _.get(this.state.shippingType, 'id') || null,
                shippingCompanyId: _.get(this.state.shippingCompany, 'id') || null,
                shippingAddress: _.get(this.state, 'shippingAddress') || null,
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
            id: '',
            number: '',
            value: '0.00',
            costumer: null,
            company: null,
            seller: null,
            
            status: null,
            createdAt: '',

            items: [],
            receivies: [],

            shippingType: null,
            shippingCompany: null,
            shippingAddress: {
                cep: '',
                logradouro: '',
                numero: '',
                complemento: '',
                estadoId: '',
                bairro: '',
                municipio: null,
            },
        });
    }

}