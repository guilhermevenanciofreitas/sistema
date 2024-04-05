import { Transaction } from "sequelize";
import { Nfe } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class ShippingOrderService {

    public static IsValid = (nfe: Nfe) => {

        ///if (nfe.descricao == '') {
        //    return { success: false, message: 'Informe a descrição!' };
        //}

        return { success: true };

    }

    public static Create = async (nfe: Nfe, transaction: Transaction | undefined) => {

        nfe.id = crypto.randomUUID();
        //produto.categoriaId = produto.categoria?.id;
        
        /*
        for (let item of nfe?.combinacoes || []) {
            item.id = crypto.randomUUID();
            item.produtoId = produto.id;
            item.combinacaoId = item.combinacao?.id;
        }
        */

        await Nfe.create({...nfe}, {transaction});

    }

    public static Update = async (nfe: Nfe, transaction?: Transaction) => {

        /*produto.categoriaId = produto.categoria?.id;

        for (let item of produto?.combinacoes || []) {
            if (!item.id) {
                item.id = crypto.randomUUID();
                item.produtoId = produto.id;
                item.combinacaoId = item.combinacao?.id;
                ProdutoCombinacao.create({...item}, {transaction});
            } else {
                ProdutoCombinacao.update(item, {where: {id: item.id}, transaction});
            }
            ProdutoCombinacao.destroy({where: {produtoId: produto.id, id: {[Op.notIn]: produto?.combinacoes?.filter((c: any) => c.id != "").map(c => c.id)}}, transaction})
        }
        */
        await Nfe.update(nfe, {where: {id: nfe.id}, transaction});

    }

    public static Upload = async (nfe: Nfe, transaction: Transaction | undefined) => {

       
    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Nfe.update({ativo: false}, {where: {id: id}, transaction});
    }

}