import React from "react";
import { Button, CardStatus, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle } from "@mui/icons-material";
import { ViewStockIn } from "./View/index";
import StockInsBase from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { Grid, IconButton } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import { ViewImportar } from "./importar";
import { ViewFiltro } from "./filtro";
import _ from "lodash";

enum colors {
    pending = '#00aed1',
    checkIn = '#4ad185'
}

const ChNFe = ({ row }: any) => {
    console.log(row);
    return (
        <div style={{display: 'flex', height: 'auto'}}>
            <div style={{width: '5px', backgroundColor: colors[row.status as keyof typeof colors]}}></div>
            <div data-tag="allowRowEvents" style={{ paddingLeft: '10px', overflow: 'hidden', textOverflow: 'ellipses' }}>
                {row.nfe?.protNFe?.infProt?.chNFe}
            </div>
        </div>
    );
};

const Columns = [
    { selector: (row: any) => <ChNFe row={row} />, sort: 'nfe', name: 'Chave de acesso', sortable: true },
    { selector: (row: any) => row.createdAt, sort: 'createdAt', name: 'Data', sortable: true },
    { selector: (row: any) => row.status == 'pending' ? 'Pendente' : 'Confirmado', sort: 'status', name: 'Status', sortable: true },
];

export default class StockIns extends StockInsBase {

    render(): React.ReactNode {

        return (
            <>

                <ViewStockIn ref={this.ViewStockIn} Title="Entrada" />

                {/*<ViewImportar ref={this.ViewImportar} />*/}
                <ViewFiltro ref={this.ViewFiltro} />

                <JoyLayout>

                    <Title>Entradas</Title>

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

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <CardStatus checked={this.state.request.status == "pending"} status="Pendente" bagde={_.get(this.state.response.status, 'pending.count') as any} color={colors.pending} OnClick={() => this.CardStatus_Click('pending')} />
                        </Grid>
                        <Grid md={2}>
                            <CardStatus checked={this.state.request.status == "checkIn"} status="Confirmado" bagde={_.get(this.state.response.status, 'checkIn.count') as any} color={colors.checkIn} OnClick={() => this.CardStatus_Click('checkIn')} />
                        </Grid>
                    </Grid>

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