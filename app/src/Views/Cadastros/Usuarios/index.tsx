import React from "react";
import { Button, Container, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle } from "@mui/icons-material";
import { ViewUsuario } from "./View/index";
import BaseUsuarios from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { IconButton } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import { ViewImportar } from "./importar";
import { ViewFiltro } from "./filtro";

const Columns = [
    { selector: (row: any) => row.id, sort: 'id', name: 'ID', sortable: true },
    { selector: (row: any) => row.nome, sort: 'nome', name: 'Nome', sortable: true },
    { selector: (row: any) => row.email, sort: 'email', name: 'E-mail', sortable: true },
];

export default class Usuarios extends BaseUsuarios {

    render(): React.ReactNode {

        return (
            <>

                <ViewUsuario ref={this.ViewUsuario} Title="Usuário" />

                <ViewImportar ref={this.ViewImportar} />
                <ViewFiltro ref={this.ViewFiltro} />
                

                <JoyLayout>

                    <Title>Usuários</Title>

                    <Container>
                        <Left>
                            {this.state.Selecteds.length == 0 && (
                                <Button Text='Novo' Type='Button' Color='white' BackgroundColor='green' StartIcon={<Add />} OnClick={this.BtnNovo_Click} />
                            )}
                            {this.state.Selecteds.length >= 1 && (
                                <>
                                <Button Text='Excluir' Type='Button' Color='white' BackgroundColor='red' StartIcon={<Delete />} OnClick={this.BtnDelete_Click} />
                                <Button Text='Editar' Type='Button' Color='white' BackgroundColor='#0d6efd' StartIcon={<ChangeCircle />} OnClick={this.BtnNovo_Click} />
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
                            <Button Text='Pesquisar' Type='Button' Color='white' BackgroundColor='#0d6efd' StartIcon={<SearchRounded />} OnClick={() => this.BtnPesquisar_Click(this.state.Data.limit, this.state.Data.offset, this.state.Data.filter)} />
                        </Right>
                    </Container>

                    <ListView
                        Loading={this.state.Loading}
                        Columns={Columns}
                        Rows={this.state.Data.rows}
                        defaultRowsPerPage={this.state.Data.limit}
                        TotalRows={this.state.Data.count}
                        OnItem={(item: any) => this.BtnEdit_Click(item.id)}
                        OnSelected={(args: any) => this.setState({Selecteds: args.selectedRows})}
                        OnPageChange={this.ListView_PageChange}
                        OnSort={this.ListView_Sort}
                    />

                </JoyLayout>
            </>
        )

    }
}