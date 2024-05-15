import { Transaction } from "sequelize";
import { Product, ProductCombination, ProductCombinationItem, ProductSupplier } from "../../database";
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
        product.stockBalance = 0;
        
        for (let combination of product?.combinations || []) {
            combination.id = crypto.randomUUID();
            combination.productId = product.id;
            await ProductCombination.create({...combination}, {transaction});
        }

        for (let combination of product?.combinations || []) {
            for (let combinationItem of combination?.combinationItems || []) {
                combinationItem.id = crypto.randomUUID();
                combinationItem.productCombinationId = combination.id;
                await ProductCombinationItem.create({...combinationItem}, {transaction});
            }
        }

        for (let supplier of product?.suppliers || []) {
            supplier.id = crypto.randomUUID();
            supplier.productId = product.id;
            await ProductSupplier.create({...supplier}, {transaction});
        }

        await Product.create({...product}, {transaction});

    }

    public static Update = async (product: Product, transaction: Transaction | undefined) => {

        for (let combination of product?.combinations || []) {
            if (!combination.id) {
                combination.id = crypto.randomUUID();
                combination.productId = product.id;
                await ProductCombination.create({...combination}, {transaction});
            } else {
                await ProductCombination.update(combination, {where: {id: combination.id}, transaction});
            }
            await ProductCombination.destroy({where: {productId: product.id, id: {[Op.notIn]: product?.combinations?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction});
        }

        for (let combination of product?.combinations || []) {
            for (let combinationItem of combination?.combinationItems || []) {
                if (!combinationItem.id) {
                    combinationItem.id = crypto.randomUUID();
                    combinationItem.productCombinationId = combination.id;
                    await ProductCombinationItem.create({...combinationItem}, {transaction});
                } else {
                    await ProductCombinationItem.update(combinationItem, {where: {id: combinationItem.id}, transaction});
                }
                await ProductCombinationItem.destroy({where: {productCombinationId: combination.id, id: {[Op.notIn]: combination?.combinationItems?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction});
            }
        }

        for (let supplier of product?.suppliers || []) {
            if (!supplier.id) {
                supplier.id = crypto.randomUUID();
                supplier.productId = product.id;
                await ProductSupplier.create({...supplier}, {transaction});
            } else {
                await ProductSupplier.update(supplier, {where: {id: supplier.id}, transaction});
            }
            await ProductSupplier.destroy({where: {productId: product.id, id: {[Op.notIn]: product?.suppliers?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction})
        }

        await Product.update(product, {where: {id: product.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Product.update({ativo: false}, {where: {id: id}, transaction});
    }

}