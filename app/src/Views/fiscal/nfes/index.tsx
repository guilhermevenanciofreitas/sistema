import React from "react";
import { Button, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle, AddCircleOutline } from "@mui/icons-material";
import { ViewNotaFiscal } from "./View/index";
import BaseNotasFiscais from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { IconButton } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import { color } from "../../../Utils/color";
//import { ViewImportar } from "./importar";
//import { ViewFiltro } from "./filtro";

const Columns = [
    { selector: (row: any) => row.numero, sort: 'numero', name: 'Numero', sortable: true },
    { selector: (row: any) => row.serie, sort: 'serie', name: 'Série', sortable: true },
    { selector: (row: any) => row.emitente, sort: 'emitente', name: 'Emitente', sortable: true },
    { selector: (row: any) => row.destinatario, sort: 'destinatario', name: 'Destinatário', sortable: true },
    { selector: (row: any) => parseFloat(row.valor).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), sort: 'valor', name: 'Valor', sortable: true },
];

export default class NotasFiscais extends BaseNotasFiscais {

    render(): React.ReactNode {

        return (
            <>

                <ViewNotaFiscal ref={this.ViewNotaFiscal} Title="Nota Fiscal" />

                {/*
                <ViewImportar ref={this.ViewImportar} />
                <ViewFiltro ref={this.ViewFiltro} />
                */}

                <JoyLayout>

                    <Title>Notas fiscais</Title>

                    <Container>
                        <Left>
                            {this.state.Selecteds.length == 0 && (
                                <Button Text='Novo' Type='Button' Color='white' BackgroundColor={color.success} StartIcon={<AddCircleOutline />} OnClick={this.BtnNovo_Click} />
                            )}

                            <Button Text='Status' Type='Button' Color='white' BackgroundColor='green' StartIcon={<Add />} OnClick={this.BtnStatusService_Click} />

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