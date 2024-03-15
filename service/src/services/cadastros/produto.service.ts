import { Transaction } from "sequelize";
import { Produto } from "../../database";
import crypto from "crypto";

export class ProdutoService {

    public static IsValid = (produto: Produto) => {

        if (produto.descricao == '') {
            return { success: false, message: 'Informe a descrição!' };
        }

        return { success: true };

    }

    public static Create = async (produto: Produto, transaction: Transaction | undefined) => {

        produto.id = crypto.randomUUID();
        
        await Produto.create({...produto}, {transaction});

    }

    public static Update = async (produto: Produto, transaction: Transaction | undefined) => {

        await Produto.update(produto, {where: {id: produto.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Produto.update({ativo: false}, {where: {id: id}, transaction});
    }

}