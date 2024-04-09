import React from "react";
import { Button, Container, DatePicker, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle, BookmarkAdd, Edit, Menu as More, EditRounded } from "@mui/icons-material";
//import { ViewPedidoVenda } from "./View/index";
import ProgressBase from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { AspectRatio, Card, CardContent, Dropdown, Menu, MenuItem, IconButton, MenuButton, Typography } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import { EventArgs } from "../../../Utils/EventArgs";
import { ViewOrder } from "../orders/View";
import { ViewSaleOrderStatus } from "./View";
import _ from "lodash";
//import { ViewImportar } from "./importar";
//import { ViewFiltro } from "./filtro";

const Columns = [
    { selector: (row: any) => row.id, sort: 'id', name: 'ID', sortable: true },
    { selector: (row: any) => row.cliente.nome, sort: 'nome', name: 'Nome', sortable: true },
    { selector: (row: any) => row.status?.descricao, sort: '$status.descricao', name: 'Status', sortable: true },
];

export default class Progress extends ProgressBase {

    protected Saldos = (c: any) => {

        const saleOrders = this.state.response.rows.filter((item: any) => item?.status?.id == c?.id);
        const balance = _.sum(saleOrders.map((item: any) => parseFloat(item.valor)));
      
        return (
            <div style={{position: 'absolute', padding: '10px', bottom: '0px', width: '100%'}}>
                <div style={{backgroundColor: '#efefef'}}>
                    Quantidade <div style={{float: 'right', textAlign: 'right', marginRight: '5px'}}>{_.size(saleOrders)}</div>
                </div>
                <div>
                    Total <div style={{float: 'right', textAlign: 'right', marginRight: '5px'}}>{balance.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}</div>
                </div>
            </div>
        )
    }

    render() {

        return (
            <>

                <ViewSaleOrderStatus ref={this.ViewSaleOrderStatus} Title="Status" />
                <ViewOrder ref={this.ViewOrder} Title="Pedido" />

                <JoyLayout>

                    <Title>Andamento</Title>

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
                            
                            {this.state.Loading && (<div className="loader" />)}

                            {!this.state.Loading && this.state.response.status.map((c: any) => (
                                <div onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDragDrop(e, c)}}>
                                    <Card sx={{ padding: '5px', gap: 0, width: 240, height: '100%', marginLeft: '2px', marginRight: '2px', backgroundColor: c.id == null ? '#e9e9e9' : 'white'}}>

                                        <div style={{display: 'flex', height: 'auto', marginBottom: '15px'}}>
                                            <div style={{width: '5px', height: '25px', marginLeft: '5px', backgroundColor: c?.color}}></div>
                                            <div style={{paddingLeft: '8px'}}>
                                                {c?.descricao.toLowerCase().replace(/(?:^|\s)\S/g, (text: any) => text.toUpperCase())}
                                            </div>
                                        </div>

                                        <div style={{overflowX: 'auto', height: c?.id != null ? 'calc(100% - 165px)' : '100%'}}>
                                            {this.state.response.rows.filter((item: any) => item?.status?.id == c?.id).map((item: any) => (
                                                <div style={{cursor: 'move', paddingTop: '3px'}} draggable onDragStart={(e) => this.onDragStart(e, item?.id, item?.status?.id)}>
                                                    <Card sx={{ gap: 0, padding: '10px', width: '100%', height: '100%' }}>
                                                        <label style={{fontSize: 14}}><b>Número: {item.number}</b></label>
                                                        <label style={{fontSize: 14, position: 'absolute', right: '0.5rem'}}><b>{parseFloat(item.valor).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}</b></label>
                                                        <label style={{fontSize: 12}}>{item.costumer?.nome}</label>
                                                        <label style={{fontSize: 12}}>Vendedor: {item.seller?.nome}</label>
                                                        <IconButton size="sm" sx={{position: 'absolute', top: '2.8rem', right: '0.5rem'}} onClick={() => this.BtnEditSaleOrder_Click(item.id)}>
                                                            <EditRounded style={{fontSize: 16}} />
                                                        </IconButton>
                                                    </Card>
                                                </div>
                                            ))}
                                        </div>

                                        {c?.id != null && (
                                            <>
                                            <div style={{position: 'absolute', top: '0.1rem', right: '0.5rem'}}>
                                                <Dropdown>
                                                    <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}>
                                                        <More />
                                                    </MenuButton>
                                                    <Menu>
                                                        <MenuItem onClick={() => this.BtnEditSaleOrderStatus_Click(c?.id)}>Editar</MenuItem>
                                                    </Menu>
                                                </Dropdown>
                                            </div>

                                            {this.Saldos(c)}

                                            </>
                                            
                                        )}

                                    </Card>
                                </div>
                            ))}
                        </div>
                </JoyLayout>
            </>
            
        );
    }
}