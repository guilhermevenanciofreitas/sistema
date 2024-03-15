import { Transaction } from "sequelize";
import { PedidoVenda } from "../../database";
import crypto from "crypto";

export class PedidoVendaService {

    public static IsValid = (pedidoVenda: PedidoVenda) => {

        //if (pedidoVenda.cliente?.id == null) {
        //    return { success: false, message: 'Informe o cliente!' };
        //}

        return { success: true };

    }

    public static Create = async (pedidoVenda: PedidoVenda, transaction: Transaction | undefined) => {

        pedidoVenda.id = crypto.randomUUID();
        
        await PedidoVenda.create({...pedidoVenda}, {transaction});

    }

    public static Update = async (pedidoVenda: PedidoVenda, transaction: Transaction | undefined) => {

        await PedidoVenda.update(pedidoVenda, {where: {id: pedidoVenda.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await PedidoVenda.update({ativo: false}, {where: {id: id}, transaction});
    }

}