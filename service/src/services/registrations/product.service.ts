import { Transaction } from "sequelize";
import { Product, ProductCombination } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class ProductService {

    public static IsValid = (produto: Product) => {

        if (produto.description == '') {
            return { success: false, message: 'Informe a descrição!' };
        }

        return { success: true };

    }

    public static Create = async (product: Product, transaction: Transaction | undefined) => {

        product.id = crypto.randomUUID();
        
        for (let item of product?.combinations || []) {
            item.id = crypto.randomUUID();
        }

        await Product.create({...product}, {transaction});

    }

    public static Update = async (product: Product, transaction: Transaction | undefined) => {

        for (let item of product?.combinations || []) {
            if (!item.id) {
                item.id = crypto.randomUUID();
                item.productId = product.id;
                await ProductCombination.create({...item}, {transaction});
            } else {
                await ProductCombination.update(item, {where: {id: item.id}, transaction});
            }
            await ProductCombination.destroy({where: {productId: product.id, id: {[Op.notIn]: product?.combinations?.filter((c: any) => c.id != "").map(c => c.id)}}, transaction})
        }

        await Product.update(product, {where: {id: product.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Product.update({ativo: false}, {where: {id: id}, transaction});
    }

}