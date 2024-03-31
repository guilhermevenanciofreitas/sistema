import { Transaction } from "sequelize";
import { Produto, ProdutoCombinacao } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";

export class ProdutoService {

    public static IsValid = (produto: Produto) => {

        if (produto.descricao == '') {
            return { success: false, message: 'Informe a descrição!' };
        }

        return { success: true };

    }

    public static Create = async (produto: Produto, transaction: Transaction | undefined) => {

        produto.id = crypto.randomUUID();
        produto.categoriaId = produto.categoria?.id;
        
        for (let item of produto?.combinacoes || []) {
            item.id = crypto.randomUUID();
            item.produtoId = produto.id;
            item.combinacaoId = item.combinacao?.id;
        }

        await Produto.create({...produto}, {transaction});

    }

    public static Update = async (produto: Produto, transaction: Transaction | undefined) => {

        produto.categoriaId = produto.categoria?.id;

        for (let item of produto?.combinacoes || []) {
            if (!item.id) {
                item.id = crypto.randomUUID();
                item.produtoId = produto.id;
                item.combinacaoId = item.combinacao?.id;
                ProdutoCombinacao.create({...item}, {transaction});
            } else {
                ProdutoCombinacao.update(item, {where: {id: item.id}, transaction});
            }
            ProdutoCombinacao.destroy({where: {id: {[Op.notIn]: produto?.combinacoes?.filter(c => c.id != "").map(c => c.id)}}, transaction})
        }

        await Produto.update(produto, {where: {id: produto.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Produto.update({ativo: false}, {where: {id: id}, transaction});
    }

}