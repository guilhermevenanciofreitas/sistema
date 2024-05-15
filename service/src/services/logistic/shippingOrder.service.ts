import { Transaction } from "sequelize";
import { Nfe, ShippingOrder, ShippingOrderNfe, ShippingOrderVehicle } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class ShippingOrderService {

    public static IsValid = (shippingOrder: ShippingOrder) => {

        ///if (nfe.descricao == '') {
        //    return { success: false, message: 'Informe a descrição!' };
        //}

        return { success: true };

    }

    public static Create = async (shippingOrder: ShippingOrder, transaction?: Transaction) => {

        shippingOrder.id = crypto.randomUUID();
       
        for (let vehicle of shippingOrder?.vehicles || []) {
            vehicle.id = crypto.randomUUID();
            vehicle.shippingOrderId = shippingOrder.id;
            await ShippingOrderVehicle.create({...vehicle}, {transaction});
        }

        for (let nfe of shippingOrder?.nfes || []) {
            nfe.id = crypto.randomUUID();
            nfe.shippingOrderId = shippingOrder.id;
            await ShippingOrderNfe.create({...nfe}, {transaction});
        }
       
        await ShippingOrder.create({...shippingOrder}, {transaction});

    }

    public static Update = async (shippingOrder: ShippingOrder, transaction?: Transaction) => {

        for (let vehicle of shippingOrder?.vehicles || []) {
            if (!vehicle.id) {
                vehicle.id = crypto.randomUUID();
                vehicle.shippingOrderId = shippingOrder.id;
                await ShippingOrderVehicle.create({...vehicle}, {transaction});
            } else {
                await ShippingOrderVehicle.update(vehicle, {where: {id: vehicle.id}, transaction});
            }
            await ShippingOrderVehicle.destroy({where: {shippingOrderId: shippingOrder.id, id: {[Op.notIn]: shippingOrder?.vehicles?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction})
        }

        for (let nfe of shippingOrder?.nfes || []) {
            if (!nfe.id) {
                nfe.id = crypto.randomUUID();
                nfe.shippingOrderId = shippingOrder.id;
                await ShippingOrderNfe.create({...nfe}, {transaction});
            } else {
                await ShippingOrderNfe.update(nfe, {where: {id: nfe.id}, transaction});
            }
            await ShippingOrderNfe.destroy({where: {shippingOrderId: shippingOrder.id, id: {[Op.notIn]: shippingOrder?.nfes?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction})
        }
     
        await ShippingOrder.update(shippingOrder, {where: {id: shippingOrder.id}, transaction});

    }

    public static Upload = async (nfe: Nfe, transaction: Transaction | undefined) => {

       
    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Nfe.update({ativo: false}, {where: {id: id}, transaction});
    }

}