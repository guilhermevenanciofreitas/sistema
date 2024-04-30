import { Transaction } from "sequelize";
import { Cte } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class CteService {

    public static IsValid = (cte: Cte) => {

        ///if (nfe.descricao == '') {
        //    return { success: false, message: 'Informe a descrição!' };
        //}

        return { success: true };

    }

    public static Create = async (cte: Cte, transaction: Transaction | undefined) => {

        cte.id = crypto.randomUUID();

        await Cte.create({...cte}, {transaction});

    }

    public static Update = async (cte: Cte, transaction?: Transaction) => {

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
        await Cte.update(cte, {where: {id: cte.id}, transaction});

    }

    public static Upload = async (cte: Cte, transaction?: Transaction) => {

    }

    public static Xml = async (cte: Cte, transaction?: Transaction) => {

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await Cte.update({active: false}, {where: {id: id}, transaction});
    }

}