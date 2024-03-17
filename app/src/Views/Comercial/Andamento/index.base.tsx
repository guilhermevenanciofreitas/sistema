import React from "react";
import { Service } from "../../../Service";
import { BaseIndex } from "../../../Utils/Base";
import { DisplayError } from "../../../Utils/DisplayError";
import queryString from "query-string";
import { ViewPedidoVenda } from "../Vendas/View";

export default class BaseAndamento extends BaseIndex {
 
    protected ViewPedidoVenda = React.createRef<ViewPedidoVenda>();

    //protected ViewImportar = React.createRef<ViewImportar>();
    //protected ViewFiltro = React.createRef<ViewFiltro>();

    state = {
        Loading: true,
        Selecteds: [],
        Data: {
            status: [],
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
                await this.OpenPedidoVenda(id.toString());
            }

            await this.Pesquisar(this.state.Data);

            this.componentDidMountFinish();

        }
        catch (err: any)
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnEdit_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.OpenPedidoVenda(id);

            if (r) this.Pesquisar(this.state.Data);
       
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
            await this.Pesquisar(this.state.Data);
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    private OpenPedidoVenda = async (id: string) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?id=${id}`);
        const r = await this.ViewPedidoVenda.current?.Show(id);
        history.back();
        return r;
    }

    protected Pesquisar = async(Data: any): Promise<void> =>
    {
        this.setState({Loading: true});
        var r = await Service.Post("pedidovenda/findAll", Data);

        let status = [];

        status.push({id: null, descricao: "SEM STATUS"});

        for (let item of r?.data.status) {
            status.push(item);
        }

        this.setState({Loading: false, Data: {...r?.data, status}});

    }

    protected onDragStart = (ev: any, id: any, statusId: any) => {
        ev.dataTransfer.setData("id", id);
        ev.dataTransfer.setData("statusId", statusId);
    }

    protected onDragOver = (ev: any) => {
        ev.preventDefault();
    }

    protected onDragDrop = async (ev: any, status: any) => {

        let id = ev.dataTransfer.getData("id");
        let statusId = ev.dataTransfer.getData("statusId");
        
        if (status.id == statusId) {
            return;
        }

        const rows = this.state.Data.rows.filter((item: any) => {
            if (item.id == id) {
                item.status = status; 
            }
            return item;
        });

        let r = await Service.Post("pedidovenda/progress", {id: id, statusId: status?.id});

        if (r?.status == 200) {
            this.setState({Data: {...this.state.Data, rows: rows}});
        }

    }

}