import React from "react";
import { Service } from "../../../Service";
import { ViewPayment } from "./View/index";
//import { ViewFiltro } from "./filtro";
import { BaseIndex } from "../../../Utils/Base";
import { MessageBox } from "../../../Utils/Controls";
//import { ViewImportar } from "./importar";
import { DisplayError } from "../../../Utils/DisplayError";
import queryString from "query-string";
import _ from "lodash";

export default class BaseContasPagar extends BaseIndex {
 
    protected ViewPayment = React.createRef<ViewPayment>();

    //protected ViewImportar = React.createRef<ViewImportar>();
    //protected ViewFiltro = React.createRef<ViewFiltro>();

    state = {
        Loading: false,
        selecteds: [],

        request: {
            status: undefined,
            offset: 1,
            limit: 100,
            filter: undefined,
            sort: undefined
        },
        response: {
            status: [],
            rows: [],
            count: 0
        },

    }

    componentDidMount = async () =>
    {
        try
        {

            if (this.Finish) return;

            const { id } = queryString.parse(window.location.search);
            if (id) {
                await this.OpenPayment(id.toString(), false);
                history.pushState(null, "", `${window.location.origin}${window.location.pathname}`);
            }

            await this.Pesquisar(this.state.request);

            this.componentDidMountFinish();

        } catch (err: any) {
            await DisplayError.Show(err);
        }
    }

    protected BtnEdit_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.OpenPayment(id);

            if (r) await this.Pesquisar(this.state.request);
       
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

            if (r) await this.Pesquisar(this.state.request);
            
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
            const result = await MessageBox.Show({title: "Confirmar", width: 420, type: "Question", content: `Tem certeza que deseja excluir ${_.size(this.state.selecteds)} usuário(s) ?`,
                buttons: [
                    { Text: "Sim", OnClick: () => "yes" },
                    { Text: "Não", OnClick: () => "no" }
                ]
            });

            if (result != "yes") return;

            await MessageBox.Show({title: "Info", width: 420, type: "Success", content: `${_.size(this.state.selecteds)} usuário(s) excluido com sucesso!`,
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
        /*
        try
        {
            const data = await this.ViewImportar.current?.Show(this.state.request.filter);

            if (data === null) return;

            this.setState({request: {...this.state.request, offset: 1}},
                async () => await this.Pesquisar(this.state.request)
            );
    
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
        */
    }

    protected BtnFiltro_Click = async() =>
    {
        /*
        try
        {
            const filter = await this.ViewFiltro.current?.Show(this.state.request.filter);

            if (filter === null) return;

            this.setState({request: {...this.state.request, offset: 1, filter}},
                async () => await this.Pesquisar(this.state.request)
            );
    
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
        */
    }

    protected CardStatus_Click = async(status: string): Promise<void> =>
    {
        try
        {
            this.setState({request: {...this.state.request, status}}, 
                async () => await this.Pesquisar(this.state.request)
            );
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
            this.setState({request: {...this.state.request, status: undefined}}, 
                async () => await this.Pesquisar(this.state.request)
            );
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
            this.setState((state: any) => ({request: {...state.request, limit, offset}}),
                async () => await this.Pesquisar(this.state.request)
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
            this.setState((state: any) => ({request: {...state.request, sort}}),
                async () => await this.Pesquisar(this.state.request)
            );
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    private OpenPayment = async (id: string, isHitoryBack: boolean = true) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?id=${id}`);
        const r = await this.ViewPayment.current?.Show(id);
        if (isHitoryBack) history.back();
        return r;
    }

    protected Pesquisar = async(request: any): Promise<void> =>
    {
        this.setState({Loading: true});
        var r = await Service.Post("financial/payment/findAll", request);
        this.setState({Loading: false, ...r?.data});
    }

}