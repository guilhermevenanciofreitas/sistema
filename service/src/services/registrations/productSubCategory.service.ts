import { Transaction } from "sequelize";
import { ProductSubCategory } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class ProductSubCategoryService {

    public static IsValid = (productSubCategory: ProductSubCategory) => {

        return { success: true };

    }

    public static Create = async (productSubCategory: ProductSubCategory, transaction?: Transaction) => {

        productSubCategory.id = crypto.randomUUID();
      
        await ProductSubCategory.create({...productSubCategory}, {transaction});

    }

    public static Update = async (productSubCategory: ProductSubCategory, transaction?: Transaction) => {

        await ProductSubCategory.update(productSubCategory, {where: {id: productSubCategory.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await ProductSubCategory.update({ativo: false}, {where: {id: id}, transaction});

    }

}