import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewContaPagarBase extends ViewModal<Readonly<{Title: string}>> {

    state = {
        open: false,
        id: "",
        company: null,
        numeroDocumento: "",
        emissao: "",
        vencimento: "",
        recebedor: null,
        ourNumber: "",
        bankAccount: null,
        formOfPayment: null,
        valor: "0.00",
        juros: "0.00",
        multa: "0.00",
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("financial/payment/findOne", {id});
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

            let r = await Service.Post("financial/payment/save", this.state);
    
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
            company: JSON.parse(localStorage.getItem("Session") || "null")?.empresa,
            numeroDocumento: "",
            emissao: "",
            vencimento: "",
            bankAccount: null,
            recebedor: null,
            ourNumber: "null",
            formOfPayment: null,
            valor: "0.00",
            juros: "0.00",
            multa: "0.00",
        });
    }

}