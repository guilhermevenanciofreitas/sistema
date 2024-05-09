import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewProductBase extends ViewModal<Readonly<{Title: string}>> {

    state = {
        open: false,
        id: '',
        name: '',
        description: '',
        category: null,
        isCombination: false,

        cost: null,
        markup: null,
        value: null,
        stockBalance: null,
        stockMin: null,
        stockMax: null,

        combinations: [],
        suppliers: []
    }

    //public New = async (product: any) =>
    //{
    //    this.setState({open: true, ...product});
    //    return this.Initialize(this.Close);
    //}

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("registrations/product/findOne", {id});
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

            let combinations = [];
            let suppliers = [];

            for (let combination of _.get(this.state, 'combinations')) {
                combinations.push({
                    id: _.get(combination, 'id'),
                    isObrigatorio: _.get(combination, 'isObrigatorio'),
                    minimo: _.get(combination, 'minimo'),
                    maximo: _.get(combination, 'maximo'),
                    combinationGroupId: _.get(combination, 'combinationGroup.id'),
                });
            }

            for (let supplier of _.get(this.state, 'suppliers')) {
                suppliers.push({
                    id: _.get(supplier, 'id'),
                    supplierId: _.get(supplier, 'supplier.id'),
                });
            }

            const request = {
                id: _.get(this.state, 'id') || null,
                name: _.get(this.state, 'name') || null,
                categoryId: _.get(this.state, 'category.id') || null,
                description: _.get(this.state, 'description') || null,
                isCombination: _.get(this.state, 'isCombination') || null,
                cost: _.get(this.state, 'cost') || null,
                markup: _.get(this.state, 'markup') || null,
                value: _.get(this.state, 'value') || null,
                stockMin: _.get(this.state, 'stockMin') || null,
                stockMax: _.get(this.state, 'stockMax') || null,
                combinations,
                suppliers
            }
            
            let response = await Service.Post("registrations/product/save", request);
    
            Loading.Hide();
    
            if (response?.status == 201) {
                await MessageBox.Show({title: "Info", width: 400, content: response?.data.message, buttons: [{ Text: "OK" }]});
                return;
            }
    
            await MessageBox.Show({title: "Info", width: 400, type: "Success", content: "Salvo com sucesso!", buttons: [{ Text: "OK" }]});
    
            this.Close(response?.data.id);

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
            name: '',
            description: '',
            category: null,
            isCombination: false,

            cost: null,
            markup: null,
            value: null,
            stockBalance: null,
            stockMin: null,
            stockMax: null,

            combinations: [],
            suppliers: []
        });
    }

}