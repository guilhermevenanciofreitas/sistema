import React from "react";
import { Button, Container, DatePicker, Left, ListView, Right } from "../../../Utils/Controls";
import { Add, FilterAlt, SearchRounded, Upload, Delete, ChangeCircle, BookmarkAdd, EditRounded, Menu as More } from "@mui/icons-material";
import BankAccountBase from "./index.base";
import { JoyLayout } from "../../../Layout/JoyLayout";
import { AspectRatio, Card, CardContent, Dropdown, IconButton, Menu, MenuButton, MenuItem, Typography } from "@mui/joy";
import { Title } from "../../../Layout/JoyLayout/Ttitle";
import { ViewBankAccount } from "./View";
import { ViewPayment } from "../payments/View";
import _ from "lodash";

export default class BankAccount extends BankAccountBase {

    protected Saldos = (c: any) => {

        const balance = parseFloat(c?.balance);
        const payments = _.sum(this.state.response.payments.filter((item: any) => item?.bankAccount?.id == c?.id).map((item: any) => parseFloat(item.valor)));

        return (
            <div style={{position: 'absolute', padding: '10px', bottom: '0px', width: '100%'}}>
                <div style={{backgroundColor: '#efefef'}}>
                    Saldo inicial <div style={{float: 'right', textAlign: 'right', marginRight: '5px'}}>{balance.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}</div>
                </div>
                <div>
                    Pagamentos <div style={{float: 'right', textAlign: 'right', marginRight: '5px'}}>{payments.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}</div>
                </div>
                <div style={{backgroundColor: '#efefef'}}>
                    Recebimentos <div style={{float: 'right', textAlign: 'right', marginRight: '5px'}}>R$ 0,00</div>
                </div>
                <div>
                    Saldo final <div style={{float: 'right', textAlign: 'right', marginRight: '5px'}}>{(balance - payments).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}</div>
                </div>
            </div>
        )
    }

    render() {

        return (
            <>
               
               <ViewBankAccount ref={this.ViewBankAccount} Title="Conta bancária" />

               <ViewPayment ref={this.ViewPayment} Title="Conta a pagar" />

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

                        {this.state.Loading && (<div className="loader" />)}

                        {!this.state.Loading && this.state.response.bankAccounts.map((c: any) => (
                            <div onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDragDrop(e, c)}}>
                                <Card sx={{ padding: '5px', gap: 0, width: 280, height: '100%', marginLeft: '2px', marginRight: '2px', backgroundColor: c.id == null ? '#e9e9e9' : 'white'}}>
                                
                                    {c?.bank.id == null && (<label><b>{c?.bank?.description}</b></label>)}

                                    {c?.bank.id != null && (
                                        <div style={{display: 'flex', height: 'auto'}}>
                                            <img style={{padding: '5px', width: '40px', height: '40px'}} src={`data:image/png;base64,${btoa(new Uint8Array(c?.bank?.logo?.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`} />
                                            <div data-tag="allowRowEvents" style={{ paddingLeft: '10px', overflow: 'hidden', textOverflow: 'ellipses' }}>
                                                <label><b>{c?.bank?.description}</b></label>
                                                <br></br>
                                                <label><b>{c?.company?.nome}</b></label>
                                                <label>{c?.agency}-{c?.agencyDigit} / {c?.account}-{c?.accountDigit}</label>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div style={{overflowX: 'auto', height: c?.bank.id != null ? 'calc(100% - 165px)' : '100%'}}>
                                        {this.state.response.payments.filter((item: any) => item?.bankAccount?.id == c?.id).map((item: any) => (
                                            <div style={{cursor: 'move', paddingTop: '3px'}} draggable onDragStart={(e) => this.onDragStart(e, item?.id, item?.bankAccount?.id)}>
                                                <Card sx={{ backgroundColor: new Date(item.vencimento) >= new Date() ? '#f6e1e1' : 'white', gap: 0, padding: '10px', width: '100%', height: '100%' }}>
                                                    <label style={{fontSize: 14}}><b>{item.paymentForm?.description}</b></label>
                                                    <label style={{fontSize: 14, position: 'absolute', right: '0.5rem'}}><b>{parseFloat(item.valor).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}</b></label>
                                                    <label style={{fontSize: 12}}>{item.recebedor?.nome}</label>
                                                    <label style={{fontSize: 12}}>Vencimento: {item.vencimento}</label>
                                                    <IconButton size="sm" sx={{position: 'absolute', top: '2.5rem', right: '0.5rem'}} onClick={() => this.BtnEditPayment_Click(item.id)}>
                                                        <EditRounded style={{fontSize: 16}} />
                                                    </IconButton>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                    

                                    {c?.bank.id != null && (
                                        <>
                                        <div style={{position: 'absolute', top: '0.1rem', right: '0.5rem'}}>
                                            <Dropdown>
                                                <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}>
                                                    <More />
                                                </MenuButton>
                                                <Menu>
                                                    <MenuItem onClick={() => this.BtnEditBankAccount_Click(c?.id)}>Editar</MenuItem>
                                                    <MenuItem>Baixar</MenuItem>
                                                    <MenuItem onClick={() => this.BtnShipping_Click(c?.id)}>Gerar remessa</MenuItem>
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