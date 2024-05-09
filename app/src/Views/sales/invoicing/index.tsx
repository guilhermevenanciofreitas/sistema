import React from "react";
import { Button, CardStatus, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle } from "@mui/icons-material";
import { ViewOrderInvoicing } from "./View/index";
import OrdersBase from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { Grid, IconButton } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
//import { ViewImportar } from "./importar";
//import { ViewFiltro } from "./filtro";
import _ from "lodash";

const Number = ({ row }: any) => {
    return (
        <div style={{display: 'flex', height: 'auto'}}>
            <div style={{width: '5px', height: '25px', backgroundColor: row.status?.color || '#a0a0a0'}}></div>
            <div data-tag="allowRowEvents" style={{ paddingTop: '2px', paddingLeft: '10px', overflow: 'hidden', textOverflow: 'ellipses' }}>
                {row.number}
            </div>
        </div>
    );
};

export default class Invoicing extends OrdersBase {

    private Columns = [
        { selector: (row: any) => <Number row={row} />, sort: 'number', name: 'Número', sortable: true, maxWidth:"100px" },
        { selector: (row: any) => row.createdAt, sort: 'nome', name: 'Criado em', sortable: true, maxWidth:"200px" },
        { selector: (row: any) => row.company?.nomeFantasia, sort: 'nome', name: 'Empresa', sortable: true },
        { selector: (row: any) => row.costumer?.nome, sort: 'nome', name: 'Nome', sortable: true },
        { selector: (row: any) => row.seller?.nome, sort: 'nome', name: 'Vendedor', sortable: true, maxWidth:"300px" },
        { selector: (row: any) => row.status?.descricao || 'PENDENTE', sort: '$status.descricao', name: 'Status', sortable: true },
        { selector: (row: any) => parseFloat(row.valor).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), sort: 'valor', name: 'Valor', right: true, sortable: true, maxWidth:"120px" },
    ];

    render(): React.ReactNode {

        return (
            <>

                <ViewOrderInvoicing ref={this.ViewOrderInvoicing} Title="Faturar" />

                {/* 
                <ViewImportar ref={this.ViewImportar} />
                <ViewFiltro ref={this.ViewFiltro} />
                */}

                <JoyLayout>

                    <Title>Faturamento</Title>

                    <Container>
                        <Left>
                            <Button Text='Faturar' Type='Button' Color='white' BackgroundColor='green' StartIcon={<Add />} OnClick={this.BtnInvoice_Click} />
                            {this.state.Selecteds.length >= 1 && (
                                <>
                                <Button Text='Excluir' Type='Button' Color='white' BackgroundColor='red' StartIcon={<Delete />} OnClick={this.BtnDelete_Click} />
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

                        Columns={this.Columns}
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