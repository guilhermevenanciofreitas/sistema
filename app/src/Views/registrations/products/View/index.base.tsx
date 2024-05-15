import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import React from "react";

export class ViewProductBase extends React.Component<Readonly<{Title?: string}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {

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

    public New = async (product: any) =>
    {
        
        this.Limpar();

        this.setState({...product});

        return await this.ViewModal.current?.Show();

    }

    public Edit = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("registrations/product/findOne", {id});
            Loading.Hide();
            this.setState({...r?.data});
        }

        return await this.ViewModal.current?.Show();

    }

    protected BtnSalvar_Click = async () =>
    {
        try
        {

            Loading.Show();

            let combinations = [];
            let suppliers = [];

            for (let combination of _.get(this.state, 'combinations')) {

                let combinationItems = [];

                for (let combinationItem of _.get(combination, 'combinationItems')) {
                    combinationItems.push({
                        name: _.get(combinationItem, 'name' || null),
                        description: _.get(combinationItem, 'description') || null,
                    });
                }

                combinations.push({
                    id: _.get(combination, 'id') || null,
                    combinationId: _.get(combination, 'combination.id') || null,
                    isRequired: _.get(combination, 'isRequired') || null,
                    min: _.get(combination, 'min') || null,
                    max: _.get(combination, 'max') || null,
                    combinationItems: combinationItems
                });
            }

            for (let supplier of _.get(this.state, 'suppliers')) {
                suppliers.push({
                    id: _.get(supplier, 'id') || null,
                    supplierId: _.get(supplier, 'supplier.id') || null,
                    measurementUnitId: _.get(supplier, 'measurementUnit.id') || null,
                    contain: _.get(supplier, 'contain') || null,
                    value: _.get(supplier, 'value') || null,
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