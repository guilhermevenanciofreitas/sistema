import React from "react";
import { Button, Container, DatePicker, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle, BookmarkAdd, Edit } from "@mui/icons-material";
import BankAccountBase from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { AspectRatio, Card, CardContent, IconButton, Typography } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import { ViewBankAccount } from "./View";

const Columns = [
    { selector: (row: any) => row.id, sort: 'id', name: 'ID', sortable: true },
    { selector: (row: any) => row.cliente.nome, sort: 'nome', name: 'Nome', sortable: true },
    { selector: (row: any) => row.status?.descricao, sort: '$status.descricao', name: 'Status', sortable: true },
];

export default class BankAccount extends BankAccountBase {

    render() {

        return (
            <>
               
               <ViewBankAccount ref={this.ViewBankAccount} Title="Conta a pagar" />

                <JoyLayout>

                    <Title>Contas bancárias</Title>

                    <Container>
                        <Left>
                            <Button Text='Novo' Type='Button' Color='white' BackgroundColor='green' StartIcon={<Add />} OnClick={this.BtnNovo_Click} />
                        </Left>
                        <Right>
                            <IconButton size='sm' variant="outlined" style={{backgroundColor: '#0d6efd'}} onClick={this.BtnFiltro_Click}>
                                <FilterAlt style={{color: 'white'}} />
                            </IconButton>
                            <Button Text='Pesquisar' Type='Button' Color='white' BackgroundColor='#0d6efd' StartIcon={<SearchRounded />} OnClick={this.BtnPesquisar_Click} />
                        </Right>
                    </Container>

                    <div style={{width: '100%', height: '100%', border: '1px solid rgba(0,0,0,.12)', overflow: 'auto', display: 'flex'}}>
                        {this.state.Data.status.map((c: any) => (
                            <div onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDragDrop(e, c)}}>
                                <Card sx={{ width: 280, height: '100%', marginLeft: '2px', marginRight: '2px', backgroundColor: c.id == null ? '#e9e9e9' : 'white'}}>
                                
                                    <Typography level="title-lg">{c?.descricao}</Typography>

                                    {this.state.Data.rows.filter((item: any) => item?.status?.id == c?.id).map((item: any) => (
                                        <div style={{cursor: 'move'}} draggable onDragStart={(e) => this.onDragStart(e, item?.id, item?.status?.id)}>
                                            <Card sx={{ width: '100%', height: '100%' }}>
                                                <Typography>{item.cliente.nome}</Typography>
                                                <IconButton size="sm" sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }} onClick={() => this.BtnEdit_Click(item.id)}><Edit /></IconButton>
                                            </Card>
                                        </div>
                                    ))}
                                </Card>
                            </div>
                        ))}
                    </div>
                </JoyLayout>
            </>
            
        );
    }
}