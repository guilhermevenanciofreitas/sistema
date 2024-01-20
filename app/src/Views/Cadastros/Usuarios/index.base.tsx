import React from "react";
import { Service } from "../../../Service";
import { ViewUsuario } from "./View/index";
import { ViewFiltro } from "./filtro";
import { BaseIndex } from "../../../Utils/Base";
import { MessageBox } from "../../../Utils/Controls";
import { ViewImportar } from "./importar";

export default class BaseUsuarios extends BaseIndex {

    protected ViewUsuario = React.createRef<ViewUsuario>();

    
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

    public componentDidMount(): void {
        try
        {
            if (this.Finish) return;

            this.Pesquisar(this.state.Data.limit, this.state.Data.offset, this.state.Data.filter);

            this.componentDidMountFinish();

        }
        catch (err: any) 
        {
            alert(err);
        }
    }

    protected BtnEdit_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.ViewUsuario.current?.Show(id);

            if (r) this.Pesquisar(this.state.Data.limit, this.state.Data.offset, this.state.Data.filter, this.state.Data.sort);
       
        } 
        catch (err: any) 
        {
            alert(err);
        }
    }

    protected BtnNovo_Click = async (): Promise<void> =>
    {
        try
        {

            const r = await this.ViewUsuario.current?.Show(undefined);

            if (r) this.Pesquisar(this.state.Data.limit, this.state.Data.offset, this.state.Data.filter, this.state.Data.sort);
            
        }
        catch (err: any) 
        {
            alert(err);
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

            //...
            
        }
        catch (err: any) 
        {
            alert(err);
        }
    }

    protected BtnImportar_Click = async() =>
    {
        try
        {
            const data = await this.ViewImportar.current?.Show(this.state.Data.filter);

            if (data === null) return;
    
            this.setState({Data: {filter: data?.filter}});
    
            this.Pesquisar(this.state.Data.limit, 1, data?.filter, data?.sort);
    
        }
        catch (err: any) 
        {
            alert(err);
        }
    }

    protected BtnFiltro_Click = async() =>
    {
        try
        {
            const data = await this.ViewFiltro.current?.Show(this.state.Data.filter);

            if (data === null) return;
    
            this.setState({Data: {filter: data?.filter}});

            this.Pesquisar(this.state.Data.limit, 1, data?.filter, this.state.Data.sort);
    
        }
        catch (err: any) 
        {
            alert(err);
        }
    }

    protected BtnPesquisar_Click = async(limit?: number, offset?: number, filter?: any, sort?: any): Promise<void> =>
    {
        try
        {

            this.Pesquisar(limit, offset, filter, sort);

        }
        catch (err: any) 
        {
            alert(err);
        }
    }

    protected ListView_PageChange = async(limit?: number, offset?: number) =>
    {
        try
        {
            this.Pesquisar(limit, offset, this.state.Data.filter, this.state.Data.sort);
        }
        catch (err: any) 
        {
            alert(err);
        }
    }

    protected ListView_Sort = async(sort?: any) =>
    {
        this.setState({Data: {sort: sort}});
        this.Pesquisar(this.state.Data.limit, this.state.Data.offset, this.state.Data.filter, sort);
    }

    protected Pesquisar = async(limit?: number, offset?: number, filter?: any, sort?:any): Promise<void> =>
    {
        
        this.setState({Loading: true, limit, offset, filter});
        var r = await Service.Post("usuario/findAll", {limit, offset, filter, sort});
        this.setState({Loading: false, Data: r?.data});

    }

}