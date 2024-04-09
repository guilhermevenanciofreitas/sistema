import React from "react";
import { Button, Container, DatePicker, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle, BookmarkAdd, Edit, Check } from "@mui/icons-material";
//import { ViewPedidoVenda } from "./View/index";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { AspectRatio, Card, CardContent, IconButton, Typography } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import { EventArgs } from "../../../Utils/EventArgs";
import { ViewOrder } from "../orders/View";
import BaseEntrega from "./index.base";
//import { ViewImportar } from "./importar";
//import { ViewFiltro } from "./filtro";

import _ from "lodash";

export default class Entrega extends BaseEntrega {

    render() {

        return (
            <>
                <ViewOrder ref={this.ViewOrder} Title="Pedido" />

                <JoyLayout>

                    <Title>Entregadores</Title>

                    <Container>
                            <Right>
                                <IconButton size='sm' variant="outlined" style={{backgroundColor: '#0d6efd'}} onClick={this.BtnFiltro_Click}>
                                    <FilterAlt style={{color: 'white'}} />
                                </IconButton>
                                <Button Text='Pesquisar' Type='Button' Color='white' BackgroundColor='#0d6efd' StartIcon={<SearchRounded />} OnClick={this.BtnPesquisar_Click} />
                            </Right>
                        </Container>

                        <div style={{width: '100%', height: '100%', border: '1px solid rgba(0,0,0,.12)', overflow: 'auto', display: 'flex'}}>
                            {this.state.Data.entregadores.map((c: any) => (
                                <div onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDragDrop(e, c)}}>
                                    <Card sx={{ width: 280, height: '100%', marginLeft: '2px', marginRight: '2px', backgroundColor: c.id == null ? '#e9e9e9' : 'white'}}>
                                    
                                        <Typography level="title-lg">{c.nome}</Typography>

                                        {_.filter(this.state.Data.rows, (item: any) => item.entregador?.id == c?.id && _.size(_.filter(item.deliveryRoutes, (c1: any) => c1.deliveryRoute.cancelado == null)) == 0).map((item: any) => (
                                            <div style={{cursor: 'move'}} draggable onDragStart={(e) => this.onDragStart(e, item?.id, item.entregador?.id)}>
                                                <Card sx={{ width: '100%', height: '100%' }}>
                                                    <Typography>{item.cliente.nome}</Typography>
                                                    <IconButton size="sm" sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }} onClick={() => this.BtnEdit_Click(item.id)}><Edit /></IconButton>
                                                </Card>
                                            </div>
                                        ))}

                                        <IconButton  variant="plain" color="neutral" size="sm" sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }} onClick={() => this.BtnDelivery_Click(c.id)}>
                                            <Check />
                                        </IconButton>
                                    
                                    </Card>
                                </div>
                            ))}
                        </div>
                </JoyLayout>
            </>
            
        );
    }
}