import React from "react";
import { Button, CardStatus, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle } from "@mui/icons-material";
import FreightQuotesBase from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { Grid, IconButton } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
//import { ViewImportar } from "./importar";
//import { ViewFiltro } from "./filtro";
import _ from "lodash";
import { ViewFreightCalculation } from "./View";
//import { ViewCalled } from "./View";

export enum colors {
    open = 'rgb(0, 174, 209)',
    late = '#ff6961',
    closed = 'rgb(74, 209, 133)',
}

const Type = ({ row }: any) => {
    console.log(row.status);
    return (
        <div style={{display: 'flex', height: 'auto'}}>
            <div style={{width: '5px', height: '25px', backgroundColor: colors[row.status as keyof typeof colors]}}></div>
            <div data-tag="allowRowEvents" style={{ paddingTop: '2px', paddingLeft: '10px', overflow: 'hidden', textOverflow: 'ellipses' }}>
                {row.type?.description}
            </div>
        </div>
    );
};

export default class FreightQuotes extends FreightQuotesBase {

    private Columns = [
        { selector: (row: any) => <Type row={row} />, sort: 'type.description', name: 'Tipo', sortable: true, maxWidth:"200px" },
        { selector: (row: any) => `${row.sender?.nome} - ${row.senderMesoRegion?.description}`, sort: 'description', name: 'Remetente - Região', sortable: true },
        { selector: (row: any) => `${row.recipient?.nome} - ${row.recipientMesoRegion?.description}`, sort: 'description', name: 'Destinatário - Região', sortable: true, maxWidth:"450px" },
        { selector: (row: any) => row.weight == null ? '' : parseFloat(row.weight).toLocaleString("pt-BR", {minimumFractionDigits: 3}), sort: 'weight', name: 'Peso', sortable: true, maxWidth: "150px" },
        { selector: (row: any) => parseFloat(row.value).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), sort: 'value', name: 'Valor', sortable: true, maxWidth: "150px" },
        { selector: (row: any) => `${parseFloat(row.valueICMS).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})} (${parseFloat(row.aliquotICMS).toLocaleString("pt-BR", {minimumFractionDigits: 2})}%)`, sort: 'icms', name: 'ICMS', sortable: true, maxWidth: "150px" },
        { selector: (row: any) => (parseFloat(row.value) + parseFloat(row.valueICMS)).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}), sort: 'total', name: 'Total', sortable: true, maxWidth: "120px" },
    ];

    render(): React.ReactNode {

        return (
            <>

                <ViewFreightCalculation ref={this.ViewFreightCalculation} Title="Cotação de frete" />
{/*
                <ViewImportar ref={this.ViewImportar} />
                <ViewFiltro ref={this.ViewFiltro} />
*/}
                <JoyLayout>

                    <Title>Cotação de fretes</Title>

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
                        {_.map(_.get(this.state.response, 'freightCalculationTypes'), (type: any) => (
                            <Grid md={2}>
                                <CardStatus checked={this.state.request.typeId == type.id} status={type.description.toLowerCase().replace(/(?:^|\s)\S/g, (text: any) => text.toUpperCase())} bagde={_.size(_.filter(this.state.response.rows, (c: any) => c.type?.id == type.id))} color={'white'} OnClick={() => this.CardStatus_Click(type?.id)} />
                            </Grid>
                        ))}
                    </Grid>
                    
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