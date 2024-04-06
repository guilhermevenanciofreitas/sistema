import { Transaction } from "sequelize";
import { SaleOrder, PedidoVendaPagamento, SaleOrderItem, PedidoVendaAndamento, Delivery, DeliveryRoute, PedidoVendaDeliveryRoute, PedidoVendaItemCombinacao, PedidoVendaItemCombinacaoItem, ProdutoCombinacaoItem, SaleOrderStatus } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";
import { SaleOrderStatusByFrom } from "../../database/models/saleOrderStatusByFrom.model";
import _ from "lodash";
import { DisplayError } from "../../errors/DisplayError";

export class PedidoVendaService {

    public static IsValid = (pedidoVenda: SaleOrder) => {

        //if (pedidoVenda.cliente?.id == null) {
        //    return { success: false, message: 'Informe o cliente!' };
        //}

        return { success: true };

    }

    public static Create = async (pedidoVenda: SaleOrder, transaction: Transaction) => {

        pedidoVenda.id = crypto.randomUUID();

        pedidoVenda.clientId = pedidoVenda.cliente?.id;
        pedidoVenda.tipoEntregaId = pedidoVenda.tipoEntrega?.id;
        pedidoVenda.statusId = pedidoVenda.status?.id;
        pedidoVenda.entregadorId = pedidoVenda.entregador?.id;

        for (let item of pedidoVenda?.itens || []) {
            item.id = crypto.randomUUID();
            item.pedidoVendaId = pedidoVenda.id;
            item.produtoId = item.produto?.id;
            SaleOrderItem.create({...item}, {transaction});

            for (let combinacao of item?.itemCombinacoes || []) {
                combinacao.id = crypto.randomUUID();
                combinacao.pedidoVendaItemId = item.id;
                PedidoVendaItemCombinacao.create({...combinacao}, {transaction});

                for (let combinacaoItem of combinacao?.combinacaoItems || []) {
                    combinacaoItem.id = crypto.randomUUID();
                    combinacaoItem.pedidoVendaItemCombinacaoId = combinacao.id;
                    PedidoVendaItemCombinacaoItem.create({...combinacaoItem}, {transaction});
                }

            }

        }
        

        for (let item of pedidoVenda?.pagamentos || []) {
            item.id = crypto.randomUUID();
            item.pedidoVendaId = pedidoVenda.id;
            item.formaPagamentoId = item.formaPagamento?.id;
            PedidoVendaPagamento.create({...item}, {transaction})
        }

        await SaleOrder.create({...pedidoVenda}, {transaction});

    }

    public static Update = async (pedidoVenda: SaleOrder, transaction: Transaction) => {

        let where: any = [];

        pedidoVenda.clientId = pedidoVenda.cliente?.id;
        pedidoVenda.tipoEntregaId = pedidoVenda.tipoEntrega?.id;
        pedidoVenda.statusId = pedidoVenda.status?.id;
        pedidoVenda.entregadorId = pedidoVenda.entregador?.id;

        if (pedidoVenda?.itens?.length == 0) {
            PedidoVendaItemCombinacao.destroy({where: {pedidoVendaId: pedidoVenda.id}, transaction});
        }

        for (let item of pedidoVenda?.itens || []) {

            item.pedidoVendaId = pedidoVenda.id;
            item.produtoId = item.produto?.id;
            
            if (!item.id) {
                item.id = crypto.randomUUID();
                SaleOrderItem.create({...item}, {transaction});
            } else {
                SaleOrderItem.update(item, {where: {id: item.id}, transaction});
            }
            SaleOrderItem.destroy({where: {pedidoVendaId: pedidoVenda.id, id: {[Op.notIn]: pedidoVenda?.itens?.filter(c => c.id != "").map(c => c.id)}}, transaction});

            if (item?.itemCombinacoes?.length == 0) {
                PedidoVendaItemCombinacao.destroy({where: {pedidoVendaItemId: item.id}, transaction});
            }

            //PedidoVendaItemCombinacao
            where['PedidoVendaItemCombinacao'] = {pedidoVendaItemId: item.id};
            for (let combinacao of item?.itemCombinacoes || []) {
                combinacao.pedidoVendaItemId = item.id;
                if (!combinacao.id) {
                    combinacao.id = crypto.randomUUID();
                    PedidoVendaItemCombinacao.create({...combinacao}, {transaction});
                } else {
                    PedidoVendaItemCombinacao.update(combinacao, {where: {id: combinacao.id}, transaction});
                }
                where['PedidoVendaItemCombinacao'] = {id: {[Op.notIn]: item?.itemCombinacoes?.filter(c => c.id != "").map(c => c.id)}};
                PedidoVendaItemCombinacao.destroy({where: where['PedidoVendaItemCombinacao'], cascade: true, transaction});
            }
            //PedidoVendaItemCombinacao

            //PedidoVendaItemCombinacao.PedidoVendaItemCombinacaoItem
            for (let combinacao of item?.itemCombinacoes || []) {
                where['PedidoVendaItemCombinacaoItem'] = {pedidoVendaItemCombinacaoId: combinacao.id};
                for (let combinacaoItem of combinacao?.combinacaoItems || []) {
                    combinacaoItem.pedidoVendaItemCombinacaoId = combinacao.id;
                    if (!combinacaoItem.id) {
                        combinacaoItem.id = crypto.randomUUID();
                        PedidoVendaItemCombinacaoItem.create({...combinacaoItem}, {transaction});
                    } else {
                        PedidoVendaItemCombinacaoItem.update(combinacaoItem, {where: {id: combinacaoItem.id}, transaction});
                    }
                }

                const r = await ProdutoCombinacaoItem.findAll({attributes: ["id"], where: {combinacaoId: combinacao.combinacaoId}});
                where['PedidoVendaItemCombinacaoItem'] = {itemCombinacaoId: {[Op.in]: r.map(c => c.id)}, id: {[Op.notIn]: combinacao?.combinacaoItems?.filter(c => c.id != "").map(c => c.id)}};
                PedidoVendaItemCombinacaoItem.destroy({where: where['PedidoVendaItemCombinacaoItem'], transaction});
            }
            //PedidoVendaItemCombinacao.PedidoVendaItemCombinacaoItem

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

        await SaleOrder.update(pedidoVenda, {where: {id: pedidoVenda.id}, transaction});

    }

    
    public static Progress = async (id: string, statusId: string, transaction: Transaction) => {

        const saleOrder = await SaleOrder.findOne({
            attributes: ["statusId"],
            include: [{model: SaleOrderStatus, attributes: ["descricao"]}],
            where: {id},
            transaction
        });

        const saleOrderStatus = await SaleOrderStatus.findOne({attributes: ["descricao"], where: {id: statusId}, transaction})

        const saleOrderStatusByFrom = await SaleOrderStatusByFrom.count({
            where: {statusById: saleOrder?.statusId, statusFromId: statusId},
            transaction
        });

        if (saleOrderStatusByFrom == 0) {
            throw new DisplayError(`${saleOrder?.status?.descricao} => ${saleOrderStatus?.descricao} Não configurado!`, 201);
        }

        await SaleOrder.update({statusId: statusId}, {where: {id}, transaction});

        await PedidoVendaAndamento.create({id: crypto.randomUUID(), pedidoVendaId: id, data: new Date(), statusId}, {transaction})

    }

    public static Deliveryman = async (id: string, entregadorId: string, transaction: Transaction) => {

        await SaleOrder.update({entregadorId: entregadorId}, {where: {id}, transaction});

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
        await SaleOrder.update({ativo: false}, {where: {id: id}, transaction});
    }

}