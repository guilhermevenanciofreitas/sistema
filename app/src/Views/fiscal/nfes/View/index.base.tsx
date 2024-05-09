import { Service } from "../../../../Service";
import { ViewModal, MessageBox } from "../../../../Utils/Controls";
import { DisplayError } from "../../../../Utils/DisplayError";
import { Loading } from "../../../../Utils/Loading";

export class ViewNotaFiscalBase extends ViewModal<Readonly<{Title: string}>> {

    state = {
        open: false,
        id: "",
        NFe: null,
        protNFe: null,
    }

    public Show = async (id?: string): Promise<any> =>
    {
 
        this.Limpar();

        if (id) {
            Loading.Show();
            const r = await Service.Post("nfe/findOne", {id});
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

            let r = await Service.Post("nfe/save", this.state);
    
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

    protected BtnXml_Click = async (event: any) =>
    {

        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
        
        const response = await Service.Post("nfe/xml", formData, 'multipart/form-data');

        this.setState({...response?.data});

    }

    private Limpar = () =>
    {
        this.setState({
            id: '',
            NFe: null,
            protNFe: null,
        });
    }

}