import { Transaction } from "sequelize";
import { Cte, ShippingOrder, Trip, TripCte, TripShippingOrder, TripVehicle } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class TripService {

    public static IsValid = (trip: Trip) => {

        return { success: true };

    }

    public static Create = async (trip: Trip, transaction?: Transaction) => {

        trip.id = crypto.randomUUID();
       
        await Trip.create({...trip}, {transaction});

    }

    public static Update = async (trip: Trip, transaction?: Transaction) => {

        for (let tripVehicle of trip?.vehicles || []) {
            if (!tripVehicle.id) {

                tripVehicle.id = crypto.randomUUID();
                tripVehicle.tripId = trip.id;

                await TripVehicle.create({...tripVehicle}, {transaction});
            } else {
                await TripVehicle.update(tripVehicle, {where: {id: tripVehicle.id}, transaction});
            }
            await TripVehicle.destroy({where: {tripId: trip.id, id: {[Op.notIn]: trip?.vehicles?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction})
        }

        for (let tripShippingOrder of trip?.shippingOrders || []) {
            if (!tripShippingOrder.id) {

                tripShippingOrder.id = crypto.randomUUID();
                tripShippingOrder.tripId = trip.id;

                await TripShippingOrder.create({...tripShippingOrder}, {transaction});
            } else {
                await TripShippingOrder.update(tripShippingOrder, {where: {id: tripShippingOrder.id}, transaction});
            }
            await TripShippingOrder.destroy({where: {tripId: trip.id, id: {[Op.notIn]: trip?.shippingOrders?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction})
        }
        
        for (let tripCte of trip?.ctes || []) {
            if (!tripCte.id) {

                let cte = new Cte({...tripCte.cte});
                cte.id = crypto.randomUUID();

                tripCte.id = crypto.randomUUID();
                tripCte.tripId = trip.id;
                tripCte.cteId = cte.id;

                await Cte.create({...cte.dataValues}, {transaction});
                await TripCte.create({...tripCte}, {transaction});
            } else {
                await Cte.update(tripCte.cte || {}, {where: {id: tripCte.cte?.id}, transaction});
            }
            await TripCte.destroy({where: {tripId: trip.id, id: {[Op.notIn]: trip?.ctes?.filter((c: any) => c.id != '').map(c => c.id)}}, transaction})
        }

        await Trip.update(trip, {where: {id: trip.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await Trip.update({ativo: false}, {where: {id: id}, transaction});
    }

}