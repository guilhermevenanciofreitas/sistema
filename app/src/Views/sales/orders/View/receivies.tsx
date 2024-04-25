import React, { ReactNode } from "react";
import { AutoComplete, Button, DatePicker, GridView, Modal, NumericBox, TextBox, ViewModal } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { ReceiveFormTemplate } from "../../../../Search/Templates/ReceiveForm";

const Columns = [
    { selector: (row: any) => row.receivieForm?.description, name: 'Forma de pagamento' },
    { selector: (row: any) => row.dueDate, name: 'Vencimento' },
    { selector: (row: any) => parseFloat(row.value).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), name: 'Valor', right: true },
];

class ViewReceivie extends ViewModal {

    public Close = (endereco: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        receivieForm: null,
        dueDate: null,
        value: null,
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
                        <AutoComplete Label='Forma de pagamento' Pesquisa={async(Text: string) => await Search.ReceivieForm(Text)} Text={(Item: any) => `${Item?.description}` } Value={this.state.receivieForm} OnChange={(receivieForm: any) => this.setState({receivieForm})}>
                            <ReceiveFormTemplate />
                        </AutoComplete>
                    </Grid>
                    <Grid md={6}>
                        <DatePicker Label='Vencimento' Text={this.state.dueDate} OnChange={(args: EventArgs) => this.setState({dueDate: args.Value})} />
                    </Grid>
                    <Grid md={6}>
                        <NumericBox Label='Valor' Text={this.state.value} Prefix="R$ " Scale={2} OnChange={(args: EventArgs) => this.setState({value: args.Value})} />
                    </Grid>
                </Grid>

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />
                
            </Modal>
        );
    }

}

export class Receivies extends BaseDetails<Readonly<{receivies: any[], OnChange?: Function | any}>> {

    protected ViewReceivie = React.createRef<ViewReceivie>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewReceivie.current?.Show({
            id: "",
            receivieForm: null,
            dueDate: null,
            value: null
        });

        if (item == null) return;

        this.props.receivies.push({...item});
        this.props.OnChange(this.props.receivies);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewReceivie.current?.Show({...args});
        if (item == null) return;
        args.receivieForm = item.receivieForm;
        args.dueDate = item.dueDate;
        args.value = item.value;
        this.props.OnChange(this.props.receivies);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.receivies));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.receivies));

    render(): ReactNode {
        return (
            <>
                <ViewReceivie ref={this.ViewReceivie} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.receivies} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}