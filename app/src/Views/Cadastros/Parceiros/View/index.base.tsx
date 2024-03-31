import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewParceiroBase extends ViewModal<Readonly<{Title: string, Tipo: string}>> {

    state = {
        open: false,
        tipo: "CPF",
        cpfCnpj: "",
        nome: "",
        apelido: "",
        isCliente: false,
        isFornecedor: false,
        isTransportadora: false,
        isFuncionario: false,
        nascimento: null,
        sexo: null,
        estadoCivil: "",
        rg: "",
        ie: "",
        im: "",
        escolaridade: null,
        profissao: "",
        tabelaPreco: null,
        isAtivo: true,
        isBloquearVenda: true,
        isBloquearCompra: true,
        contatos: [],
        enderecos: []
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("cliente/findOne", {id});
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

            let r = await Service.Post("cliente/save", this.state);
    
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
            tipo: "CPF",
            cpfCnpj: "",
            nome: "",
            apelido: "",
            isCliente: this.props.Tipo == "Cliente",
            isFornecedor: this.props.Tipo == "Fornecedor",
            isTransportadora: this.props.Tipo == "Transportadora",
            isFuncionario: this.props.Tipo == "Funcionario",
            nascimento: null,
            sexo: null,
            estadoCivil: null,
            rg: "",
            ie: "",
            im: "",
            escolaridade: null,
            profissao: "",
            tabelaPreco: null,
            isAtivo: true,
            isBloquearVenda: false,
            isBloquearCompra: false,
            contatos: [],
            enderecos: []
        });
    }

}