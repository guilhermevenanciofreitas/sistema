import { Transaction } from "sequelize";
import { SaleOrder, SaleOrderRecieve, SaleOrderItem, SaleOrderProgress, Delivery, DeliveryRoute, PedidoVendaDeliveryRoute, SaleOrderItemCombination, PedidoVendaItemCombinacaoItem, ProdutoCombinacaoItem, SaleOrderStatus } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";
import { SaleOrderStatusByFrom } from "../../database/models/saleOrderStatusByFrom.model";
import _ from "lodash";
import { DisplayError } from "../../errors/DisplayError";

export class SaleOrderService {

    public static IsValid = (pedidoVenda: SaleOrder) => {

        //if (pedidoVenda.cliente?.id == null) {
        //    return { success: false, message: 'Informe o cliente!' };
        //}

        return { success: true };

    }

    public static Create = async (saleOrder: SaleOrder, transaction: Transaction) => {

        saleOrder.id = crypto.randomUUID();
        saleOrder.createdAt = new Date();

        for (let item of saleOrder?.itens || []) {
            item.id = crypto.randomUUID();
            item.saleOrderId = saleOrder.id;
            item.produtoId = item.produto?.id;
            SaleOrderItem.create({...item}, {transaction});

            for (let combinacao of item?.itemCombinacoes || []) {
                combinacao.id = crypto.randomUUID();
                combinacao.saleOrderItemId = item.id;
                SaleOrderItemCombination.create({...combinacao}, {transaction});

                for (let combinacaoItem of combinacao?.combinacaoItems || []) {
                    combinacaoItem.id = crypto.randomUUID();
                    combinacaoItem.pedidoVendaItemCombinacaoId = combinacao.id;
                    PedidoVendaItemCombinacaoItem.create({...combinacaoItem}, {transaction});
                }

            }

        }
        

        for (let item of saleOrder?.pagamentos || []) {
            item.id = crypto.randomUUID();
            item.pedidoVendaId = saleOrder.id;
            item.formaPagamentoId = item.formaPagamento?.id;
            SaleOrderRecieve.create({...item}, {transaction})
        }

        await SaleOrder.create({...saleOrder}, {transaction});

    }

    public static Update = async (saleOrder: SaleOrder, transaction: Transaction) => {

        let where: any = [];

        for (let item of saleOrder?.itens || []) {

            item.saleOrderId = saleOrder.id;
            item.produtoId = item.produto?.id;
            
            if (!item.id) {
                item.id = crypto.randomUUID();
                SaleOrderItem.create({...item}, {transaction});
            } else {
                SaleOrderItem.update(item, {where: {id: item.id}, transaction});
            }
            SaleOrderItem.destroy({where: {saleOrderId: saleOrder.id, id: {[Op.notIn]: saleOrder?.itens?.filter(c => c.id != "").map(c => c.id)}}, transaction});

            if (item?.itemCombinacoes?.length == 0) {
                SaleOrderItemCombination.destroy({where: {saleOrderItemId: item.id}, transaction});
            }

            //SaleOrderItemCombination
            where['SaleOrderItemCombination'] = {pedidoVendaItemId: item.id};
            for (let combinacao of item?.itemCombinacoes || []) {
                combinacao.saleOrderItemId = item.id;
                if (!combinacao.id) {
                    combinacao.id = crypto.randomUUID();
                    SaleOrderItemCombination.create({...combinacao}, {transaction});
                } else {
                    SaleOrderItemCombination.update(combinacao, {where: {id: combinacao.id}, transaction});
                }
                where['SaleOrderItemCombination'] = {id: {[Op.notIn]: item?.itemCombinacoes?.filter(c => c.id != "").map(c => c.id)}};
                SaleOrderItemCombination.destroy({where: where['SaleOrderItemCombination'], cascade: true, transaction});
            }
            //SaleOrderItemCombination

            //PedidoVendaItemCombinacao.PedidoVendaItemCombinacaoItem
            for (let saleOrderItemCombination of item?.itemCombinacoes || []) {
                where['PedidoVendaItemCombinacaoItem'] = {pedidoVendaItemCombinacaoId: saleOrderItemCombination.id};
                for (let combinacaoItem of saleOrderItemCombination?.combinacaoItems || []) {
                    combinacaoItem.pedidoVendaItemCombinacaoId = saleOrderItemCombination.id;
                    if (!combinacaoItem.id) {
                        combinacaoItem.id = crypto.randomUUID();
                        PedidoVendaItemCombinacaoItem.create({...combinacaoItem}, {transaction});
                    } else {
                        PedidoVendaItemCombinacaoItem.update(combinacaoItem, {where: {id: combinacaoItem.id}, transaction});
                    }
                }

                const r = await ProdutoCombinacaoItem.findAll({attributes: ["id"], where: {combinacaoId: saleOrderItemCombination.combinationId}});
                where['PedidoVendaItemCombinacaoItem'] = {itemCombinacaoId: {[Op.in]: r.map(c => c.id)}, id: {[Op.notIn]: saleOrderItemCombination?.combinacaoItems?.filter(c => c.id != "").map(c => c.id)}};
                PedidoVendaItemCombinacaoItem.destroy({where: where['PedidoVendaItemCombinacaoItem'], transaction});
            }
            //PedidoVendaItemCombinacao.PedidoVendaItemCombinacaoItem

        }

        for (let item of saleOrder?.pagamentos || []) {

            item.pedidoVendaId = saleOrder.id;
            item.formaPagamentoId = item.formaPagamento?.id;

            if (!item.id) {
                item.id = crypto.randomUUID();
                SaleOrderRecieve.create({...item}, {transaction});
            } else {
                SaleOrderRecieve.update(item, {where: {id: item.id}, transaction});
            }
            SaleOrderRecieve.destroy({where: {pedidoVendaId: saleOrder.id, id: {[Op.notIn]: saleOrder?.pagamentos?.filter(c => c.id != "").map(c => c.id)}}, transaction})
        }

        await SaleOrder.update(saleOrder, {where: {id: saleOrder.id}, transaction});

    }

    
    public static Progress = async (id: string, statusId: string, transaction: Transaction) => {

        const saleOrder = await SaleOrder.findOne({
            attributes: ["statusId"],
            include: [{model: SaleOrderStatus, attributes: ["descricao"]}],
            where: {id},
            transaction
        });

        const saleOrderStatus = await SaleOrderStatus.findOne({attributes: ["descricao"], where: {id: statusId}, transaction})

        const saleOrderStatusByFrom = await SaleOrderStatusByFrom.findOne({
            where: {statusById: saleOrder?.statusId, statusFromId: statusId},
            transaction
        });

        if (saleOrderStatusByFrom == null) {
            throw new DisplayError(`${saleOrder?.status?.descricao || '[Sem status]'} => ${saleOrderStatus?.descricao || '[Sem status]'} Não configurado!`, 201);
        }

        await SaleOrder.update({statusId: statusId}, {where: {id}, transaction});

        await SaleOrderProgress.create({id: crypto.randomUUID(), pedidoVendaId: id, data: new Date(), statusId}, {transaction})

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