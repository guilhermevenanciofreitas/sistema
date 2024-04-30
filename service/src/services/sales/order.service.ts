import { Transaction } from "sequelize";
import { SaleOrder, SaleOrderReceivie, SaleOrderItem, SaleOrderProgress, Delivery, DeliveryRoute, SaleOrderDeliveryRoute, SaleOrderItemCombination, SaleOrderItemCombinationItem, ProductCombination, SaleOrderStatus, ProductCombinationItem } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";
import { SaleOrderStatusByFrom } from "../../database/models/saleOrderStatusByFrom.model";
import _ from "lodash";
import { DisplayError } from "../../errors/DisplayError";

export class OrderService {

    public static IsValid = (saleOrder: SaleOrder) => {

        //if (pedidoVenda.cliente?.id == null) {
        //    return { success: false, message: 'Informe o cliente!' };
        //}

        return { success: true };

    }

    public static Create = async (saleOrder: SaleOrder, transaction: Transaction) => {

        saleOrder.id = crypto.randomUUID();
        saleOrder.createdAt = new Date();

        for (let item of saleOrder?.items || []) {

            item.id = crypto.randomUUID();
            item.saleOrderId = saleOrder.id;

            await SaleOrderItem.create({...item}, {transaction});

            for (let itemCombination of item?.itemCombinations || []) {
                itemCombination.id = crypto.randomUUID();
                await SaleOrderItemCombination.create({...itemCombination}, {transaction});

                for (let itemCombinationItem of itemCombination?.itemCombinationItems || []) {
                    itemCombinationItem.id = crypto.randomUUID();
                    await SaleOrderItemCombinationItem.create({...itemCombinationItem}, {transaction});
                }

            }

        }
        
        for (let item of saleOrder?.receivies || []) {

            item.id = crypto.randomUUID();
            item.saleOrderId = saleOrder.id;
            await SaleOrderReceivie.create({...item}, {transaction});

        }

        await SaleOrder.create({...saleOrder}, {transaction});

    }

    public static Update = async (saleOrder: SaleOrder, transaction: Transaction) => {

        let where: any = [];

        for (let item of saleOrder?.items || []) {

            if (!item.id) {
                item.id = crypto.randomUUID();
                item.saleOrderId = saleOrder.id;
                await SaleOrderItem.create({...item}, {transaction});
            } else {
                await SaleOrderItem.update(item, {where: {id: item.id}, transaction});
            }
            await SaleOrderItem.destroy({where: {saleOrderId: saleOrder.id, id: {[Op.notIn]: saleOrder?.items?.filter(c => c.id != '').map(c => c.id)}}, transaction});

            //if (_.size(item?.itemCombinations) == 0) {
            //    await SaleOrderItemCombination.destroy({where: {saleOrderItemId: item.id}, transaction});
            //}

            /*
            //SaleOrderItemCombination
            where['SaleOrderItemCombination'] = {saleOrderItemId: item.id};
            for (let combination of item?.itemCombinations || []) {
                combination.saleOrderItemId = item.id;
                if (!combination.id) {
                    combination.id = crypto.randomUUID();
                    await SaleOrderItemCombination.create({...combination}, {transaction});
                } else {
                    await SaleOrderItemCombination.update(combination, {where: {id: combination.id}, transaction});
                }
                where['SaleOrderItemCombination'] = {id: {[Op.notIn]: item?.itemCombinations?.filter(c => c.id != "").map(c => c.id)}};
                await SaleOrderItemCombination.destroy({where: where['SaleOrderItemCombination'], transaction});
            }
            //SaleOrderItemCombination

            //PedidoVendaItemCombinacao.PedidoVendaItemCombinacaoItem
            for (let saleOrderItemCombination of item?.itemCombinations || []) {
                where['PedidoVendaItemCombinacaoItem'] = {pedidoVendaItemCombinacaoId: saleOrderItemCombination.id};
                for (let itemCombinationItem of saleOrderItemCombination?.itemCombinationItems || []) {
                    itemCombinationItem.saleOrderItemCombinationId = saleOrderItemCombination.id;
                    if (!itemCombinationItem.id) {
                        itemCombinationItem.id = crypto.randomUUID();
                        await SaleOrderItemCombinationItem.create({...itemCombinationItem}, {transaction});
                    } else {
                        await SaleOrderItemCombinationItem.update(itemCombinationItem, {where: {id: itemCombinationItem.id}, transaction});
                    }
                }

                const r = await ProductCombinationItem.findAll({attributes: ["id"], where: {combinacaoId: saleOrderItemCombination.combinationId}});
                where['PedidoVendaItemCombinacaoItem'] = {itemCombinacaoId: {[Op.in]: r.map(c => c.id)}, id: {[Op.notIn]: saleOrderItemCombination?.itemCombinationItems?.filter(c => c.id != "").map(c => c.id)}};
                await SaleOrderItemCombinationItem.destroy({where: where['PedidoVendaItemCombinacaoItem'], transaction});
            }
            //PedidoVendaItemCombinacao.PedidoVendaItemCombinacaoItem
            */
        }

        for (let receivie of saleOrder?.receivies || []) {

            receivie.saleOrderId = saleOrder.id;
          
            if (!receivie.id) {
                receivie.id = crypto.randomUUID();
                await SaleOrderReceivie.create({...receivie}, {transaction});
            } else {
                await SaleOrderReceivie.update(receivie, {where: {id: receivie.id}, transaction});
            }
            await SaleOrderReceivie.destroy({where: {saleOrderId: saleOrder.id, id: {[Op.notIn]: saleOrder?.receivies?.filter(c => c.id != '').map(c => c.id)}}, transaction})
        }
       
        await SaleOrder.update(saleOrder, {where: {id: saleOrder.id}, transaction});

    }

    
    public static Progress = async (id: string, statusId: string, transaction: Transaction) => {

        const saleOrder = await SaleOrder.findOne({
            attributes: ['statusId'],
            include: [
                {model: SaleOrderStatus, attributes: ['description']}
            ],
            where: {id},
            transaction
        });

        const saleOrderStatus = await SaleOrderStatus.findOne({attributes: ['description'], where: {id: statusId}, transaction})

        const saleOrderStatusByFrom = await SaleOrderStatusByFrom.findOne({
            where: {statusById: saleOrder?.statusId, statusFromId: statusId},
            transaction
        });

        if (saleOrderStatusByFrom == null) {
            throw new DisplayError(`${saleOrder?.status?.description || 'Pendente'} => ${saleOrderStatus?.description || 'Pendente'} Não configurado!`, 201);
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

    public static PedidoVendaDeliveryRoute = async (saleOrderDeliveryRoute: SaleOrderDeliveryRoute, transaction: Transaction) => {
        saleOrderDeliveryRoute.id = crypto.randomUUID();
        await SaleOrderDeliveryRoute.create({...saleOrderDeliveryRoute}, {transaction});
    }

    public static DeliveryRoute = async (deliveryRoute: DeliveryRoute, transaction: Transaction) => {

        deliveryRoute.id = crypto.randomUUID();
        await DeliveryRoute.create({...deliveryRoute}, {transaction});
        
    }

    public static Delete = async (id: string, transaction: Transaction) => {
        await SaleOrder.update({ativo: false}, {where: {id: id}, transaction});
    }

}