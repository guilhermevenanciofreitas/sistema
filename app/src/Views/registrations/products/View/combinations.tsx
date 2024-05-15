import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, ViewModal, TextBox, Content, Actions } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { CombinationTemplate } from "../../../../Search/Templates/Combination";
import _ from "lodash";
import { color } from "../../../../Utils/color";
import { TaskAltOutlined } from "@mui/icons-material";
import { CombinationsItems } from "./combinationsItems";

const Columns = [
    { selector: (row: any) => row.combination?.name, name: 'Item' },
    { selector: (row: any) => row.isRequired ? "SIM" : "NÃO", name: 'Obrigatório' },
    { selector: (row: any) => row.min, name: 'Minimo' },
    { selector: (row: any) => row.max, name: 'Máximo' },
];

class ViewCombination extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        combination: null,
        isRequired: true,
        min: '1',
        max: '1',
        combinationItems: []
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({...item});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='Combinação' Width={450}>
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <AutoComplete Label='Item' Action={{Type: 'Combination', New: {Values: {}}, Edit: {Id: _.get(this.state.combination, 'id')}}} Pesquisa={async(Text: string) => await Search.Combination(Text)} Text={(Item: any) => `${Item.name}` } Value={this.state.combination} OnChange={(combination: any) => this.setState({combination})}>
                                <CombinationTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={12}>
                            <CheckBox Label='Obrigatório' Checked={this.state.isRequired} OnChange={(args: EventArgs) => this.setState({isRequired: args.Value})} />
                        </Grid>
                        <Grid md={6}>
                            <TextBox Label='Minimo' TextTransform='LowerCase' Text={this.state.min} OnChange={(args: EventArgs) => this.setState({min: args.Value})} />
                        </Grid>
                        <Grid md={6}>
                            <TextBox Label='Máximo' TextTransform='LowerCase' Text={this.state.max} OnChange={(args: EventArgs) => this.setState({max: args.Value})} />
                        </Grid>

                        <Grid md={12}>
                            <CombinationsItems combinationItems={this.state.combinationItems} OnChange={(combinationItems: any[]) => this.setState({combinationItems})} />
                        </Grid>
                    </Grid>

                </Content>
                <Actions>
                    <Button Text='Confirmar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnConfirmar_Click} />
                </Actions>
            </ViewModal>
        );
    }

}

export class Combinations extends BaseDetails<Readonly<{combinations: any[], OnChange?: Function | any}>> {

    protected ViewCombination = React.createRef<ViewCombination>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewCombination.current?.Show({
            id: '',
            combination: null,
            isRequired: false,
            min: '1',
            max: '1',
            combinationItems: []
        });

        if (item == null) return;

        this.props.combinations.push({...item});
        this.props.OnChange(this.props.combinations);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewCombination.current?.Show({...args});
        if (item == null) return;
        args.combination = item.combination;
        args.isRequired = item.isRequired;
        args.min = item.min;
        args.max = item.max;
        args.combinationItems = item.combinationItems;
        this.props.OnChange(this.props.combinations);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.combinations));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.combinations));

    render(): ReactNode {
        return (
            <>
                <ViewCombination ref={this.ViewCombination} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {_.size(this.state.Selecteds) >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.combinations} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}