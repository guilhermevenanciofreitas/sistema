import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";
import React from "react";

export class ViewContaPagarBase extends React.Component<Readonly<{Title: string}>> {

    protected ViewModal = React.createRef<ViewModal>();
    
    state = {
        id: '',
        number: '',
        paymentForm: null,
        dueDate: '',
        scheduleDate: '',
        ourNumber: '',
        company: null,
        receiver: null,
        bankAccount: null,
        documentNumber: '',
        value: null,

        
        beneficiaryNotice: "",
        juros: null,
        multa: null,
        data: {
            //Transferência - TED
            accountType: null,
            finalityId: null,
            bankId: null,
            agency: "",
            agencyDigit: "",
            account: "",
            accountDigit: "",
            //Boleto
            digitableLine: "",
            fine: "0.00",
            interest: "0.00",
            discount: "0.00"
        }
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("financial/payment/findOne", {id});
            Loading.Hide();
            this.setState(r?.data);
        } else {
            this.setState({company: JSON.parse(localStorage.getItem("Session") || "null")?.empresa});
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
                number: _.get(this.state, 'number') || null,
                paymentFormId: _.get(this.state.paymentForm, 'id') || null,
                dueDate: _.get(this.state, 'dueDate') || null,
                scheduleDate: _.get(this.state, 'scheduleDate') || null,
                ourNumber: _.get(this.state, 'ourNumber') || null,
                companyId: _.get(this.state.company, 'id') || null,
                receiverId: _.get(this.state.receiver, 'id') || null,
                bankAccountId: _.get(this.state.bankAccount, 'id') || null,
                documentNumber: _.get(this.state, 'documentNumber') || null,
                value: _.get(this.state, 'value') || null,
            }

            let r = await Service.Post("financial/payment/save", request);
    
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
            number: '',
            paymentForm: null,
            dueDate: '',
            scheduleDate: '',
            ourNumber: '',
            company: null,
            receiver: null,
            bankAccount: null,
            documentNumber: '',
            value: null,
        });
    }

}