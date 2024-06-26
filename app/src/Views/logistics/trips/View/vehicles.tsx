import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, ViewModal, TextBox, Content, Actions } from "../../../../Utils/Controls";
import { EventArgs } from "../../../../Utils/EventArgs";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { VehicleTemplate } from "../../../../Search/Templates/Vehicle";
import { CheckCircleOutlined } from "@mui/icons-material";
import { color } from "../../../../Utils/color";

const Columns = [
    { selector: (row: any) => row.vehicle?.name, name: 'Veículo' },
    { selector: (row: any) => row.vehicle?.plate, name: 'Placa' },
];

class ViewVehicle extends React.Component {

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        vehicle: null,
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({...item});

        return await this.ViewModal.current?.Show();

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.state);

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='Reboque' Width={450}>
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <AutoComplete Label='Veículo' Pesquisa={async(Text: string) => await Search.Vehicle(Text)} Text={(Item: any) => `${Item.plate}` } Value={this.state.vehicle} OnChange={(vehicle: any) => this.setState({vehicle})}>
                                <VehicleTemplate />
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

export class Vehicles extends BaseDetails<Readonly<{vehicles: any[], OnChange?: Function | any}>> {

    protected ViewVehicle = React.createRef<ViewVehicle>();

    protected BtnAdicionar_Click = async () => {

        const item: any = await this.ViewVehicle.current?.Show({
            id: '',
            vehicle: null,
        });

        if (item == null) return;

        this.props.vehicles.push({...item});
        this.props.OnChange(this.props.vehicles);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        const item = await this.ViewVehicle.current?.Show({...args});
        if (item == null) return;
        args.vehicle = item.vehicle;
        this.props.OnChange(this.props.vehicles);
       
    }

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.vehicles));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.vehicles));

    render(): ReactNode {
        return (
            <>
                <ViewVehicle ref={this.ViewVehicle} />
                <Button Text='Adicionar' Color='white' BackgroundColor='green' OnClick={this.BtnAdicionar_Click} />
                {this.state.Selecteds.length >= 1 && <Button Text='Remover' Color='white' BackgroundColor='red' OnClick={this.BtnRemover_Click} />}
                <GridView Columns={Columns} Rows={this.props.vehicles} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}