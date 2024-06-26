import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import React from "react";

export class ViewStockInBase extends React.Component<Readonly<{Title: string}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        nfe: null,
        supplier: null,
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

    protected TxtNfe_Change = async (nfe: any) =>
    {
        try
        {
            var products: any[] = [];

            if (nfe == null) {
                this.setState({nfe: null, supplier: null, products: []});
                return;
            }

            if (_.isArray(nfe?.NFe?.infNFe?.det)) {
                for(const det of nfe?.NFe?.infNFe?.det || []) {
                    const product = _.filter(nfe.emit?.products, (c) => c.code == det?.prod?.cProd);
                    products.push({product: product[0]?.product, quantity: det?.prod?.qCom, value: det?.prod?.vUnCom, measurementUnit: product[0]?.measurementUnit, contain: product[0]?.contain || '1.000', prod: det?.prod});
                }
            } else {
                const det = nfe?.NFe?.infNFe?.det;
                const product = _.filter(nfe.emit?.products, (c) => c.code == det?.prod?.cProd);
                products.push({product: product[0]?.product, quantity: det?.prod?.qCom, value: det?.prod?.vUnCom, measurementUnit: product[0]?.measurementUnit, contain: product[0]?.contain || '1.000', prod: det?.prod});
            }
            
            this.setState({nfe, supplier: nfe?.emit, products});
        
        }
        catch(err: any)
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
                    measurementUnitId: _.get(product, 'measurementUnit.id') || null,
                    contain: _.get(product, 'contain') || null,
                    prod: _.get(product, 'prod') || null,
                });
            }

            const request = {
                id: _.get(this.state, 'id') || null,
                nfeId: _.get(this.state, 'nfe.id') || null,
                supplierId: _.get(this.state, 'supplier.id') || null,
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
    
            this.ViewModal.current?.Close(r?.data);

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
                    await MessageBox.Show({title: 'Info', width: 400, type: 'Warning', content: `Item ${_.get(product, 'prod.xProd')} sem vincular!`, buttons: [{ Text: 'OK' }]});
                    return;
                }

                if (!_.get(product, 'quantity')) {
                    await MessageBox.Show({title: 'Info', width: 400, type: 'Warning', content: `Item ${_.get(product, 'product.name')} informe a quantidade!`, buttons: [{ Text: 'OK' }]});
                    return;
                }

                if (!_.get(product, 'value')) {
                    await MessageBox.Show({title: 'Info', width: 400, type: 'Warning', content: `Item ${_.get(product, 'product.name')} informe o valor!`, buttons: [{ Text: 'OK' }]});
                    return;
                }

                if (!_.get(product, 'stockLocation.id')) {
                    await MessageBox.Show({title: 'Info', width: 400, type: 'Warning', content: `Item ${_.get(product, 'product.name')} informe a localização!`, buttons: [{ Text: 'OK' }]});
                    return;
                }

                if (!_.get(product, 'measurementUnit.id')) {
                    await MessageBox.Show({title: 'Info', width: 400, type: 'Warning', content: `Item ${_.get(product, 'product.name')} informe a unidade de medida!`, buttons: [{ Text: 'OK' }]});
                    return;
                }

                if (!_.get(product, 'contain')) {
                    await MessageBox.Show({title: 'Info', width: 400, type: 'Warning', content: `Item ${_.get(product, 'product.name')} informe a quantidade que contém!`, buttons: [{ Text: 'OK' }]});
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

            this.ViewModal.current?.Close(request);

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
            supplier: null,
            status: 'pending',
            products: []
        });
    }

}