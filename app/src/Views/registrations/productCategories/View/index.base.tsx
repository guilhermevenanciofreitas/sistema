import React from "react";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import _ from "lodash";

export class ViewProductCategoryBase extends React.Component<Readonly<{Title: string}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        description: ''
    }

    public New = async (productCategory: any) =>
    {
        
        this.Limpar();

        this.setState({...productCategory});

        return await this.ViewModal.current?.Show();

    }
    
    public Edit = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("registrations/product-category/findOne", {id});
            Loading.Hide();
            this.setState(r?.data);
        }

        return await this.ViewModal.current?.Show();
 
    }

    protected BtnSalvar_Click = async () =>
    {
        try
        {

            const request = {
                id: _.get(this.state, 'id') || null,
                description: _.get(this.state, 'description') || null
            }

            Loading.Show();
            let r = await Service.Post("registrations/product-category/save", request);
            Loading.Hide();
    
            if (r?.status == 201) {
                await MessageBox.Show({title: "Info", width: 400, content: r?.data.message, buttons: [{ Text: "OK" }]});
                return;
            }
    
            await MessageBox.Show({title: "Info", width: 400, type: "Success", content: "Salvo com sucesso!", buttons: [{ Text: "OK" }]});
    
            this.ViewModal.current?.Close(r?.data);

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
            description: ''
        });
    }

}