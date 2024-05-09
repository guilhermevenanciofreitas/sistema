import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import React from "react";

export class ViewFreightCalculationBase extends React.Component<Readonly<{Title: string}>> {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        calculating: false,
        id: '',
        company: null,
        type: null,
        weight: null,
        sender: null,
        senderMesoRegion: null,
        recipient: null,
        recipientMesoRegion: null,
        value: '0.00',
        aliquotICMS: '0.00',
        valueICMS: '0.00'
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("logistic/freight-quote/findOne", {id});
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
            
            console.log(this.state.weight);

            const request = {
                id: this.state.id,
                companyId: _.get(this.state.company, 'id') || null,
                typeId: _.get(this.state.type, 'id') || null,
                weight: this.state.weight || null,
                senderId: _.get(this.state.sender, 'id') || null,
                senderMesoRegionId: _.get(this.state.senderMesoRegion, 'id') || null,
                recipientId: _.get(this.state.recipient, 'id') || null,
                recipientMesoRegionId: _.get(this.state.recipientMesoRegion, 'id') || null,
                value: this.state.value,
                aliquotICMS: this.state.aliquotICMS,
                valueICMS: this.state.valueICMS,
            }

            let r = await Service.Post("logistic/freight-quote/save", request);
    
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

    protected Calculation = async () =>
    {

        const request = {
            typeId: _.get(this.state.type, 'id'),
            senderMesoRegionId: _.get(this.state.senderMesoRegion, 'id'),
            recipientMesoRegionId: _.get(this.state.recipientMesoRegion, 'id'),
            weight: this.state.weight
        };

        if (_.isEmpty(request.typeId) || _.isEmpty(request.senderMesoRegionId) || _.isEmpty(request.recipientMesoRegionId) || _.isEmpty(request.weight)) {
            return;
        }

        this.setState({calculating: true});
        const response = await Service.Post("logistic/freight-quote/calculation", request);
        this.setState({calculating: false, value: parseFloat(response?.data.value), valueICMS: parseFloat(response?.data.valueICMS), aliquotICMS: parseFloat(response?.data.aliquotICMS)});

    }

    private Limpar = () =>
    {
        this.setState({
            id: '',
            company: null,
            type: null,
            weight: null,
            sender: null,
            senderMesoRegion: null,
            recipient: null,
            recipientMesoRegion: null,
            value: 0,
            aliquotICMS: 0,
            valueICMS: 0
        });
    }

}