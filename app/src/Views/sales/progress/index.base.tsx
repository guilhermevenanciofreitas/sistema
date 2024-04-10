import React from "react";
import { Service } from "../../../Service";
import { BaseIndex } from "../../../Utils/Base";
import { DisplayError } from "../../../Utils/DisplayError";
import queryString from "query-string";
import { ViewOrder } from "../orders/View";
import _ from "lodash";
import { MessageBox } from "../../../Utils/Controls";
import { ViewSaleOrderStatus } from "./View";

export default class ProgressBase extends BaseIndex {
 
    protected ViewSaleOrderStatus = React.createRef<ViewSaleOrderStatus>();
    protected ViewOrder = React.createRef<ViewOrder>();

    state = {
        Loading: true,
        Selecteds: [],
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

            const { id, saleOrderId } = queryString.parse(window.location.search);

            if (id) {
                await this.OpenSaleOrderStatus(id.toString(), false);
                history.pushState(null, "", `${window.location.origin}${window.location.pathname}`);
            }

            if (saleOrderId) {
                await this.OpenSaleOrder(saleOrderId.toString(), false);
                history.pushState(null, "", `${window.location.origin}${window.location.pathname}`);
            }

            await this.Pesquisar();

            this.componentDidMountFinish();

        }
        catch (err: any)
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnNovo_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.ViewSaleOrderStatus.current?.Show(undefined);

            if (r) this.Pesquisar();
            
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnEditSaleOrderStatus_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.OpenSaleOrderStatus(id);

            if (r) await this.Pesquisar();
       
        } 
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnEditSaleOrder_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.OpenSaleOrder(id);

            if (r) await this.Pesquisar();
        
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
            await this.Pesquisar();
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    private OpenSaleOrderStatus = async (id: string, isHitoryBack: boolean = true) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?id=${id}`);
        const r = await this.ViewSaleOrderStatus.current?.Show(id);
        if (isHitoryBack) history.back();
        return r;
    }

    private OpenSaleOrder = async (id: string, isHitoryBack: boolean = true) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?saleOrderId=${id}`);
        const r = await this.ViewOrder.current?.Show(id);
        if (isHitoryBack) history.back();
        return r;
    }

    protected Pesquisar = async(): Promise<void> =>
    {

        this.setState({Loading: true});

        var r = await Service.Post("sales/progress/findAll", null);

        let status = [];

        status.push({id: null, descricao: "Pendente", color: '#a0a0a0'});

        for (let item of r?.data.response.status || []) {
            status.push(item);
        }

        this.setState({Loading: false, response: {...r?.data.response, status}});

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

        const rows = _.cloneDeep(this.state.response.rows).filter((item: any) => {
            if (item.id == id) {
                item.status = status; 
            }
            return item;
        });

        let response = await Service.Post("sales/progress/progress", {id: id, statusId: status?.id});

        if (response?.status == 201) {
            await MessageBox.Show({title: "Info", width: 500, type: "Warning", content: response?.data.message, buttons: [{ Text: "OK" }]});
            return;
        }

        if (response?.status == 200) {
            this.setState({response: {rows: rows}});
        }

    }

}