import React from "react";
import { Button, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle, DeleteOutline, DownloadOutlined } from "@mui/icons-material";
import { ViewUsuario } from "./View/index";
import BaseUsuarios from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { IconButton } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
//import { ViewImportar } from "./importar";
//import { ViewFiltro } from "./filtro";
import _ from "lodash";

enum colors {
    pending = '#00ffff',
    canceled = 'red',
    success = '#4ad185'
}

const Company = ({ row }: any) => {
    return (
        <div style={{display: 'flex', height: '30px'}}>
            <div style={{width: '5px', backgroundColor: colors[row.status as keyof typeof colors]}}></div>
            <div data-tag="allowRowEvents" style={{ paddingLeft: '10px', overflow: 'hidden', textOverflow: 'ellipses' }}>
                {row.company?.nomeFantasia}
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

export default class Shippings extends BaseUsuarios {

    private Columns = [
        { selector: (row: any) => <Company row={row} />, sort: 'nome', name: 'Empresa', sortable: true },
        { selector: (row: any) => row.createdAt, sort: 'createdAt', name: 'Cadastrado', sortable: true, maxWidth: "300px" },
        { selector: (row: any) => <BankAccount row={row} />, sort: 'recebedor', name: 'Agência / Conta', sortable: true, maxWidth: "350px" },
        { selector: (row: any) => _.size(row.bankAccountShippingPayment), name: 'Registros', center: true, maxWidth: "300px" },
        { selector: (row: any) => row.status != 'canceled' ? <IconButton onClick={() => this.BtnUnShipping_Click(row.id)}><DeleteOutline style={{color: 'red'}}></DeleteOutline></IconButton> : <></>, sort: 'recebedor', name: 'Cancelar', sortable: true, center: true, maxWidth: "120px" },
        { selector: (row: any) => row.status != 'canceled' ? <IconButton><DownloadOutlined style={{color: 'green'}}></DownloadOutlined></IconButton> : <></>, sort: 'recebedor', name: 'Download', sortable: true, center: true, maxWidth: "120px" },
    ];

    render(): React.ReactNode {

        return (
            <>

                <JoyLayout>

                    <Title>Remessas</Title>

                    <Container>
                        <Left>
                            {this.state.Selecteds.length >= 1 && (
                                <>
                                {/*<Button Text='Excluir' Type='Button' Color='white' BackgroundColor='red' StartIcon={<Delete />} OnClick={this.BtnDelete_Click} />*/}
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