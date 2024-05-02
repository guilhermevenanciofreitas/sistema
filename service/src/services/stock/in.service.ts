import { Transaction } from "sequelize";
import { Product, StockIn, StockInProduct } from "../../database";
import crypto from "crypto";

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

        await StockIn.update(stockIn, {where: {id: stockIn.id}, transaction});

    }

    public static CheckIn = async (id: string, transaction?: Transaction) => {

        const stockIn = await StockIn.findOne({
            attributes: ['id'],
            where: {id},
            include: [{model: StockInProduct, as: 'products', attributes: ['id', 'quantity'], 
                include: [{model: Product, as: 'product', attributes: ['id', 'stock']}]
            }],
            transaction
        });


        for (const product of stockIn?.products || []) {

            const stock = (parseFloat(product.product?.stock as any) || 0) + (parseFloat(product?.quantity as any) || 0);

            console.log(stock);

            await Product.update({stock}, {where: {id: product.product?.id}, transaction});
        }

        await StockIn.update({status: 'checkIn'}, {where: {id: stockIn?.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await StockIn.update({ativo: false}, {where: {id: id}, transaction});
        
    }

}