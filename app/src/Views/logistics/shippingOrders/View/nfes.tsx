import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, ViewModal, TextBox, Content, Actions } from "../../../../Utils/Controls";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { NfeTemplate } from "../../../../Search/Templates/Nfe";
import _ from "lodash";
import { color } from "../../../../Utils/color";
import { CheckCircleOutlined } from "@mui/icons-material";

const Columns = [
    { selector: (row: any) => row.nfe?.NFe?.infNFe?.ide?.nNF, sort: 'numero', name: 'Numero', minWidth: '120px', maxWidth: '120px' },
    { selector: (row: any) => row.nfe?.NFe?.infNFe?.ide?.serie, sort: 'serie', name: 'Série', minWidth: '100px', maxWidth: '100px' },
    { selector: (row: any) => row.nfe?.protNFe?.infProt?.chNFe, sort: 'chNFe', name: 'Chave de acesso' },
    { selector: (row: any) => parseFloat(row.nfe?.NFe?.infNFe?.total?.ICMSTot?.vNF).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), sort: 'valor', name: 'Valor', minWidth: '140px', maxWidth: '140px', right: true },
];

class ViewNfe extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        nfe: null,
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({...item});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='NFe' Width={450}>
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <AutoComplete 
                                Action={{
                                    Type: 'Nfe',
                                    New: {Values: {}},
                                    Edit: {Id: _.get(this.state.nfe, 'id')}
                                }}
                                Label='Nota fiscal' Pesquisa={async(Text: string) => await Search.Nfe(Text)} Text={(Item: any) => `${Item.protNFe?.infProt?.chNFe}`} Value={this.state.nfe} OnChange={(nfe: any) => this.setState({nfe})}>
                                <NfeTemplate />
                            </AutoComplete>
                        </Grid>
                    </Grid>
                </Content>
                <Actions>
                    <Button Text='Confirmar' StartIcon={<CheckCircleOutlined />} Color={'white'} BackgroundColor={color.success} OnClick={this.BtnConfirmar_Click} />
                </Actions>
            </ViewModal>
        );
    }

}

export class Nfes extends BaseDetails<Readonly<{nfes: any[], OnChange?: Function | any}>> {

    protected ViewNfe = React.createRef<ViewNfe>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewNfe.current?.Show({
            id: '',
            supplier: null,
        });

        if (item == null) return;

        this.props.nfes.push({...item});
        this.props.OnChange(this.props.nfes);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewNfe.current?.Show({...args});
        if (item == null) return;
        args.supplier = item.supplier;
        this.props.OnChange(this.props.nfes);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.nfes));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.nfes));

    render(): ReactNode {
        return (
            <>
                <ViewNfe ref={this.ViewNfe} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.nfes} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}