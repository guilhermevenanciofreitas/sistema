import React from "react";
import { Service } from "../../../Service";
import { BaseIndex } from "../../../Utils/Base";
import { DisplayError } from "../../../Utils/DisplayError";
import queryString from "query-string";
import { ViewBankAccount } from "./View";
import { ViewPayment } from "../payments/View";
import _ from "lodash";
import { Loading } from "../../../Utils/Loading";
import { MessageBox } from "../../../Utils/Controls";

export default class BankAccountBase extends BaseIndex {
 
    protected ViewBankAccount = React.createRef<ViewBankAccount>();
    
    protected ViewPayment = React.createRef<ViewPayment>();

    state = {
        Loading: true,
        Selecteds: [],

        response: {
            bankAccounts: [],
            payments: [],
            
        },

    }

    componentDidMount = async () =>
    {
        try
        {

            if (this.Finish) return;

            const { id, paymentId } = queryString.parse(window.location.search);

            if (id) {
                await this.OpenBankAccount(id.toString(), false);
                history.pushState(null, "", `${window.location.origin}${window.location.pathname}`);
            }

            if (paymentId) {
                await this.OpenPayment(paymentId.toString(), false);
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

            const r = await this.ViewBankAccount.current?.Show(undefined);

            if (r) this.Pesquisar();
            
        }
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnEditBankAccount_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.OpenBankAccount(id);

            if (r) this.Pesquisar();
       
        } 
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnEditPayment_Click = async (id: string): Promise<void> =>
    {
        try
        {

            const r = await this.OpenPayment(id);

            if (r) this.Pesquisar();
        
        } 
        catch (err: any) 
        {
            await DisplayError.Show(err);
        }
    }

    protected BtnShipping_Click = async (bankAccountId: string): Promise<void> =>
    {
        try
        {

            const payments = _.cloneDeep(_.map(this.state.response.payments.filter((item: any) => item?.bankAccount?.id == bankAccountId), (c: any) => c.id));

            if (_.size(payments) == 0) {
                await MessageBox.Show({title: "Info", width: 420, type: "Warning", content: `Nenhum registrado para remessa!`,
                    buttons: [
                        { Text: "Ok" }
                    ]
                });
                return;
            }

            Loading.Show();
            var r = await Service.Post("financial/bank-account/shipping", {bankAccountId, payments});
            Loading.Hide();

            if (r) await this.Pesquisar();

            await MessageBox.Show({title: "Info", width: 420, type: "Success", content: `Remessa gerada com sucesso!`,
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

    private OpenBankAccount = async (id: string, isHitoryBack: boolean = true) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?id=${id}`);
        const r = await this.ViewBankAccount.current?.Show(id);
        if (isHitoryBack) history.back();
        return r;
    }

    private OpenPayment = async (id: string, isHitoryBack: boolean = true) =>
    {
        history.pushState(null, "", `${window.location.origin}${window.location.pathname}?paymentId=${id}`);
        const r = await this.ViewPayment.current?.Show(id);
        if (isHitoryBack) history.back();
        return r;
    }

    protected Pesquisar = async(): Promise<void> =>
    {
        this.setState({Loading: true});
        var r = await Service.Post("financial/bank-account/findAll", null);

        let bankAccounts = [];

        bankAccounts.push({id: null, bank: {description: "[Sem conta]"}});

        for (let item of r?.data.response.bankAccounts) {
            bankAccounts.push(item);
        }

        this.setState({Loading: false, response: {...r?.data?.response, bankAccounts}});

    }

    protected onDragStart = (ev: any, id: any, bankAccountId: any) => {
        ev.dataTransfer.setData("id", id);
        ev.dataTransfer.setData("bankAccountId", bankAccountId);
    }

    protected onDragOver = (ev: any) => {
        ev.preventDefault();
    }

    protected onDragDrop = async (ev: any, bankAccount: any) => {

        let id = ev.dataTransfer.getData("id");
        let bankAccountId = ev.dataTransfer.getData("bankAccountId");
        
        if (bankAccount.id == bankAccountId) {
            return;
        }

        const payments = this.state.response.payments.filter((item: any) => {
            if (item.id == id) {
                item.bankAccount = bankAccount; 
            }
            return item;
        });

        let r = await Service.Post("financial/bank-account/change-bank-account-payment", {id: id, bankAccountId: bankAccount?.id});

        if (r?.status == 200) {
            this.setState({response: {...this.state.response, payments: payments}});
        }

    }

}