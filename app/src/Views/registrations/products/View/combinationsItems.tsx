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

const Columns = [
    { selector: (row: any) => row.name, name: 'Item' },
];

class ViewCombinationItem extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        name: '',
        description: '',
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({...item});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='Combinação Item' Width={450}>
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                        </Grid>
                        <Grid md={12}>
                            <TextBox Label='Descrição' TextTransform='UpperCase' Text={this.state.description} OnChange={(args: EventArgs) => this.setState({description: args.Value})} />
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

export class CombinationsItems extends BaseDetails<Readonly<{combinationItems: any[], OnChange?: Function | any}>> {

    protected ViewCombinationItem = React.createRef<ViewCombinationItem>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewCombinationItem.current?.Show({
            id: '',
            name: '',
            description: '',
        });

        if (item == null) return;

        this.props.combinationItems.push({...item});
        this.props.OnChange(this.props.combinationItems);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewCombinationItem.current?.Show({...args});
        if (item == null) return;
        args.name = item.name;
        args.description = item.description;
        this.props.OnChange(this.props.combinationItems);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.combinationItems));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.combinationItems));

    render(): ReactNode {
        return (
            <>
                <ViewCombinationItem ref={this.ViewCombinationItem} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.combinationItems} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}