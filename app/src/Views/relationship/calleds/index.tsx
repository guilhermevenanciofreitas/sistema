import React from "react";
import { Button, CardStatus, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle, AddCircleOutline } from "@mui/icons-material";
import CalledsBase from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { Grid, IconButton } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
//import { ViewImportar } from "./importar";
//import { ViewFiltro } from "./filtro";
import _ from "lodash";
import { ViewCalled } from "./View";
import { color } from "../../../Utils/color";

export enum colors {
    open = 'rgb(0, 174, 209)',
    late = '#ff6961',
    closed = 'rgb(74, 209, 133)',
}

const Number = ({ row }: any) => {
    console.log(row.status);
    return (
        <div style={{display: 'flex', height: 'auto'}}>
            <div style={{width: '5px', height: '25px', backgroundColor: colors[row.status as keyof typeof colors]}}></div>
            <div data-tag="allowRowEvents" style={{ paddingTop: '2px', paddingLeft: '10px', overflow: 'hidden', textOverflow: 'ellipses' }}>
                {row.number}
            </div>
        </div>
    );
};

export default class Calleds extends CalledsBase {

    private Columns = [
        { selector: (row: any) => <Number row={row} />, sort: 'number', name: 'Número', sortable: true, maxWidth:"100px" },
        { selector: (row: any) => row.createdAt, sort: 'createdAt', name: 'Criado em', sortable: true, maxWidth:"200px" },
        { selector: (row: any) => row.company?.surname, sort: 'company', name: 'Empresa', sortable: true },
        { selector: (row: any) => row.partner?.surname, sort: 'partner', name: 'Solicitante', sortable: true },
        { selector: (row: any) => row.subject, sort: 'subject', name: 'Assunto', sortable: true },
        { selector: (row: any) => row.responsible?.surname, sort: 'responsible', name: 'Responsável', sortable: true, maxWidth:"300px" },
        { selector: (row: any) => row.occurrence?.description, sort: '$status.descricao', name: 'Ocorrência', sortable: true },
        { selector: (row: any) => row.forecast, sort: 'forecast', name: 'Prev. fechar', sortable: true, maxWidth:"200px" },
    ];

    render(): React.ReactNode {

        return (
            <>

                <ViewCalled ref={this.ViewCalled} Title="Chamado" />
{/*
                <ViewImportar ref={this.ViewImportar} />
                <ViewFiltro ref={this.ViewFiltro} />
*/}
                <JoyLayout>

                    <Title>Chamados</Title>

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
                    

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={2}>
                            <CardStatus checked={this.state.request.status == 'open'} status={'Aberto'} bagde={parseInt(_.get(this.state.response.status.open, 'count') || '0')} color={colors.open} OnClick={() => this.CardStatus_Click('open')} />
                        </Grid>

                        <Grid md={2}>
                            <CardStatus checked={this.state.request.status == 'late'} status={'Atrasado'} bagde={parseInt(_.get(this.state.response.status.late, 'count') || '0')} color={colors.late} OnClick={() => this.CardStatus_Click('late')} />
                        </Grid>

                        <Grid md={2}>
                            <CardStatus checked={this.state.request.status == 'closed'} status={'Fechado'} bagde={parseInt(_.get(this.state.response.status.closed, 'count') || '0')} color={colors.closed} OnClick={() => this.CardStatus_Click('closed')} />
                        </Grid>
                        
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