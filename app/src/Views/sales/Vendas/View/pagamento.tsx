import React, { ReactNode } from "react";
import { AutoComplete, Button, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { FormOfPaymentTemplate } from "../../../../Search/Templates/FormOfPayment";

const Columns = [
    { selector: (row: any) => row.formaPagamento?.descricao, name: 'Forma de pagamento' },
    { selector: (row: any) => "", name: 'Vencimento' },
    { selector: (row: any) => row.valor, name: 'Valor' },
];

class ViewPagamento extends ViewModal {

    public Close = (endereco: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        formaPagamento: null,
        valor: "0,00",
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({open: true, ...item});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Forma de pagamento' Width={600} Close={this.Close}>
                
                <AutoComplete Label='Forma de pagamento' Pesquisa={async(Text: string) => await Search.FormOfPayment(Text)} Text={(Item: any) => `${Item?.descricao}` } Value={this.state.formaPagamento} OnChange={(args: any) => this.setState({formaPagamento: args})}>
                    <FormOfPaymentTemplate />
                </AutoComplete>

                <TextBox Label='Valor' TextTransform='UpperCase' Text={this.state.valor} OnChange={(args: EventArgs) => this.setState({valor: args.Value})} />

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
            </Modal>
        );
    }

}

export class Pagamento extends BaseDetails<Readonly<{Itens: any[], OnChange?: Function | any}>> {

    protected ViewContato = React.createRef<ViewPagamento>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewContato.current?.Show({
            id: "",
            quantidade: "1",
            valor: "",
            formaPagamento: null,
        });

        if (item == null) return;

        this.props.Itens.push({...item});
        this.props.OnChange(this.props.Itens);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewContato.current?.Show({...args});
        if (item == null) return;
        args.quantidade = item.quantidade;
        args.valor = item.valor;
        args.formaPagamento = item.formaPagamento;
        this.props.OnChange(this.props.Itens);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.Itens));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.Itens));

    render(): ReactNode {
        return (
            <>
                <ViewPagamento ref={this.ViewContato} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.Itens} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}