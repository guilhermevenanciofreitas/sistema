import React from "react";
import { Button, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle, AddCircleOutline } from "@mui/icons-material";
import { ViewShippingOrder } from "./View/index";
import ShippingOrdersBase from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { IconButton } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import _ from "lodash";
import { color } from "../../../Utils/color";
//import { ViewImportar } from "./importar";
//import { ViewFiltro } from "./filtro";

const Columns = [
    { selector: (row: any) => row.company?.surname, sort: 'company', name: 'Empresa', sortable: true },
    { selector: (row: any) => row.sender?.surname, sort: 'sender', name: 'Remetente', sortable: true },
    { selector: (row: any) => row.recipient?.surname, sort: 'recipient', name: 'Destinatário', sortable: true },
    { selector: (row: any) => row.value, sort: 'value', name: 'Valor', sortable: true },
    { selector: (row: any) => row.weight, sort: 'weight', name: 'Peso', sortable: true },
];

export default class ShippingOrders extends ShippingOrdersBase {

    render(): React.ReactNode {

        return (
            <>

                <ViewShippingOrder ref={this.ViewShippingOrder} Title="Ordem de carga" />

                {/*
                <ViewImportar ref={this.ViewImportar} />
                <ViewFiltro ref={this.ViewFiltro} />
                */}

                <JoyLayout>

                    <Title>Ordens de carga</Title>

                    <Container>
                        <Left>
                            {_.size(this.state.Selecteds) == 0 && (
                                <Button Text='Novo' Type='Button' Color='white' BackgroundColor={color.success} StartIcon={<AddCircleOutline />} OnClick={this.BtnNovo_Click} />
                            )}
                            {_.size(this.state.Selecteds) >= 1 && (
                                <>
                                <Button Text='Excluir' Type='Button' Color='white' BackgroundColor='red' StartIcon={<Delete />} OnClick={this.BtnDelete_Click} />
                                <Button Text='Editar' Type='Button' Color='white' BackgroundColor='#0d6efd' StartIcon={<ChangeCircle />} OnClick={this.BtnNovo_Click} />
                                &nbsp;&nbsp;({_.size(this.state.Selecteds)}) registro(s) selecionado(s)
                                </>
                            )}
                        </Left>
                        <Right>
                            <IconButton size='sm' variant="outlined" style={{backgroundColor: '#0d6efd'}} onClick={this.BtnImportar_Click}>
                                <Upload style={{color: 'white'}} />
                            </IconButton>
                            <IconButton size='sm' variant="outlined" style={{backgroundColor: '#0d6efd'}} onClick={this.BtnFiltro_Click}>
                                <FilterAlt style={{color: 'white'}} />
                            </IconButton>
                            <Button Text='Pesquisar' Type='Button' Color='white' BackgroundColor='#0d6efd' StartIcon={<SearchRounded />} OnClick={this.BtnPesquisar_Click} />
                        </Right>
                    </Container>

                    <ListView
                        Loading={this.state.Loading}

                        Columns={Columns}

                        Rows={this.state.response.rows}
                        Count={this.state.response.count}

                        Limit={this.state.request.limit}
                        OffSet={this.state.request.offset}

                        Records={[10, 50, 100, 500]}

                        OnItem={(Item: any) => this.BtnEdit_Click(Item.id)}
                        OnSelected={(Args: any) => this.setState({Selecteds: Args.selectedRows})}
                        OnPageChange={this.ListView_PageChange}
                        OnSort={this.ListView_Sort}
                    />

                </JoyLayout>
            </>
        )

    }
}