import _ from "lodash";
import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewContaPagarBase extends ViewModal<Readonly<{Title: string}>> {

    state = {
        open: false,
        id: "",
        company: null,
        number: "",
        numeroDocumento: "",
        emissao: "",
        vencimento: "",
        receiver: null,
        ourNumber: "",
        bankAccount: null,
        paymentForm: null,
        beneficiaryNotice: "",
        valor: null,
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

            const request = {
                ...this.state,
                companyId: _.get(this.state.company, 'id') || null,
                bankAccountId: _.get(this.state.bankAccount, 'id') || null,
                paymentFormId: _.get(this.state.paymentForm, 'id') || null,
            }

            let r = await Service.Post("financial/payment/save", request);
    
            Loading.Hide();
    
            if (r?.status == 201) {
                await MessageBox.Show({title: "Info", width: 400, content: r?.data.message, buttons: [{ Text: "OK" }]});
                return;
            }
    
            await MessageBox.Show({title: "Info", width: 400, type: "Success", content: "Salvo com sucesso!", buttons: [{ Text: "OK" }]});
    
            this.Close(r?.data.id);

        }
        catch(err: any)
        {
            await DisplayError.Show(err);
        }
    }

    private Limpar = () =>
    {
        this.setState({
            id: "",
            company: null,
            number: "",
            numeroDocumento: "",
            emissao: "",
            vencimento: "",
            bankAccount: null,
            receiver: null,
            ourNumber: "",
            paymentForm: null,
            beneficiaryNotice: "",
            valor: null,
            juros: null,
            multa: null,
            data: null
        });
    }

}