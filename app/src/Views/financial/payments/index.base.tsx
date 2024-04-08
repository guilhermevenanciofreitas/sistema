import React from "react";
import { Service } from "../../../Service";
import { ViewPayment } from "./View/index";
import { ViewFiltro } from "./filtro";
import { BaseIndex } from "../../../Utils/Base";
import { MessageBox } from "../../../Utils/Controls";
import { ViewImportar } from "./importar";
import { DisplayError } from "../../../Utils/DisplayError";
import queryString from "query-string";

export default class BaseContasPagar extends BaseIndex {
 
    protected ViewPayment = React.createRef<ViewPayment>();

    protected ViewImportar = React.createRef<ViewImportar>();
    protected ViewFiltro = React.createRef<ViewFiltro>();

    state = {
        Loading: true,
        Selecteds: [],

        status: null,

        request: {
            offset: 1,
            limit: 100,
            filter: undefined,
            sort: undefined
        },
        response: {
            rows: [],
            count: 0
        },

        Data: {
            status: {},
            rows: [],
            count: 0,
            offset: 1,
            limit: 100,
            filter: undefined,
            sort: undefined
        },
    }

    componentDidMount = async () =>
    {
        try
        {

            if (this.Finish) return;

            const { id } = queryString.parse(window.location.search);
            if (id) {
                await this.OpenUsuario(id.toString());
            }

            await this.Pesquisar(this.state.Data);

            this.componentDidMountFinish();

        } catch (err: any) {
            await DisplayError.Show(err);
        }
    }

    protected BtnEdit_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.OpenUsuario(id);

            if (r) this.Pesquisar(this.state.Data);
       
        } 
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnNovo_Click = async (): Promise<void> =>
    {
        try
        {

            const r = await this.ViewPayment.current?.Show(undefined);

            if (r) this.Pesquisar(this.state.Data);
            
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnDelete_Click = async(): Promise<void> =>
    {
        try
        {
            const result = await MessageBox.Show({title: "Confirmar", width: 420, type: "Question", content: `Tem certeza que deseja excluir ${this.state.Selecteds.length} usuário(s) ?`,
                buttons: [
                    { Text: "Sim", OnClick: () => "yes" },
                    { Text: "Não", OnClick: () => "no" }
                ]
            });

            if (result != "yes") return;

            await MessageBox.Show({title: "Info", width: 420, type: "Success", content: `${this.state.Selecteds.length} usuário(s) excluido com sucesso!`,
                buttons: [
                    { Text: "Ok" }
                ]
            });

        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnImportar_Click = async() =>
    {
        try
        {
            const data = await this.ViewImportar.current?.Show(this.state.Data.filter);

            if (data === null) return;

            this.setState((state: any) => ({Data: {...state.Data, offset: 1}}),
                () => this.Pesquisar(this.state.Data)
            );
    
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnFiltro_Click = async() =>
    {
        try
        {
            const filter = await this.ViewFiltro.current?.Show(this.state.Data.filter);

            if (filter === null) return;

            this.setState((state: any) => ({Data: {...state.Data, offset: 1, filter}}),
                () => this.Pesquisar(this.state.Data)
            );
    
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected CardStatus_Click = async(status: string): Promise<void> =>
    {
        try
        {
            await this.Pesquisar(this.state.Data, status);
            this.setState({status});
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }
    
    protected BtnPesquisar_Click = async(): Promise<void> =>
    {
        try
        {
            await this.Pesquisar(this.state.Data);
            this.setState({status: null});
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected ListView_PageChange = async(limit?: number, offset?: number) =>
    {
        try
        {
            this.setState((state: any) => ({Data: {...state.Data, limit, offset}}),
                () => this.Pesquisar(this.state.Data)
            );
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected ListView_Sort = async(sort?: any) =>
    {
        try
        {
            this.setState((state: any) => ({Data: {...state.Data, sort}}),
                () => this.Pesquisar(this.state.Data)
            );
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    private OpenUsuario = async (id: string) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?id=${id}`);
        const r = await this.ViewPayment.current?.Show(id);
        history.back();
        return r;
    }

    protected Pesquisar = async(Data: any, status?: string): Promise<void> =>
    {
        this.setState({Loading: true});
        var r = await Service.Post("financial/payment/findAll", {...Data, status});
        this.setState({Loading: false, Data: r?.data});
    }

}