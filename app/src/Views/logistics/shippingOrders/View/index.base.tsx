import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import React from "react";

export class ViewShippingOrderBase extends React.Component<Readonly<{Title: string}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        number: '',
        company: null,
        date: '',
        status: null,
        value: null,
        sender: null,
        recipient: null,
        driver: null,
        vehicle: null,
        weight: null,
        vehicles: [],
        nfes: []
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("logistic/shipping-order/findOne", {id});
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

            let vehicles = [];
            let nfes = [];

            for (let vehicle of _.get(this.state, 'vehicles') || []) {
                vehicles.push({
                    id: _.get(vehicle, 'id'),
                    vehicleId: _.get(vehicle, 'vehicle.id'),
                });
            }

            for (let nfe of _.get(this.state, 'nfes') || []) {
                nfes.push({
                    id: _.get(nfe, 'id'),
                    nfeId: _.get(nfe, 'nfe.id'),
                });
            }

            const request = {
                id: _.get(this.state, 'id') || null,
                number: _.get(this.state, 'number') || null,
                companyId: _.get(this.state.company, 'id') || null,
                value: _.get(this.state, 'value') || null,
                senderId: _.get(this.state.sender, 'id') || null,
                recipientId: _.get(this.state.recipient, 'id') || null,
                driverId: _.get(this.state.driver, 'id') || null,
                vehicleId: _.get(this.state.vehicle, 'id') || null,
                weight: _.get(this.state, 'weight') || null,
                vehicles,
                nfes
            }


            let response = await Service.Post("logistic/shipping-order/save", request);
    
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
            number: '',
            company: null,
            value: null,
            sender: null,
            recipient: null,
            driver: null,
            vehicle: null,
            weight: null,
            vehicles: [],
            nfes: []
        });
    }

}