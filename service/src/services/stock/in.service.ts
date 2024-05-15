import { Transaction } from "sequelize";
import { MeasurementUnit, Partner, Product, ProductSupplier, StockIn, StockInProduct } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";
import _ from "lodash";

export class StockInService {

    public static IsValid = (stock: StockIn) => {

        return { success: true };

    }

    public static Create = async (stockIn: StockIn, transaction?: Transaction) => {

        stockIn.id = crypto.randomUUID();
        stockIn.createdAt = new Date();
        stockIn.status = 'pending';
        
        await StockIn.create({...stockIn}, {transaction});

        for (let stockInProduct of stockIn?.products || []) {
            stockInProduct.id = crypto.randomUUID();
            stockInProduct.stockInId = stockIn.id;
            stockInProduct.balance = (stockInProduct?.quantity || 0) * (stockInProduct?.contain || 0);
            await StockInProduct.create({...stockInProduct}, {transaction});
        }

    }

    public static Update = async (stockIn: StockIn, transaction?: Transaction) => {

        for (let stockInProduct of stockIn?.products || []) {

            stockInProduct.stockInId = stockIn.id;
            stockInProduct.balance = (stockInProduct?.quantity || 0) * (stockInProduct?.contain || 0);

            if (!stockInProduct.id) {
                stockInProduct.id = crypto.randomUUID();
                await StockInProduct.create({...stockInProduct}, {transaction});
            } else {
                await StockInProduct.update(stockInProduct, {where: {id: stockInProduct.id}, transaction});
            }
            await StockInProduct.destroy({where: {stockInId: stockIn.id, id: {[Op.notIn]: stockIn?.products?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction})
        }

        await StockIn.update(stockIn, {where: {id: stockIn.id}, transaction});

    }

    public static CheckIn = async (id: string, transaction?: Transaction) => {

        const stockIn = await StockIn.findOne({
            attributes: ['id'],
            where: {id},
            include: [
                {model: StockInProduct, as: 'products', attributes: ['id', 'quantity', 'value', 'contain', 'prod'], 
                    include: [
                        {model: Product, as: 'product', attributes: ['id', 'stockBalance'], 
                            include: [{model: ProductSupplier, as: 'suppliers', attributes: ['id', 'supplierId']}]
                        },
                        {model: MeasurementUnit, as: 'measurementUnit', attributes: ['id', 'surname']}
                    ]
                },
                {model: Partner, as: 'supplier', attributes: ['id', 'surname']},
            ],
            transaction
        });


        for (const stockInProduct of stockIn?.products || []) {

            const stockBalance = (parseFloat(stockInProduct?.product?.stockBalance as any) || 0) + ((parseFloat(stockInProduct?.quantity as any) || 0) * (parseFloat(stockInProduct?.contain as any) || 0));

            await Product.update({stockBalance}, {where: {id: stockInProduct?.product?.id}, transaction});

            const productSuppliers = stockInProduct.product?.suppliers?.filter((c) => c.supplierId == stockIn?.supplier?.id);

            if (_.size(productSuppliers) == 0) {
                console.log(stockInProduct);
                await ProductSupplier.create({id: crypto.randomUUID(), code: stockInProduct?.prod?.cProd, productId: stockInProduct?.product?.id, supplierId: stockIn?.supplier?.id, value: (stockInProduct?.value || 0) / (stockInProduct?.contain || 0), measurementUnitId: stockInProduct?.measurementUnit?.id, contain: stockInProduct?.contain}, {transaction});
            }

            if (productSuppliers && _.size(productSuppliers) == 1) {
                console.log(stockInProduct);
                await ProductSupplier.update({productId: stockInProduct?.product?.id, supplierId: stockIn?.supplier?.id, value: (stockInProduct?.value || 0) / (stockInProduct?.contain || 0), measurementUnitId: stockInProduct?.measurementUnit?.id, contain: stockInProduct?.contain}, {where: {id: productSuppliers[0].id}, transaction});
            }
            
        }

        await StockIn.update({status: 'checkIn'}, {where: {id: stockIn?.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await StockIn.update({ativo: false}, {where: {id: id}, transaction});
        
    }

}