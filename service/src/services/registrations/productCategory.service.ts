import { Transaction } from "sequelize";
import { ProductCategory } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class ProductCategoryService {

    public static IsValid = (productCategory: ProductCategory) => {

        if (productCategory.description == '') {
            return { success: false, message: 'Informe a descrição!' };
        }

        return { success: true };

    }

    public static Create = async (productCategory: ProductCategory, transaction?: Transaction) => {

        productCategory.id = crypto.randomUUID();
      
        await ProductCategory.create({...productCategory}, {transaction});

    }

    public static Update = async (productCategory: ProductCategory, transaction?: Transaction) => {

        await ProductCategory.update(productCategory, {where: {id: productCategory.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await ProductCategory.update({ativo: false}, {where: {id: id}, transaction});

    }

}