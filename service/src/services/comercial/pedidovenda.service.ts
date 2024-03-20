import { Transaction } from "sequelize";
import { PedidoVenda, PedidoVendaPagamento, PedidoVendaItem, PedidoVendaAndamento, Delivery, DeliveryRoute, PedidoVendaDeliveryRoute, PedidoVendaItemCombinacao, PedidoVendaItemCombinacaoItem } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";

export class PedidoVendaService {

    public static IsValid = (pedidoVenda: PedidoVenda) => {

        //if (pedidoVenda.cliente?.id == null) {
        //    return { success: false, message: 'Informe o cliente!' };
        //}

        return { success: true };

    }

    public static Create = async (pedidoVenda: PedidoVenda, transaction: Transaction) => {

        pedidoVenda.id = crypto.randomUUID();

        pedidoVenda.clientId = pedidoVenda.cliente?.id;
        pedidoVenda.tipoEntregaId = pedidoVenda.tipoEntrega?.id;
        pedidoVenda.statusId = pedidoVenda.status?.id;
        pedidoVenda.entregadorId = pedidoVenda.entregador?.id;

        for (let item of pedidoVenda?.itens || []) {
            item.id = crypto.randomUUID();
            item.pedidoVendaId = pedidoVenda.id;
            item.produtoId = item.produto?.id;
            PedidoVendaItem.create({...item}, {transaction});
        }

        for (let item of pedidoVenda?.pagamentos || []) {
            item.id = crypto.randomUUID();
            item.pedidoVendaId = pedidoVenda.id;
            item.formaPagamentoId = item.formaPagamento?.id;
            PedidoVendaPagamento.create({...item}, {transaction})
        }

        await PedidoVenda.create({...pedidoVenda}, {transaction});

    }

    public static Update = async (pedidoVenda: PedidoVenda, transaction: Transaction) => {

        pedidoVenda.clientId = pedidoVenda.cliente?.id;
        pedidoVenda.tipoEntregaId = pedidoVenda.tipoEntrega?.id;
        pedidoVenda.statusId = pedidoVenda.status?.id;
        pedidoVenda.entregadorId = pedidoVenda.entregador?.id;

        for (let item of pedidoVenda?.itens || []) {

            item.pedidoVendaId = pedidoVenda.id;
            item.produtoId = item.produto?.id;
            
            if (!item.id) {
                item.id = crypto.randomUUID();
                PedidoVendaItem.create({...item}, {transaction});
            } else {
                PedidoVendaItem.update(item, {where: {id: item.id}, transaction});
            }
            PedidoVendaItem.destroy({where: {pedidoVendaId: pedidoVenda.id, id: {[Op.notIn]: pedidoVenda?.itens?.filter(c => c.id != "").map(c => c.id)}}, transaction});

            //Combinacoes
            for (let combinacao of item?.itemCombinacoes || []) {
                
                combinacao.pedidoVendaItemId = item.id;

                if (!combinacao.id) {
                    combinacao.id = crypto.randomUUID();
                    PedidoVendaItemCombinacao.create({...combinacao}, {transaction});
                } else {
                    PedidoVendaItemCombinacao.update(combinacao, {where: {id: combinacao.id}, transaction});
                }
                PedidoVendaItemCombinacao.destroy({where: {pedidoVendaItemId: item.id, id: {[Op.notIn]: item?.itemCombinacoes?.filter(c => c.id != "").map(c => c.id)}}, transaction});

                for (let combinacaoItem of combinacao?.combinacaoItems || []) {

                    combinacaoItem.pedidoVendaItemCombinacaoId = combinacao.id;

                    if (!combinacaoItem.id) {
                        combinacaoItem.id = crypto.randomUUID();
                        PedidoVendaItemCombinacaoItem.create({...combinacaoItem}, {transaction});
                    } else {
                        PedidoVendaItemCombinacaoItem.update(combinacaoItem, {where: {id: combinacaoItem.id}, transaction});
                    }
                    PedidoVendaItemCombinacaoItem.destroy({where: {pedidoVendaItemCombinacaoId: combinacao.pedidoVendaItemId, id: {[Op.notIn]: combinacao?.combinacaoItems?.filter(c => c.id != "").map(c => c.id)}}, transaction});    

                }

            }

        }

        for (let item of pedidoVenda?.pagamentos || []) {

            item.pedidoVendaId = pedidoVenda.id;
            item.formaPagamentoId = item.formaPagamento?.id;

            if (!item.id) {
                item.id = crypto.randomUUID();
                PedidoVendaPagamento.create({...item}, {transaction});
            } else {
                PedidoVendaPagamento.update(item, {where: {id: item.id}, transaction});
            }
            PedidoVendaPagamento.destroy({where: {pedidoVendaId: pedidoVenda.id, id: {[Op.notIn]: pedidoVenda?.pagamentos?.filter(c => c.id != "").map(c => c.id)}}, transaction})
        }

        await PedidoVenda.update(pedidoVenda, {where: {id: pedidoVenda.id}, transaction});

    }

    
    public static Progress = async (id: string, statusId: string, transaction: Transaction) => {

        await PedidoVenda.update({statusId: statusId}, {where: {id}, transaction});

        await PedidoVendaAndamento.create({id: crypto.randomUUID(), pedidoVendaId: id, data: new Date(), statusId}, {transaction})

    }

    public static Deliveryman = async (id: string, entregadorId: string, transaction: Transaction) => {

        await PedidoVenda.update({entregadorId: entregadorId}, {where: {id}, transaction});

    }

    public static Delivery = async (delivery: Delivery, transaction: Transaction) => {

        delivery.id = crypto.randomUUID();
        await Delivery.create({...delivery}, {transaction});

    }

    public static PedidoVendaDeliveryRoute = async (pedidoVendaDeliveryRoute: PedidoVendaDeliveryRoute, transaction: Transaction) => {
        pedidoVendaDeliveryRoute.id = crypto.randomUUID();
        await PedidoVendaDeliveryRoute.create({...pedidoVendaDeliveryRoute}, {transaction});
    }

    public static DeliveryRoute = async (deliveryRoute: DeliveryRoute, transaction: Transaction) => {

        deliveryRoute.id = crypto.randomUUID();
        await DeliveryRoute.create({...deliveryRoute}, {transaction});
        
    }

    public static Delete = async (id: string, transaction: Transaction) => {
        await PedidoVenda.update({ativo: false}, {where: {id: id}, transaction});
    }

}