import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { Loading } from "../../../../Utils/Loading";

export class ViewUsuarioBase extends ViewModal {

    state = {
        open: false,
        id: "",
        nome: "",
        email: "",
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

    protected BtnLimpar_Click = () =>
    {
        this.Limpar();
    }

    protected BtnSalvar_Click = async () =>
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

    private Limpar = () =>
    {
        this.setState({id: "", nome: "", email: ""});
    }

}