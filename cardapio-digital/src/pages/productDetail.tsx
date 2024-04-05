import _ from "lodash";
import React from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";

export default class ProductDetail extends React.Component {

    state = {
        open: false,
        product: null,
        itemCombinacoes: []
    }

    protected Close = () => {
        this.setState({open: false});
    }

    public Show = (product: any) => {
        
        this.setState({product: null, itemCombinacoes: []});

        this.setState({open: true, product});

    }

    protected Quantidade = (produtoCombinacao: any, combinacaoItem: any): number => {
        const quantidade: any = _.map(_.filter(((_.filter(this.state.itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c: any) => c.itemCombinacaoId == combinacaoItem.id), (c2: any) => c2.quantidade as number)[0];
        return parseInt(quantidade) || 0;
    }

    protected QuantidadeTotal = (produtoCombinacao: any): number => {
        const quantidade: any = _.sum(_.map(((_.filter(this.state.itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c2: any) => c2.quantidade as number));
        return parseInt(quantidade) || 0;
    }

    protected TxtQuantidade_Change = (produtoCombinacao: any, combinacaoItem: any, quantidade: number, action: string) => {

        if (action == "+") {    
            if (this.QuantidadeTotal(produtoCombinacao) + 1 > produtoCombinacao.maximo) return;
        }

        let itemCombinacoes: any[] = this.state.itemCombinacoes;

        const itemCombinacao = _.filter(itemCombinacoes, (itemCombinacao: any) => itemCombinacao?.combinacaoId == produtoCombinacao.combinacao.id)[0];

        const item2 = _.filter(produtoCombinacao.combinacao.combinacaoItems, (c: any) => c.id == combinacaoItem.id)[0];

        const item = _.filter(itemCombinacao?.combinacaoItems, (c: any) => c.itemCombinacaoId == item2.id)[0];

        let combinacaoItems = itemCombinacao?.combinacaoItems || [];

        _.remove(combinacaoItems, (c: any) => c.itemCombinacaoId == item2?.id);

        _.remove(itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id);

        combinacaoItems.push({id: item?.id, itemCombinacaoId: item2?.id, quantidade: quantidade});

        itemCombinacoes?.push({
            id: itemCombinacao?.id,
            pedidoVendaItemId: itemCombinacao?.pedidoVendaItemId,
            combinacaoId: produtoCombinacao?.combinacao?.id,
            combinacaoItems: _.filter(combinacaoItems, (c: any) => c.quantidade > 0)
        });

        this.setState({itemCombinacoes});

    }

    render(): React.ReactNode {
        return (
            <>

                <Modal show={this.state.open} onHide={this.Close} size="lg">

                    <Modal.Header closeButton>
                        <Modal.Title>{_.get(this.state.product, "nome")}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        
                    <div style={{paddingBottom: '10px'}}>
                        {_.get(this.state.product, "descricao")}
                    </div>

                    {_.orderBy((this.state.product as any)?.combinacoes, ['ordem'], ['asc'])?.map((produtoCombinacao: any) =>
                        <div key={produtoCombinacao.id}>

                            {produtoCombinacao.maximo == 1 && (
                                <div style={{paddingBottom: '12px'}}>
                                <Alert key={'dark'} style={{backgroundColor: 'rgb(27, 34, 40)', marginBottom: '2px'}}>{produtoCombinacao.combinacao.descricao}&nbsp;&nbsp;{produtoCombinacao.isObrigatorio ? <div style={{color: '#ec5353', fontWeight: 400, float: 'right'}}>Obrigatório</div> : <div style={{color: '#ffffff', fontWeight: 400, float: 'right'}}>Opcional</div>}</Alert>

                                        {produtoCombinacao.combinacao.combinacaoItems?.map((combinacaoItem: any) => {
                                            return (
                                                <div key={_.get(combinacaoItem, "id")} className='Food' style={{marginBottom: '2px', cursor: 'pointer'}} onClick={() => {
                                                    
                                                    let itemCombinacoes: any[] = this.state.itemCombinacoes;

                                                    let itemCombinacao = _.filter(itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id)[0];

                                                    _.remove(itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id);

                                                    itemCombinacoes?.push({
                                                        id: itemCombinacao?.id,
                                                        pedidoVendaItemId: itemCombinacao?.pedidoVendaItemId,
                                                        combinacaoId: produtoCombinacao?.combinacao?.id,
                                                        combinacaoItems: [{id: itemCombinacao?.combinacaoItems[0]?.id, itemCombinacaoId: combinacaoItem.id, quantidade: 1}]
                                                    });
                                                    
                                                    this.setState({itemCombinacoes});

                                                }}>
                                                    <div>
                                                        <img style={{ width: 65, height: 65, borderRadius: '8px' }} src={'https://uploads.metropoles.com/wp-content/uploads/2023/08/09145143/Pizza-31.jpg'}/>
                                                    </div>
                                                    <div style={{margin: '10px'}}>
                                                        <input type='checkbox' readOnly checked={_.map(((_.filter(this.state.itemCombinacoes, (itemCombinacao: any) => itemCombinacao.combinacaoId == produtoCombinacao.combinacao.id) as any)[0])?.combinacaoItems, (c: any) => c.itemCombinacaoId)[0] == combinacaoItem.id}></input>
                                                    </div>
                                                    <div className='FoodContent' style={{padding: '2px'}}>
                                                        <div className='FoodTitle'><h5 className="itemName mb-0">{_.get(combinacaoItem, "nome")}</h5><div className='FoodPricing' style={{float: 'right', marginRight: '4px'}}><h6>+ R$ 0,00</h6></div></div>
                                                        <div className='FoodDescription' style={{marginTop: '2px'}}>{_.get(combinacaoItem, "descricao")}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    
                                </div>
                            )}

                            {produtoCombinacao.maximo > 1 && (
                                <div style={{paddingBottom: '12px'}}>
                                <Alert key={'dark'} style={{backgroundColor: 'rgb(27, 34, 40)', marginBottom: '2px'}}>{produtoCombinacao.combinacao.descricao}&nbsp;&nbsp;<div style={{float: 'right', fontWeight: 400, display: 'flex'}}>{produtoCombinacao.isObrigatorio ?<div style={{color: '#ec5353'}}>Obrigatório</div> : <div style={{color: '#ffffff'}}>Opcional</div>}&nbsp;&nbsp;<div style={{color: '#ffffff', fontSize: 16}}>{this.QuantidadeTotal(produtoCombinacao)} / {produtoCombinacao.maximo}</div></div></Alert>

                                        {produtoCombinacao.combinacao.combinacaoItems?.map((combinacaoItem: any) => {
                                            return (
                                                <div className='Food' style={{marginBottom: '2px', cursor: 'pointer'}} key={_.get(combinacaoItem, "id")}>
                                                    <div>
                                                        <img style={{ width: 65, height: 65, borderRadius: '8px' }} src={'https://uploads.metropoles.com/wp-content/uploads/2023/08/09145143/Pizza-31.jpg'}/>
                                                    </div>
                                                    <div style={{margin: '10px'}}>
                                                        <div className="col-md-12" style={{alignContent: 'center'}}>
                                                            <Button variant="success" size="sm" onClick={() => this.TxtQuantidade_Change(produtoCombinacao, combinacaoItem, this.Quantidade(produtoCombinacao, combinacaoItem) - 1, "-")}>
                                                                <i className="fas fa-minus"></i>
                                                            </Button>
                                                            <span className="quantity-items" style={{marginRight: '12px'}}>{this.Quantidade(produtoCombinacao, combinacaoItem)}</span>
                                                            <Button variant="success" size="sm" onClick={() => this.TxtQuantidade_Change(produtoCombinacao, combinacaoItem, this.Quantidade(produtoCombinacao, combinacaoItem) + 1, "+")}>
                                                                <i className="fas fa-plus"></i>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className='FoodContent' style={{padding: '2px'}}>
                                                        <div className='FoodTitle'><h5 className="itemName mb-0">{_.get(combinacaoItem, "nome")}</h5><div className='FoodPricing' style={{float: 'right', marginRight: '4px'}}><h6>+ R$ 0,00</h6></div></div>
                                                        <div className='FoodDescription' style={{marginTop: '2px'}}>{_.get(combinacaoItem, "descricao")}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    
                                </div>
                            )}
                        </div>
                    )}

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.Close}>
                            Fechar
                        </Button>
                        <Button variant="success" onClick={() => null}>
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

}