import React from "react";
import { Button, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle } from "@mui/icons-material";
import { ViewContaPagar } from "./View/index";
import BaseContasPagar from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { IconButton } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import { ViewImportar } from "./importar";
import { ViewFiltro } from "./filtro";

const Columns = [
    { selector: (row: any) => row.id, sort: 'id', name: 'ID', sortable: true },
    { selector: (row: any) => row.numeroDocumento, sort: 'numeroDocumento', name: 'Nº Doc', sortable: true },
    { selector: (row: any) => row.valor, sort: 'valor', name: 'Valor', sortable: true },
    { selector: (row: any) => row.emissao, sort: 'emissao', name: 'Emissão', sortable: true },
    { selector: (row: any) => row.vencimento, sort: 'vencimento', name: 'Vencimento', sortable: true },
    { selector: (row: any) => row.recebedor, sort: 'recebedor', name: 'Recebedor', sortable: true },
];

export default class ContasPagar extends BaseContasPagar {

    render(): React.ReactNode {

        return (
            <>

                <ViewContaPagar ref={this.ViewContaPagar} Title="Conta a pagar" />

                <ViewImportar ref={this.ViewImportar} />
                <ViewFiltro ref={this.ViewFiltro} />

                <JoyLayout>

                    <Title>Contas a pagar</Title>

                    <Container>
                        <Left>
                            {this.state.Selecteds.length == 0 && (
                                <Button Text='Novo' Type='Button' Color='white' BackgroundColor='green' StartIcon={<Add />} OnClick={this.BtnNovo_Click} />
                            )}
                            {this.state.Selecteds.length >= 1 && (
                                <>
                                <Button Text='Excluir' Type='Button' Color='white' BackgroundColor='red' StartIcon={<Delete />} OnClick={this.BtnDelete_Click} />
                                <Button Text='Editar' Type='Button' Color='white' BackgroundColor='#0d6efd' StartIcon={<ChangeCircle />} OnClick={this.BtnNovo_Click} />
                                &nbsp;&nbsp;({this.state.Selecteds.length}) registro(s) selecionado(s)
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
                        Rows={this.state.Data.rows}

                        Count={this.state.Data.count}
                        Limit={this.state.Data.limit}
                        OffSet={this.state.Data.offset}

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