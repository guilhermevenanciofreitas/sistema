import { Transaction } from "sequelize";
import { Product, StockIn, StockInProduct } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class StockInService {

    public static IsValid = (stock: StockIn) => {

        return { success: true };

    }

    public static Create = async (stockIn: StockIn, transaction?: Transaction) => {

        stockIn.id = crypto.randomUUID();
        stockIn.createdAt = new Date();
        stockIn.status = 'pending';
        
        await StockIn.create({...stockIn}, {transaction});

        for (let product of stockIn?.products || []) {
            product.id = crypto.randomUUID();
            product.stockInId = stockIn.id;
            product.balance = product.quantity;
            await StockInProduct.create({...product}, {transaction});
        }

    }

    public static Update = async (stockIn: StockIn, transaction?: Transaction) => {

        for (let product of stockIn?.products || []) {
            if (!product.id) {
                product.id = crypto.randomUUID();
                await StockInProduct.create({...product}, {transaction});
            } else {
                await StockInProduct.update(product, {where: {id: product.id}, transaction});
            }
            await StockInProduct.destroy({where: {stockInId: stockIn.id, id: {[Op.notIn]: stockIn?.products?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction})
        }

        await StockIn.update(stockIn, {where: {id: stockIn.id}, transaction});

    }

    public static CheckIn = async (id: string, transaction?: Transaction) => {

        const stockIn = await StockIn.findOne({
            attributes: ['id'],
            where: {id},
            include: [{model: StockInProduct, as: 'products', attributes: ['id', 'quantity'], 
                include: [{model: Product, as: 'product', attributes: ['id', 'stockBalance']}]
            }],
            transaction
        });


        for (const product of stockIn?.products || []) {

            const stockBalance = (parseFloat(product.product?.stockBalance as any) || 0) + (parseFloat(product?.quantity as any) || 0);

            await Product.update({stockBalance}, {where: {id: product.product?.id}, transaction});
        }

        await StockIn.update({status: 'checkIn'}, {where: {id: stockIn?.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await StockIn.update({ativo: false}, {where: {id: id}, transaction});
        
    }

}