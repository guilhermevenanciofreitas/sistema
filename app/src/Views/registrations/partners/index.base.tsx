import React, { ComponentClass } from "react";
import { Service } from "../../../Service";
import { ViewPartner } from "./View/index";
import { ViewFiltro } from "./filtro";
import { BaseIndex } from "../../../Utils/Base";
import { MessageBox } from "../../../Utils/Controls";
import { ViewImportar } from "./importar";
import { DisplayError } from "../../../Utils/DisplayError";
import queryString from "query-string";

export default class PartnersBase extends BaseIndex<Readonly<{Title: string, Type: "customer" | "supplier" | "shipping-company" | "employee", ViewPartner: React.ReactElement}>> {

    protected ViewPartner = React.createRef<ViewPartner>();

    protected ViewImportar = React.createRef<ViewImportar>();
    protected ViewFiltro = React.createRef<ViewFiltro>();

    state = {
        Loading: true,
        Selecteds: [],
        request: {
            offset: 1,
            limit: 100
        },
        response: {
            rows: [],
            count: 0
        },
    }

    public componentDidMount = async () =>
    {
        try
        {

            if (this.Finish) return;

            const { id } = queryString.parse(window.location.search);

            if (id) {
                await this.OpenPartner(id.toString(), false);
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

            const r = await this.OpenPartner(id);

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

            const r = await this.ViewPartner.current?.Show(undefined);

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
            await this.Pesquisar(this.state.request);
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
            this.setState({request: {...this.state.request, limit, offset}},
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
            this.setState({request: {...this.state.request, sort}},
                async () => await this.Pesquisar(this.state.request)
            );
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    private OpenPartner = async (id: string, isHitoryBack: boolean = true) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?id=${id}`);
        const r = await this.ViewPartner.current?.Show(id);
        if (isHitoryBack) history.back();
        return r;
    }

    private Pesquisar = async(request: any): Promise<void> =>
    {
        this.setState({Loading: true});
        var r = await Service.Post(`registrations/${this.props.Type}/findAll`, request);
        this.setState({Loading: false, ...r?.data});
    }

}