import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import React from "react";

export class ViewProductBase extends React.Component<Readonly<{Title: string}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        name: '',
        plate: '',
    }

    public New = async (vehicle: any): Promise<any> =>
    {
    
        this.Limpar();

        this.setState({...vehicle})

        return await this.ViewModal.current?.Show();
    
    }

    public Edit = async (id?: string): Promise<any> =>
    {
        
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("registrations/vehicle/findOne", {id});
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
                name: _.get(this.state, 'name') || null,
                plate: _.get(this.state, 'plate') || null,
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
            plate: '',
        });
    }

}