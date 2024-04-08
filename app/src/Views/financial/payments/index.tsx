import React from "react";
import { Button, CardStatus, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle, AttachMoney } from "@mui/icons-material";
import { ViewPayment } from "./View/index";
import BaseContasPagar from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { Badge, Card, CardActions, CardContent, CircularProgress, Grid, IconButton, SvgIcon, Typography } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import { ViewImportar } from "./importar";
import { ViewFiltro } from "./filtro";
import _ from "lodash";

enum colors {
    pending = '#a0a0a0',
    open = '#00ffff',
    shipping = '#8d23ae',
    send = '#00aed1',
    scheduled = '#daa520',
    paid = '#4ad185'
}

const CompanyRecipient = ({ row }: any) => {
    return (
        <div style={{display: 'flex', height: 'auto'}}>
            <div style={{width: '5px', backgroundColor: colors[row.status as keyof typeof colors]}}></div>
            <div data-tag="allowRowEvents" style={{ paddingLeft: '10px', overflow: 'hidden', textOverflow: 'ellipses' }}>
                {row.company?.nomeFantasia}
                <br />
                {row.recebedor?.nome}
            </div>
        </div>
    );
};

const BankAccount = ({ row }: any) => {

    if (row.bankAccount == null) {
        return <></>;
    }

    return (
        <div style={{display: 'flex', height: 'auto'}}>
            <img style={{padding: '10px', width: '40px'}} src={`data:image/png;base64,${btoa(new Uint8Array(row.bankAccount?.bank?.logo?.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`} />
            <div data-tag="allowRowEvents" style={{ paddingLeft: '2px', overflow: 'hidden', textOverflow: 'ellipses' }}>
                {row.bankAccount?.agency}-{row.bankAccount?.agencyDigit}
                <br />
                {row.bankAccount?.account}-{row.bankAccount?.accountDigit}
            </div>
        </div>
    );
};

const Columns = [
    { selector: (row: any) => <CompanyRecipient row={row} />, sort: 'id', name: 'Empresa / Benificiário', sortable: true },
    { selector: (row: any) => row.formOfPayment?.description, sort: 'description', name: 'Tipo', sortable: true, maxWidth: "300px" },
    { selector: (row: any) => row.numeroDocumento, sort: 'numeroDocumento', name: 'Nº Doc', sortable: true, maxWidth:"150px" },
    { selector: (row: any) => row.vencimento, sort: 'emissao', name: 'Vencimento', sortable: true, maxWidth: "160px" },
    { selector: (row: any) => row.vencimento, sort: 'vencimento', name: 'Agendamento', sortable: true, maxWidth: "160px" },
    { selector: (row: any) => row.valor, sort: 'valor', name: 'Valor', sortable: true, right: true, maxWidth:"120px" },
    { selector: (row: any) => <BankAccount row={row} />, sort: 'recebedor', name: 'Agência / Conta', sortable: true, maxWidth: "250px" },
];

export default class Payments extends BaseContasPagar {

    render(): React.ReactNode {

        return (
            <>

                <ViewPayment ref={this.ViewPayment} Title="Conta a pagar" />

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

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={2}>
                            <CardStatus checked={this.state.status == "pending"} status="Pendente" value={_.get(this.state.Data.status, 'pending.ammount') as any} bagde={_.get(this.state.Data.status, 'pending.count') as any} color={colors.pending} OnClick={() => this.CardStatus_Click('pending')} />
                        </Grid>
                        <Grid md={2}>
                            <CardStatus checked={this.state.status == "open"} status="Aberto" value={_.get(this.state.Data.status, 'open.ammount') as any} bagde={_.get(this.state.Data.status, 'open.count') as any} color={colors.open} OnClick={() => this.CardStatus_Click('open')} />
                        </Grid>
                        <Grid md={2}>
                            <CardStatus checked={this.state.status == "shipping"} status="Em remessa" value={_.get(this.state.Data.status, 'shipping.ammount') as any} bagde={_.get(this.state.Data.status, 'shipping.count') as any} color={colors.shipping} OnClick={() => this.CardStatus_Click('shipping')} />
                        </Grid>
                        <Grid md={2}>
                            <CardStatus checked={this.state.status == "send"} status="Enviado" value={_.get(this.state.Data.status, 'send.ammount') as any} bagde={_.get(this.state.Data.status, 'send.count') as any} color={colors.send} OnClick={() => this.CardStatus_Click('send')} />
                        </Grid>
                        <Grid md={2}>
                            <CardStatus checked={this.state.status == "scheduled"} status="Agendado" value={_.get(this.state.Data.status, 'scheduled.ammount') as any} bagde={_.get(this.state.Data.status, 'scheduled.count') as any} color={colors.scheduled} OnClick={() => this.CardStatus_Click('scheduled')} />
                        </Grid>
                        <Grid md={2}>
                            <CardStatus checked={this.state.status == "paid"} status="Pago" value={_.get(this.state.Data.status, 'paid.ammount') as any} bagde={_.get(this.state.Data.status, 'paid.count') as any} color={colors.paid} OnClick={() => this.CardStatus_Click('paid')} />
                        </Grid>
                    </Grid>
                    
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