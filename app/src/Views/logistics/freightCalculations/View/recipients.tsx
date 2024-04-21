import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, Modal, TextBox, ViewModal } from "../../../../Utils/Controls";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { MesoRegionTemplate } from "../../../../Search/Templates/MesoRegion";
import _ from "lodash";

const Columns = [
    { selector: (row: any) => `${row.recipientMesoRegion?.description} - ${row.recipientMesoRegion?.state?.acronym}`, name: 'Região' },
];

class ViewRecipient extends ViewModal {

    public Close = (recipient: any) => this.setState({open: false});

    state = {
        open: false,
        id: "",
        recipientMesoRegion: null,
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
                        <AutoComplete Label='Região' Pesquisa={async(Text: string) => await Search.MesoRegion(Text)} Text={(Item: any) => `${Item.description} - ${Item.state.acronym}` } Value={this.state.recipientMesoRegion} OnChange={(recipientMesoRegion: any) => this.setState({recipientMesoRegion})}>
                            <MesoRegionTemplate />
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
            recipientMesoRegion: null,
        });

        if (item == null) return;

        this.props.recipients.push({...item, recipientMesoRegionId: item.recipientMesoRegion.id});
        this.props.OnChange(this.props.recipients);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewRecipient.current?.Show({...args});
        if (item == null) return;
        args.recipientMesoRegion = item.recipientMesoRegion;
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
                <GridView Columns={Columns} Rows={_.orderBy(this.props.recipients, (c: any) => c.recipientMesoRegion?.description)} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}