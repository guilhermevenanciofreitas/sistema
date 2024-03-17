import { Transaction } from "sequelize";
import { PedidoVenda, PedidoVendaPagamento, PedidoVendaItem, PedidoVendaAndamento } from "../../database";
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
            PedidoVendaItem.destroy({where: {pedidoVendaId: pedidoVenda.id, id: {[Op.notIn]: pedidoVenda?.itens?.filter(c => c.id != "").map(c => c.id)}}, transaction})
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

    public static Delete = async (id: string, transaction: Transaction) => {
        await PedidoVenda.update({ativo: false}, {where: {id: id}, transaction});
    }

}