import React from "react";
import { Service } from "../../../Service";
import { BaseIndex } from "../../../Utils/Base";
import { DisplayError } from "../../../Utils/DisplayError";
import queryString from "query-string";
import { ViewBankAccount } from "./View";

export default class BankAccountBase extends BaseIndex {
 
    protected ViewBankAccount = React.createRef<ViewBankAccount>();

    state = {
        Loading: true,
        Selecteds: [],
        Data: {
            bankAccounts: [],
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
                await this.OpenPedidoVenda(id.toString(), false);
                history.pushState(null, "", `${window.location.origin}${window.location.pathname}`);
            }

            await this.Pesquisar(this.state.Data);

            this.componentDidMountFinish();

        }
        catch (err: any)
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnNovo_Click = async (id: string): Promise<void> =>
    {

    }

    protected BtnEdit_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.OpenPedidoVenda(id);

            //if (r) this.Pesquisar(this.state.Data);
       
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

    private OpenPedidoVenda = async (id: string, isHitoryBack: boolean = true) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?id=${id}`);
        //const r = await this.ViewPedidoVenda.current?.Show(id);
        //if (isHitoryBack) history.back();
        //return r;
    }

    protected Pesquisar = async(Data: any): Promise<void> =>
    {
        this.setState({Loading: true});
        var r = await Service.Post("financial/bank-account/findAll", Data);

        let bankAccounts = [];

        bankAccounts.push({id: null, bank: {description: "SEM CONTA"}});

        for (let item of r?.data.bankAccounts) {
            bankAccounts.push(item);
        }

        this.setState({Loading: false, Data: {...r?.data, bankAccounts}});

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