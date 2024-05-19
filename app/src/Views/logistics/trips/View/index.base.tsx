import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import React from "react";

export class ViewTripBase extends React.Component<Readonly<{Title: string}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        number: '',
        company: null,
        type: null,
        date: '',
        status: null,
        driver: null,
        vehicle: null,
        vehicles: [],
        shippingOrders: [],
        ctes: []
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("logistic/trip/findOne", {id});
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
            let ctes = [];
            let shippingOrders = [];

            for (let tripVehicle of _.get(this.state, 'vehicles') || []) {
                vehicles.push({
                    id: _.get(tripVehicle, 'id'),
                    vehicleId: _.get(tripVehicle, 'vehicle.id'),
                });
            }

            for (let tripShippingOrder of _.get(this.state, 'shippingOrders') || []) {
                shippingOrders.push({
                    id: _.get(tripShippingOrder, 'id'),
                    shippingOrderId: _.get(tripShippingOrder, 'shippingOrder.id'),
                });
            }

            for (let tripCte of _.get(this.state, 'ctes') || []) {
                ctes.push({
                    id: _.get(tripCte, 'id'),
                    cte: _.get(tripCte, 'cte'),
                });
            }

            const request = {
                id: _.get(this.state, 'id') || null,
                number: _.get(this.state, 'number') || null,
                companyId: _.get(this.state, 'company.id') || null,
                type: _.get(this.state, 'type') || null,
                driverId: _.get(this.state, 'driver.id') || null,
                vehicleId: _.get(this.state, 'vehicle.id') || null,
                vehicles,
                shippingOrders,
                ctes
            }


            let response = await Service.Post("logistic/trip/save", request);
    
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
            type: null,
            value: null,
            sender: null,
            recipient: null,
            driver: null,
            vehicle: null,
            weight: null,
            vehicles: [],
            shippingOrders: [],
            ctes: []
        });
    }

}