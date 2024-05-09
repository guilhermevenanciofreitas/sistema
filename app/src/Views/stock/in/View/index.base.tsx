import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewStockInBase extends ViewModal<Readonly<{Title: string}>> {

    state = {
        open: false,
        id: '',
        nfe: null,
        status: 'pending',
        products: []
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post('stock/in/findOne', {id});
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

            let products = [];

            for (const product of this.state.products || []) {
                products.push({
                    id: _.get(product, 'id') || null,
                    stockLocationId: _.get(product, 'stockLocation.id') || null,
                    productId: _.get(product, 'product.id') || null,
                    quantity: _.get(product, 'quantity') || null,
                    value: _.get(product, 'value') || null,
                    discount: _.get(product, 'discount') || null,
                    prod: _.get(product, 'prod') || null,
                });
            }

            const request = {
                id: _.get(this.state, 'id') || null,
                nfeId: _.get(this.state, 'nfe.id') || null,
                products,
            }

            Loading.Show();
            let r = await Service.Post('stock/in/save', request);
            Loading.Hide();
    
            if (r?.status == 201) {
                await MessageBox.Show({title: 'Info', width: 400, content: r?.data.message, buttons: [{ Text: 'OK' }]});
                return;
            }
    
            await MessageBox.Show({title: 'Info', width: 400, type: 'Success', content: 'Salvo com sucesso!', buttons: [{ Text: 'OK' }]});
    
            this.Close(r?.data.id);

        }
        catch(err: any)
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnCheckIn_Click = async () => {
        try
        {

            for (const product of this.state.products || []) {
                
                if (!_.get(product, 'product.id')) {
                    await MessageBox.Show({title: 'Info', width: 400, type: 'Warning', content: `Item ${_.get(product, 'product.name')} sem vincular!`, buttons: [{ Text: 'OK' }]});
                    return;
                }

                if (!_.get(product, 'stockLocation.id')) {
                    await MessageBox.Show({title: 'Info', width: 400, type: 'Warning', content: `Item ${_.get(product, 'product.name')} sem localização!`, buttons: [{ Text: 'OK' }]});
                    return;
                }

            }

            const request = {
                id: _.get(this.state, 'id') || null
            }

            Loading.Show();
            let r = await Service.Post('stock/in/check-in', request);
            Loading.Hide();

            await MessageBox.Show({title: 'Info', width: 400, type: 'Success', content: 'Confirmado com sucesso!', buttons: [{ Text: 'OK' }]});

            this.Close(request.id);

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
            nfe: null,
            status: 'pending',
            products: []
        });
    }

}