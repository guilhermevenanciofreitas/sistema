import React, { ComponentClass } from "react";
import { Service } from "../../../Service";
import { ViewParceiro } from "./View/index";
import { ViewFiltro } from "./filtro";
import { BaseIndex } from "../../../Utils/Base";
import { MessageBox } from "../../../Utils/Controls";
import { ViewImportar } from "./importar";
import { DisplayError } from "../../../Utils/DisplayError";
import queryString from "query-string";
import { useParams } from "react-router-dom";

export default class BaseParceiros extends BaseIndex<Readonly<{Title: string, Tipo: "Cliente" | "Fornecedor" | "Transportadora" | "Funcionario", ViewParceiro: React.ReactElement}>> {

    protected ViewParceiro = React.createRef<ViewParceiro>();

    protected ViewImportar = React.createRef<ViewImportar>();
    protected ViewFiltro = React.createRef<ViewFiltro>();

    state = {
        Loading: true,
        Selecteds: [],
        Data: {
            rows: [],
            count: 0,
            offset: 1,
            limit: 100,
            filter: undefined,
            sort: undefined
        },
    }

    public componentDidMount = async () =>
    {
        try
        {

            if (this.Finish) return;

            const { id } = queryString.parse(window.location.search);

            if (id) {
                await this.OpenParceiro(id.toString(), false);
                history.pushState(null, "", `${window.location.origin}${window.location.pathname}`);
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

            const r = await this.OpenParceiro(id);

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

            const r = await this.ViewParceiro.current?.Show(undefined);

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

    protected BtnPesquisar_Click = async(): Promise<void> =>
    {
        try
        {
            await this.Pesquisar(this.state.Data);
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

    private OpenParceiro = async (id: string, isHitoryBack: boolean = true) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?id=${id}`);
        const r = await this.ViewParceiro.current?.Show(id);
        if (isHitoryBack) history.back();
        return r;
    }

    private Pesquisar = async(Data: any): Promise<void> =>
    {
        this.setState({Loading: true});

        let tipo = "";

        switch (this.props.Tipo)
        {
            case "Cliente":
                tipo = "cliente";
                break;
            case "Fornecedor":
                tipo = "fornecedor";
                break;
            case "Transportadora":
                tipo = "transportadora";
                break;
            case "Funcionario":
                tipo = "funcionario";
                break;
        }
        
        var r = await Service.Post(`${tipo}/findAll`, Data);
        this.setState({Loading: false, Data: r?.data});

    }

}