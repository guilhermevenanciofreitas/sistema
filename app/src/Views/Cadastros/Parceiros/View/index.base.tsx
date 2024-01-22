import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewParceiroBase extends ViewModal<Readonly<{Title: string, Tipo: string}>> {

    state = {
        open: false,
        tipo: "",
        cpfCnpj: "",
        nome: "",
        apelido: "",
        isCliente: false,
        isFornecedor: false,
        isTransportadora: false,
        isFuncionario: false
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("usuario/findOne", {id});
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

            let r = await Service.Post("usuario/save", this.state);
    
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
        this.setState({id: "", nome: "", isCliente: this.props.Tipo == "Cliente"});
    }

}