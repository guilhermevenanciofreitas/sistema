import React, { ReactNode } from "react";
import { AutoComplete, Button, DatePicker, GridView, Modal, NumericBox, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { PaymentFormTemplate } from "../../../../Search/Templates/PaymentForm";
import { Grid } from "@mui/joy";

const Columns = [
    { selector: (row: any) => row.formaPagamento?.description, name: 'Forma de pagamento' },
    { selector: (row: any) => row.vencimento, name: 'Vencimento' },
    { selector: (row: any) => row.valor, name: 'Valor' },
];

class ViewPagamento extends ViewModal {

    public Close = (endereco: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        formaPagamento: null,
        vencimento: null,
        valor: null,
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({open: true, ...item});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Forma de pagamento' Width={400} Close={this.Close}>
                
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    <Grid md={12}>
                        <AutoComplete Label='Forma de pagamento' Pesquisa={async(Text: string) => await Search.PaymentForm(Text)} Text={(Item: any) => `${Item?.description}` } Value={this.state.formaPagamento} OnChange={(args: any) => this.setState({formaPagamento: args})}>
                            <PaymentFormTemplate />
                        </AutoComplete>
                    </Grid>
                    <Grid md={6}>
                        <DatePicker Label='Vencimento' Text={this.state.vencimento} OnChange={(args: EventArgs) => this.setState({vencimento: args.Value})} />
                    </Grid>
                    <Grid md={6}>
                        <NumericBox Label='Valor' Text={this.state.valor} Prefix="R$ " Scale={2} OnChange={(args: EventArgs) => this.setState({valor: args.Value})} />
                    </Grid>
                </Grid>

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
            formaPagamento: null,
            vencimento: null,
            valor: null
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
        args.vencimento = item.vencimento;
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