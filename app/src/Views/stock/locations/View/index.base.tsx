import React from "react";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewLocationBase extends React.Component<Readonly<{Title: string}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        name: '',
        description: '',
    }

    public New = async (stockLocation: any): Promise<any> =>
    {

        this.Limpar();

        this.setState({...stockLocation});

        return await this.ViewModal.current?.Show();

    }

    public Edit = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post('stock/location/findOne', {id});
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

            let r = await Service.Post('stock/location/save', this.state);
    
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

    private Limpar = () =>
    {
        this.setState({
            id: '',
            name: '',
            description: ''
        });
    }

}