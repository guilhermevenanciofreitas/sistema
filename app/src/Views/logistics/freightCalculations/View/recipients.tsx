import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { RegionTemplate } from "../../../../Search/Templates/Region";

const Columns = [
    { selector: (row: any) => row.recipientRegion?.description, name: 'Item' },
];

class ViewRecipient extends ViewModal {

    public Close = (recipient: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        recipientRegion: null,
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({open: true, ...item});

        return this.Initialize(this.Close);

    }

    protected BtnConfirmar_Click = async () => this.Close(this.state);

    render(): React.ReactNode {
        return (
            <Modal Open={this.state.open} Title='Destinatário (Região)' Width={450} Close={this.Close}>
                
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    <Grid md={12}>
                        <AutoComplete Label='Região' Pesquisa={async(Text: string) => await Search.Region(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.recipientRegion} OnChange={(recipientRegion: any) => this.setState({recipientRegion})}>
                            <RegionTemplate />
                        </AutoComplete>
                    </Grid>
                </Grid>

                <Button Text='Confirmar' Type='Submit' Color='white' BackgroundColor='green' OnClick={this.BtnConfirmar_Click} />

            </Modal>
        );
    }

}

export class Recipients extends BaseDetails<Readonly<{recipients: any[], OnChange?: Function | any}>> {

    protected ViewRecipient = React.createRef<ViewRecipient>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewRecipient.current?.Show({
            id: "",
            recipientRegion: null,
        });

        if (item == null) return;

        this.props.recipients.push({...item});
        this.props.OnChange(this.props.recipients);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewRecipient.current?.Show({...args});
        if (item == null) return;
        args.recipientRegion = item.recipientRegion;
        this.props.OnChange(this.props.recipients);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.recipients));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.recipients));

    render(): ReactNode {
        return (
            <>
                <ViewRecipient ref={this.ViewRecipient} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.recipients} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}